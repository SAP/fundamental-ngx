import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { DialogConfig, DialogService } from '@fundamental-ngx/core/dialog';
import { CollectionFilter, FilterableColumnDataType, FilterType, SearchInput } from '@fundamental-ngx/platform/table';
import { DynamicFormFieldItem, DynamicFormItem, FormGeneratorComponent } from '@fundamental-ngx/platform/form';
import { isSelectItem, SelectItem } from '@fundamental-ngx/platform/shared';

import { SmartFilterSettingsDialogComponent } from './components/smart-filter-settings-dialog/smart-filter-settings-dialog.component';
import { SmartFilterBarSubjectDirective } from './directives/smart-filter-bar-subject.directive';
import { SmartFilterBarFieldDefinition } from './interfaces/smart-filter-bar-field-definition';

const dialogConfig: DialogConfig = {
    responsivePadding: true,
    verticalPadding: true,
    minWidth: '30rem',
    /** 88px it's the header + footer height */
    bodyMinHeight: 'calc(50vh - 88px)'
};

export interface SmartFilterSettingsDialogConfig {
    columns: SmartFilterBarFieldDefinition[];
    filterBy: CollectionFilter[];
    selectedFilters: string[];
}

@Component({
    selector: 'fdp-smart-filter-bar',
    templateUrl: './smart-filter-bar.component.html',
    styleUrls: ['./smart-filter-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartFilterBarComponent implements OnDestroy {
    @Input()
    set subject(value: SmartFilterBarSubjectDirective) {
        this._setSubject(value);
    }

    get subject(): SmartFilterBarSubjectDirective {
        return this._subject;
    }

    @Input()
    presets: any[];

    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    _subject: SmartFilterBarSubjectDirective;

    /** @hidden */
    _formItems: DynamicFormItem[] = [];

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _subjectSubscriptions = new Subscription();

    /** @hidden */
    _selectedFilters: string[] = [];

    /** @hidden */
    _showFilterBar = true;

    filterBy: CollectionFilter[] = [];

    search: SearchInput;

    /** @hidden */
    constructor(private _dialogService: DialogService, private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._unsubscribeFromSubject();
    }

    /** Open Filtering Settings Dialog */
    showFilteringSettings(): void {
        const columns = this._getSubjectDefinitions();
        const dialogData: SmartFilterSettingsDialogConfig = {
            columns: columns,
            filterBy: this.filterBy,
            selectedFilters: this._selectedFilters
        };

        const dialogRef = this._dialogService.open(SmartFilterSettingsDialogComponent, {
            ...dialogConfig,
            responsivePadding: false,
            verticalPadding: false,
            width: '50rem',
            data: dialogData
        });

        dialogRef.afterClosed.subscribe((selectedFilters) => {
            this._selectedFilters = selectedFilters;
            this.formGenerator.refreshStepsVisibility();
        });
    }

    onSearchInputChange(event: SearchInput): void {
        this.search = event;
    }

    submitForm(): void {
        this.formGenerator.submit();
    }

    onFormSubmitted(event: any): void {
        const conditions = this._generateTableFilteringConditions(event);
        this._applyFiltering(conditions);
    }

    toggleFilterBar(): void {
        this._showFilterBar = !this._showFilterBar;
    }

    /** @hidden */
    private _generateTableFilteringConditions(value: { [key: string]: any }): CollectionFilter[] {
        const collectionFilters: CollectionFilter[] = [];

        const columns = this._getSubjectDefinitions();

        Object.entries(value)
            .filter(([_, fieldValue]) => !!fieldValue)
            .forEach(([fieldName, fieldValue]) => {
                if (isSelectItem(fieldValue.value)) {
                    fieldValue = fieldValue.map((f: any) => f.value);
                }

                collectionFilters.push({
                    strategy: 'contains',
                    field: fieldName,
                    value: fieldValue,
                    type: columns.find((c) => c.key === fieldName)?.dataType
                });
            });

        return collectionFilters;
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
            this._subject.columnsStream.subscribe(async (columns: SmartFilterBarFieldDefinition[]) => {
                setTimeout(async () => {
                    await this._generateForm(columns.filter((c) => c.filterable));
                });
            })
        );
    }

    /** @hidden */
    private async _generateForm(columns: SmartFilterBarFieldDefinition[]): Promise<void> {
        const items: DynamicFormFieldItem[] = [];

        if (columns.length === 0) {
            return;
        }

        columns.forEach((column) => {
            let item: DynamicFormFieldItem = this._getBaseFieldItem(column);

            if (column.mandatoryFilter) {
                this._selectedFilters.push(column.key);
            }

            switch (column.filterType) {
                case FilterType.SINGLE:
                    item.type = 'select';
                    item.choices = this._getColumnVariants(column.key);
                    item.guiOptions.inline = false;
                    break;
                case FilterType.MULTI:
                    item.type = 'multi-combobox';
                    item.choices = this._getColumnVariants(column.key);
                    item.transformer = (value: SelectItem[]) => (value ? value.map((i) => i.value) : value);
                    break;
                case FilterType.CATEGORY:
                    item.type = 'select';
                    item.choices = this._getColumnVariants(column.key);
                    break;
                case FilterType.CUSTOM:
                    item.type = column.customFilterType;
                    item.choices = this._getColumnVariants(column.key);
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
    private _generateInputFieldItem(column: SmartFilterBarFieldDefinition, item: DynamicFormFieldItem) {
        switch (column.dataType) {
            case FilterableColumnDataType.DATE:
                item.type = 'datepicker';
                break;
            case FilterableColumnDataType.NUMBER:
                item.controlType = 'number';
                break;
            case FilterableColumnDataType.BOOLEAN:
            case FilterableColumnDataType.STRING:
            default:
                item.controlType = 'text';
                break;
        }

        return item;
    }

    /** @hidden */
    private _getBaseFieldItem(column: SmartFilterBarFieldDefinition): DynamicFormFieldItem {
        return {
            name: column.key,
            message: column.label,
            required: column.mandatoryFilter,
            type: 'input',
            guiOptions: {
                contentDensity: 'compact'
            },
            when: () => this._selectedFilters.includes(column.key)
        };
    }

    /** @hidden */
    private _getColumnVariants(column: string): () => Observable<SelectItem[]> {
        return () =>
            this.subject.getFieldVariants(column).pipe(
                take(1),
                map((data) =>
                    data.filter((item, index) => data.findIndex((_item) => _item.value === item.value) === index)
                )
            );
    }

    /** @hidden */
    private _getSubjectDefinitions(): SmartFilterBarFieldDefinition[] {
        return this.subject?.getSubjectFields() || [];
    }

    /** @hidden */
    private _applyFiltering(filters: CollectionFilter[]): void {
        // Apply outside filtering and force table to fetch new data.
        const source = this.subject.getDataSource();
        this.filterBy = filters;
        source.dataProvider.setFilters(filters, this.search);
        source.fetch(this.subject.getState());
    }

    /** @hidden */
    private _unsubscribeFromSubject(): void {
        this._subjectSubscriptions.unsubscribe();
        this._subjectSubscriptions = new Subscription();
    }
}
