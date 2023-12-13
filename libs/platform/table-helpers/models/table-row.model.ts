import { BehaviorSubject, Observable } from 'rxjs';
import { TableDataSource } from '../domain';
import { TableRowType } from '../enums';

export type TableRowState = 'editable' | 'readonly';

export interface TableRowKeyboardDrag {
    direction: 'up' | 'down';
    event: KeyboardEvent;
    mode: 'group' | 'shift';
}

/**
 * Table row entity
 * Used to represent table row in the template
 */
export interface TableRow<T = any> {
    /**
     * Row semantic type
     */
    type: TableRowType.ITEM | TableRowType.GROUP | TableRowType.TREE;

    /**
     * Indicates if row is selected. It also supports intermediate state
     */
    checked: boolean | null;

    checked$?: Observable<TableRow['checked']>;

    /**
     * Index of a "value" in data source list
     */
    index: number;

    /**
     * Data model it represents
     */
    readonly value: T;

    /**
     * Reference to a parent if any
     */
    parent: TableRow | null;

    /**
     * Nesting level
     */
    level: number;

    /**
     * Expandable
     */
    expandable: boolean;

    /**
     * Expanded/Collapsed
     */
    expanded: boolean;

    expanded$?: Observable<TableRow['expanded']>;

    childItems$: Observable<T[]>;

    childItemsLoading$: BehaviorSubject<boolean>;

    stateChanged$: Observable<boolean>;

    /**
     * If item should be hidden. Used to skip rendering
     */
    hidden: boolean;

    /**
     * If the row is navigatable
     */
    navigatable: boolean;

    /**
     * Row state: readonly or editable.
     */
    state: TableRowState;

    /**
     * Children table rows.
     */
    children: TableRow<T>[];

    isTree: boolean;

    setRowType: (type: TableRowType) => void;

    lastChild?: TableRow<T>;

    /** Flag indicating that all child rows should be fetched again. */
    forceFetch: boolean;
}

export type TableRowClass<T = any> = string | ((row: T) => string);

/** @ignore */
export function isTableRow<T = any>(row: TableRow<T>): row is TableRow<T> {
    return row && row.type !== undefined && row.value !== undefined && row.index >= 0 && row.state !== undefined;
}

export class TableRowImpl<T> implements TableRow<T> {
    /** @ignore */
    set checked(value: boolean | null) {
        this._checkedSubject.next(value);
    }
    get checked(): boolean | null {
        return this._checkedSubject.value;
    }
    /** @ignore */
    private readonly _checkedSubject = new BehaviorSubject<boolean | null>(false);
    /** @ignore */
    readonly checked$ = this._checkedSubject.asObservable();

    /** @ignore */
    readonly childItems$: Observable<T[]>;

    /** @ignore */
    readonly stateChanged$ = new BehaviorSubject<boolean>(false);

    /** @ignore */
    readonly childItemsLoading$ = new BehaviorSubject<boolean>(false);

    /** @ignore */
    forceFetch = false;

    /** @ignore */
    children: TableRow<T>[];
    /** @ignore */
    expandable: boolean;
    /** @ignore */
    set expanded(value: boolean) {
        this._expandedSubject.next(value);
        this.children.forEach((childRow) => {
            childRow.hidden = !value;
        });
    }
    get expanded(): boolean {
        return this._expandedSubject.value;
    }
    /** @ignore */
    private readonly _expandedSubject = new BehaviorSubject<boolean>(false);
    /** @ignore */
    readonly expanded$ = this._expandedSubject.asObservable();

    /** @ignore */
    hidden: boolean;
    /** @ignore */
    index: number;
    /** @ignore */
    level: number;
    /** @ignore */
    navigatable: boolean;
    /** @ignore */
    parent: TableRow | null;
    /** @ignore */
    state: TableRowState;
    /** @ignore */
    type: TableRowType;
    /** @ignore */
    readonly value: T;

    /** @ignore */
    childDataSource: TableDataSource<T> | undefined;

    /** @ignore */
    isTree: boolean;

    /** @ignore */
    lastChild?: TableRow<T>;

    /** @ignore */
    constructor(row: Partial<TableRow>) {
        this.checked = row.checked || false;
        this.children = row.children || [];
        this.expandable = row.expandable || false;
        this.expanded = row.expanded || false;
        this.hidden = row.hidden || false;
        this.index = row.index || 0;
        this.level = row.level || 0;
        this.navigatable = row.navigatable || false;
        this.parent = row.parent || null;
        this.state = row.state || 'readonly';
        this.value = row.value;
        this.setRowType(row.type || TableRowType.ITEM);
    }

    /**
     * Sets the row type and checks whether the row is a tree.
     * @param type Row type.
     */
    setRowType(type: TableRowType): void {
        this.type = type;
        this.isTree = this.type === TableRowType.TREE;
    }
}
