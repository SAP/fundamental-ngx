import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { getUniqueListValuesByKey } from '../../../utils';
import { CollectionSort } from '../../../interfaces/collection-sort.interface';
import { SortDirection } from '../../../enums/sort-direction.enum';
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

export interface SortRule {
    columnKey: string;
    direction: SortDirection;
}

const NOT_SELECTED_OPTION_VALUE = null;

class ValidatedSortRule implements SortRule {
    get isValid(): boolean {
        return this.columnKey !== NOT_SELECTED_OPTION_VALUE && this.direction !== NOT_SELECTED_OPTION_VALUE;
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
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: P13SortingDialogComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class P13SortingDialogComponent implements Resettable {
    /** Table columns available for sorting */
    readonly columns: SortDialogColumn[] = [];

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** Initial sortBy collection */
    readonly initialCollectionSort: CollectionSort[];

    /** Sort rules to render */
    rules: ValidatedSortRule[] = [];

    /** @hidden */
    constructor(private dialogRef: DialogRef, private cdr: ChangeDetectorRef) {
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
        const collectionSort = this._getCollectionSortFromSortRules(this._getUniqueRules(this.rules));
        const result: SortDialogResultData = { collectionSort: collectionSort };
        this.dialogRef.close(result);
    }

    /** @hidden */
    _removeRule(rule: ValidatedSortRule): void {
        this.rules = this.rules.filter((_rule) => _rule !== rule);

        // Keep at least one item in the list
        if (this.rules.length === 0) {
            this.rules.push(new ValidatedSortRule());
        }

        this._onModelChange();
    }

    /** @hidden */
    _addNew(index: number): void {
        this.rules.splice(index + 1, 0, new ValidatedSortRule());
    }

    /** @hidden */
    _onRuleColumnKeyChange(rule: ValidatedSortRule, columnKey: string): void {
        rule.columnKey = columnKey;
        this._onModelChange();
        this.cdr.detectChanges();
    }

    /** @hidden */
    _onRuleDirectionChange(rule: ValidatedSortRule, direction: SortDirection): void {
        rule.direction = direction;
        this._onModelChange();
    }

    /** @hidden */
    _onModelChange(): void {
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    _trackByColumnKey(index: number, rule: ValidatedSortRule): string {
        return rule.columnKey;
    }

    /** @hidden */
    private _initiateRules(): void {
        this.rules = this._createRules(this.initialCollectionSort);

        // Keep at least one item in the list
        if (this.rules.length === 0) {
            this.rules.push(new ValidatedSortRule());
        }
    }

    /** @hidden */
    private _createRules(collectionSort: CollectionSort[] = []): ValidatedSortRule[] {
        return collectionSort.map(({ field, direction }): ValidatedSortRule => new ValidatedSortRule(field, direction));
    }

    /** @hidden */
    private _getCollectionSortFromSortRules(rules = this.rules): CollectionSort[] {
        return rules.filter(this._isRuleValid).map(
            ({ columnKey, direction }): CollectionSort => ({
                field: columnKey,
                direction: direction
            })
        );
    }

    /** @hidden */
    private _getUniqueRules(rules: ValidatedSortRule[]): ValidatedSortRule[] {
        return getUniqueListValuesByKey(rules, 'columnKey');
    }

    /** @hidden */
    private _isRuleValid = (rule: ValidatedSortRule): boolean => rule?.isValid;
}
