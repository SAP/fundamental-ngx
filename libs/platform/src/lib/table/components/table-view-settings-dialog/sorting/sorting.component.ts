import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import equal from 'fast-deep-equal/es6';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { CollectionSort, SortDirection, Table, TableDialogCommonData } from '@fundamental-ngx/platform/table-helpers';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';

export interface SettingsSortDialogColumn {
    label: string;
    key: string;
}

export interface SettingsSortDialogData extends TableDialogCommonData {
    direction: SortDirection;
    field: string | null;
    columns: SettingsSortDialogColumn[];
    allowDisablingSorting: boolean;
}

export interface SettingsSortDialogResultData {
    field: string | null;
    direction: SortDirection;
}

const NOT_SORTED_OPTION_VALUE = null;
const INITIAL_DIRECTION = SortDirection.ASC;

@Component({
    templateUrl: './sorting.component.html',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => SortingComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SortingComponent implements Resettable {
    /** Current selected direction */
    direction: SortDirection;

    /** Current selected field */
    field: string | null;

    /** Whether to allow selecting '(Not sorted)' option in sorting dialog. */
    allowDisablingSorting: boolean;

    /** Table columns */
    readonly columns: SettingsSortDialogColumn[] = [];

    /** @hidden */
    readonly _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    readonly NOT_SORTED_OPTION_VALUE = NOT_SORTED_OPTION_VALUE;

    /** @hidden */
    private _initialSorting: CollectionSort;

    /** @hidden */
    constructor(public dialogRef: DialogRef<SettingsSortDialogData>, private _table: Table) {
        const data = this.dialogRef.data;

        this.columns = data.columns || [];

        this.direction = data.direction ?? INITIAL_DIRECTION;
        this.field = data.field ?? NOT_SORTED_OPTION_VALUE;
        this.allowDisablingSorting = data.allowDisablingSorting;

        this._setInitialSorting();

        this._compareInitialSorting();
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.direction = this._initialSorting.direction;
        this.field = this._initialSorting.field;
        this._isResetAvailableSubject$.next(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const result: SettingsSortDialogResultData = { direction: this.direction, field: this.field };
        this.dialogRef.close(result);
    }

    /** @hidden */
    _sortDirectionChange(direction: SortDirection): void {
        this.direction = direction;
        this._onModelChange();
    }

    /** @hidden */
    _sortFieldChange(field: string): void {
        this.field = field;
        this._onModelChange();
    }

    /** @hidden */
    _onModelChange(): void {
        // Use this coercion cause fd-radio-button triggers extra ngModelChange events on initial phase
        const isInitialDiffers =
            this.direction !== this._initialSorting.direction || this.field !== this._initialSorting.field;
        this._isResetAvailableSubject$.next(isInitialDiffers);
    }

    /**
     * @hidden
     * Since view settings dialog supports only one sorting, get the first one if available.
     */
    private _setInitialSorting(): void {
        const initialSorting = (this._table.initialState?.initialSortBy || [])[0];

        this._initialSorting = {
            field: initialSorting?.field ?? NOT_SORTED_OPTION_VALUE,
            direction: initialSorting?.direction ?? INITIAL_DIRECTION
        };
    }

    /**
     * @hidden
     * Compare initial sorting with selected one and set reset button if needed.
     */
    private _compareInitialSorting(): void {
        const appliedSorting: CollectionSort = {
            field: this.field,
            direction: this.direction
        };

        if (equal(this._initialSorting, appliedSorting)) {
            return;
        }

        this._isResetAvailableSubject$.next(true);
    }
}
