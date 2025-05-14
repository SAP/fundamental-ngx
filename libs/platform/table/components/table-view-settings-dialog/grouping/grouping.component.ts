import { ChangeDetectionStrategy, Component, input, OnInit, output, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
    ListComponent,
    ListGroupHeaderDirective,
    ListItemComponent,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SortDirection } from '@fundamental-ngx/platform/table-helpers';
import equal from 'fast-deep-equal/es6';
import {
    INITIAL_DIRECTION,
    NOT_GROUPED_OPTION_VALUE,
    SettingsGroupDialogColumn,
    SettingsGroupDialogData,
    SettingsGroupDialogResultData
} from '../table-view-settings.model';

let groupOrderHeaderUniqueId = 0;

@Component({
    selector: 'fdp-grouping',
    templateUrl: './grouping.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ListComponent,
        ListGroupHeaderDirective,
        ListTitleDirective,
        ListItemComponent,
        RadioButtonComponent,
        FormsModule,
        FdTranslatePipe
    ]
})
export class GroupingComponent implements OnInit {
    /** Input data for grouping */
    groupingData = input<SettingsGroupDialogData>();

    /** @hidden Initial grouping settings */
    initialGrouping = input<Nullable<SettingsGroupDialogResultData>>();

    /** @hidden Heading level */
    headingLevel = input<number>(2);

    /** Event emitter for group changes */
    groupChange = output<SettingsGroupDialogResultData>();

    /** Event emitter for reset availability changes */
    resetAvailabilityChange = output<boolean>();

    /** Current selected grouping direction */
    direction = signal<SortDirection>(INITIAL_DIRECTION);

    /** Current selected grouping field */
    field = signal<string | null>(NOT_GROUPED_OPTION_VALUE);

    /** Table columns available for grouping */
    columns = signal<SettingsGroupDialogColumn[]>([]);

    /** @hidden */
    groupOrderHeaderId = `fdp-table-group-dialog-group-order-header-${groupOrderHeaderUniqueId++}`;

    /** @hidden */
    groupByHeaderId = `fdp-table-group-dialog-group-by-header-${groupOrderHeaderUniqueId++}`;

    /** Constants for grouping directions */
    readonly SORT_DIRECTION = SortDirection;

    /** Constant for 'Not grouped' option */
    readonly NOT_GROUPED_OPTION_VALUE = NOT_GROUPED_OPTION_VALUE;

    /** hidden */
    ngOnInit(): void {
        const data = this.groupingData();
        if (data) {
            this._initGroupingData(data);
        }

        this._compareInitialGrouping();
    }

    /**
     * Handle changes to grouping direction.
     * @param direction New grouping direction.
     */
    _groupOrderChange(direction: SortDirection): void {
        this.direction.set(direction);
        this._onModelChange();
    }

    /**
     * Handle changes to the grouping field.
     * @param field New grouping field.
     */
    _groupFieldChange(field: string): void {
        this.field.set(field);
        this._onModelChange();
    }

    /**
     * Initialize grouping data and signals.
     * @param groupingData Input grouping data.
     * @hidden
     */
    private _initGroupingData(groupingData: SettingsGroupDialogData): void {
        this.columns.set(groupingData.columns || []);
        this.direction.set(groupingData.direction ?? INITIAL_DIRECTION);
        this.field.set(groupingData.field ?? NOT_GROUPED_OPTION_VALUE);
    }

    /**
     * Compare current grouping state with the initial state, emit events for group and reset availability changes.
     * @hidden
     */
    private _onModelChange(): void {
        const initialGrouping = this.initialGrouping();
        if (!initialGrouping) {
            return;
        }
        const isInitialDiffers =
            this.direction() !== initialGrouping.direction || this.field() !== initialGrouping.field;

        const result: SettingsGroupDialogResultData = { field: this.field(), direction: this.direction() };
        this.groupChange.emit(result);
        this.resetAvailabilityChange.emit(isInitialDiffers);
    }

    /**
     * Compare the initial grouping state with the current state and emit reset availability change if needed.
     * @hidden
     */
    private _compareInitialGrouping(): void {
        const appliedGrouping: SettingsGroupDialogResultData = {
            field: this.field(),
            direction: this.direction()
        };

        if (!equal(this.initialGrouping(), appliedGrouping)) {
            this.resetAvailabilityChange.emit(true);
        }
    }
}
