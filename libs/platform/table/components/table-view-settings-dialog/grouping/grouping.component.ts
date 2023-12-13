import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import equal from 'fast-deep-equal/es6';
import { BehaviorSubject, Observable } from 'rxjs';

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
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import {
    ListComponent,
    ListGroupHeaderDirective,
    ListItemComponent,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SortDirection, Table, TableDialogCommonData } from '@fundamental-ngx/platform/table-helpers';
import { ResetButtonComponent, Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';

export interface SettingsGroupDialogColumn {
    label: string;
    key: string;
}

export interface SettingsGroupDialogData extends TableDialogCommonData {
    direction: SortDirection;
    field: string | null;
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
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
        ListComponent,
        ListGroupHeaderDirective,
        ListTitleDirective,
        ListItemComponent,
        RadioButtonComponent,
        FormsModule,
        DialogFooterComponent,
        ButtonBarComponent,
        FdTranslatePipe
    ]
})
export class GroupingComponent implements Resettable {
    /** Current selected direction */
    direction: SortDirection;

    /** Current selected field */
    field: string | null = null;

    /** Table columns */
    readonly columns: SettingsGroupDialogColumn[] = [];

    /** @ignore */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /** Indicates if reset command is active */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @ignore */
    readonly SORT_DIRECTION = SortDirection;

    /** Not Grouped Option model value */
    readonly NOT_GROUPED_OPTION_VALUE = NOT_GROUPED_OPTION_VALUE;

    /** @ignore */
    private _initialGrouping: SettingsGroupDialogResultData;

    /** @ignore */
    constructor(
        public dialogRef: DialogRef<SettingsGroupDialogData>,
        private readonly _table: Table
    ) {
        const data = this.dialogRef.data;

        this.columns = data.columns || [];

        this.direction = data.direction ?? INITIAL_DIRECTION;
        this.field = data.field ?? NOT_GROUPED_OPTION_VALUE;

        this._setInitialGrouping();

        this._compareInitialGrouping();
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.direction = this._initialGrouping.direction;
        this.field = this._initialGrouping.field;
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

    /** @ignore */
    _groupOrderChange(direction: SortDirection): void {
        this.direction = direction;
        this._onModelChange();
    }

    /** @ignore */
    _groupFieldChange(field: string): void {
        this.field = field;
        this._onModelChange();
    }

    /** @ignore */
    _onModelChange(): void {
        // Use this coercion cause fd-radio-button triggers extra ngModelChange events on initial phase
        const isInitialDiffers =
            this.direction !== this._initialGrouping.direction || this.field !== this._initialGrouping.field;
        this._isResetAvailableSubject$.next(isInitialDiffers);
    }

    /** @ignore */
    private _setInitialGrouping(): void {
        const initialGrouping = (this._table.initialState?.initialGroupBy || [])[0];
        this._initialGrouping = {
            field: initialGrouping?.field ?? NOT_GROUPED_OPTION_VALUE,
            direction: initialGrouping?.direction ?? INITIAL_DIRECTION
        };
    }

    /** @ignore */
    private _compareInitialGrouping(): void {
        const appliedGrouping: SettingsGroupDialogResultData = {
            field: this.field,
            direction: this.direction
        };

        if (equal(this._initialGrouping, appliedGrouping)) {
            return;
        }

        this._isResetAvailableSubject$.next(true);
    }
}
