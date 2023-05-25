import { isString } from '@fundamental-ngx/cdk/utils';
import { TableRowType } from './enums/row-type.enum';
import { isTableRow, TableRow } from './models/table-row.model';
import { TableColumn } from './components/table-column/table-column';
import { SelectionMode, SelectionModeValue } from './enums/selection-mode.enum';
import { RowComparator } from './models/row-comparator.model';
import { TableDataSource } from './domain/table-data-source';
import { FdpTableDataSource } from './models/data-source.type';
import { isDataSource } from '@fundamental-ngx/platform/shared';
import { ArrayTableDataSource } from './domain/array-data-source';
import { ObservableTableDataSource } from './domain/observable-data-source';
import cloneDeep from 'lodash-es/cloneDeep';
import set from 'lodash-es/set';
import { GroupTableRowValueType, TreeLike } from './models/tree-table.model';
import { CollectionGroup } from './interfaces/collection-group.interface';
import { SortDirection } from './enums/sort-direction.enum';
import get from 'lodash-es/get';
import { isObservable } from 'rxjs';

/** @hidden */
export function newTableRow<T = any>(row: Partial<TableRow<T>>): TableRow<T> {
    if (!row.value) {
        throw new Error('Unexpected value. TableRow.value cannot be undefined.');
    }

    const newRow: TableRow<T> = {
        type: row.type || TableRowType.ITEM,
        checked: row.checked || false,
        index: row.index || 0,
        value: row.value,
        parent: row.parent || null,
        level: row.level || 0,
        expandable: row.expandable || false,
        expanded: row.expanded || false,
        hidden: row.hidden || false,
        navigatable: row.navigatable || false,
        state: row.state || 'readonly',
        children: row.children || []
    };
    return newRow;
}

/** @hidden */
export function getSelectableRows(rows: TableRow[], selectableKey: string): TableRow[] {
    return rows.filter((row) => isSelectableRow(row, selectableKey));
}

/** @hidden */
export function isSelectableRow(row: TableRow, selectableKey: string): boolean {
    return (isItemRow(row) || isTreeRow(row)) && row.value[selectableKey] !== false;
}

/** @hidden */
export function isItemRow(row: TableRow): boolean {
    return row.type === TableRowType.ITEM;
}

/** @hidden */
export function isTreeRow(row: TableRow): boolean {
    return row.type === TableRowType.TREE;
}

/**
 * Since we dont work with the tree, we need to convert incoming tree to
 * flat format while maintaining original state.
 *
 * @hidden
 */
export function convertTreeTableRowToFlatList<T>(rows: TableRow<T>[], rowNavigatable: string | boolean): TableRow<T>[] {
    let flatList: TableRow[] = [];

    for (const item of rows) {
        item.navigatable = isRowNavigatable(item as T, rowNavigatable);
        flatList.push(item);

        if (Array.isArray(item.children)) {
            item.children.forEach((c) => (c.hidden = !item.expanded));
            flatList = flatList.concat(convertTreeTableRowToFlatList(item.children, rowNavigatable));
        }
    }
    return flatList;
}

/** @hidden */
export function isRowNavigatable<T>(row: T, rowNavigatable: string | boolean): boolean {
    if (!row) {
        return false;
    }

    /** If key of the row's item field passed */
    if (isString(rowNavigatable)) {
        return !!row[rowNavigatable as string];
    }

    return !!rowNavigatable;
}

/** @hidden */
export function getFreezableColumns(columns: TableColumn[], freezeColumnsTo: string): Map<string, number> {
    const columnNames = new Map<string, number>();

    if (!columns.length || !freezeColumnsTo) {
        return columnNames;
    }

    for (const column of columns) {
        if (!column.name) {
            continue;
        }

        // using columnNames.size as index of a column
        columnNames.set(column.name, columnNames.size);

        if (column.name === freezeColumnsTo) {
            return columnNames;
        }
    }

    return new Map();
}

/** @hidden */
export function getFreezableEndColumns(columns: TableColumn[], freezeEndColumnsTo: string): Map<string, number> {
    const columnNames = new Map<string, number>();

    if (!columns.length || !freezeEndColumnsTo) {
        return columnNames;
    }

    for (let i = columns.length - 1; i >= 0; i--) {
        // using columnNames.size as index of a column
        columnNames.set(columns[i].name, columnNames.size);

        if (columns[i].name === freezeEndColumnsTo) {
            return columnNames;
        }
    }

    return new Map();
}

