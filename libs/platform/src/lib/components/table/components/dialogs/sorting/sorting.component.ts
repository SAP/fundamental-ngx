import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { SortDirection } from '../../../enums';
import { Resettable, RESETTABLE_TOKEN } from '../reset-button/reset-button.component';

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

@Component({
    templateUrl: './sorting.component.html',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => SortingComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingComponent implements Resettable {
    initialDirection: SortDirection = SortDirection.ASC;

    initialField: string = null;

    direction: SortDirection;

    field: string;

    readonly SORT_DIRECTION = SortDirection;

    readonly columns: SortDialogColumn[] = [];

    readonly _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
        const data: SortDialogData = this.dialogRef.data;

        this.initialDirection = data.direction || this.initialDirection;
        this.initialField = data.field || this.initialField;
        this.columns = data.columns || [];

        this.direction = this.initialDirection;
        this.field = this.initialField;
    }

    reset(): void {
        this.direction = this.initialDirection;
        this.field = this.initialField;
        this._isResetAvailableSubject$.next(false);
    }

    cancel(): void {
        this.dialogRef.close(null);
    }

    confirm(): void {
        const result: SortDialogResultData = { direction: this.direction, field: this.field };
        this.dialogRef.close(result);
    }

    _sortDirectionChange(direction: SortDirection): void {
        this.direction = direction;
        this._omModelChange();
    }

    _sortFieldChange(field: string): void {
        this.field = field;
        this._omModelChange();
    }

    _omModelChange(): void {
        // Use this coercion cause fd-radio-button triggers extra ngModelChange events on initial phase
        const isInitialDiffers = this.initialDirection !== this.direction || this.initialField !== this.field;
        this._isResetAvailableSubject$.next(isInitialDiffers);
    }
}
