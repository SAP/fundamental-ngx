import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DragDrop, DragRef, Point } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FLIPPER_SIZE } from '../../constants';
import {
    ElementChord,
    IconTabBarDndItem,
    IconTabBarDndList,
    IconTabBarItem
} from '../../interfaces/icon-tab-bar-item.interface';

export interface FdDnDEvent {
    draggableItem: IconTabBarItem;
    targetItem: IconTabBarItem;
    action: 'replace' | 'insert';
}

@Directive({
    selector: '[fdpIconBarDndContainer], [fdp-icon-bar-dnd-container]'
})
export class IconBarDndContainerDirective implements OnDestroy {
    /**
     * @description Defines if drag and drop feature should be enabled for list items
     */
    @Input()
    set draggable(draggable: boolean) {
        this._draggable = draggable;
        this._changeDraggableState(draggable);
    }

    /**
     * @description Event that is thrown, when the item is dropped
     */
    @Output()
    dropped = new EventEmitter<FdDnDEvent>();

    /** @hidden */
    private _dragRefItems: DragRef[] = [];

    /** @hidden  */
    private dndItemDirectives: IconTabBarDndItem[] = [];

    /** @hidden  */
    private _dndListDirectives: Set<IconTabBarDndList> = new Set<IconTabBarDndList>();

    /** @hidden */
    private _elementsCoordinates: ElementChord[];

    /** @hidden */
    private _virtualSeparatorsCoordinates: ElementChord[] = [];

    /** @hidden */
    private _closestItemIndex: number | null = null;

    /** @hidden */
    private _closestSeparatorIndex: number | null = null;

    /** @hidden */
    private _draggable = true;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(public elementRef: ElementRef, private _dragDrop: DragDrop) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @description Method called, when element is started to be dragged
     */
    dragStart(): void {
        /** Counting all of the elements's chords */
        this._elementsCoordinates = this.dndItemDirectives.map((item: IconTabBarDndItem) =>
            item.getElementCoordinates()
        );
        this._generateVirtualSeparators();
    }

    /**
     * @param mousePosition
     * @description Method called, when the item is being moved by 1 px
     */
    onMove(mousePosition: Point): void {
        let newClosestIndex: number | null = null;
        let newClosestSeparatorIndex: number | null = null;

        this._elementsCoordinates.find((element, index) => {
            /** Check if element can be replaced */
            if (newClosestIndex !== index) {
                const isMouseOnElement = this._isMouseOnElement(element, mousePosition);
                if (isMouseOnElement) {
                    newClosestIndex = index;
                    return true;
                }
            }
        });

        if (newClosestIndex !== null && newClosestIndex === this._closestItemIndex) {
            return;
        }

        if (this._closestItemIndex !== newClosestIndex) {
            this.dndItemDirectives[this._closestItemIndex]?.toggleHoveredStyles();
            this.dndItemDirectives[this._closestSeparatorIndex!]?.toggleSeparatorStyles();
        }

        this._closestItemIndex = newClosestIndex;

        if (newClosestIndex !== null) {
            this._closestSeparatorIndex = null;
            this.dndItemDirectives[newClosestIndex].toggleHoveredStyles(true);
            return;
        }

        // If we aren't on tab then check separator element.
        this._virtualSeparatorsCoordinates.find((element, index) => {
            const isMouseOnFlipper = this._isMouseOnFlipper(element, mousePosition);
            if (isMouseOnFlipper) {
                newClosestSeparatorIndex = index;
                return true;
            }
        });

        if (newClosestSeparatorIndex !== null && newClosestSeparatorIndex === this._closestSeparatorIndex) {
            return;
        }

        if (this._closestSeparatorIndex !== newClosestSeparatorIndex) {
            this.dndItemDirectives[this._closestItemIndex!]?.toggleHoveredStyles();
            this.dndItemDirectives[this._closestSeparatorIndex]?.toggleSeparatorStyles();
        }

        this._closestSeparatorIndex = newClosestSeparatorIndex;

        if (newClosestSeparatorIndex !== null) {
            this._closestItemIndex = null;
            this.dndItemDirectives[newClosestSeparatorIndex].toggleSeparatorStyles(true);
            return;
        }
    }

