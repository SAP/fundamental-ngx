import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core/dialog';
import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import {
    ArrayTableDataProvider,
    Resettable,
    RESETTABLE_TOKEN,
    Table,
    TableDataSource,
    TableRowSelectionChangeEvent
} from '@fundamental-ngx/platform/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { SmartFilterBarFieldDefinition } from '../../interfaces/smart-filter-bar-field-definition';
import { SmartFilterSettingsDialogConfig } from '../../smart-filter-bar.component';

export interface ColumnFilterItem {
    label: string;
    active: boolean;
    mandatory: boolean;
    visible: boolean;
    key: string;
}

export enum FILTER_VISIBILITY_CATEGORY {
    ALL = 'All',
    VISIBLE = 'Visible',
    ACTIVE = 'Active',
    VISIBLE_ACTIVE = 'Visible and active',
    MANDATORY = 'Mandatory'
}

@Component({
    selector: 'fdp-smart-filter-settings-dialog',
    templateUrl: './smart-filter-settings-dialog.component.html',
    styleUrls: ['./smart-filter-settings-dialog.component.scss'],
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: SmartFilterSettingsDialogComponent }]
})
export class SmartFilterSettingsDialogComponent implements Resettable, AfterViewInit {
    @ViewChild('table') table: Table;

    _availableColumns: ColumnFilterItem[];
    _activeColumns: string[];

    _filterVisibilityOptions: SelectItem[] = [
        {
            label: FILTER_VISIBILITY_CATEGORY.ALL,
            value: FILTER_VISIBILITY_CATEGORY.ALL
        },
        {
            label: FILTER_VISIBILITY_CATEGORY.VISIBLE,
            value: FILTER_VISIBILITY_CATEGORY.VISIBLE
        },
        {
            label: FILTER_VISIBILITY_CATEGORY.ACTIVE,
            value: FILTER_VISIBILITY_CATEGORY.ACTIVE
        },
        {
            label: FILTER_VISIBILITY_CATEGORY.VISIBLE_ACTIVE,
            value: FILTER_VISIBILITY_CATEGORY.VISIBLE_ACTIVE
        },
        {
            label: FILTER_VISIBILITY_CATEGORY.MANDATORY,
            value: FILTER_VISIBILITY_CATEGORY.MANDATORY
        }
    ];

    source: TableDataSource<ColumnFilterItem>;

    private _selectedFilters: string[] = [];

    constructor(private dialogRef: DialogRef<SmartFilterSettingsDialogConfig, any>) {
        this._availableColumns = this.dialogRef.data.columns
            .filter((c: SmartFilterBarFieldDefinition) => c.filterable)
            .map((c: SmartFilterBarFieldDefinition) => ({
                label: c.label,
                active: !!this.dialogRef.data.filterBy.find((f) => f.field === c.key),
                mandatory: c.mandatoryFilter,
                visible: this.dialogRef.data.selectedFilters.includes(c.key),
                key: c.key
            }));

        this.source = new TableDataSource(new SmartFilterOptionsDataProvider(this._availableColumns));
    }
    reset: () => void;
    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    ngAfterViewInit(): void {
        this.source.open().subscribe((items) => {
            setTimeout(() => {
                items.forEach((column, index) => {
                    if (column.visible) {
                        this.table.toggleSelectableRow(index);
                    }
                });
            });
        });

        // this._availableColumns.forEach((column, index) => {
        //     if (column.visible) {
        //         this.table.toggleSelectableRow(index);
        //     }
        // });
    }

    cancel(): void {
        this.dialogRef.dismiss();
    }

    confirm(): void {
        this.dialogRef.close(this._selectedFilters);
    }

    onRowSelectionChange(event: TableRowSelectionChangeEvent<ColumnFilterItem>): void {
        this._selectedFilters = event.selection.map((c) => c.key);
    }

    onFilterVisibilityChange(event: FdpSelectionChangeEvent): void {
        (this.source.dataProvider as SmartFilterOptionsDataProvider).filter(event.payload);
        this.source.fetch(this.table.getTableState());
    }
}

export class SmartFilterOptionsDataProvider extends ArrayTableDataProvider<ColumnFilterItem> {
    constructor(items: ColumnFilterItem[]) {
        super(items);
    }

    fetch(): Observable<ColumnFilterItem[]> {
        return this.items$.asObservable();
    }

    filter(option: FILTER_VISIBILITY_CATEGORY): void {
        let items: ColumnFilterItem[];

        switch (option) {
            case FILTER_VISIBILITY_CATEGORY.VISIBLE:
                items = this._getVisibleItems();
                break;
            case FILTER_VISIBILITY_CATEGORY.ACTIVE:
                items = this._getActiveItems();
                break;
            case FILTER_VISIBILITY_CATEGORY.VISIBLE_ACTIVE:
                items = this._getVisibleAndActiveItems();
                break;
            case FILTER_VISIBILITY_CATEGORY.MANDATORY:
                items = this._getMandatoryItems();
                break;
            case FILTER_VISIBILITY_CATEGORY.ALL:
            default:
                items = this._getAllItems();
                break;
        }

        this.items$.next(items);
    }

    private _getAllItems(): ColumnFilterItem[] {
        return this.items;
    }

    private _getVisibleItems(): ColumnFilterItem[] {
        return this.items.filter((i) => i.visible);
    }

    private _getActiveItems(): ColumnFilterItem[] {
        return this.items.filter((i) => i.active);
    }

    private _getVisibleAndActiveItems(): ColumnFilterItem[] {
        return this.items.filter((i) => i.visible || i.active);
    }

    private _getMandatoryItems(): ColumnFilterItem[] {
        return this.items.filter((i) => i.mandatory);
    }
}
