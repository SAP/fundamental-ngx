import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    Output,
    Provider,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Validators } from '@angular/forms';

import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { DialogConfig, DialogService } from '@fundamental-ngx/core/dialog';
import {
    CollectionFilter,
    CollectionFilterGroup,
    FilterableColumnDataType,
    FilterType,
    SearchInput
} from '@fundamental-ngx/platform/table';
import {
    DynamicFormFieldItem,
    DynamicFormItem,
    FormGeneratorComponent,
    FormGeneratorService
} from '@fundamental-ngx/platform/form';
import { ColumnLayout, SelectItem } from '@fundamental-ngx/platform/shared';

import { SmartFilterBarSettingsDialogComponent } from './components/smart-filter-bar-settings-dialog/smart-filter-bar-settings-dialog.component';
import { SmartFilterBarSubjectDirective } from './directives/smart-filter-bar-subject.directive';
import { SmartFilterBarFieldDefinition } from './interfaces/smart-filter-bar-field-definition';
import { SmartFilterBarDynamicFormFieldItem } from './interfaces/smart-filter-dynamic-form-item';
import { SmartFilterBarCondition } from './interfaces/smart-filter-bar-condition';
import { SmartFilterSettingsDialogConfig } from './interfaces/smart-filter-bar-settings-dialog-config';
import { SmartFilterBarService } from './smart-filter-bar.service';
import { SMART_FILTER_BAR_RENDERER_COMPONENT } from './constants';
import { SmartFilterBarVisibilityCategoryLabels } from './interfaces/smart-filter-bar-visibility-category';
import { SmartFilterBar } from './smart-filter-bar.class';
import { SmartFilterBarConditionFieldComponent } from './components/smart-filter-bar-condition-field/smart-filter-bar-condition-field.component';
import { getSelectItemValue } from './helpers';
import { SmartFilterBarStrategyLabels } from './interfaces/strategy-labels.type';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

const defaultColumnsLayout = { S: 12, M: 6, L: 4, XL: 3 };

/**
 * Default dialog configuration.
 */
const dialogConfig: DialogConfig = {
    responsivePadding: true,
    verticalPadding: true,
    minWidth: '30rem',
    /** 88px it's the header + footer height */
    bodyMinHeight: 'calc(50vh - 88px)'
};

const smartFilterBarProvider: Provider = {
    provide: SmartFilterBar,
    useExisting: forwardRef(() => SmartFilterBarComponent)
};

export interface SmartFilterChangeObject {
    search: SearchInput | undefined;
    filterBy: CollectionFilter[] | CollectionFilterGroup[];
    subject: SmartFilterBarSubjectDirective;
}

