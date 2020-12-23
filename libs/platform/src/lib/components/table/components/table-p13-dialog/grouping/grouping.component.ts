import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { CollectionGroup } from '../../../interfaces';
import { SortDirection } from '../../../enums';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';

export interface GroupDialogColumn {
    label: string;
    key: string;
}

export interface GroupDialogData {
    collectionGroup: CollectionGroup[];
    columns: GroupDialogColumn[];
}

export interface GroupDialogResultData {
    collectionGroup: CollectionGroup[];
}

const NOT_SELECTED_OPTION_VALUE = null;

class GroupRule {
    get isValid(): boolean {
        return this.columnKey !== NOT_SELECTED_OPTION_VALUE;
    }

    constructor(
        /** Column key the rule belongs to */
        public columnKey: string = NOT_SELECTED_OPTION_VALUE,
        /** Show Field as Column */
        public showAsColumn = true
    ) {}
}

@Component({
    templateUrl: './grouping.component.html',
    styleUrls: ['./grouping.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: P13GroupingComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class P13GroupingComponent implements Resettable {
    /** Table columns available for grouping */
    readonly columns: GroupDialogColumn[] = [];

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** Initial collection to reset */
    readonly initialCollectionGroup: CollectionGroup[];

    /** Group rules to render */
    rules: GroupRule[] = [];

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
        const { columns, collectionGroup }: GroupDialogData = this.dialogRef.data;

        this.initialCollectionGroup = [...collectionGroup];

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
        const collectionGroup = this._getCollectionGroupFromGroupRules(this._getUniqueRules(this.rules));
        const result: GroupDialogResultData = { collectionGroup: collectionGroup };
        this.dialogRef.close(result);
    }

    /** @hidden */
    _onModelChange(): void {
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    _removeRule(rule: GroupRule): void {
        this.rules = this.rules.filter((_rule) => _rule !== rule);

        // Keep at least one item in the list
        if (this.rules.length === 0) {
            this.rules.push(new GroupRule());
        }

        this._onModelChange();
    }

    /** @hidden */
    _addNew(index: number): void {
        this.rules.splice(index + 1, 0, new GroupRule());
    }

    /** @hidden */
    _onRuleColumnKeyChange(rule: GroupRule, columnKey: string): void {
        rule.columnKey = columnKey;
        this._onModelChange();
    }

    /** @hidden */
    _onRuleShowAsColumnChange(rule: GroupRule, value: boolean): void {
        rule.showAsColumn = value;
        this._onModelChange();
    }

    /** @hidden */
    private _initiateRules(): void {
        this.rules = this._createGroupRules(this.initialCollectionGroup);

        // Keep at least one item in the list
        if (this.rules.length === 0) {
            this.rules.push(new GroupRule());
        }
    }

    /** @hidden */
    private _createGroupRules(collectionGroup: CollectionGroup[] = []): GroupRule[] {
        return collectionGroup.map(({ field, showAsColumn }): GroupRule => new GroupRule(field, showAsColumn));
    }

    /** @hidden */
    private _getCollectionGroupFromGroupRules(rules = this.rules): CollectionGroup[] {
        return rules.filter(this._isRuleValid).map(
            ({ columnKey, showAsColumn }): CollectionGroup => ({
                field: columnKey,
                showAsColumn: showAsColumn,
                direction: null
            })
        );
    }

    /** @hidden */
    private _getUniqueRules(rules: GroupRule[]): GroupRule[] {
        return Array.from(
            rules
                .reduce((map, rule) => {
                    // In order to keep right order need to delete previous value
                    map.delete(rule.columnKey);
                    map.set(rule.columnKey, rule);
                    return map;
                }, new Map<string, GroupRule>())
                .values()
        );
    }

    /** @hidden */
    private _isRuleValid = (rule: GroupRule): boolean => rule?.isValid;
}