/** @hidden */
export function convertTreeObjectsToTableRows<T>(
    source: T[],
    selectionMode: SelectionModeValue,
    tableRows: TableRow<T>[],
    rowComparator: RowComparator<T>,
    relationKey: string,
    selectedKey: string,
    expandedStateKey: string,
    rowNavigatable: string | boolean
): TableRow<T>[] {
    const rows: TableRow<T>[] = [];
    const selectedRowsMap = getSelectionStatusByRowValue(source, selectionMode, tableRows, rowComparator);

    source.forEach((item: T, index: number) => {
        const hasChildren =
            Object.prototype.hasOwnProperty.call(item, relationKey) &&
            Array.isArray(item[relationKey]) &&
            item[relationKey].length;
        const row = isTableRow(item as TableRow<T>)
            ? (item as TableRow<T>)
            : newTableRow({
                  type: hasChildren ? TableRowType.TREE : TableRowType.ITEM,
                  checked: item[selectedKey] ?? !!selectedRowsMap.get(item),
                  index,
                  value: item
              });

        row.expanded =
            expandedStateKey && Object.prototype.hasOwnProperty.call(item, expandedStateKey)
                ? item[expandedStateKey]
                : false;
        row.navigatable = isRowNavigatable(item, rowNavigatable);
        rows.push(row);

        if (hasChildren) {
            const children = convertTreeObjectsToTableRows(
                item[relationKey],
                selectionMode,
                tableRows,
                rowComparator,
                relationKey,
                selectedKey,
                expandedStateKey,
                rowNavigatable
            );

            children.forEach((c) => {
                c.parent = c.parent || row;
                c.level = c.parent.level + 1;
                c.hidden = !row.expanded;
            });
            row.children.push(...children);

            rows.push(...children);
        }
    });

    return rows;
}

/**
 * @hidden
 * Runs `rowComparator` function against checked rows and compares them with the new `source`
 * If matched, creates an association between the source item and checked status of corresponding row.
 *
 * @returns `Map` object with the `checked` status for particular source item
 */
export function getSelectionStatusByRowValue<T>(
    source: T[],
    selectionMode: SelectionModeValue,
    tableRows: TableRow[],
    rowComparator: RowComparator<T>
): Map<T, boolean | null> {
    const rowMap = new Map<T, boolean | null>();
    if (
        (selectionMode === SelectionMode.SINGLE || selectionMode === SelectionMode.MULTIPLE) &&
        typeof rowComparator === 'function'
    ) {
        const checkedRows = tableRows.filter((r) => r.checked);
        checkedRows.forEach((row) => {
            const found = source.find((e) => rowComparator(row.value, e));
            if (found) {
                rowMap.set(found, row.checked);
            }
        });
    }
    return rowMap;
}

/** @hidden */
export function findRowChildren<T>(row: TableRow<T>, allRows: TableRow<T>[]): TableRow<T>[] {
    const rowsLength = allRows.length;

    /**
     * Since we are dealing with a flat list
     * it means all children go next right after the expandable row
     * until the next row has a mutual parent
     */

    let index = allRows.indexOf(row);
    const parents = getRowParents(row);
    const children: TableRow<T>[] = [];

    while (index++ < rowsLength) {
        const nextRow = allRows[index];
        if (!nextRow?.parent || parents.includes(nextRow.parent)) {
            break;
        }
        children.push(nextRow);
    }

    return children;
}

/**
 * Get row parents path where the first is the direct parent
 * @param row Row which parents we need to find
 * @param untilParent Parent to stop a search on. Default is "null" that means look up until the root
 * @returns parents list [direct parent, ..., ancestor]
 * @hidden
 */
export function getRowParents<T>(row: TableRow<T>, untilParent: TableRow<T> | null = null): TableRow<T>[] {
    untilParent = untilParent || null; // to avoid "undefined"
    const parents: TableRow<T>[] = [];
    let parent = row.parent || null; // empty parent should be coerced to "null" do not get into infinite loop
    while (parent && parent !== untilParent) {
        parents.push(parent);
        parent = parent.parent || null;
    }
    return parents;
}

/** @hidden */
export function toDataStream<T>(source: FdpTableDataSource<T>): TableDataSource<T> | undefined {
    if (isDataSource(source)) {
        return source as TableDataSource<T>;
    }

    if (Array.isArray(source)) {
        return new ArrayTableDataSource(source);
    }

    if (isObservable(source)) {
        return new ObservableTableDataSource(source);
    }

    return undefined;
}
/**
 * @hidden
 * Creates an empty column skeleton object.
 * @returns Column model.
 */
