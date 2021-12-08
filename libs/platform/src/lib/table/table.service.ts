import { EventEmitter, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { skip } from 'rxjs/operators';
import equal from 'fast-deep-equal';

import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';

import { SearchInput } from './interfaces/search-field.interface';
import { CollectionFilter, CollectionGroup, CollectionPage, CollectionSort, TableState } from './interfaces';
import { ColumnsChange, FilterChange, FreezeChange, GroupChange, PageChange, SearchChange, SortChange } from './models';
import { DEFAULT_TABLE_STATE, FIRST_CELL_NAVIGATION_ID } from './constants';
import { FdpCellSelectableDirective } from './directives';

/** Cell navigation id, where first number indicates the row index, second - the column index
 *  Used to register cell for the arrow keys navigation
 *  TODO: Template literal types should be used here but it's broken in TS 4.1.
 */
export type TableCellNavigationId = string; // `${number},${number}`;

@Injectable()
export class TableService {
    private _focusedTableCellNavId = FIRST_CELL_NAVIGATION_ID;
    private _isFocusInsideTableCell = false;

    private _tableStateSubject$: BehaviorSubject<TableState> = new BehaviorSubject(DEFAULT_TABLE_STATE);
    private _tableLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _markForCheck$: Subject<void> = new Subject<void>();
    private _tableColumnsWidth$ = new Subject<void>();

    readonly tableColumnsWidth$ = this._tableColumnsWidth$.asObservable();
    readonly tableState$ = this._tableStateSubject$.asObservable();
    private _tableCellsMap = new Map<string, FdpCellSelectableDirective>();

    readonly tableLoading$ = this._tableLoadingSubject$.asObservable();
    readonly tableStateChanges$ = this.tableState$.pipe(skip(1));

    readonly searchChange: EventEmitter<SearchChange> = new EventEmitter<SearchChange>();
    readonly sortChange: EventEmitter<SortChange> = new EventEmitter<SortChange>();
    readonly filterChange: EventEmitter<FilterChange> = new EventEmitter<FilterChange>();
    readonly groupChange: EventEmitter<GroupChange> = new EventEmitter<GroupChange>();
    readonly freezeChange: EventEmitter<FreezeChange> = new EventEmitter<FreezeChange>();
    readonly columnsChange: EventEmitter<ColumnsChange> = new EventEmitter<ColumnsChange>();
    readonly pageChange: EventEmitter<PageChange> = new EventEmitter<PageChange>();

    /** Flag which shows is the focus inside the table cell */
    get isFocusInsideTableCell(): boolean {
        return this._isFocusInsideTableCell;
    }

    /** Currently focused table cell's ID (always looks like `${rowIndex},${colIndex}`) */
    get focusedTableCellNavId(): TableCellNavigationId {
        if (!this._focusedTableCellNavId) {
            return FIRST_CELL_NAVIGATION_ID;
        }

        return this._focusedTableCellNavId;
    }

    /** Listen for changes in table subcomponents (mostly table column) */
    get markForCheck$(): Subject<void> {
        return this._markForCheck$;
    }

    /** @hidden */
    private get _rtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    constructor(@Optional() private readonly _rtlService: RtlService) {}

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this._tableStateSubject$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this._tableStateSubject$.next(state);
    }

    /** Set current loading state of the Table. */
    setTableLoading(isLoading: boolean): void {
        this._tableLoadingSubject$.next(isLoading);
    }

    /** Notify about changes in table subcomponents (mostly table column) */
    markForCheck(): void {
        this._markForCheck$.next();
    }

    /** Search */
    search(searchInput: SearchInput): void {
        const prevState = this.getTableState();

        const state: TableState = { ...prevState, searchInput: searchInput };

        this.setTableState(setCurrentPageToState(state, 1));

        this.searchChange.emit({ current: searchInput, previous: prevState.searchInput });
    }

    /** Set new sort rules */
    setSort(sortRules: CollectionSort[]): void {
        const prevState = this.getTableState();
        const prevSortRules = (prevState && prevState.sortBy) || [];

        const newSortRules: CollectionSort[] = [...sortRules];
        const state: TableState = { ...prevState, sortBy: newSortRules };

        if (!equal(prevSortRules, state.sortBy)) {
            this.setTableState(setCurrentPageToState(state, 1));

            this.sortChange.emit({ current: state.sortBy, previous: prevSortRules });
        }
    }

    /** Add sort rules to the existing ones */
    addSort(sortRules: CollectionSort[]): void {
        const prevState = this.getTableState();
        const prevSortRules = (prevState && prevState.sortBy) || [];

        const newSortRules: CollectionSort[] = [
            ...prevSortRules.filter((existing) => !sortRules.find(({ field }) => field === existing.field)),
            ...sortRules
        ];

        const state: TableState = { ...prevState, sortBy: newSortRules };

        if (!equal(prevSortRules, state.sortBy)) {
            this.setTableState(setCurrentPageToState(state, 1));

            this.sortChange.emit({ current: state.sortBy, previous: prevSortRules });
        }
    }

    /** Set new sort rules */
    setFilters(filterRules: CollectionFilter[]): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = [...filterRules];
        const state: TableState = { ...prevState, filterBy: newFilterRules };

        if (!equal(prevFilterRules, state.filterBy)) {
            this.setTableState(setCurrentPageToState(state, 1));

            this.filterChange.emit({ current: state.filterBy, previous: prevFilterRules });
        }
    }

    /** Add filter rules to the existing ones */
    addFilters(rulesToAdd: CollectionFilter[]): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = [
            ...prevFilterRules.filter((existing) => !rulesToAdd.find(({ field }) => field === existing.field)),
            ...rulesToAdd
        ];

        const state: TableState = { ...prevState, filterBy: newFilterRules };

        if (!equal(prevFilterRules, state.filterBy)) {
            this.setTableState(setCurrentPageToState(state, 1));

            this.filterChange.emit({ current: state.filterBy, previous: prevFilterRules });
        }
    }

    /** Removes filters for the provided fields */
    removeFilters(fields: string[]): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = prevFilterRules.filter(
            (existing) => !fields.includes(existing.field)
        );

        const state: TableState = { ...prevState, filterBy: newFilterRules };

        this.setTableState(setCurrentPageToState(state, 1));

        this.filterChange.emit({ current: state.filterBy, previous: prevFilterRules });
    }

    /** Set group rules */
    setGroups(groups: CollectionGroup[]): void {
        const prevState = this.getTableState();
        const prevGroups = (prevState && prevState.groupBy) || [];

        const newGroups: CollectionGroup[] = [...groups];
        const state: TableState = { ...prevState, groupBy: newGroups };

        if (!equal(prevGroups, state.groupBy)) {
            this.setTableState(state);

            this.groupChange.emit({ current: state.groupBy, previous: prevGroups });
        }
    }

    /** Add group rules to the existing ones */
    addGroups(groupsToAdd: CollectionGroup[]): void {
        const prevState = this.getTableState();
        const prevGroups = (prevState && prevState.groupBy) || [];

        const newGroups: CollectionGroup[] = [
            ...prevGroups.filter((existing) => !groupsToAdd.find(({ field }) => field === existing.field)),
            ...groupsToAdd
        ];

        const state: TableState = { ...prevState, groupBy: newGroups };

        if (!equal(prevGroups, state.groupBy)) {
            this.setTableState(state);

            this.groupChange.emit({ current: state.groupBy, previous: prevGroups });
        }
    }

    /** Freeze table to column */
    freezeTo(columnName: string): void {
        const prevState = this.getTableState();

        this.setTableState({ ...prevState, freezeToColumn: columnName });

        this.freezeChange.emit({ current: columnName, previous: prevState.freezeToColumn });
    }

    /** Set table columns */
    setColumns(columns: string[]): void {
        const prevState = this.getTableState();
        const prevColumns = (prevState && prevState.columns) || [];

        const newColumns = [...columns];
        const state: TableState = { ...prevState, columns: newColumns };

        if (!equal(prevColumns, state.columns)) {
            this.setTableState(state);

            this.columnsChange.emit({ current: state.columns, previous: prevColumns });
        }
    }

    /** Set page */
    setCurrentPage(currentPage: number): void {
        const prevState = this.getTableState();
        const prevPageState = prevState.page;

        if (prevPageState.currentPage === currentPage) {
            return;
        }

        const state: TableState = setCurrentPageToState(prevState, currentPage);

        this.setTableState(state);

        this.pageChange.emit({ current: state.page, previous: prevPageState });
    }

    /** Trigger columns width recalculation */
    recalculateColumnsWidth(): void {
        this._tableColumnsWidth$.next();
    }

    /** Register focusable table cell to have ability navigate over it with arrow buttons */
    registerFocusableTableCell(id: string, tableCell: FdpCellSelectableDirective): void {
        this._tableCellsMap.set(id, tableCell);
    }

    /** Register focusable table cell to have ability navigate over it with arrow buttons */
    clearFocusableTableCells(): void {
        this._tableCellsMap.clear();
    }

    /** Navigate over registered focusable table cells */
    focusNextTableCell(currCellNavId: TableCellNavigationId, event?: KeyboardEvent): void {
        if (!event) {
            const currCell = this._tableCellsMap.get(currCellNavId);

            if (currCell) {
                currCell.focus();
            }

            return;
        }

        const [rowIndex, colIndex] = currCellNavId.split(',');
        let nextCellId: string;

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            nextCellId = `${+rowIndex - 1},${colIndex}`;
        } else if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            nextCellId = `${+rowIndex + 1},${colIndex}`;
        } else if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            nextCellId = `${rowIndex},${+colIndex - (this._rtl ? -1 : 1)}`;
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            nextCellId = `${rowIndex},${+colIndex + (this._rtl ? -1 : 1)}`;
        }

        const nextCell = this._tableCellsMap.get(nextCellId);
        if (nextCell) {
            this._tableCellsMap.get(nextCellId).focus();
        }
    }

    /** Set currently focused cell */
    setFocusedTableCell(cellId): void {
        this._focusedTableCellNavId = cellId;
    }

    /** Reset currently focused cell to initial value */
    resetFocusedTableCell(): void {
        this._focusedTableCellNavId = FIRST_CELL_NAVIGATION_ID;
    }

    /** Mark that focus inside the cell */
    setFocusInsideCell(): void {
        this._isFocusInsideTableCell = true;
    }

    /** Mark that focus isn't inside the cell */
    removeFocusInsideCell(): void {
        this._isFocusInsideTableCell = false;
    }

    /** Focus on table cell inner any first focusable element */
    processFocusInsideCell(tableCellNavId: TableCellNavigationId): void {
        const tableCell = this._tableCellsMap.get(tableCellNavId);

        if (this.isFocusInsideTableCell) {
            tableCell.focus();
            this.removeFocusInsideCell();
            return;
        }

        const focusableElements = getFocusableElements(tableCell._elRef.nativeElement);

        if (focusableElements.length) {
            focusableElements[0].focus();
            this.setFocusInsideCell();
        }
    }

    /** Process focus when navigating between cell inners */
    processFocusBetweenCellInners(event: KeyboardEvent, tableContainer: HTMLElement, focusableMock: HTMLElement): void {
        if (!this.isFocusInsideTableCell) {
            return;
        }

        const focusableElements = getFocusableElements(tableContainer);
        const currFocusElementIndex = focusableElements.findIndex((el) => el === document.activeElement);

        if (currFocusElementIndex === 1 && event.shiftKey) {
            this.removeFocusInsideCell();
        }

        if (currFocusElementIndex === focusableElements.length - 1 && !event.shiftKey) {
            focusableMock.focus();
            this.removeFocusInsideCell();
        }
    }

    /** @hidden */
    private _setCurrentPageToState(state: TableState, currentPage: number): TableState {
        const newPageState: CollectionPage = { ...state.page, currentPage: currentPage };
        return { ...state, page: newPageState };
    }
}

function setCurrentPageToState(state: TableState, currentPage: number): TableState {
    const newPageState: CollectionPage = { ...state.page, currentPage: currentPage };
    return { ...state, page: newPageState };
}

/** Get all focusable child elements */
function getFocusableElements(rootElement: any): any[] {
    return [
        ...rootElement.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])')
    ].filter((el) => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1');
}
