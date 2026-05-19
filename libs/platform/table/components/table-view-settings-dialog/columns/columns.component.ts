import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    input,
    output,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    ListComponent,
    ListGroupHeaderDirective,
    ListItemComponent,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SearchFieldComponent, SearchInput } from '@fundamental-ngx/platform/search-field';
import { shallowEqual } from 'fast-equals';
import {
    SettingsColumnsDialogColumn,
    SettingsColumnsDialogData,
    SettingsColumnsDialogResultData
} from '../table-view-settings.model';

class SelectableColumn {
    constructor(
        /** Selected */
        public selected: boolean,
        /** Active */
        public active: boolean,
        /** Table Column it belongs to */
        public column: SettingsColumnsDialogColumn
    ) {}
}

const INITIAL_SEARCH_TEXT = '';
const INITIAL_SHOW_ALL_ITEMS = true;

let columnsHeaderUniqueId = 0;

@Component({
    selector: 'fdp-columns',
    templateUrl: './columns.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ToolbarComponent,
        SearchFieldComponent,
        ToolbarSpacerDirective,
        ButtonComponent,
        ToolbarItemDirective,
        ListComponent,
        ListGroupHeaderDirective,
        ListItemComponent,
        CheckboxComponent,
        FormsModule,
        ListTitleDirective,
        FdTranslatePipe
    ]
})
export class ColumnsComponent {
    /** Input data for columns configuration */
    columnsData = input<SettingsColumnsDialogData>();

    /** @hidden Initial columns state */
    initialColumns = input<Nullable<SettingsColumnsDialogResultData>>();

    /** @hidden Heading level */
    headingLevel = input<number>(2);

    /** Event emitter for columns changes */
    columnsChange = output<SettingsColumnsDialogResultData>();

    /** Event emitter for reset availability changes */
    resetAvailabilityChange = output<boolean>();

    /** @hidden All available columns for interacting */
    protected selectableColumns = signal<SelectableColumn[]>([]);

    /** @hidden Search Query */
    protected searchQuery = signal<string>(INITIAL_SEARCH_TEXT);

    /** @hidden Show All flag */
    protected showAllItems = signal<boolean>(INITIAL_SHOW_ALL_ITEMS);

    /** @hidden Selected columns count */
    protected selectedColumnsCount = signal<number>(0);

    /** @hidden Flag to track disabled state for move-up button */
    protected moveUpDisabled = signal<boolean>(true);

    /** @hidden Flag to track disabled state for move-down button */
    protected moveDownDisabled = signal<boolean>(true);

    /** @hidden filtered columns that are rendered in the list */
    protected filteredColumns = computed(() => {
        const searchQuery = this.searchQuery();
        const showAll = this.showAllItems();
        return this.selectableColumns().filter((item) => {
            const matchesSearchQuery = item.column.label.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
            const matchesShowAll = showAll || item.selected;
            return matchesSearchQuery && matchesShowAll;
        });
    });

    /** @hidden */
    protected columnsHeaderId = `fdp-table-columns-header-${columnsHeaderUniqueId++}`;

    /** @hidden */
    protected get selectAllDisabled(): boolean {
        return !this.showAllItems() || this.filteredColumns().length === 0;
    }

    /** @hidden Track the last data reference to detect real changes */
    private _lastColumnsDataRef: SettingsColumnsDialogData | undefined;

    /** @hidden */
    constructor() {
        effect(() => {
            // Recalculate button states when filtered columns change
            this.filteredColumns();
            this._calculateMovementButtonsState();
        });

        effect(() => {
            // React to columnsData input changes (e.g., from reset button)
            // Only reinitialize if the data reference actually changed
            const data = this.columnsData();
            if (data && data !== this._lastColumnsDataRef) {
                this._lastColumnsDataRef = data;
                this._initiateColumns(data);
                // Only compare if initialColumns is actually set
                if (this.initialColumns()) {
                    this._compareInitialColumns();
                }
            }
        });
    }

    /** @hidden */
    protected toggleSelectAll(selectAll: boolean): void {
        this.selectableColumns.update((columns) => {
            columns.forEach((column) => (column.selected = selectAll));
            return [...columns];
        });
        this.onToggleColumn();
    }

    /** @hidden */
    protected onToggleColumn(): void {
        this._countSelectedColumns();
        this._onModelChange();
    }

    /** @hidden */
    protected searchInputChange({ text }: SearchInput): void {
        this.searchQuery.set(text || '');
    }

    /** @hidden */
    protected toggleShowAll(): void {
        this.showAllItems.update((val) => !val);
    }

    /** @hidden */
    protected setActiveColumn(column: SelectableColumn | null): void {
        this.selectableColumns.update((columns) => columns.map((col) => ({ ...col, active: col === column })));

        this._calculateMovementButtonsState();
    }

    /** @hidden */
    protected moveActiveToTop(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        this._moveColumnInFilteredListByIndex(this._getActiveColumnIndexInFilteredList(), 0);
    }

    /** @hidden */
    protected moveActiveToBottom(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const filteredColumns = this.filteredColumns();
        this._moveColumnInFilteredListByIndex(this._getActiveColumnIndexInFilteredList(), filteredColumns.length - 1);
    }

    /** @hidden */
    protected moveActiveUp(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const activeColumnIndex = this._getActiveColumnIndexInFilteredList();
        this._moveColumnInFilteredListByIndex(activeColumnIndex, activeColumnIndex - 1);

        // keep the focus back to the move up button as it gets lost on click
        setTimeout(() => {
            const moveUpBtn = event.target as HTMLElement | null;
            moveUpBtn?.focus();
        }, 0);
    }

