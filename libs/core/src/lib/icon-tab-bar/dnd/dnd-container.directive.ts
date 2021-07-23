import { AfterViewInit, Directive, ElementRef, EventEmitter, InjectionToken, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { DragDrop, DragRef, DropListRef, Point } from '@angular/cdk/drag-drop';
import { DndContainerItemDirective, ElementChord } from './dnd-container-item.directive';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FLIPPER_SIZE } from '../constants';
import { DndService } from './dnd.service';

export interface FdDnDEvent<T> {
    draggableItem: T;
    replacedItem: T;
}

export const FD_DND_CONTAINER = new InjectionToken<DndContainerDirective<any>>('FD_DND_CONTAINER');

@Directive({
    selector: '[fdDndContainer], [fd-dnd-container]',
    providers: [
        {provide: FD_DND_CONTAINER, useExisting: DndContainerDirective},
        DndService,
    ]
})
export class DndContainerDirective<T> implements AfterViewInit, OnDestroy {

    /** Direction in which the list is oriented. */
    @Input()
    private orientation: 'horizontal' | 'vertical' = 'horizontal';

    /** Direction in which the list is oriented. */
    @Input()
    private nestedClass: string;

    /** Direction in which the list is oriented. */
    @Input()
    private flipperClass: string;

    /** Event that is thrown, when the item is dropped */
    @Output()
    readonly dropped = new EventEmitter<FdDnDEvent<T>>();
    /** @hidden */
    _dropListRef: DropListRef;
    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();
    /** @hidden */
    private _dragRefItems: DragRef[] = [];
    /** @hidden  */
    private dndContainerItemDirectives: DndContainerItemDirective[] = [];
    /** @hidden */
    private _elementsCoordinates: ElementChord[];
    /** @hidden */
    private _virtualFlipperCoordinates: ElementChord[] = [];
    /** @hidden */
    private _closestItemIndex: number = null;
    /** @hidden */
    private _closestFlipperIndex: number = null;
    /** @hidden */
    private _lastCursorPosition: Point;
    /** @hidden */
    private _isVertical = false;

    private readonly _dndItems$ = new Subject<void>();

    private counter = 0;

    constructor(
        public elementRef: ElementRef,
        private _dragDrop: DragDrop,
        private _dndService: DndService,
    ) {
    }

    /** @hidden */
    private _draggable = true;

