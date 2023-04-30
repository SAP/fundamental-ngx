import { Injectable, TemplateRef } from '@angular/core';
import { Nullable, uuidv4 } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

    /** Current expanded level. */
    get expandedLevel(): Observable<number | undefined> {
        return this._expandedLevel.asObservable();
    }

    /** Tree selection mode. */
    get selectionMode(): Observable<SelectionModeModel> {
        return this._selectionMode$.asObservable();
    }

    /** @hidden */
    private readonly _expandableItems = new Map<number, { [key: string]: boolean }>();

    /** @hidden */
    private readonly _selectionMode$ = new BehaviorSubject<SelectionModeModel>({ mode: 'none', placement: 'none' });

    /** @hidden */
    private readonly _expandedLevel = new BehaviorSubject<number | undefined>(undefined);

    /**
     * @hidden
     */
    readonly detectChanges = new Subject<void>();

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
        this._selectionMode$.next({ mode, placement });
    }

    /** @hidden */
    private _emitNewExpandedLevel(): void {
        // Go from deeper level
        const levels = Array.from(this._expandableItems.keys()).sort().reverse();
        let lastLevel: number | undefined;

        for (const level of levels) {
            const levelExpandableItems = this._expandableItems.get(level)!;

            if (Object.values(levelExpandableItems).some((v) => v)) {
                lastLevel = level;
                break;
            }
        }

        this._expandedLevel.next(lastLevel);
    }
}
