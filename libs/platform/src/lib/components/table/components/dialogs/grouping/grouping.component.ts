import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { SortDirection } from '../../../enums';
import { Resettable, RESETTABLE_TOKEN } from '../reset-button/reset-button.component';

export interface GroupDialogColumn {
    label: string;
    key: string;
}

export interface GroupDialogData {
    direction: SortDirection;
    field: string;
    columns: GroupDialogColumn[];
}

export interface GroupDialogResultData {
    field: string;
    direction: SortDirection;
}

const NOT_GROUPED_OPTION_VALUE = null;

@Component({
    templateUrl: './grouping.component.html',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => GroupingComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupingComponent implements Resettable {
    /** Initially active direction */
    initialDirection: SortDirection = SortDirection.ASC;

    /** Initially active field */
    initialField: string = null;

    /** Current selected direction */
    direction: SortDirection;

    /** Current selected field */
    field: string;

    /** Table columns */
    readonly columns: GroupDialogColumn[] = [];

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /** Indicates if reset command is active */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** Not Grouped Option model value */
    readonly NOT_GROUPED_OPTION_VALUE = NOT_GROUPED_OPTION_VALUE;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
        const data: GroupDialogData = this.dialogRef.data;

        this.initialDirection = data.direction || this.initialDirection;
        this.initialField = data.field || this.initialField;
        this.columns = data.columns || [];

        this.direction = this.initialDirection;
        this.field = this.initialField;
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.direction = this.initialDirection;
        this.field = this.initialField;
        this._isResetAvailableSubject$.next(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const result: GroupDialogResultData = { field: this.field, direction: this.direction };
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
        const isInitialDiffers = this.initialDirection !== this.direction || this.initialField !== this.field;
        this._isResetAvailableSubject$.next(isInitialDiffers);
    }
}