    /**
     * @param dragDir
     * @description Method called, when element is released
     */
    dragEnd(dragDir: IconTabBarDndItem): void {
        if (this._closestSeparatorIndex || this._closestSeparatorIndex === 0) {
            this.dndItemDirectives[this._closestSeparatorIndex].toggleSeparatorStyles();
            this.dropped.emit({
                draggableItem: dragDir.dndItemData,
                targetItem: this.dndItemDirectives[this._closestSeparatorIndex].dndItemData,
                action: 'replace'
            });
        }
        if (this._closestItemIndex || this._closestItemIndex === 0) {
            this.dndItemDirectives[this._closestItemIndex].toggleHoveredStyles();
            this.dropped.emit({
                draggableItem: dragDir.dndItemData,
                targetItem: this.dndItemDirectives[this._closestItemIndex].dndItemData,
                action: 'insert'
            });
        }
        /** Reset */
        this._elementsCoordinates = [];
        this._virtualSeparatorsCoordinates = [];
        this._closestItemIndex = null;
        this._closestSeparatorIndex = null;
    }

    /**
     * @param dragItem
     * @description Register IconTabBarDndItem to current container
     */
    registerDragItem(dragItem: IconTabBarDndItem): void {
        this._dragRefItems.push(dragItem.dragRef);
        this.dndItemDirectives.push(dragItem);
        dragItem.moved.pipe(takeUntil(this._onDestroy$)).subscribe((position: Point) => this.onMove(position));
        dragItem.started.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragStart());
        dragItem.released.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragEnd(dragItem));
    }

    /**
     * @param dragItem
     * @description Remove registered IconTabBarDndItem to current container
     */
    removeDragItem(dragItem: IconTabBarDndItem): void {
        this._dragRefItems = this._dragRefItems.filter((item) => item !== dragItem.dragRef);
        this.dndItemDirectives = this.dndItemDirectives.filter((item) => item !== dragItem);
    }

    /**
     * @param listDir
     * @description Register IconTabBarDndList to current container
     */
    registerDndList(listDir: IconTabBarDndList): void {
        this._dndListDirectives.add(listDir);
        listDir.changeDraggableState(this._draggable);
    }

    /**
     * @param listDir
     * @description Remove registered IconTabBarDndList to current container
     */
    removeDndList(listDir: IconTabBarDndList): void {
        this._dndListDirectives.delete(listDir);
    }

    /**
     * @description Generate virtual elements as separator between tabs
     */
    private _generateVirtualSeparators(): void {
        this._elementsCoordinates.forEach((item, index) => {
            const isVertical = this.dndItemDirectives[index].isVertical;
            this._virtualSeparatorsCoordinates.push({
                x: isVertical ? item.x : item.x - FLIPPER_SIZE.width,
                y: isVertical ? item.y + FLIPPER_SIZE.verticalHeight : item.y,
                width: isVertical ? item.width : FLIPPER_SIZE.width,
                height: isVertical ? FLIPPER_SIZE.verticalHeight : FLIPPER_SIZE.height
            });
        });
    }

    /** @hidden */
    private _changeDraggableState(draggable: boolean): void {
        for (const list of this._dndListDirectives) {
            list.changeDraggableState(draggable);
        }
    }

    /** @hidden */
    private _isMouseOnFlipper(element: ElementChord, mousePosition: Point): boolean {
        const startX = element.x;
        const endX = element.x + element.width;

        const startY = element.y;
        const endY = element.y + element.height;

        return _between(mousePosition.x, startX, endX) && _between(mousePosition.y, startY, endY);
    }

    /** @hidden */
    private _isMouseOnElement(element: ElementChord, mousePosition: Point, isVertical: boolean = false): boolean {
        const startX = element.x;
        const endX = element.x + element.width;

        const startY = isVertical ? element.y - FLIPPER_SIZE.verticalHeight / 2 : element.y;
        const endY = element.y + element.height - FLIPPER_SIZE.verticalHeight / 2;

        return _between(mousePosition.x, startX, endX) && _between(mousePosition.y, startY, endY);
    }
}

/** @hidden */
function _between(x: number, min: number, max: number): boolean {
    return x >= min && x <= max;
}
