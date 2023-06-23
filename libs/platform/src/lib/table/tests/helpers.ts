import {
    TableChildrenDataProvider,
    TableDataProvider,
    TableRow,
    TableState
} from '@fundamental-ngx/platform/table-helpers';
import { Observable, of } from 'rxjs';

export interface SourceItem {
    id: string;
    name: string;
    description: string;
    status: string;
    isVerified: boolean;
    price: {
        value: number;
        currency: string;
    };
}

export const generateItems = (length = 50): SourceItem[] =>
    Array.from(Array(length)).map(
        (_, index): SourceItem => ({
            id: `${index}`,
            name: `Product ${index}`,
            description: `Description ${index}`,
            price: {
                value: index,
                currency: 'USD'
            },
            status: index < length / 2 ? 'valid' : 'invalid',
            isVerified: index < length / 2
        })
    );

export class TableDataProviderMock extends TableDataProvider<SourceItem> {
    /** @hidden */
    items = generateItems(50);
    /** @hidden */
    totalItems = 50;

    /** @hidden */
    fetch(): Observable<SourceItem[]> {
        return of(this.items);
    }
}

export interface SourceTreeItem {
    name: string;
    children: SourceTreeItem[] | SourceItem[];
}

export interface LazySourceTreeItem {
    name: string;
    index: number;
    hasChildren: boolean;
}

export const treeItemParentsCount = 10;
export const treeItemsChildrenPerParentCount = 1;
export const totalTreeItems = treeItemParentsCount + treeItemParentsCount * treeItemsChildrenPerParentCount;

export const generateTreeItems = (length = 50): SourceTreeItem[] =>
    Array.from(Array(length)).map(
        (_, index): SourceTreeItem => ({
            name: `${index}`,
            children: generateItems(treeItemsChildrenPerParentCount)
        })
    );

export const generateLazyTreeItems = (length = 50, level = 0): LazySourceTreeItem[] =>
    Array.from(Array(length)).map(
        (_, index): LazySourceTreeItem => ({
            name: `${index}`,
            index,
            hasChildren: level === 0 ? true : false
        })
    );

export class TreeTableDataProviderMock extends TableDataProvider<SourceTreeItem> {
    /** @hidden */
    items = generateTreeItems(treeItemParentsCount);
    /** @hidden */
    totalItems = totalTreeItems;

    /** @hidden */
    fetch(): Observable<SourceTreeItem[]> {
        return of(this.items);
    }
}

export class TreeTableRootDataProviderMock extends TableDataProvider<LazySourceTreeItem> {
    /** @hidden */
    items = generateLazyTreeItems(treeItemParentsCount);
    /** @hidden */
    totalTreeItems = totalTreeItems;
    /** @hidden */
    fetch(): Observable<LazySourceTreeItem[]> {
        return of(this.items);
    }
}

export class TreeTableChildDataProviderMock extends TableChildrenDataProvider<LazySourceTreeItem> {
    /** @hidden */
    public childItemsCount = treeItemsChildrenPerParentCount;
    /** @hidden */
    rowChildrenCount(row: TableRow<LazySourceTreeItem>): Observable<number> {
        return of(row.level === 0 ? this.childItemsCount : 0);
    }
    /** @hidden */
    fetch(
        _?: TableState,
        parentRows?: TableRow<LazySourceTreeItem>[]
    ): Observable<Map<TableRow<LazySourceTreeItem>, LazySourceTreeItem[]>> {
        const itemsMap = new Map<TableRow<LazySourceTreeItem>, LazySourceTreeItem[]>();

        parentRows
            ?.filter((r) => r.level === 0)
            .forEach((row) => {
                itemsMap.set(row, generateLazyTreeItems(this.childItemsCount, row.level + 1));
            });
        return of(itemsMap);
    }
}
