import {
    AfterContentInit,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    Output,
    QueryList
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { ElementChord, FdDropEvent, LinkPosition, ElementPosition, DndItem } from '../dnd.interfaces';
import { DND_ITEM, DND_LIST } from '../tokens';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-dnd-list]',
    providers: [{ provide: DND_LIST, useExisting: forwardRef(() => DndListDirective) }]
})
export class DndListDirective<T> implements AfterContentInit, OnDestroy {
    /**
     * Defines if the the element is allowed to be dragged in 2 dimensions,
     * When true - replace indicator will be displayed vertically
     */
    @Input()
    gridMode = false;

    /** When enabled, replace indicator will appear on whole element, instead of horizontal/vertical line before/after element */
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

    /** Event that is thrown, when items are reordered */
    @Output()
    readonly itemsChange = new EventEmitter<Array<T>>();

    /** Event that is thrown, when the item is dropped */
    @Output()
    readonly itemDropped = new EventEmitter<FdDropEvent<T>>();

    /** @hidden */
    @ContentChildren(DND_ITEM)
    dndItems: QueryList<DndItem>;

    /** @hidden */
    private _elementsCoordinates: ElementChord[];

    /** @hidden */
    private _closestItemIndex: number | null = null;

    /** @hidden */
    private _closestItemPosition: 'before' | 'after' | null = null;

    /** An RxJS Subject that will kill the current data stream (for unsubscribing)  */
    private readonly _refresh$ = new Subject<void>();

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden  */
    private _dndItemReference: DndItem[];

    /** @hidden */
    private _draggable = true;

    /** @hidden */
    ngAfterContentInit(): void {
        this._changeDraggableState(this._draggable);
        this.dndItems.changes.pipe(takeUntil(this._onDestroy$), startWith(0)).subscribe(() => this._refreshQueryList());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Method called, when the item is being moved by 1 px */
    onMove(mousePosition: ElementPosition, draggedItemIndex: number): void {
        /** Temporary object, to store lowest distance values */
        let closestItemIndex: number | null = null;

        const closestItem = this._elementsCoordinates.find((element, index) => {
            /** Check if element can be replaced */
            if (!element.stickToPosition && closestItemIndex !== index) {
                const isMouseOnElement = _isMouseOnElement(element, mousePosition);
                if (isMouseOnElement) {
                    closestItemIndex = index;

                    return true;
                }
            }
            return false;
        });

        if (!closestItem) {
            closestItemIndex = null;
        }

        /** If the closest element is different than the old one, new one is picked. It prevents from performance issues */
        if ((closestItemIndex || closestItemIndex === 0) && closestItemIndex !== this._closestItemIndex) {
            this._closestItemIndex = closestItemIndex;
            this._closestItemPosition = this._elementsCoordinates[closestItemIndex].position;
            // If closest item index is same as dragged item, just remove indicators
            if (closestItemIndex === draggedItemIndex) {
                this._removeAllLines();
                this._removeAllReplaceIndicators();
                return;
            }
            /** Generating line, that shows where the element will be placed, on drop */
            if (this.replaceMode) {
                this._createReplaceIndicator(this._closestItemIndex);
            } else {
                this._createLine(this._closestItemIndex, this._closestItemPosition);
            }
        }
    }

    /** Method called, when element is started to be dragged */
    dragStart(index: number): void {
        const draggedItemElement = this._dndItemReference[index].elementRef;
        /** Counting all of the elements's chords */
        this._elementsCoordinates = this._dndItemReference.map((item: DndItem) =>
            item.getElementCoordinates(this._isBefore(draggedItemElement, item.elementRef), this.gridMode)
        );
    }

    /** Method called, when element is released */
    dragEnd(draggedItemIndex: number): void {
        const items = this.items.slice();
        const replacedItemIndex = this._closestItemIndex;
        const draggedItem = items[draggedItemIndex];

        if (!replacedItemIndex) {
            return;
        }

        if (draggedItemIndex !== replacedItemIndex) {
            if (draggedItemIndex < replacedItemIndex) {
                for (let i = draggedItemIndex; i < replacedItemIndex; i++) {
                    items[i] = items[i + 1];
                }
            } else {
                for (let i = draggedItemIndex; i > replacedItemIndex; i--) {
                    items[i] = items[i - 1];
                }
            }

            /** Replacing items */
            items[replacedItemIndex] = draggedItem;

            this.itemsChange.emit(items);
        }

        this.itemDropped.emit({
            replacedItemIndex,
            draggedItemIndex,
            items
        });

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
        this.dndItems.forEach((item) => item.removeReplaceIndicator());
    }

    /** @hidden */
    private _createLine(closestItemIndex: number, linkPosition: LinkPosition): void {
        this._removeAllLines();
        this._dndItemReference[closestItemIndex].createLine(linkPosition, this.gridMode);
    }

    /** @hidden */
    private _createReplaceIndicator(closestItemIndex: number): void {
        this._removeAllReplaceIndicators();
        this._dndItemReference[closestItemIndex].createReplaceIndicator();
    }

    /** @hidden */
    private _refreshQueryList(): void {
        const refresh$ = merge(this._refresh$, this._onDestroy$);
        this._refresh$.next();

        this._dndItemReference = this.dndItems.toArray();

        this._changeDraggableState(this._draggable);

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
        if (this.dndItems) {
            this.dndItems.forEach((item) => {
                item.listDraggable = draggable;
                item.changeCDKDragState();
            });
        }
    }
}

function _isMouseOnElement(element: ElementChord, mousePosition: ElementPosition): boolean {
    const startX = element.x;
    const endX = element.x + element.width;

    const startY = element.y;
    const endY = element.y + element.height;

    return _between(mousePosition.x, startX, endX) && _between(mousePosition.y, startY, endY);
}

function _between(x: number, min: number, max: number): boolean {
    return x >= min && x <= max;
}
