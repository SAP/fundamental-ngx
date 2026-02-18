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
import { CollectionSort, SortDirection } from '@fundamental-ngx/platform/table-helpers';
import { shallowEqual } from 'fast-equals';
import {
    INITIAL_DIRECTION,
    NOT_SORTED_OPTION_VALUE,
    SettingsSortDialogColumn,
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
export class SortingComponent implements OnInit {
    /** Input data for sorting */
    sortingData = input<SettingsSortDialogData>();

    /** @hidden Heading level */
    headingLevel = input<number>(2);

    /** @hidden Initial sorting state */
    initialSorting = input<Nullable<CollectionSort>>();

    /** Event emitter for sort changes */
    sortChange = output<SettingsSortDialogResultData>();

    /** Event emitter for reset availability changes */
    resetAvailabilityChange = output<boolean>();

    /** Current selected sorting direction */
    direction = signal<SortDirection>(INITIAL_DIRECTION);

    /** Current selected sorting field */
    field = signal<string | null>(NOT_SORTED_OPTION_VALUE);

    /** Whether disabling sorting is allowed */
    allowDisablingSorting = signal<boolean>(false);

    /** Available table columns for sorting */
    columns = signal<SettingsSortDialogColumn[]>([]);

    /** @hidden */
    sortOrderHeaderId = `fdp-table-sort-order-header-${sortOrderHeaderUniqueId++}`;

    /** @hidden */
    sortDialogSortByHeaderId = `fdp-table-sort-dialog-sort-by-header-${sortDialogSortByHeaderUniqueId++}`;

    /** @hidden Constants for sort direction */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden Constant for 'Not sorted' option value */
    readonly NOT_SORTED_OPTION_VALUE = NOT_SORTED_OPTION_VALUE;

    /** hidden */
    ngOnInit(): void {
        const sortingData = this.sortingData();
        if (sortingData) {
            this._initSortingData(sortingData);
        }

        this._compareInitialSorting();
    }

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
     * Initialize sorting data and signals.
     * @param sortingData Input sorting data.
     * @hidden
     */
    private _initSortingData(sortingData: SettingsSortDialogData): void {
        this.columns.set(sortingData.columns || []);
        this.direction.set(sortingData.direction ?? INITIAL_DIRECTION);
        this.field.set(sortingData.field ?? NOT_SORTED_OPTION_VALUE);
        this.allowDisablingSorting.set(sortingData.allowDisablingSorting);
    }

    /**
     * Emit changes to the model and compare with initial sorting.
     * @hidden
     */
    private _onModelChange(): void {
        const initialSorting = this.initialSorting();
        if (!initialSorting) {
            return;
        }
        const isInitialDiffers = this.direction() !== initialSorting.direction || this.field() !== initialSorting.field;

        this.resetAvailabilityChange.emit(isInitialDiffers);
        this.sortChange.emit({ direction: this.direction(), field: this.field() });
    }

    /**
     * Compare the current sorting state with the initial state.
     * Emit reset availability if the sorting has changed.
     * @hidden
     */
    private _compareInitialSorting(): void {
        const appliedSorting: CollectionSort = {
            field: this.field(),
            direction: this.direction()
        };

        const isEqual = shallowEqual(this.initialSorting(), appliedSorting);
        if (!isEqual) {
            this.resetAvailabilityChange.emit(true);
        }
    }
}