    /** Defines if drag and drop feature should be enabled for list items */
    @Input()
    set draggable(draggable: boolean) {
        this._draggable = draggable;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._dropListRef = this._dragDrop.createDropList(this.elementRef.nativeElement);
        this._dropListRef.sortingDisabled = true;
        this._dropListRef.autoScrollDisabled = true;
        this._dropListRef.withOrientation(this.orientation);
        this._isVertical = this.orientation === 'vertical';

        // this._dndGroup.addDragItem(this);

        // this._dndItems$
        //     .pipe(
        //         debounceTime(200),
        //         takeUntil(this._onDestroy$)
        //     )
        //     .subscribe(_ => {
        //         this._dropListRef.withItems(this._dragRefItems);
        //     });

        this._dndService.dndItems$
            .pipe(
                debounceTime(200),
                takeUntil(this._onDestroy$)
            )
            .subscribe((items) => {
                console.log(items, this.orientation);
                this._dropListRef.withItems(items);
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        // this._dndGroup.removeDragItem(this);
        this._dropListRef.dispose();
    }

    /** Method called, when element is started to be dragged */
    dragStart(draggedItemDir: DndContainerItemDirective): void {
        /** Counting all of the elements's chords */
        this._elementsCoordinates = this.dndContainerItemDirectives.map((item: DndContainerItemDirective) =>
            item.getElementCoordinates(this._isBefore(draggedItemDir.elementRef, item.elementRef)));
        this._generateVirtualFlipper();
    }

    /** Method called, when the item is being moved by 1 px */
    onMove(mousePosition: Point): void {
      // console.log(mousePosition);
        /** Temporary object, to store lowest distance values */
        let closestItemIndex: number = null;
        let closestFlipperIndex: number = null;
        this._lastCursorPosition = mousePosition;

        this._elementsCoordinates.find((element, index) => {
            /** Check if element can be replaced */
            if (closestItemIndex !== index) {
                const isMouseOnElement = _isMouseOnElement(element, mousePosition);
                if (isMouseOnElement) {
                    closestItemIndex = index;
                    return true;
                }
            }
        });

        if (closestItemIndex !== null && closestItemIndex === this._closestItemIndex) {
            return;
        }

        if (this._closestItemIndex !== closestItemIndex) {
            this.dndContainerItemDirectives[this._closestItemIndex]?.removeClasses([this.flipperClass, this.nestedClass]);
            this.dndContainerItemDirectives[this._closestFlipperIndex]?.removeClasses([this.flipperClass, this.nestedClass]);
        }

        this._closestItemIndex = closestItemIndex;

        if (closestItemIndex !== null) {
            this._closestFlipperIndex = null;
            this.dndContainerItemDirectives[this._closestItemIndex].addClasses([this.nestedClass]);
            return;
        }

        // Flipper checking
        this._virtualFlipperCoordinates.find((element, index) => {
            /** Check if element can be replaced */
            const isMouseOnFlipper = this._isMouseOnFlipper(element, mousePosition);
            if (isMouseOnFlipper) {
                closestFlipperIndex = index;
                return true;
            }
        });

        if (closestFlipperIndex !== null && closestFlipperIndex === this._closestFlipperIndex) {
            return;
        }

        if (this._closestFlipperIndex !== closestFlipperIndex) {
            this.dndContainerItemDirectives[this._closestItemIndex]?.removeClasses([this.flipperClass, this.nestedClass]);
            this.dndContainerItemDirectives[this._closestFlipperIndex]?.removeClasses([this.flipperClass, this.nestedClass]);
        }

        this._closestFlipperIndex = closestFlipperIndex;

        if (closestFlipperIndex !== null) {
            this._closestItemIndex = null;
            this.dndContainerItemDirectives[this._closestFlipperIndex].addClasses([this.flipperClass]);
            console.log('add flipper class');
            return;
        }
    }

    /** Method called, when element is released */
    dragEnd(dragDir: DndContainerItemDirective): void {
        if (this._closestItemIndex) {
            // const isBefore = this._isBefore(this._dndItemReference[this._closestItemIndex].dndItemData, dragDir.elementRef);
            // const draggableItemCoords = dragDir.getElementCoordinates(isBefore);
            // const isNestedMode = this._isNestedMode(draggableItemCoords, this._lastCursorPosition);
            this.dropped.emit({
                draggableItem: dragDir.dndItemData,
                replacedItem: this.dndContainerItemDirectives[this._closestItemIndex].dndItemData
            });
        }
        /** Reset */
        this._elementsCoordinates = [];
        this._virtualFlipperCoordinates = [];
        this._closestItemIndex = null;
        this._closestFlipperIndex = null;
    }

    addDragItem(dragItem: DndContainerItemDirective): void {
        // this.counter++;
        // console.log(this.counter, this.orientation);
        this._dragRefItems.push(dragItem.dragRef);
        this.dndContainerItemDirectives.push(dragItem);
        dragItem.moved.pipe(takeUntil(this._onDestroy$)).subscribe((position: Point) => this.onMove(position));
        dragItem.started.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragStart(dragItem));
        dragItem.released.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragEnd(dragItem));
        this._dndItems$.next();
    }

    removeDragItem(dragItem: DndContainerItemDirective): void {
        this._dragRefItems = this._dragRefItems.filter(item => item !== dragItem.dragRef);
        this.dndContainerItemDirectives = this.dndContainerItemDirectives.filter(item => item !== dragItem);
        this._dndItems$.next();
    }

    _isMouseOnFlipper(element: ElementChord, mousePosition: Point): boolean {
        const startX = element.x;
        const endX = element.x + element.width;

        const startY = element.y;
        const endY = element.y + element.height;

        return _between(mousePosition.x, startX, endX) && _between(mousePosition.y, startY, endY);
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
        // if (this.dndItems) {
        //   this.dndItems.forEach((item) => {
        //     item.listDraggable = draggable;
        //     item.changeCDKDragState();
        //   });
        // }
    }

    private _generateVirtualFlipper(): void {
        this._elementsCoordinates.forEach((item, index) => {
            if (index !== this._elementsCoordinates.length - 1) {
                this._virtualFlipperCoordinates.push({
                    x: this._isVertical ? item.x : item.x + item.width,
                    y: this._isVertical ? (item.y + item.height) - FLIPPER_SIZE.verticalHeight / 2 : item.y,
                    width: this._isVertical ? item.width : FLIPPER_SIZE.width,
                    height: this._isVertical ? FLIPPER_SIZE.height / 2 : FLIPPER_SIZE.height
                });
            }
        });
    }
}

function _isMouseOnElement(element: ElementChord, mousePosition: Point, isVertical: boolean = false): boolean {
    const startX = element.x;
    const endX = element.x + element.width;

    const startY = isVertical ? element.y - FLIPPER_SIZE.verticalHeight / 2 : element.y;
    const endY = element.y + element.height - FLIPPER_SIZE.verticalHeight / 2;

    return _between(mousePosition.x, startX, endX) && _between(mousePosition.y, startY, endY);
}

function _between(x: number, min: number, max: number): boolean {
    return x >= min && x <= max;
}