    /** @hidden */
    protected moveActiveDown(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const activeColumnIndex = this._getActiveColumnIndexInFilteredList();
        this._moveColumnInFilteredListByIndex(activeColumnIndex, activeColumnIndex + 1);
    }

    /** @hidden */
    protected isReorderColumnButtonShowable(item: SelectableColumn): boolean {
        return item.active && item.selected;
    }

    /** @hidden */
    protected filterByColumnKey(index: number, item: SelectableColumn): string {
        return item?.column.key;
    }

    /**
     * @hidden
     * Initialize columns data and signals.
     */
    private _initiateColumns(columnsData: SettingsColumnsDialogData): void {
        const allColumns = columnsData.columns || [];
        this.selectableColumns.set(
            allColumns.map(
                (column, index): SelectableColumn => ({
                    column,
                    selected: column.visible,
                    active: index === 0
                })
            )
        );

        this._countSelectedColumns();
        this.searchQuery.set(INITIAL_SEARCH_TEXT);
        this.showAllItems.set(INITIAL_SHOW_ALL_ITEMS);
    }

    /** @hidden */
    private _getVisibleColumnsFromSelectedColumns(columns: SelectableColumn[]): string[] {
        return columns.filter(({ selected }) => selected).map(({ column }) => column.name);
    }

    /** @hidden */
    private _getColumnOrder(columns: SelectableColumn[]): string[] {
        return columns.map((column) => column.column.name);
    }

    /** @hidden */
    private _getActiveColumnIndexInFilteredList(): number {
        return this.filteredColumns().findIndex(({ active }) => active);
    }

    /** @hidden */
    private _moveColumnInFilteredListByIndex(from: number, to: number): void {
        const filteredColumns = this.filteredColumns();
        const { movedItem, replacedItem } = this._moveElementInTheListByIndex(filteredColumns, from, to);
        /**
         * need to reflect analogical movement in the original list
         * with respect to the original list order
         */
        this._moveColumnInSelectableList(movedItem, replacedItem);

        this._calculateMovementButtonsState();
        this._onModelChange();
    }

    /**
     * @hidden
     * Move column in selectable list.
     */
    private _moveColumnInSelectableList(itemToMove: SelectableColumn, targetItem: SelectableColumn): void {
        this.selectableColumns.update((columns) => {
            this._moveElementInTheListByIndex(columns, columns.indexOf(itemToMove), columns.indexOf(targetItem));
            return [...columns];
        });
    }

    /**
     * @hidden
     * Move element in the list
     * @return moved item and replaced item.
     */
    private _moveElementInTheListByIndex<T>(
        list: T[],
        fromIndex: number,
        toIndex: number
    ): { movedItem: T; replacedItem: T } {
        const listLength = list.length;

        fromIndex = Math.min(Math.max(fromIndex, 0), listLength - 1);
        toIndex = Math.min(Math.max(toIndex, 0), listLength - 1);

        const replacedItem = list[toIndex];
        const movedItem = list.splice(fromIndex, 1)[0];

        list.splice(toIndex, 0, movedItem);

        return { movedItem, replacedItem };
    }

    /** @hidden */
    private _countSelectedColumns(): void {
        this.selectedColumnsCount.set(this.selectableColumns().filter(({ selected }) => selected).length);
    }

    /** @hidden */
    private _calculateMovementButtonsState(): void {
        const activeIndex = this._getActiveColumnIndexInFilteredList();
        const filteredColumns = this.filteredColumns();
        this.moveUpDisabled.set(activeIndex < 1);
        this.moveDownDisabled.set(activeIndex < 0 || activeIndex >= filteredColumns.length - 1);
    }

    /**
     * Emit changes to the model and compare with initial columns.
     * @hidden
     */
    private _onModelChange(): void {
        const selectableColumns = this.selectableColumns();
        const currentVisibleColumns = this._getVisibleColumnsFromSelectedColumns(selectableColumns);
        const currentColumnOrder = this._getColumnOrder(selectableColumns);

        // Build the full columns array with updated order and visibility
        const reorderedColumns = selectableColumns.map((selectable) => ({
            ...selectable.column,
            visible: selectable.selected
        }));

        const result: SettingsColumnsDialogResultData = {
            visibleColumns: currentVisibleColumns,
            columnOrder: currentColumnOrder,
            columns: reorderedColumns
        };

        this.columnsChange.emit(result);

        // Only emit reset availability if initialColumns is set
        const initialColumns = this.initialColumns();
        if (initialColumns) {
            const isInitialDiffers =
                !shallowEqual(currentVisibleColumns, initialColumns.visibleColumns) ||
                !shallowEqual(currentColumnOrder, initialColumns.columnOrder);
            this.resetAvailabilityChange.emit(isInitialDiffers);
        }
    }

    /**
     * Compare the initial columns state with the current state and emit reset availability change if needed.
     * @hidden
     */
    private _compareInitialColumns(): void {
        const selectableColumns = this.selectableColumns();
        const reorderedColumns = selectableColumns.map((selectable) => ({
            ...selectable.column,
            visible: selectable.selected
        }));

        const appliedColumns: SettingsColumnsDialogResultData = {
            visibleColumns: this._getVisibleColumnsFromSelectedColumns(selectableColumns),
            columnOrder: this._getColumnOrder(selectableColumns),
            columns: reorderedColumns
        };

        const initialColumns = this.initialColumns();
        if (
            initialColumns &&
            (!shallowEqual(initialColumns.visibleColumns, appliedColumns.visibleColumns) ||
                !shallowEqual(initialColumns.columnOrder, appliedColumns.columnOrder))
        ) {
            this.resetAvailabilityChange.emit(true);
        }
    }
}
