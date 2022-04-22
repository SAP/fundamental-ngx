import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { SortDirection } from '../../../enums/sort-direction.enum';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';
import { TableDialogCommonData } from '../../../models/table-dialog-common-data.model';

export interface SettingsGroupDialogColumn {
    label: string;
    key: string;
}

export interface SettingsGroupDialogData extends TableDialogCommonData {
    direction: SortDirection;
    field: string;
    columns: SettingsGroupDialogColumn[];
}

export interface SettingsGroupDialogResultData {
    field: string | null;
    direction: SortDirection;
}

const NOT_GROUPED_OPTION_VALUE = null;
const INITIAL_DIRECTION = SortDirection.ASC;

@Component({
    templateUrl: './grouping.component.html',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => GroupingComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupingComponent implements Resettable {
    /** Current selected direction */
    direction: SortDirection;

    /** Current selected field */
    field: string | null = null;

    /** Table columns */
    readonly columns: SettingsGroupDialogColumn[] = [];

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /** Indicates if reset command is active */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** Not Grouped Option model value */
    readonly NOT_GROUPED_OPTION_VALUE = NOT_GROUPED_OPTION_VALUE;

    /** @hidden */
    constructor(public dialogRef: DialogRef<SettingsGroupDialogData>) {
        const data = this.dialogRef.data;

        this.columns = data.columns || [];

        this.direction = data.direction ?? INITIAL_DIRECTION;
        this.field = data.field ?? NOT_GROUPED_OPTION_VALUE;
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.direction = INITIAL_DIRECTION;
        this.field = NOT_GROUPED_OPTION_VALUE;
        this._isResetAvailableSubject$.next(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const result: SettingsGroupDialogResultData = { field: this.field, direction: this.direction };
        this.dialogRef.close(result);
    }

    /** @hidden */
    _groupOrderChange(direction: SortDirection): void {
        this.direction = direction;
        this._onModelChange();
    }

    /** @hidden */
    _groupFieldChange(field: string): void {
        this.field = field;
        this._onModelChange();
    }

    /** @hidden */
    _onModelChange(): void {
        // Use this coercion cause fd-radio-button triggers extra ngModelChange events on initial phase
        const isInitialDiffers = this.direction !== INITIAL_DIRECTION || this.field !== NOT_GROUPED_OPTION_VALUE;
        this._isResetAvailableSubject$.next(isInitialDiffers);
    }
}
