import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    linkedSignal,
    output,
    ViewEncapsulation
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
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
import { distinctUntilChanged } from 'rxjs';
import {
    INITIAL_DIRECTION,
    NOT_GROUPED_OPTION_VALUE,
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
export class GroupingComponent {
    /** Input data for grouping */
    groupingData = input<SettingsGroupDialogData>();

    /** @hidden Initial grouping settings */
    initialGrouping = input<Nullable<SettingsGroupDialogResultData>>();

    /** Event emitter for group changes */
    groupChange = output<SettingsGroupDialogResultData>();

    /** Current selected grouping direction - resets when groupingData changes */
    direction = linkedSignal(() => this.groupingData()?.direction ?? INITIAL_DIRECTION);

    /** Current selected grouping field - resets when groupingData changes */
    field = linkedSignal(() => this.groupingData()?.field ?? NOT_GROUPED_OPTION_VALUE);

    /** @hidden */
    groupOrderHeaderId = `fdp-table-group-dialog-group-order-header-${groupOrderHeaderUniqueId++}`;

    /** @hidden */
    groupByHeaderId = `fdp-table-group-dialog-group-by-header-${groupOrderHeaderUniqueId++}`;

    /** Constants for grouping directions */
    readonly SORT_DIRECTION = SortDirection;

    /** Constant for 'Not grouped' option */
    readonly NOT_GROUPED_OPTION_VALUE = NOT_GROUPED_OPTION_VALUE;

    /** Table columns available for grouping */
    columns = computed(() => this.groupingData()?.columns ?? []);

    /** Event emitter for reset availability changes */
    resetAvailabilityChange = outputFromObservable(
        toObservable(
            computed(() => {
                const initial = this.initialGrouping();
                if (!initial) {
                    return false;
                }
                return this.direction() !== initial.direction || this.field() !== initial.field;
            })
        ).pipe(distinctUntilChanged())
    );

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
     * Emit group change event.
     * @hidden
     */
    private _onModelChange(): void {
        const result: SettingsGroupDialogResultData = { field: this.field(), direction: this.direction() };
        this.groupChange.emit(result);
    }
}
