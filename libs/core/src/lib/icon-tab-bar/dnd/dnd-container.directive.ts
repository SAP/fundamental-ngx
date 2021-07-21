import {
  AfterContentInit,
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output, QueryList, ViewChildren
} from '@angular/core';
import { merge, Subject } from 'rxjs';

import { DragDrop, DragRef, DropListRef } from '@angular/cdk/drag-drop';
import { DndContainerItemDirective } from './dnd-container-item.directive';
import { startWith, takeUntil } from 'rxjs/operators';
import { DndItemDirective, ElementPosition } from '@fundamental-ngx/core';


export interface FdDnDEvent<T> {
  draggableItem: T;
  leftNewSibling: T;
}

type LinkPosition = 'after' | 'before';

interface ElementChord {
  x: number;
  y: number;
  position: LinkPosition;
  stickToPosition?: boolean;
  width: number;
  height: number;
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
  private _dropListRef: DropListRef;

  /** @hidden */
  private _dragRefItems: DragRef[] = [];

  /** @hidden  */
  private _dndItemReference: DndContainerItemDirective[] = [];

  /** @hidden */
  private _elementsCoordinates: ElementChord[];

  /** @hidden */
  private _closestItemIndex: number = null;

  /** @hidden */
  private _closestItemPosition: 'before' | 'after' = null;

  /** An RxJS Subject that will kill the current data stream (for unsubscribing)  */
  private readonly _refresh$ = new Subject<void>();

  constructor(
      public elementRef: ElementRef,
      private _dragDrop: DragDrop,
  ) {
  }

  /** @hidden */
  ngAfterViewInit(): void {
    this._dropListRef = this._dragDrop.createDropList(this.elementRef.nativeElement);
    // this._dropListRef.withItems(this._dragRefItems);
    this._dropListRef.sortingDisabled = true;
    this._dropListRef.withOrientation(this.orientation);
    // this._dropListRef.withScrollableParents(this.parentScrollable);
  }

  /** @hidden */
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  addDragItem(dragItem: DndContainerItemDirective): void {
    this._dragRefItems.push(dragItem.dragRef);
    this._dndItemReference.push(dragItem)
    if (this._dropListRef) {
      this._dropListRef.withItems(this._dragRefItems);
    }
    this._refreshQueryList();
  }

  removeDragItem(dragItem: DndContainerItemDirective): void {
    this._dragRefItems = this._dragRefItems.filter(item => item !== dragItem.dragRef);
    this._dndItemReference = this._dndItemReference.filter(item => item !== dragItem);
    if (this._dropListRef) {
      this._dropListRef.withItems(this._dragRefItems);
    }
    this._refreshQueryList();
  }

  /** @hidden */
  private _refreshQueryList(): void {
    const refresh$ = merge(this._refresh$, this._onDestroy$);
    this._refresh$.next();

    this._changeDraggableState(this._draggable);

    this._dndItemReference.forEach((item, index) => {
      item.moved.pipe(takeUntil(refresh$)).subscribe((position: ElementPosition) => this.onMove(position, index));
      item.started.pipe(takeUntil(refresh$)).subscribe(() => this.dragStart(index));
      item.released.pipe(takeUntil(refresh$)).subscribe(() => this.dragEnd(index, item));
    });
  }


  /** Method called, when the item is being moved by 1 px */
  onMove(mousePosition: ElementPosition, draggedItemIndex: number): void {
    /** Temporary object, to store lowest distance values */
    let closestItemIndex: number = null;

    const closestItem = this._elementsCoordinates.find((element, index) => {
      /** Check if element can be replaced */
      if (!element.stickToPosition && closestItemIndex !== index) {
        const isMouseOnElement = _isMouseOnElement(element, mousePosition);
        if (isMouseOnElement) {
          closestItemIndex = index;

          return element;
        }
      }
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
      this._createReplaceIndicator(this._closestItemIndex);
    }
  }

  /** Method called, when element is started to be dragged */
  dragStart(index: number): void {
    const draggedItemElement = this._dndItemReference[index].elementRef;
    /** Counting all of the elements's chords */
    this._elementsCoordinates = this._dndItemReference.map((item: DndItemDirective) =>
        item.getElementCoordinates(this._isBefore(draggedItemElement, item.elementRef), true)
    );
  }

  /** Method called, when element is released */
  dragEnd(draggedItemIndex: number, dragDir: DndContainerItemDirective): void {
    this.dropped.emit({
      draggableItem: dragDir.dndItemData,
      leftNewSibling: this._dndItemReference[this._closestItemIndex].dndItemData,
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
    this._dndItemReference.forEach((item) => item.removeLine());
  }

  /** @hidden */
  private _removeAllReplaceIndicators(): void {
    this._dndItemReference.forEach((item) => item.removeReplaceIndicator());
  }

  /** @hidden */
  private _createLine(closestItemIndex: number, linkPosition: LinkPosition): void {
    this._removeAllLines();
    this._dndItemReference[closestItemIndex].createLine(linkPosition, true);
  }

  /** @hidden */
  private _createReplaceIndicator(closestItemIndex: number): void {
    this._removeAllReplaceIndicators();
    this._dndItemReference[closestItemIndex].createReplaceIndicator();
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