@Component({
    selector: 'fdp-smart-filter-bar',
    templateUrl: './smart-filter-bar.component.html',
    styleUrls: ['./smart-filter-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [smartFilterBarProvider],
    host: {
        class: 'fdp-smart-filter-bar',
        '[class.fdp-smart-filter-bar--transparent]': 'transparent'
    }
})
export class SmartFilterBarComponent implements OnDestroy, SmartFilterBar {
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
     * 'Show filters' button label.
     */
    @Input()
    showFiltersLabel = 'Show filters';

    /**
     * 'Hide filters' button label.
     */
    @Input()
    hideFiltersLabel = 'Hide filters';

    /**
     * 'Filters' button label.
     */
    @Input()
    filtersLabel = 'Filters';

    /**
     * Whether smart filter bar background should be transparent.
     */
    @Input()
    set transparent(value: BooleanInput) {
        this._transparent = coerceBooleanProperty(value);
    }

    get transparent(): boolean {
        return this._transparent;
    }

    /**
     * Condition strategy labels.
     */
    @Input()
    defineStrategyLabels: SmartFilterBarStrategyLabels = {
        contains: 'contains',
        equalTo: 'equal to',
        between: 'between',
        beginsWith: 'starts with',
        endsWith: 'ends with',
        lessThan: 'less than',
        lessThanOrEqualTo: 'less than or equal to',
        greaterThan: 'greater than',
        greaterThanOrEqualTo: 'greater than or equal to',
        after: 'after',
        onOrAfter: 'on or after',
        before: 'before',
        beforeOrOn: 'before or on'
    };

    /**
     * Filters visibility category labels.
     */
    @Input()
    filtersVisibilityCategoryLabels: SmartFilterBarVisibilityCategoryLabels = {
        all: 'All',
        visible: 'Visible',
        active: 'Active',
        visibleAndActive: 'Visible and active',
        mandatory: 'Mandatory'
    };

    /**
     * Columns layout.
     */
    @Input()
    filtersColumnLayout: ColumnLayout = defaultColumnsLayout;

    /**
     * Event emitted when the selected filters have been changed.
     */
    @Output()
    smartFiltersChanged: EventEmitter<SmartFilterChangeObject> = new EventEmitter<SmartFilterChangeObject>();

    /**
     * Calculated array of filters to apply for the subject's data source.
     */
    filterBy: CollectionFilter[] | CollectionFilterGroup[] = [];
    /**
     * Search field value to apply for the subject's data source.
     */
    search: SearchInput | undefined;
    /**
     * @hidden
     * Form generator component instance.
     */
    @ViewChild(FormGeneratorComponent) _formGenerator!: FormGeneratorComponent;
    /** @hidden */
    _formItems: DynamicFormItem[] = [];
    /** @hidden */
    _selectedFilters: string[] = [];
    /** @hidden */
    _showFilterBar = true;
    /** @hidden */
    private _subscriptions = new Subscription();
    /** @hidden */
    private _subjectSubscriptions = new Subscription();

    /** @hidden */
    private _transparent = false;

    /** @hidden */
    constructor(
        private _dialogService: DialogService,
        private _cdr: ChangeDetectorRef,
        private _smartFilterBarService: SmartFilterBarService,
        private _fgService: FormGeneratorService
    ) {
        this._fgService.addComponent(SmartFilterBarConditionFieldComponent, [SMART_FILTER_BAR_RENDERER_COMPONENT]);
    }

    /** @hidden */
    private _subject!: SmartFilterBarSubjectDirective;

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._unsubscribeFromSubject();
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
            selectedFilters: this._selectedFilters,
            visibilityCategories: this.filtersVisibilityCategoryLabels
        };

        const dialogRef = this._dialogService.open(SmartFilterBarSettingsDialogComponent, {
            ...dialogConfig,
            responsivePadding: false,
            verticalPadding: false,
            width: '50rem',
            data: dialogData
        });

        dialogRef.afterClosed.pipe(take(1)).subscribe(
            (selectedFilters: string[]) => {
                this._setSelectedFilters(selectedFilters);
            }
        );
    }

    /** @hidden */
    _onSearchInputChange(event: SearchInput): void {
        this.search = event;
    }

    /**
     * Submits filters and search form.
     */
    submitForm(): void {
        this._formGenerator.submit();
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
            this._setSelectedFilters([...this.subject.getDefaultFields(), ...this._selectedFilters]);
        }
    }

    /**
     * @hidden
     */
    _toggleFilterBar(): void {
        this._showFilterBar = !this._showFilterBar;
        this._cdr.markForCheck();
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

        return collectionFilterGroups;
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
    }

    /** @hidden */
    private _listenToSubjectColumns(): void {
        this._subjectSubscriptions.add(
            this._subject.fieldsStream.subscribe(async (columns: SmartFilterBarFieldDefinition[]) => {
                setTimeout(async () => {
                    await this._generateForm(columns.filter((c) => c.filterable));
                });
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

        if (columns.length === 0) {
            return;
        }

        columns.forEach((column) => {
            let item: SmartFilterBarDynamicFormFieldItem = this._generateBaseFieldItem(column);

            if (column.required) {
                this._selectedFilters.push(column.name);
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

            items.push(item);
        });

        this._formItems = items;

        this._cdr.detectChanges();
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
                contentDensity: 'compact',
                additionalData: {
                    type: 'input',
                    dataType: column.dataType,
                    filterType: column.filterType,
                    controlType: 'text',
                    choices: column.hasOptions ? this._getFilterAvailableOptions(column.key) : undefined
                }
            },
            when: () => this._selectedFilters.includes(column.name)
        };
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
        this.smartFiltersChanged.emit({ search: this.search, filterBy: this.filterBy, subject: this._subject });
    }

    /** @hidden */
    private _unsubscribeFromSubject(): void {
        this._subjectSubscriptions.unsubscribe();
        this._subjectSubscriptions = new Subscription();
    }

    /** @hidden */
    private _setSelectedFilters(filters: string[]): void {
        this._selectedFilters = filters.filter((f: string, i: number) => filters.indexOf(f) === i);
        this._formGenerator.refreshStepsVisibility();
    }
}
