import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    linkedSignal,
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

export interface SelectableColumn {
    /** Selected */
    selected: boolean;
    /** Active */
    active: boolean;
    /** Table Column it belongs to */
    column: SettingsColumnsDialogColumn;
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

    /** Event emitter for columns changes */
    columnsChange = output<SettingsColumnsDialogResultData>();

    /** Event emitter for reset availability changes */
    resetAvailabilityChange = output<boolean>();

    /** @hidden All available columns for interacting - resets when columnsData changes */
    protected selectableColumns = linkedSignal<SelectableColumn[]>(() => {
        const data = this.columnsData();
        const allColumns = data?.columns || [];
        const initialCols = allColumns.map(
            (column, index): SelectableColumn => ({
                column,
                selected: column.visible,
                active: index === 0
            })
        );
        // Trigger reset availability check when columnsData changes
        if (initialCols.length > 0) {
            this._compareInitialColumnsNextTick();
        }
        return initialCols;
    });

    /** @hidden Search Query */
    protected searchQuery = signal<string>(INITIAL_SEARCH_TEXT);

    /** @hidden Show All flag */
    protected showAllItems = signal<boolean>(INITIAL_SHOW_ALL_ITEMS);

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

    /** @hidden Selected columns count */
    protected selectedColumnsCount = computed(() => this.selectableColumns().filter(({ selected }) => selected).length);

    /** @hidden Flag to track disabled state for move-up button */
    protected moveUpDisabled = computed(() => this._activeColumnIndexInFilteredList() < 1);

    /** @hidden Flag to track disabled state for move-down button */
    protected moveDownDisabled = computed(() => {
        const activeIndex = this._activeColumnIndexInFilteredList();
        const filteredLength = this.filteredColumns().length;
        return activeIndex < 0 || activeIndex >= filteredLength - 1;
    });

    /** @hidden */
    protected columnsHeaderId = `fdp-table-columns-header-${columnsHeaderUniqueId++}`;

    /** @hidden */
    protected get selectAllDisabled(): boolean {
        return !this.showAllItems() || this.filteredColumns().length === 0;
    }

    /** @hidden Index of active column in filtered list */
    private _activeColumnIndexInFilteredList = computed(() => this.filteredColumns().findIndex(({ active }) => active));

    /** @hidden */
    protected toggleSelectAll(selectAll: boolean): void {
        this.selectableColumns.update((columns) =>
            columns.map((column) => ({
                ...column,
                selected: selectAll
            }))
        );
        this.onToggleColumn();
    }

    /** @hidden */
    protected onToggleColumn(): void {
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
        this.selectableColumns.update((columns) =>
            columns.map((col) => ({
                ...col,
                active: col === column
            }))
        );
    }

    /** @hidden */
    protected moveActiveToTop(event: Event): void {
        this._moveActiveColumn(event, 0);
    }

    /** @hidden */
    protected moveActiveToBottom(event: Event): void {
        this._moveActiveColumn(event, this.filteredColumns().length - 1);
    }

    /** @hidden */
    protected moveActiveUp(event: Event): void {
        const activeIndex = this._activeColumnIndexInFilteredList();
        this._moveActiveColumn(event, activeIndex - 1, true);
    }

    /** @hidden */
    protected moveActiveDown(event: Event): void {
        const activeIndex = this._activeColumnIndexInFilteredList();
        this._moveActiveColumn(event, activeIndex + 1);
    }

    /** @hidden */
    protected isReorderColumnButtonShowable(item: SelectableColumn): boolean {
        return item.active && item.selected;
    }

    /** @hidden */
    protected filterByColumnKey(index: number, item: SelectableColumn): string {
        return item?.column.key;
    }

    /** @hidden Move active column to target index */
    private _moveActiveColumn(event: Event, targetIndex: number, refocusButton = false): void {
        event.stopPropagation();
        event.preventDefault();
        this._moveColumnInFilteredListByIndex(this._activeColumnIndexInFilteredList(), targetIndex);

        if (refocusButton) {
            // setTimeout is needed to allow the new button to render for focusing
            setTimeout(() => (event.target as HTMLElement | null)?.focus(), 0);
        }
    }

    /** @hidden Build result data from current selectable columns */
    private _buildResultData(columns: SelectableColumn[]): SettingsColumnsDialogResultData {
        return {
            visibleColumns: columns.filter(({ selected }) => selected).map(({ column }) => column.name),
            columnOrder: columns.map(({ column }) => column.name),
            columns: columns.map((selectable) => ({ ...selectable.column, visible: selectable.selected }))
        };
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

    /**
     * Emit changes to the model and compare with initial columns.
     * @hidden
     */
    private _onModelChange(): void {
        const result = this._buildResultData(this.selectableColumns());
        this.columnsChange.emit(result);

        const initialColumns = this.initialColumns();
        if (initialColumns) {
            const isChanged =
                !shallowEqual(result.visibleColumns, initialColumns.visibleColumns) ||
                !shallowEqual(result.columnOrder, initialColumns.columnOrder);
            this.resetAvailabilityChange.emit(isChanged);
        }
    }

    /**
     * Compare initial columns with current state on next tick.
     * Scheduled via setTimeout to avoid triggering during signal computation.
     * @hidden
     */
    private _compareInitialColumnsNextTick(): void {
        setTimeout(() => {
            const initialColumns = this.initialColumns();
            if (!initialColumns) {
                return;
            }

            const current = this._buildResultData(this.selectableColumns());
            const isChanged =
                !shallowEqual(current.visibleColumns, initialColumns.visibleColumns) ||
                !shallowEqual(current.columnOrder, initialColumns.columnOrder);

            if (isChanged) {
                this.resetAvailabilityChange.emit(true);
            }
        }, 0);
    }
}
