import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
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

const NOT_SELECTED_OPTION_VALUE = null;

class SortRule {
    /** Indicates if rule fulfilled properly */
    get isEmpty(): boolean {
        return this.columnKey === NOT_SELECTED_OPTION_VALUE || this.direction === NOT_SELECTED_OPTION_VALUE;
    }

    constructor(
        /** Column key the rule belongs to */
        public columnKey: string = NOT_SELECTED_OPTION_VALUE,
        /** Sort direction */
        public direction: SortDirection = SortDirection.ASC
    ) {}
}

@Component({
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: P13SortingComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class P13SortingComponent implements Resettable {
    /** Table columns available for sorting */
    readonly columns: SortDialogColumn[] = [];

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** Initial sortBy collection */
    initialCollectionSort: CollectionSort[];

    /** Sort rules to render */
    rules: SortRule[] = [];

    /** Columns available for selection in dropdown */
    availableColumns: SortDialogColumn[] = [];

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
        const { columns, collectionSort }: SortDialogData = this.dialogRef.data;

        this.initialCollectionSort = [...collectionSort];

        this.columns = columns || [];

        this._initiateRules();
    }

    /** Reset changes to the initial state */
    reset(): void {
        this._initiateRules();
        this._isResetAvailableSubject$.next(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const collectionSort = this._getCollectionSortFromSortRules(this._getUniqueSortRules(this.rules));
        const result: SortDialogResultData = { collectionSort: collectionSort };
        this.dialogRef.close(result);
    }

    /** @hidden */
    _onModelChange(): void {
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    _removeRule(rule: SortRule): void {
        this.rules = this.rules.filter((_rule) => _rule !== rule);

        // Keep at least one item in the least
        if (this.rules.length === 0) {
            this.rules.push(new SortRule());
        }

        this._onModelChange();
    }

    /** @hidden */
    _addNew(index: number): void {
        this.rules.splice(index + 1, 0, new SortRule());
    }

    /** @hidden */
    _onRuleColumnKeyChange(rule: SortRule, columnKey: string): void {
        rule.columnKey = columnKey;
        this._onModelChange();
    }

    /** @hidden */
    _onRuleDirectionChange(rule: SortRule, direction: SortDirection): void {
        rule.direction = direction;
        this._onModelChange();
    }

    /** @hidden */
    private _initiateRules(): void {
        this.rules = this._createSortRules(this.initialCollectionSort);

        // Keep at least one item in the least
        if (this.rules.length === 0) {
            this.rules.push(new SortRule());
        }
    }

    /** @hidden */
    private _createSortRules(collectionSort: CollectionSort[] = []): SortRule[] {
        return collectionSort.map(({ field, direction }): SortRule => new SortRule(field, direction));
    }

    /** @hidden */
    private _getCollectionSortFromSortRules(rules = this.rules): CollectionSort[] {
        return rules.filter(this._isSortRuleValid).map(
            ({ columnKey, direction }): CollectionSort => ({
                field: columnKey,
                direction: direction
            })
        );
    }

    /** @hidden */
    private _getUniqueSortRules(rules: SortRule[]): SortRule[] {
        return Array.from(
            rules
                .reduce((map, rule) => {
                    // In order to keep right order need to delete previous value
                    map.delete(rule.columnKey);
                    map.set(rule.columnKey, rule);
                    return map;
                }, new Map<string, SortRule>())
                .values()
        );
    }

    /** @hidden */
    private _isSortRuleValid = (rule: SortRule): boolean => !rule?.isEmpty;
}
