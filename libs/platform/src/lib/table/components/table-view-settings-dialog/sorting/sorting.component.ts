import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { SortDirection } from '../../../enums/sort-direction.enum';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';
import { TableDialogCommonData } from '../../../models/table-dialog-common-data.model';

export interface SettingsSortDialogColumn {
    label: string;
    key: string;
}

export interface SettingsSortDialogData extends TableDialogCommonData {
    direction: SortDirection;
    field: string | null;
    columns: SettingsSortDialogColumn[];
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingComponent implements Resettable {
    /** Current selected direction */
    direction: SortDirection;

    /** Current selected field */
    field: string | null;

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
    constructor(public dialogRef: DialogRef<SettingsSortDialogData>) {
        const data = this.dialogRef.data;

        this.columns = data.columns || [];

        this.direction = data.direction ?? INITIAL_DIRECTION;
        this.field = data.field ?? NOT_SORTED_OPTION_VALUE;
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.direction = INITIAL_DIRECTION;
        this.field = NOT_SORTED_OPTION_VALUE;
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
        const isInitialDiffers = this.direction !== INITIAL_DIRECTION || this.field !== NOT_SORTED_OPTION_VALUE;
        this._isResetAvailableSubject$.next(isInitialDiffers);
    }
}