export function buildNewRowSkeleton<T>(editableRowSkeleton: T, columns: TableColumn[]): T {
    if (editableRowSkeleton) {
        return cloneDeep(editableRowSkeleton);
    }

    let newRow = {};
    columns.forEach((column) => {
        newRow = set(newRow, column.key, undefined);
    });

    return newRow as T;
}

/** @hidden */
export function isGroupRow(row: TableRow): boolean {
    return row.type === TableRowType.GROUP;
}

/** @hidden */
export function sortTreeLikeGroupedRows(
    groupedRows: TreeLike<TableRow>[],
    groupRulesMap: Map<string, CollectionGroup>
): TreeLike<TableRow>[] {
    if (!groupedRows[0] || !isGroupRow(groupedRows[0])) {
        return groupedRows;
    }

    const treeLikeRows = groupedRows as TreeLike<TableRow<GroupTableRowValueType>>[];
    const firstRow = treeLikeRows[0];

    treeLikeRows.forEach((group) => {
        if (group._children) {
            group._children = sortTreeLikeGroupedRows(group._children, groupRulesMap);
        }
    });

    const groupRule = groupRulesMap.get(firstRow.value.field);

    if (!groupRule || groupRule.direction === SortDirection.NONE) {
        return treeLikeRows;
    }

    const direction = groupRule.direction;
    const directionMultiplier = direction === SortDirection.ASC ? 1 : direction === SortDirection.DESC ? -1 : 0;

    return treeLikeRows.slice().sort((a, b) => {
        const aValue = a.value.value as any;
        const bValue = b.value.value as any;

        const aNumber = Number.parseFloat(aValue);
        const bNumber = Number.parseFloat(bValue);
        if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
            return (aNumber - bNumber) * directionMultiplier;
        }

        return (aValue > bValue ? 1 : -1) * directionMultiplier;
    });
}

/** @hidden */
export function convertTreeLikeToFlatList<K>(treeLikeList: TreeLike<K>[]): K[] {
    let flatList: K[] = [];

    for (const item of treeLikeList) {
        flatList.push(item);

        if (Array.isArray(item._children)) {
            flatList = flatList.concat(convertTreeLikeToFlatList(item._children));
            delete item._children;
        }
    }

    return flatList;
}

/**
 * @hidden
 * Group table rows and return tree like rows list.
 * It's intended to be called recursively.
 * @param rules group rules to group by
 * @param rows source table rows
 * @param parent row parent
 * @param level level of nesting
 */
export function createGroupedTableRowsTree(
    rules: CollectionGroup[],
    rows: TableRow[],
    parent: TableRow | null = null,
    level = 0
): TreeLike<TableRow>[] {
    rules = [...rules];

    if (!rules.length) {
        // no rules mean that it's the level of source items
        return rows.map((row) => {
            row.parent = parent;
            row.level = level;
            row.hidden = !!parent && !parent.expanded;
            return row;
        });
    }

    // Retrieve first group rule
    const rule = rules.shift()!;

    // Build map of unique values for a given group rule
    const valuesHash = rows
        .filter((r) => r.state !== 'editable')
        .reduce((hash, row) => {
            const modelValue = get(row.value, rule.field);

            if (!hash.has(modelValue)) {
                hash.set(modelValue, []);
            }

            hash.get(modelValue)?.push(row);

            return hash;
        }, new Map<unknown, TableRow[]>());

    // Build table rows tree
    let groupedTableRows: TreeLike<TableRow>[] = [];

    if (rows.some((r) => r.state === 'editable')) {
        groupedTableRows = rows
            .filter((r) => r.state === 'editable')
            .map((row) => {
                row.parent = parent;
                row.level = -1;
                row.hidden = !!parent && !parent.expanded;
                return row;
            });
    }

    for (const [value, values] of Array.from(valuesHash)) {
        const filteredRows = rows.filter((_item) => values.includes(_item));

        if (filteredRows.length === 0) {
            continue;
        }

        const groupTableRow: TreeLike<TableRow<GroupTableRowValueType>> = newTableRow<GroupTableRowValueType>({
            type: TableRowType.GROUP,
            checked: false,
            index: 0,
            value: { field: rule.field, value, count: 0 },
            parent,
            level,
            expandable: true,
            expanded: true,
            hidden: !!parent && !parent.expanded
        });

        // Ads group's children rows
        groupTableRow._children = createGroupedTableRowsTree(rules, filteredRows, groupTableRow, level + 1);

        groupTableRow.value.count = groupTableRow._children?.length;

        groupedTableRows.push(groupTableRow);
    }

    return groupedTableRows;
}
