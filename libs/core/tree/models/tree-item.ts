import { TemplateRef } from '@angular/core';
import { FdTreeAcceptableDataSource } from '../data-source/tree-data-source';
import { TreeItemDefContext } from './tree-item-def-context';

export type TreeItemState = 'default' | 'error' | 'success' | 'warning';

export interface TreeItem<T = any> {
    id: string;
    children: FdTreeAcceptableDataSource<Partial<TreeItem<T>>>;
    expanded: boolean;
    navigatable: boolean;
    navigationIndicator: boolean;
    data: T;
    level: number;
    renderer: TemplateRef<TreeItemDefContext<T>>;
    state: TreeItemState;
    parentId: string;
}

export type TreeItemGeneric<Type> = Type extends TreeItem<infer X> ? X : never;
