import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { asyncScheduler, BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { observeOn, takeUntil } from 'rxjs/operators';

import { DialogRef } from '@fundamental-ngx/core/dialog';
import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import {
    Resettable,
    RESETTABLE_TOKEN,
    Table,
    TableDataSource,
    TableRowSelectionChangeEvent
} from '@fundamental-ngx/platform/table';

import { SmartFilterBarFieldDefinition } from '../../interfaces/smart-filter-bar-field-definition';
import { SmartFilterSettingsDialogConfig } from '../../interfaces/smart-filter-bar-settings-dialog-config';
import { FieldFilterItem } from '../../interfaces/smart-filter-bar-field-filter-item';
import { SmartFilterBarOptionsDataProvider } from './data-provider';

@Component({
    selector: 'fdp-smart-filter-bar-settings-dialog',
    templateUrl: './smart-filter-bar-settings-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: SmartFilterBarSettingsDialogComponent }]
})
export class SmartFilterBarSettingsDialogComponent implements Resettable, AfterViewInit, OnDestroy {
    /**
     * Table instance
     */
    @ViewChild('table') table!: Table;

    /**
     * Table data source.
     */
    source!: TableDataSource<FieldFilterItem>;

    /** @hidden */
    _availableFields!: FieldFilterItem[];

    /** @hidden */
    _filterVisibilityOptions: SelectItem[] = [];

    /** @hidden */
    private _sourceSubscription!: Subscription;

    /** @hidden */
    private _selectedFilters: string[] = [];

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    constructor(private _dialogRef: DialogRef<SmartFilterSettingsDialogConfig, string[]>) {
        this.transformVisibilityLabels();
        this.setInitialTableState();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.setSelectedFilters();
    }

    /**
     * Transforms visibility options into appropriate select item object.
     */
    transformVisibilityLabels(): void {
        for (const [selectValue, selectLabel] of Object.entries(this._dialogRef.data.visibilityCategories)) {
            this._filterVisibilityOptions.push({
                label: selectLabel,
                value: selectValue
            });
        }
    }

    /**
     * Checks the checkbox in the table row if the field is selected.
     */
    setSelectedFilters(): void {
        this._sourceSubscription?.unsubscribe();
        this._sourceSubscription = this.source
            .open()
            .pipe(observeOn(asyncScheduler), takeUntil(this._onDestroy$))
            .subscribe((items) => {
                items.forEach((field, index) => {
                    if (field.visible) {
                        this.table.toggleSelectableRow(index);
                    }
                });
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * Resets filters selection.
     */
    reset(): void {
        this.setInitialTableState();
        this.setSelectedFilters();
    }

    /**
     * Sets initial state of the table.
     */
    setInitialTableState(): void {
        this._availableFields = this._dialogRef.data.fields
            .filter((c: SmartFilterBarFieldDefinition) => c.filterable)
            .map((c: SmartFilterBarFieldDefinition) => ({
                label: c.label,
                active: !!this._dialogRef.data.filterBy.find((f) => f.field === c.name),
                mandatory: c.required,
                visible: this._dialogRef.data.selectedFilters.includes(c.name),
                key: c.key,
                name: c.name
            }));

        this.source = new TableDataSource(new SmartFilterBarOptionsDataProvider(this._availableFields));
    }

    /** @hidden */
    _cancel(): void {
        this._dialogRef.dismiss();
    }

    /** @hidden */
    _confirm(): void {
        this._dialogRef.close(this._selectedFilters);
    }

    /** @hidden */
    _onRowSelectionChange(event: TableRowSelectionChangeEvent<FieldFilterItem>): void {
        this._selectedFilters = event.selection.map((c) => c.name);
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    _onFilterVisibilityChange(event: FdpSelectionChangeEvent): void {
        if (!this.table) {
            return;
        }
        (this.source.dataProvider as SmartFilterBarOptionsDataProvider).filter(event.payload);
        this.source.fetch(this.table.getTableState());
    }
}
