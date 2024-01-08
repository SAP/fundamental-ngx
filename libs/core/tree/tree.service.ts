import { Injectable, Signal, TemplateRef, signal } from '@angular/core';
import { Nullable, uuidv4 } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import { BaseTreeItem } from './models/base-tree-item.class';
import { SelectionPlacement, SelectionType } from './models/selection-type';
import { TreeItem, TreeItemGeneric } from './models/tree-item';
import { TreeItemDefContext } from './models/tree-item-def-context';

export interface SelectionModeModel {
    mode: SelectionType;
    placement: SelectionPlacement;
}

@Injectable()
export class TreeService {
    /** Tree item template ref. */
    treeItemTemplateRef: Nullable<TemplateRef<TreeItemDefContext>>;

    /** Currently focused tree item. */
    focusedTreeItem: Nullable<BaseTreeItem>;

    /** Current expanded level. */
    get expandedLevel(): Signal<number | undefined> {
        return this._expandedLevel.asReadonly();
    }

    /** Tree selection mode. */
    get selectionMode(): Signal<SelectionModeModel> {
        return this._selectionMode$.asReadonly();
    }

    /** Whether to show navigation indicator. */
    get navigationIndicator(): Signal<boolean> {
        return this._navigationIndicator$.asReadonly();
    }

    /**
     * @hidden
     */
    readonly detectChanges = new Subject<void>();

    /** @hidden */
    private readonly _expandableItems = new Map<number, { [key: string]: boolean }>();

    /** @hidden */
    private readonly _selectionMode$ = signal<SelectionModeModel>({ mode: 'none', placement: 'none' });

    /** @hidden */
    private readonly _expandedLevel = signal<number | undefined>(undefined);

    /** @hidden */
    private readonly _navigationIndicator$ = signal(false);

    /** Sets whether the navigation indicator should be visible. */
    setNavigationIndicator(value: boolean): void {
        this._navigationIndicator$.set(value);
    }

    /** @hidden */
    normalizeTreeItems<T extends TreeItem = TreeItem>(
        items: Nullable<T[]>,
        parentId: string | null = null,
        level = 1
    ): TreeItem<TreeItemGeneric<T>>[] {
        if (!items) {
            return [];
        }
        return [...items].map((item: T) => ({
            ...item,
            ...{
                level,
                parentId,
                renderer: this.treeItemTemplateRef,
                id: item.id || uuidv4()
            }
        }));
    }

    /**
     * Adds expandable item to the object of expandable items.
     * @param id
     * @param level
     */
    addExpandableItem(id: string, level: number, expanded: boolean): void {
        const levelCollection = this._expandableItems.get(level) || {};
        levelCollection[id] = expanded;
        this._expandableItems.set(level, levelCollection);
        this._emitNewExpandedLevel();
    }

    /**
     * Removes expandable item from the object of expandable items.
     * @param id
     * @param level
     */
    removeExpandableItem(id: string, level: number): void {
        const levelCollection = this._expandableItems.get(level) || {};
        delete levelCollection[id];
        this._expandableItems.set(level, levelCollection);
        this._emitNewExpandedLevel();
    }

    /**
     * Sets selection mode and it's placement.
     * @param mode Selection mode.
     * @param placement Selection control placement.
     */
    setSelectionMode(mode: SelectionType, placement: SelectionPlacement): void {
        this._selectionMode$.set({ mode, placement });
    }

    /** @hidden */
    private _emitNewExpandedLevel(): void {
        // We need to go from level 1 to deeper level since level 4 may be expanded, yet level 2 not.
        const levels = Array.from(this._expandableItems.keys()).sort();
        let lastLevel: number | undefined;

        for (const level of levels) {
            const levelExpandableItems = this._expandableItems.get(level)!;

            if (Object.values(levelExpandableItems).every((v) => !v)) {
                break;
            }

            lastLevel = level;
        }

        this._expandedLevel.set(lastLevel);
    }
}
