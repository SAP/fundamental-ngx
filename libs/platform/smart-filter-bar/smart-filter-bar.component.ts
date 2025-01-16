import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChildren,
    DestroyRef,
    EventEmitter,
    forwardRef,
    inject,
    Injector,
    Input,
    OnDestroy,
    Output,
    Provider,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Validators } from '@angular/forms';

import { BehaviorSubject, debounceTime, filter, firstValueFrom, Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, take, takeUntil } from 'rxjs/operators';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DialogConfig, DialogService } from '@fundamental-ngx/core/dialog';
import {
    DynamicFormFieldItem,
    DynamicFormItem,
    FormGeneratorComponent,
    FormGeneratorService,
    PreparedDynamicFormFieldItem
} from '@fundamental-ngx/platform/form';
import { SearchInput } from '@fundamental-ngx/platform/search-field';
import { FDP_PRESET_MANAGED_COMPONENT, SelectItem } from '@fundamental-ngx/platform/shared';
import { CollectionFilterGroup, FilterableColumnDataType, FilterType } from '@fundamental-ngx/platform/table';

import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarSeparatorComponent,
    ToolbarSpacerDirective
} from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SearchFieldComponent } from '@fundamental-ngx/platform/search-field';
import { SmartFilterBarConditionFieldComponent } from './components/smart-filter-bar-condition-field/smart-filter-bar-condition-field.component';
import { SmartFilterBarSettingsDialogComponent } from './components/smart-filter-bar-settings-dialog/smart-filter-bar-settings-dialog.component';
import { SMART_FILTER_BAR_RENDERER_COMPONENT } from './constants';
import { SmartFilterBarSubjectDirective } from './directives/smart-filter-bar-subject.directive';
import { SmartFilterBarToolbarItemDirective } from './directives/smart-filter-bar-toolbar-item.directive';
import { getSelectItemValue } from './helpers';
import { SmartFilterBarManagedPreset, SmartFilterChangeObject } from './interfaces/smart-filter-bar-change';
import { SmartFilterBarCondition } from './interfaces/smart-filter-bar-condition';
import { SmartFilterBarFieldDefinition } from './interfaces/smart-filter-bar-field-definition';
import { SmartFilterSettingsDialogConfig } from './interfaces/smart-filter-bar-settings-dialog-config';
import { SmartFilterBarDynamicFormFieldItem } from './interfaces/smart-filter-dynamic-form-item';
import { SmartFilterBar } from './smart-filter-bar.class';
import { SmartFilterBarService } from './smart-filter-bar.service';

const defaultColumnsLayout = 'XL4-L3-M2-S1';

function getColumnsNumber(layout: string): number {
    return Math.max(
        ...layout.split('-').map((part) => {
            const matchArray = part.match(/\d+/);

            return matchArray ? parseInt(matchArray[0], 10) : 1;
        })
    );
}

/**
 * Default dialog configuration.
 */
const dialogConfig: DialogConfig = {
    responsivePadding: true,
    verticalPadding: true,
    minWidth: '30rem',
    /** 88px it's the header + footer height */
    bodyMinHeight: 'calc(50vh - 5.5rem)'
};

const smartFilterBarProvider: Provider = {
    provide: SmartFilterBar,
    useExisting: forwardRef(() => SmartFilterBarComponent)
};

@Component({
    selector: 'fdp-smart-filter-bar',
    templateUrl: './smart-filter-bar.component.html',
    styleUrl: './smart-filter-bar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        smartFilterBarProvider,
        SmartFilterBarService,
        FormGeneratorService,
        {
            provide: FDP_PRESET_MANAGED_COMPONENT,
            useExisting: SmartFilterBarComponent
        }
    ],
    host: {
        class: 'fdp-smart-filter-bar',
        '[class.fdp-smart-filter-bar--transparent]': 'transparent'
    },
    imports: [
        ToolbarComponent,
        NgTemplateOutlet,
        ToolbarSeparatorComponent,
        SearchFieldComponent,
        ToolbarSpacerDirective,
        ButtonComponent,
        ToolbarItemDirective,
        FormGeneratorComponent,
        FdTranslatePipe
    ]
})
export class SmartFilterBarComponent extends SmartFilterBar implements AfterViewInit, OnDestroy {
    /**
     * @hidden
     * Form generator component instance.
     */
    @ViewChild(FormGeneratorComponent) _formGenerator!: FormGeneratorComponent;

