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
import { CollectionSort, SortDirection } from '@fundamental-ngx/platform/table-helpers';
import { distinctUntilChanged } from 'rxjs';
import {
    INITIAL_DIRECTION,
    NOT_SORTED_OPTION_VALUE,
    SettingsSortDialogData,
    SettingsSortDialogResultData
} from '../table-view-settings.model';

let sortOrderHeaderUniqueId = 0;
let sortDialogSortByHeaderUniqueId = 0;

@Component({
    selector: 'fdp-sorting',
    templateUrl: './sorting.component.html',
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
export class SortingComponent {
    /** Input data for sorting */
    sortingData = input<SettingsSortDialogData>();

    /** @hidden Initial sorting state */
    initialSorting = input<Nullable<CollectionSort>>();

    /** Event emitter for sort changes */
    sortChange = output<SettingsSortDialogResultData>();

    /** Current selected sorting direction - resets when sortingData changes */
    direction = linkedSignal(() => this.sortingData()?.direction ?? INITIAL_DIRECTION);

    /** Current selected sorting field - resets when sortingData changes */
    field = linkedSignal(() => this.sortingData()?.field ?? NOT_SORTED_OPTION_VALUE);

    /** @hidden */
    sortOrderHeaderId = `fdp-table-sort-order-header-${sortOrderHeaderUniqueId++}`;

    /** @hidden */
    sortDialogSortByHeaderId = `fdp-table-sort-dialog-sort-by-header-${sortDialogSortByHeaderUniqueId++}`;

    /** @hidden Constants for sort direction */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden Constant for 'Not sorted' option value */
    readonly NOT_SORTED_OPTION_VALUE = NOT_SORTED_OPTION_VALUE;

    /** Whether disabling sorting is allowed */
    allowDisablingSorting = computed(() => this.sortingData()?.allowDisablingSorting ?? false);

    /** Available table columns for sorting */
    columns = computed(() => this.sortingData()?.columns ?? []);

    /** Event emitter for reset availability changes */
    resetAvailabilityChange = outputFromObservable(
        toObservable(
            computed(() => {
                const initial = this.initialSorting();
                if (!initial) {
                    return false;
                }
                return this.direction() !== initial.direction || this.field() !== initial.field;
            })
        ).pipe(distinctUntilChanged())
    );

    /**
     * Handle sort direction changes.
     * @param direction New sorting direction.
     */
    _sortDirectionChange(direction: SortDirection): void {
        this.direction.set(direction);
        this._onModelChange();
    }

    /**
     * Handle sort field changes.
     * @param field New sorting field.
     */
    _sortFieldChange(field: string): void {
        this.field.set(field);
        this._onModelChange();
    }

    /**
     * Emit changes to the model.
     * @hidden
     */
    private _onModelChange(): void {
        this.sortChange.emit({ direction: this.direction(), field: this.field() });
    }
}
