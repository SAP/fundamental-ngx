import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { SortDirection } from '../../../enums/sort-direction.enum';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';

export interface SortDialogColumn {
    label: string;
    key: string;
}

export interface SortDialogData {
    direction: SortDirection;
    field: string;
    columns: SortDialogColumn[];
}

export interface SortDialogResultData {
    field: string;
    direction: SortDirection;
}

const NOT_SORTED_OPTION_VALUE = null;

@Component({
    templateUrl: './sorting.component.html',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => SortingComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingComponent implements Resettable {
    /** Initially active direction */
    initialDirection: SortDirection = SortDirection.ASC;

    /** Initially active field. Used for restoring */
    initialField: string = NOT_SORTED_OPTION_VALUE;

    /** Current selected direction */
    direction: SortDirection;

    /** Current selected field */
    field: string;

    /** Table columns */
    readonly columns: SortDialogColumn[] = [];

    /** @hidden */
    readonly _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    readonly NOT_SORTED_OPTION_VALUE = NOT_SORTED_OPTION_VALUE;

    /** @hidden */
    constructor(public dialogRef: DialogRef) {
        const data: SortDialogData = this.dialogRef.data;

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
        const result: SortDialogResultData = { direction: this.direction, field: this.field };
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
        const isInitialDiffers = this.initialDirection !== this.direction || this.initialField !== this.field;
        this._isResetAvailableSubject$.next(isInitialDiffers);
    }
}
