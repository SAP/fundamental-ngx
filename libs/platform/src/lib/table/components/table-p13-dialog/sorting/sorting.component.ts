import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Pipe,
    PipeTransform,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { getUniqueListValuesByKey } from '../../../utils';
import { CollectionSort } from '../../../interfaces/collection-sort.interface';
import { SortDirection } from '../../../enums/sort-direction.enum';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';
import { TableDialogCommonData } from '../../../models/table-dialog-common-data.model';

export interface SortDialogColumn {
    label: string;
    key: string;
}

export interface SortDialogData extends TableDialogCommonData {
    collectionSort: CollectionSort[];
    columns: SortDialogColumn[];
}

export interface SortDialogResultData {
    collectionSort: CollectionSort[];
}

export interface SortRule {
    columnKey: string | null;
    direction: SortDirection;
}

const NOT_SELECTED_OPTION_VALUE = null;

class ValidatedSortRule implements SortRule {
    get isValid(): boolean {
        return this.columnKey !== NOT_SELECTED_OPTION_VALUE && this.direction !== NOT_SELECTED_OPTION_VALUE;
    }

    constructor(
        /** Column key the rule belongs to */
        public columnKey: string | null = NOT_SELECTED_OPTION_VALUE,
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

    /** Sort rules to render */
    rules: ValidatedSortRule[] = [];

    /** @hidden */
    constructor(public dialogRef: DialogRef<SortDialogData>, private cdr: ChangeDetectorRef) {
        const { columns, collectionSort } = this.dialogRef.data;

        this.columns = columns || [];

        this._initiateRules(collectionSort);
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
        const result: SortDialogResultData = { collectionSort };
        this.dialogRef.close(result);
    }

    /** @hidden */
    _removeRule(rule: ValidatedSortRule): void {
        this.rules = this.rules.filter((_rule) => _rule !== rule);

        // Keep at least one item in the list
        if (this.rules.length === 0) {
            this.rules.push(new ValidatedSortRule());
        }

        this._recalculateResetAvailability();
    }

    /** @hidden */
    _addNew(index: number): void {
        this.rules.splice(index + 1, 0, new ValidatedSortRule());
    }

    /** @hidden */
    _onRuleColumnKeyChange(rule: ValidatedSortRule, columnKey: string): void {
        rule.columnKey = columnKey;
        this._recalculateResetAvailability();
        this.cdr.detectChanges();
    }

    /** @hidden */
    _onRuleDirectionChange(rule: ValidatedSortRule, direction: SortDirection): void {
        rule.direction = direction;
        this._recalculateResetAvailability();
    }

    /** @hidden */
    _recalculateResetAvailability(): void {
        const hasOnlyOneEmptyRule = this.rules.length === 1 && !this.rules[0].isValid;
        this._isResetAvailableSubject$.next(!hasOnlyOneEmptyRule);
    }

    /** @hidden */
    _trackByColumnKey(index: number, rule: ValidatedSortRule): string | null {
        return rule.columnKey;
    }

    /** @hidden */
    private _initiateRules(collectionSort?: CollectionSort[]): void {
        this.rules = this._createRules(collectionSort);

        // Keep at least one item in the list
        if (this.rules.length === 0) {
            this.rules.push(new ValidatedSortRule());
        }

        this._recalculateResetAvailability();
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
                direction
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

@Pipe({ name: 'getAvailableSortColumns', pure: false })
export class GetAvailableSortColumnsPipe implements PipeTransform {
    transform(columns: SortDialogColumn[], rules: SortRule[], currentKey: string | null): SortDialogColumn[] {
        if (!currentKey) {
            return columns;
        }
        const usedKeys = new Set(rules.map((r) => r.columnKey));
        return columns.filter((c) => !usedKeys.has(c.key) || currentKey === c.key);
    }
}