    /**
     * Subject which will provide configuration data: data source, columns definitions, etc.
     */
    @Input()
    set subject(value: SmartFilterBarSubjectDirective) {
        this._setSubject(value);
    }

    get subject(): SmartFilterBarSubjectDirective {
        return this._subject;
    }
    /**
     * Whether smart filter bar background should be transparent.
     */
    @Input({ transform: booleanAttribute })
    transparent = false;

    /**
     * Columns layout.
     */
    @Input()
    filtersColumnLayout: Nullable<string> = defaultColumnsLayout;

    /**
     * Whether to update filters when they are selected. Otherwise, filters will be applied only by pressing "Go" button.
     */
    @Input({ transform: booleanAttribute })
    liveUpdate = false;

    /**
     * Whether to hide Toolbar.
     */
    @Input({ transform: booleanAttribute })
    hideToolbar = false;

    /**
     * Event emitted when the selected filters have been changed.
     */
    @Output()
    smartFiltersChanged: EventEmitter<SmartFilterChangeObject> = new EventEmitter<SmartFilterChangeObject>();

    /**
     * Event emitted when selected filters has been applied (User clicked on Go button).
     */
    @Output()
    smartFiltersApplied: EventEmitter<SmartFilterChangeObject> = new EventEmitter<SmartFilterChangeObject>();

    /**
     * Event emitted when search input field value has been changed.
     */
    @Output()
    searchInputChanged: EventEmitter<SearchInput> = new EventEmitter<SearchInput>();
    /** @hidden */
    @ContentChildren(SmartFilterBarToolbarItemDirective)
    private readonly _toolbarItemRefs: QueryList<SmartFilterBarToolbarItemDirective>;

    /**
     * Calculated array of filters to apply for the subject's data source.
     */
    filterBy: CollectionFilterGroup[] = [];

    /** Whether the filters section should be shown. */
    showFilterBar$ = signal(true);

    /**
     * Search field value to apply for the subject's data source.
     */
    search: SearchInput | undefined;
    /** @Hidden */
    _toolbarItems: TemplateRef<any>[] = [];
    /** @hidden */
    _formItems = signal<DynamicFormItem[] | null>(null);
    /** Selected filters. */
    selectedFilters$ = signal<string[]>([]);

    /** Selected filters count. */
    selectedFiltersCount$ = computed(() => this.selectedFilters$().length);

