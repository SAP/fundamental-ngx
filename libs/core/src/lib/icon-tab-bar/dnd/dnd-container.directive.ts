import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

import { DragDrop, DragRef, DropListRef, Point } from '@angular/cdk/drag-drop';
import { DndContainerItemDirective, ElementChord } from './dnd-container-item.directive';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ElementPosition } from '@fundamental-ngx/core';
import { DndContainerGroupDirective } from './dnd-container-group.directive';
import { FLIPPER_SIZE } from '../constants';

export interface FdDnDEvent<T> {
  draggableItem: T;
  replacedItem: T;
}


@Directive({
  selector: '[fdDndContainer], [fd-dnd-container]',
  providers: [DragDrop]
})
export class DndContainerDirective<T> implements AfterViewInit, OnDestroy {

  /** Defines if drag and drop feature should be enabled for list items */
  @Input()
  set draggable(draggable: boolean) {
    this._draggable = draggable;
  }

  /** Direction in which the list is oriented. */
  @Input()
  private orientation: 'horizontal' | 'vertical' = 'vertical';

  /** Event that is thrown, when the item is dropped */
  @Output()
  readonly dropped = new EventEmitter<FdDnDEvent<T>>();

  /** @hidden */
  private _draggable = true;

  /** @hidden */
  private readonly _onDestroy$ = new Subject<void>();

  /** @hidden */
  _dropListRef: DropListRef;

  /** @hidden */
  private _dragRefItems: DragRef[] = [];

  /** @hidden  */
  private _dndItemReference: DndContainerItemDirective[] = [];

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

  /** An RxJS Subject that will kill the current data stream (for unsubscribing)  */
  private readonly _refresh$ = new Subject<void>();
  private readonly _dndItems$ = new Subject<void>();

  constructor(
      public elementRef: ElementRef,
      private _dragDrop: DragDrop,
      private _dndGroup: DndContainerGroupDirective,
  ) {
  }

  /** @hidden */
  ngAfterViewInit(): void {
    this._dropListRef = this._dragDrop.createDropList(this.elementRef.nativeElement);
    this._dropListRef.sortingDisabled = true;
    this._dropListRef.autoScrollDisabled = true;
    this._dropListRef.withOrientation(this.orientation);

    this._dndGroup.addDragItem(this);

    this._dndItems$
        .pipe(
            debounceTime(200),
            takeUntil(this._onDestroy$)
        )
        .subscribe(_ => {
          this._dropListRef.withItems(this._dragRefItems);
        })
  }

  /** @hidden */
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this._dndGroup.removeDragItem(this);
    this._dropListRef.dispose();
  }

  /** Method called, when element is started to be dragged */
  dragStart(draggedItemDir: DndContainerItemDirective): void {
    /** Counting all of the elements's chords */
    this._elementsCoordinates = this._dndItemReference.map((item: DndContainerItemDirective) =>
        item.getElementCoordinates(this._isBefore(draggedItemDir.elementRef, item.elementRef))
    );
    this._generateVirtualFlipper();
  }

  /** Method called, when the item is being moved by 1 px */
  onMove(mousePosition: ElementPosition): void {
    /** Temporary object, to store lowest distance values */
    let closestItemIndex: number = null;
    let closestFlipperIndex: number = null;
    this._lastCursorPosition = mousePosition;

    this._virtualFlipperCoordinates.find((element, index) => {
      /** Check if element can be replaced */
      const isMouseOnFlipper = this._isMouseOnFlipper(element, mousePosition);
      if (isMouseOnFlipper) {
        closestFlipperIndex = index;
        return true;
      }
    });

    /** If the closest element is different than the old one, new one is picked. It prevents from performance issues */
    if ((closestFlipperIndex || closestFlipperIndex === 0) && closestFlipperIndex !== this._closestFlipperIndex) {
      this._closestFlipperIndex = closestItemIndex;
      return;
    }

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

    /** If the closest element is different than the old one, new one is picked. It prevents from performance issues */
    if ((closestItemIndex || closestItemIndex === 0) && closestItemIndex !== this._closestItemIndex) {
      this._closestItemIndex = closestItemIndex;
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
        replacedItem: this._dndItemReference[this._closestItemIndex].dndItemData,
      });
    }
    /** Reset */
    this._elementsCoordinates = [];
    this._virtualFlipperCoordinates = [];
    this._closestItemIndex = null;
    this._closestFlipperIndex = null;
  }


  addDragItem(dragItem: DndContainerItemDirective): void {
    this._dragRefItems.push(dragItem.dragRef);
    this._dndItemReference.push(dragItem);
    dragItem.moved.pipe(takeUntil(this._onDestroy$)).subscribe((position: ElementPosition) => this.onMove(position));
    dragItem.started.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragStart(dragItem));
    dragItem.released.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragEnd(dragItem));
    this._dndItems$.next();
  }

  removeDragItem(dragItem: DndContainerItemDirective): void {
    this._dragRefItems = this._dragRefItems.filter(item => item !== dragItem.dragRef);
    this._dndItemReference = this._dndItemReference.filter(item => item !== dragItem);
    this._dndItems$.next();
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
          x: item.x + item.width - FLIPPER_SIZE.width / 2,
          y: item.y + item.height - FLIPPER_SIZE.height / 2,
          width: FLIPPER_SIZE.width,
          height: FLIPPER_SIZE.height
        });
      }
    });
  }

  _isMouseOnFlipper(element: ElementChord, mousePosition: Point): boolean {
    const startX = element.x;
    const endX = element.x + element.width;

    const startY = element.y;
    const endY = element.y + element.height;

    return _between(mousePosition.x, startX, endX) && _between(mousePosition.y, startY, endY);
  }
}

function _isMouseOnElement(element: ElementChord, mousePosition: Point): boolean {
  const startX = element.x;
  const endX = element.x + element.width;

  const startY = element.y;
  const endY = element.y + element.height;

  return _between(mousePosition.x, startX, endX) && _between(mousePosition.y, startY, endY);
}

function _between(x: number, min: number, max: number): boolean {
  return x >= min && x <= max;
}
