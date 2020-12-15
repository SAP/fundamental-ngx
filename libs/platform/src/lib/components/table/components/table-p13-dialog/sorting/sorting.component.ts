import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { CollectionSort } from '../../../interfaces';
import { SortDirection } from '../../../enums';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';

export interface SortDialogColumn {
    label: string;
    key: string;
}

export interface SortDialogData {
    collectionSort: CollectionSort[];
    columns: SortDialogColumn[];
}

export interface SortDialogResultData {
    collectionSort: CollectionSort[];
}

const NOT_SORTED_OPTION_VALUE = null;

@Component({
    templateUrl: './sorting.component.html',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: SortingComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingComponent implements Resettable {
    /** Initial sortBy collection */
    initialCollectionSort: CollectionSort[];

    /** Active sortBy collection */
    collectionSort: CollectionSort[];

    /** Current selected direction */
    direction: SortDirection;

    /** Current selected field */
    field: string;

    /** Table columns */
    readonly columns: SortDialogColumn[] = [];

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    readonly NOT_SORTED_OPTION_VALUE = NOT_SORTED_OPTION_VALUE;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
        const {columns, collectionSort}: SortDialogData = this.dialogRef.data;

        this.initialCollectionSort = this._copySortList(collectionSort);
        this.columns = columns || [];

        this.collectionSort = this._copySortList(this.initialCollectionSort);
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.collectionSort = this._copySortList(this.initialCollectionSort);
        this._isResetAvailableSubject$.next(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const result: SortDialogResultData = { collectionSort: this.collectionSort };
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
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    private _copySortList(list: CollectionSort[] | null): CollectionSort[] {
        return (list || []).map(v => ({...v}));
    }
}
