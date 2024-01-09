import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import {
    CollectionGroup,
    SortDirection,
    TableDialogCommonData,
    getUniqueListValuesByKey
} from '@fundamental-ngx/platform/table-helpers';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { CdkScrollable } from '@angular/cdk/overlay';

import { FormsModule } from '@angular/forms';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import {
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { RESETTABLE_TOKEN, ResetButtonComponent, Resettable } from '../../reset-button/reset-button.component';

export interface GroupDialogColumn {
    label: string;
    key: string;
}

export interface GroupDialogData extends TableDialogCommonData {
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
        public columnKey: string | null = NOT_SELECTED_OPTION_VALUE,
        /** Show Field as Column */
        public showAsColumn = true
    ) {}
}

@Component({
    templateUrl: './grouping.component.html',
    styleUrl: './grouping.component.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: P13GroupingDialogComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TemplateDirective,
        BarLeftDirective,
        BarElementDirective,
        TitleComponent,
        BarRightDirective,
        ResetButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        SelectComponent,
        OptionComponent,
        CheckboxComponent,
        FormsModule,
        ButtonComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        FdTranslatePipe
    ]
})
export class P13GroupingDialogComponent implements Resettable {
    /** Table columns available for grouping */
    readonly columns: GroupDialogColumn[] = [];
    /** Indicates when reset command is available */
    readonly isResetAvailable$ = signal(false);

    /** Group rules to render */
    rules: GroupRule[] = [];

    /** @hidden */
    constructor(public dialogRef: DialogRef<GroupDialogData>) {
        const { columns, collectionGroup } = this.dialogRef.data;

        this.columns = columns || [];

        this._initiateRules(collectionGroup);
    }

    /** Reset changes to the initial state */
    reset(): void {
        this._initiateRules();
        this.isResetAvailable$.set(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const collectionGroup = this._getCollectionGroupFromGroupRules(this._getUniqueRules(this.rules));
        const result: GroupDialogResultData = { collectionGroup };
        this.dialogRef.close(result);
    }

    /** @hidden */
    _recalculateResetAvailability(): void {
        const hasOnlyOneEmptyRule = this.rules.length === 1 && !this.rules[0].isValid;
        this.isResetAvailable$.set(!hasOnlyOneEmptyRule);
    }

    /** @hidden */
    _removeRule(rule: GroupRule): void {
        this.rules = this.rules.filter((_rule) => _rule !== rule);

        // Keep at least one item in the list
        if (this.rules.length === 0) {
            this.rules.push(new GroupRule());
        }

        this._recalculateResetAvailability();
    }

    /** @hidden */
    _addNew(index: number): void {
        this.rules.splice(index + 1, 0, new GroupRule());
    }

    /** @hidden */
    _onRuleColumnKeyChange(rule: GroupRule, columnKey: string): void {
        rule.columnKey = columnKey;
        this._recalculateResetAvailability();
    }

    /** @hidden */
    _onRuleShowAsColumnChange(rule: GroupRule, value: boolean): void {
        rule.showAsColumn = value;
        this._recalculateResetAvailability();
    }

    /** @hidden */
    private _initiateRules(collectionGroup?: CollectionGroup[]): void {
        this.rules = this._createGroupRules(collectionGroup);

        // Keep at least one item in the list
        if (this.rules.length === 0) {
            this.rules.push(new GroupRule());
        }

        this._recalculateResetAvailability();
    }

    /** @hidden */
    private _createGroupRules(collectionGroup: CollectionGroup[] = []): GroupRule[] {
        return collectionGroup.map(({ field, showAsColumn }): GroupRule => new GroupRule(field, showAsColumn));
    }

    /** @hidden */
    private _getCollectionGroupFromGroupRules(rules = this.rules): CollectionGroup[] {
        return rules.filter(this._isRuleValid).map(
            ({ columnKey, showAsColumn }): CollectionGroup => ({
                field: columnKey!,
                showAsColumn,
                direction: SortDirection.NONE
            })
        );
    }

    /** @hidden */
    private _getUniqueRules(rules: GroupRule[]): GroupRule[] {
        return getUniqueListValuesByKey(rules, 'columnKey');
    }

    /** @hidden */
    private _isRuleValid = (rule: GroupRule): boolean => rule?.isValid;
}
