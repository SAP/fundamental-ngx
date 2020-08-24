import {
    AfterContentInit,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList
} from '@angular/core';
import { DndItemDirective, ElementPosition } from '../dnd-item/dnd-item.directive';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

export type LinkPosition = 'after' | 'before';

export interface ElementChord {
    x: number;
    y: number;
    position: LinkPosition;
    stickToPosition?: boolean;
}

export interface FdDropEvent<T> {
    items: Array<T>,
    replacedItemIndex: number;
    draggedItemIndex: number;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dnd-list]'
})
export class DndListDirective<T> implements AfterContentInit, OnDestroy {
    /**
     * Defines if the the element is allowed to be dragged in 2 dimensions,
     * replace indicator will be displayed vertically
     */
    @Input()
    gridMode = false;

    /** When enabled, replace indicator will appear on whole element, instead of horizontal/vertical line */
    @Input()
    replaceMode = false;

    /** Array of items, that will be sorted */
    @Input()
    items: Array<T>;

    /** Defines if drag and drop feature should be enabled for list items */
    @Input()
    set draggable(draggable: boolean) {
        this._draggable = draggable;
        this._changeDraggableState(draggable);
    }

    /** Event that is thrown, when the item is dropped */
    @Output()
    readonly itemsChange = new EventEmitter<Array<T>>();

    /** Event that is thrown, when the item is dropped */
    @Output()
    readonly itemDropped = new EventEmitter<FdDropEvent<T>>();

    /** @hidden */
    @ContentChildren(DndItemDirective)
    dndItems: QueryList<DndItemDirective>;

    /** @hidden */
    private _elementsCoordinates: ElementChord[];

    /** @hidden */
    private _closestItemIndex: number = null;

    /** @hidden */
    private _closestItemPosition: 'before' | 'after' = null;

    /** An RxJS Subject that will kill the current data stream (for unsubscribing)  */
    private readonly _refresh$ = new Subject<void>();

    /** @hidden */
    private readonly _onDestroy$  = new Subject<void>();

    /** @hidden  */
    private _dndItemReference: DndItemDirective[];

    /** @hidden */
    private _draggable = true;

    /** @hidden */
    ngAfterContentInit(): void {
        this._changeDraggableState(this._draggable);
        this.dndItems.changes
            .pipe(
                takeUntil(this._onDestroy$),
                startWith(0)
            )
            .subscribe(() => this._refreshQueryList());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Method called, when the item is being moved by 1 px */
    onMove(mousePosition: ElementPosition, draggedItemIndex: number): void {
        /** Temporary object, to store lowest distance values */
        let closestItem: {
            index: number;
            distance: number;
        } = null;

        this._elementsCoordinates.forEach((element, index) => {
            /** Check if element can be replaced */
            if (!element.stickToPosition) {
                /** Counting the distances by the mileage of the corner of element and cursor position */
                const distance = Math.hypot(element.x - mousePosition.x, element.y - mousePosition.y);
                if (!closestItem || distance < closestItem.distance) {
                    closestItem = { distance: distance, index: index };
                }
            }
        });

        /** If the closest element is different than the old one, new one is picked. It prevents from performance issues */
        if (closestItem.index !== this._closestItemIndex) {
            this._closestItemIndex = closestItem.index;
            this._closestItemPosition = this._elementsCoordinates[closestItem.index].position;
            // If closest item index is same as dragged item, just remove indicators
            if (closestItem.index === draggedItemIndex) {
                this._removeAllLines();
                this._removeAllReplaceIndicators();
                return;
            }
            /** Generating line, that shows where the element will be placed, on drop */
            if (this.replaceMode) {
                this._createReplacementIndicator(this._closestItemIndex);
            } else {
                this._createLine(this._closestItemIndex, this._closestItemPosition);
            }
        }
    }

    /** Method called, when element is started to be dragged */
    dragStart(index: number): void {
        const draggedItemElement = this._dndItemReference[index].element;
        /** Counting all of the elements's chords */
        this._elementsCoordinates = this._dndItemReference
            .map((item: DndItemDirective) =>
                item.getElementCoordinates(this._isBefore(draggedItemElement, item.element), this.gridMode)
            );
    }

    /** Method called, when element is released */
    dragEnd(draggedItemIndex: number): void {
        const replacedItemIndex = this._closestItemIndex;
        const draggedItem = this.items[draggedItemIndex];

        if (draggedItemIndex < replacedItemIndex) {
            for (let i = draggedItemIndex; i < replacedItemIndex; i++) {
                this.items[i] = this.items[i + 1];
            }
        } else {
            for (let i = draggedItemIndex; i > replacedItemIndex; i--) {
                this.items[i] = this.items[i - 1];
            }
        }


        /** Replacing items */
        this.items[replacedItemIndex] = draggedItem;

        this.itemsChange.emit(this.items);

        this.itemDropped.emit({
            replacedItemIndex: replacedItemIndex,
            draggedItemIndex: draggedItemIndex,
            items: this.items
        })

        this._removeAllLines();
        this._removeAllReplaceIndicators();

        /** Reset */
        this._elementsCoordinates = [];
        this._closestItemIndex = null;
        this._closestItemPosition = null;
    }

    /** @hidden */
    private _removeAllLines(): void {
        this.dndItems.forEach((item) => item.removeLine());
    }

    /** @hidden */
    private _removeAllReplaceIndicators(): void {
        this.dndItems.forEach((item) => item.removeReplacement());
    }

    /** @hidden */
    private _createLine(closestItemIndex: number, linkPosition: LinkPosition): void {
        this._removeAllLines();
        this._dndItemReference[closestItemIndex].createLine(linkPosition, this.gridMode);
    }

    /** @hidden */
    private _createReplacementIndicator(closestItemIndex: number): void {
        this._removeAllReplaceIndicators();
        this._dndItemReference[closestItemIndex].createReplaceIndicator();
    }

    /** @hidden */
    private _refreshQueryList(): void {
        const refresh$ = merge(
            this._refresh$,
            this._onDestroy$
        );
        this._refresh$.next();

        this._dndItemReference = this.dndItems.toArray();

        this.dndItems.forEach((item, index) => {
            item.moved.pipe(takeUntil(refresh$)).subscribe((position: ElementPosition) => this.onMove(position, index));
            item.started.pipe(takeUntil(refresh$)).subscribe(() => this.dragStart(index));
            item.released.pipe(takeUntil(refresh$)).subscribe(() => this.dragEnd(index));
        });
    }

    /**
     *  @hidden
     * Return information if element is placed before the dragged element
     */
    private _isBefore(draggedElement: ElementRef, targetElement: ElementRef): boolean {
        /** Sometimes the element are not straight in one column, that's why offset is needed */
        const VERTICAL_OFFSET = 20;

        /** Distances from the top of screen */
        const draggedElementBound = <DOMRect>draggedElement.nativeElement.getBoundingClientRect();
        const targetElementBound = <DOMRect>targetElement.nativeElement.getBoundingClientRect();

        if (draggedElementBound.top - targetElementBound.top > VERTICAL_OFFSET) {
            /** If element is higher than the dragged element, it's for sure before */
            return true;
        } else if (targetElementBound.top - draggedElementBound.top > VERTICAL_OFFSET) {
            /** If element is lower than the dragged element, it's for sure after */
            return false;
        } else {
            /** If elements are in same level, the horizontal position decides if it's before/after */
            return draggedElementBound.left - targetElementBound.left > 0;
        }
    }

    private _changeDraggableState(draggable: boolean): void {
        this.dndItems.forEach(item => {
            item.listDraggable = draggable;
            item.changeCDKDragState();
        })
    }
}