    /** Loading state. */
    get loading(): boolean {
        return this._subject?.getDataSource() ? this._subject.getDataSource().isDataLoading : true;
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _subjectSubscriptions = new Subscription();

    /** @hidden */
    private readonly _formGeneratorReady = new BehaviorSubject<boolean>(false);

    /** @hidden */
    private _ignorePresetChange = false;

    /** @hidden */
    private _subject!: SmartFilterBarSubjectDirective;

    /** @hidden */
    private _refresh$ = new Subject<void>();

    /**
     * @hidden
     * Smart filter bar service may be provided by parent component that adds custom configuration, so we need to check if it's provided.
     */
    private readonly _smartFilterBarService =
        inject(SmartFilterBarService, { optional: true, skipSelf: true }) ??
        inject(SmartFilterBarService, { self: true });

    /** @hidden */
    constructor(
        private _dialogService: DialogService,
        private _fgService: FormGeneratorService,
        private _injector: Injector,
        private readonly _destroyRef: DestroyRef
    ) {
        super();
        this._fgService.addComponent(SmartFilterBarConditionFieldComponent, [SMART_FILTER_BAR_RENDERER_COMPONENT]);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._subscriptions.add(
            this._toolbarItemRefs.changes.pipe(startWith(null)).subscribe(() => {
                this._toolbarItems = this._toolbarItemRefs.toArray().map((ref) => ref.templateRef);
            })
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._unsubscribeFromSubject();
        this._refresh$.next();
        this._refresh$.complete();
    }

    /**
     * Transforms condition value into human-readable text.
     * @param condition Smart filter bar condition.
     * @param filterType Condition filter type.
     */
    async getDisplayValue(condition: SmartFilterBarCondition, filterType: string): Promise<string> {
        return this._smartFilterBarService.getDisplayValue(condition, filterType);
    }

    /** Open Filtering Settings Dialog */
    showFilteringSettings(): void {
        const columns = this._getSubjectDefinitions();
        const dialogData: SmartFilterSettingsDialogConfig = {
            fields: columns,
            filterBy: this.filterBy,
            selectedFilters: this.selectedFilters$()
        };

        const dialogRef = this._dialogService.open(
            SmartFilterBarSettingsDialogComponent,
            {
                ...dialogConfig,
                disablePaddings: true,
                width: '50rem',
                data: dialogData
            },
            this._injector
        );

        dialogRef.afterClosed.pipe(take(1)).subscribe({
            next: (selectedFilters: string[]) => {
                this._setSelectedFilters(selectedFilters);
            },
            error: () => {}
        });
    }

    /** Callback function when search query changed. */
    onSearchInputChange(event: SearchInput): void {
        this.search = event;
        this.searchInputChanged.emit(event);
    }

    /** Clear search query. */
    cancelSearch(): void {
        this.search = undefined;

        if (this.liveUpdate) {
            this.submitForm();
        }
    }

    /**
     * Submits filters and search form.
     */
    submitForm(): void {
        this._formGenerator.submit();
    }

    /** Method for setting predefined configuration. */
    async setPreset(data: SmartFilterBarManagedPreset): Promise<void> {
        this._ignorePresetChange = true;
        data.filterBy = data.filterBy || [];
        this.filterBy = data.filterBy;
        this.search = data.search;

        this._refresh$.next();
        this._refresh$.complete();
        this._refresh$ = new Subject<void>();

        this._formGeneratorReady
            .pipe(
                filter((value) => value),
                takeUntil(this._refresh$)
            )
            .subscribe(async () => {
                // Reset form
                this._fgService.resetForm(this._formGenerator.form);

                // Set new data
                for (const filterBy of this.filterBy) {
                    const control = this._fgService.getFormControl(this._formGenerator.form, filterBy.field);

                    if (!control) {
                        continue;
                    }

                    const formItem = control.formItem as PreparedDynamicFormFieldItem;

                    const condition = this._smartFilterBarService.transformCollectionFilter(filterBy);

                    const selectedConditions = await this._smartFilterBarService.getConditionFieldSelectedVariants(
                        formItem,
                        condition
                    );
                    control?.setValue(selectedConditions);
                }

                this._setSelectedFilters(this.filterBy.map((filterBy) => filterBy.field));

                const source = this.subject.getDataSource();
                source.dataProvider.setFilters(this.filterBy, this.search);
                this.subject.getSubject().fetch();
            });
    }

    /** Returns current preset configuration. */
    getCurrentPreset(): SmartFilterBarManagedPreset {
        return {
            search: this.search,
            filterBy: this.filterBy
        };
    }

    /**
     * @hidden
     * Callback function when form generator form has been successfully validated and submitted.
     */
    _onFormSubmitted(event: any): void {
        const conditions = this._generateCollectionFilterGroups(event);
        this._applyFiltering(conditions);
    }

    /**
     * @hidden
     * Callback method when form has been created.
     * Populates selected filters array with user-defined default filters.
     */
    _onFormCreated(): void {
        if (this.subject) {
            this._setSelectedFilters([...this.subject.getDefaultFields(), ...this.selectedFilters$()]);
        }

        this._formGenerator.form.valueChanges
            .pipe(debounceTime(50), takeUntilDestroyed(this._destroyRef))
            .subscribe(async () => {
                const conditions = await this.getFormattedConditions();
                this.smartFiltersChanged.emit({ filterBy: conditions, search: this.search, subject: this.subject });

                if (!this.liveUpdate) {
                    return;
                }
                this._applyFiltering(conditions);
            });

        this._formGeneratorReady.next(true);
    }

    /**
     * Toggles Smart Filter Bar filters section.
     */
    toggleFilterBar(): void {
        this.showFilterBar$.update((show) => !show);
    }

    /**
     * Formats raw filters object into array of grouped filters.
     * @returns Array of grouped filters.
     */
    async getFormattedConditions(): Promise<CollectionFilterGroup[]> {
        const formValue = await this._fgService.getFormValue(this._formGenerator.form);
        return this._generateCollectionFilterGroups(formValue);
    }

    /** @hidden */
    private _generateCollectionFilterGroups(value: {
        [key: string]: SmartFilterBarCondition[];
    }): CollectionFilterGroup[] {
        const collectionFilterGroups: CollectionFilterGroup[] = [];

        const columns = this._getSubjectDefinitions();

        Object.entries(value)
            .filter(([, fieldConditions]) => !!fieldConditions)
            .forEach(([fieldName, fieldConditions]) => {
                const column = columns.find((c) => c.name === fieldName) as SmartFilterBarFieldDefinition;
                const filterGroup: CollectionFilterGroup = {
                    filters: [],
                    strategy: column.conditionStrategy,
                    field: column.key
                };
                fieldConditions.forEach((condition) => {
                    filterGroup.filters.push({
                        strategy: condition.operator,
                        field: column.key,
                        value: condition.value,
                        value2: condition.value2,
                        type: column.dataType
                    });
                });

                collectionFilterGroups.push(filterGroup);
            });

        // Remove empty filter objects.
        return collectionFilterGroups.filter((filterGroup) => filterGroup.filters?.length > 0);
    }

    /** @hidden */
    private _setSubject(subject: SmartFilterBarSubjectDirective): void {
        if (!subject) {
            return;
        }

        this._subject = subject;
        this.unsubscribeFromSubject();
        this._listenToSubjectColumns();
    }

    /** @hidden */
    private unsubscribeFromSubject(): void {
        if (!this._subject) {
            return;
        }
        this._subjectSubscriptions.unsubscribe();
    }

    /** @hidden */
    private _listenToSubjectColumns(): void {
        this._subjectSubscriptions = new Subscription();
        this._subjectSubscriptions.add(
            this._subject.fieldsStream.subscribe(async (columns: SmartFilterBarFieldDefinition[]) => {
                await this._generateForm(columns.filter((c) => c.filterable));
            })
        );
    }

    /**
     * @hidden
     * Generates form items to be consumed by form generator component.
     * @param columns columns definition
     */
    private async _generateForm(columns: SmartFilterBarFieldDefinition[]): Promise<void> {
        const items: DynamicFormFieldItem[] = [];
        const columnsNumber = getColumnsNumber(this.filtersColumnLayout ?? '');
        let currentColumn = 1;

        if (columns.length === 0) {
            return;
        }

        columns.forEach((column) => {
            let item: SmartFilterBarDynamicFormFieldItem = this._generateBaseFieldItem(column);

            if (column.required) {
                this.selectedFilters$.update((filters) => {
                    filters.push(column.name);
                    return filters;
                });
            }

            switch (column.filterType) {
                case FilterType.SINGLE:
                case FilterType.CATEGORY:
                    item.guiOptions.additionalData.type = 'select';
                    item.guiOptions.inline = false;
                    break;
                case FilterType.MULTI:
                    item.guiOptions.additionalData.type = 'multi-input';
                    break;
                case FilterType.CUSTOM:
                    item = this._generateCustomFilterFieldItem(column, item);
                    break;
                case FilterType.INPUT:
                default:
                    item = this._generateInputFieldItem(column, item);
                    break;
            }

            item.guiOptions.column = currentColumn;
            currentColumn += 1;

            if (currentColumn > columnsNumber) {
                currentColumn = 1;
            }

            items.push(item);
        });

        this._formItems.set(items);
    }

    /** @hidden */
    private _generateCustomFilterFieldItem(
        column: SmartFilterBarFieldDefinition,
        item: SmartFilterBarDynamicFormFieldItem
    ): SmartFilterBarDynamicFormFieldItem {
        if (!column.customFilterType) {
            return item;
        }
        item.guiOptions.additionalData.type = column.customFilterType;
        item.guiOptions.additionalData = Object.assign(
            item.guiOptions.additionalData,
            this._smartFilterBarService.getCustomFilterConfiguration(column.customFilterType)
        );

        item.type = item.guiOptions.additionalData.rendererComponent
            ? `${item.guiOptions.additionalData.type}-renderer`
            : item.type;
        item.transformer = item.guiOptions.additionalData.valueTransformer;

        return item;
    }

    /**
     * @hidden
     * Generates form item based on data type.
     * @param column
     * @param item
     * @returns
     */
    private _generateInputFieldItem(
        column: SmartFilterBarFieldDefinition,
        item: SmartFilterBarDynamicFormFieldItem
    ): SmartFilterBarDynamicFormFieldItem {
        switch (column.dataType) {
            case FilterableColumnDataType.DATE:
                item.guiOptions.additionalData.type = 'datepicker';
                break;
            case FilterableColumnDataType.NUMBER:
                item.guiOptions.additionalData.controlType = 'number';
                break;
            case FilterableColumnDataType.BOOLEAN:
            case FilterableColumnDataType.STRING:
            default:
                item.guiOptions.additionalData.controlType = 'text';
                break;
        }

        return item;
    }

    /**
     * @hidden
     * Generates base form item object to be consumed by form generator component.
     * @param column column definition
     * @returns base form item object.
     */
    private _generateBaseFieldItem(column: SmartFilterBarFieldDefinition): SmartFilterBarDynamicFormFieldItem {
        return {
            name: column.name,
            message: column.label,
            required: column.required,
            type: SMART_FILTER_BAR_RENDERER_COMPONENT,
            placeholder: ' ',
            validators: column.required ? [Validators.required] : [],
            choices: column.hasOptions ? this._getFilterDefaultOptions(column.key, column.filterType) : undefined,
            transformer: (itemValue) => getSelectItemValue(itemValue),
            guiOptions: {
                additionalData: {
                    type: 'input',
                    dataType: column.dataType,
                    filterType: column.filterType,
                    controlType: 'text',
                    choices: column.hasOptions ? this._getFilterAvailableOptions(column.key) : undefined
                }
            },
            when: () => this.selectedFilters$().includes(column.name)
        } as SmartFilterBarDynamicFormFieldItem;
    }

    /**
     * @hidden
     * Retrieves available options for particular column by using data source method.
     * @param column property name of the data source items.
     * @returns {Observable<SelectItem[]>} Observable with the array of available options.
     */
    private _getFilterAvailableOptions(column: string): () => Observable<SelectItem[]> {
        return () => this._getFieldVariants(column);
    }

    /** @hidden */
    private _getFilterDefaultOptions(column: string, filterType: FilterType): () => Promise<any[]> {
        return async () => {
            const variants = await firstValueFrom(this._getFieldVariants(column).pipe(take(1)));

            const availableDefaultConditions: SmartFilterBarCondition[] = [];

            for (const option of variants) {
                const condition: SmartFilterBarCondition = {
                    value: option.value,
                    operator: 'equalTo'
                };

                condition.displayValue = await this.getDisplayValue(condition, filterType);

                availableDefaultConditions.push(condition);
            }

            return availableDefaultConditions;
        };
    }

    /** @hidden */
    private _getFieldVariants(column: string): Observable<SelectItem[]> {
        return this.subject.getFieldVariants(column).pipe(
            take(1),
            map((data) => data.filter((item, index) => data.findIndex((_item) => _item.value === item.value) === index))
        );
    }

    /** @hidden */
    private _getSubjectDefinitions(): SmartFilterBarFieldDefinition[] {
        return this.subject?.getSubjectFields() || [];
    }

    /**
     * @hidden
     * Sets provided filters directly to the data source.
     * @param filters array of filters.
     */
    private _applyFiltering(filters: CollectionFilterGroup[]): void {
        // Apply outside filtering and force subject to fetch new data.
        const source = this.subject.getDataSource();
        this.filterBy = filters;
        source.dataProvider.setFilters(filters, this.search);
        this.subject.getSubject().fetch();
        const emittedValue: SmartFilterBarManagedPreset = { search: this.search, filterBy: this.filterBy };
        this.smartFiltersApplied.emit({ ...emittedValue, subject: this._subject });

        if (!this._ignorePresetChange) {
            this.presetChanged.emit(emittedValue);
        }
        this._ignorePresetChange = false;
    }

    /** @hidden */
    private _unsubscribeFromSubject(): void {
        this._subjectSubscriptions.unsubscribe();
        this._subjectSubscriptions = new Subscription();
    }

    /** @hidden */
    private _setSelectedFilters(filters: string[]): void {
        this.selectedFilters$.set(filters.filter((f: string, i: number) => filters.indexOf(f) === i));
        this._formGenerator.refreshStepsVisibility();
    }
}
