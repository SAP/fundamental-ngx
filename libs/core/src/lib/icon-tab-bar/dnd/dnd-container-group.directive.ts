import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DragDrop, DragRef, Point } from '@angular/cdk/drag-drop';
import { DndContainerItemDirective, ElementChord } from './dnd-container-item.directive';
import { Subject } from 'rxjs';
import { FdDnDEvent } from './dnd-container.directive';
import { takeUntil } from 'rxjs/operators';
import { FLIPPER_SIZE } from '../constants';

@Directive({
  selector: '[fdDndContainerGroup]'
})
export class DndContainerGroupDirective<T> implements AfterViewInit, OnDestroy {

  /** Defines if drag and drop feature should be enabled for list items */
  @Input()
  set draggable(draggable: boolean) {
    this._draggable = draggable;
  }

  /** Event that is thrown, when the item is dropped */
  @Output()
  readonly replaced = new EventEmitter<FdDnDEvent<T>>();

  /** Event that is thrown, when the item is dropped */
  @Output()
  readonly insertChild = new EventEmitter<FdDnDEvent<T>>();

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
  private _draggable = true;

  /** @hidden */
  private readonly _onDestroy$ = new Subject<void>();

  constructor(
      public elementRef: ElementRef,
      private _dragDrop: DragDrop,
  ) {
  }

  /** @hidden */
  ngAfterViewInit(): void {

  }

  /** @hidden */
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  /** Method called, when element is started to be dragged */
  dragStart(draggedItemDir: DndContainerItemDirective): void {
    /** Counting all of the elements's chords */
    this._elementsCoordinates = this.dndContainerItemDirectives.map((item: DndContainerItemDirective) =>
        item.getElementCoordinates());
    this._generateVirtualFlipper();
  }

  /** Method called, when the item is being moved by 1 px */
  onMove(mousePosition: Point): void {
    // console.log(mousePosition);
    /** Temporary object, to store lowest distance values */
    let newClosestIndex: number = null;
    let newClosestFlipperIndex: number = null;
    this._lastCursorPosition = mousePosition;

    this._elementsCoordinates.find((element, index) => {
      /** Check if element can be replaced */
      if (newClosestIndex !== index) {
        const isMouseOnElement = _isMouseOnElement(element, mousePosition);
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
      this.dndContainerItemDirectives[this._closestItemIndex]?.triggerNestedClass();
      this.dndContainerItemDirectives[this._closestFlipperIndex]?.triggerFlipperClass();
    }

    this._closestItemIndex = newClosestIndex;

    if (newClosestIndex !== null) {
      this._closestFlipperIndex = null;
      this.dndContainerItemDirectives[newClosestIndex].triggerNestedClass(true);
      return;
    }

    // Flipper checking
    this._virtualFlipperCoordinates.find((element, index) => {
      /** Check if element can be replaced */
      const isMouseOnFlipper = this._isMouseOnFlipper(element, mousePosition);
      if (isMouseOnFlipper) {
        newClosestFlipperIndex = index;
        return true;
      }
    });

    if (newClosestFlipperIndex !== null && newClosestFlipperIndex === this._closestFlipperIndex) {
      return;
    }

    if (this._closestFlipperIndex !== newClosestFlipperIndex) {
      this.dndContainerItemDirectives[this._closestItemIndex]?.triggerNestedClass();
      this.dndContainerItemDirectives[this._closestFlipperIndex]?.triggerFlipperClass();
    }

    this._closestFlipperIndex = newClosestFlipperIndex;

    if (newClosestFlipperIndex !== null) {
      this._closestItemIndex = null;
      this.dndContainerItemDirectives[newClosestFlipperIndex].triggerFlipperClass(true);
      return;
    }
  }

  /** Method called, when element is released */
  dragEnd(dragDir: DndContainerItemDirective): void {
    if (this._closestFlipperIndex || this._closestFlipperIndex === 0) {
      this.dndContainerItemDirectives[this._closestFlipperIndex].triggerNestedClass();
      this.replaced.emit({
        draggableItem: dragDir.dndItemData,
        targetItem: this.dndContainerItemDirectives[this._closestFlipperIndex + 1].dndItemData
      });
    }
    if (this._closestItemIndex || this._closestItemIndex === 0) {
      this.dndContainerItemDirectives[this._closestItemIndex].triggerFlipperClass();
      this.insertChild.emit({
        draggableItem: dragDir.dndItemData,
        targetItem: this.dndContainerItemDirectives[this._closestItemIndex].dndItemData
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
    this.dndContainerItemDirectives.push(dragItem);
    dragItem.moved.pipe(takeUntil(this._onDestroy$)).subscribe((position: Point) => this.onMove(position));
    dragItem.started.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragStart(dragItem));
    dragItem.released.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragEnd(dragItem));
  }

  removeDragItem(dragItem: DndContainerItemDirective): void {
    this._dragRefItems = this._dragRefItems.filter(item => item !== dragItem.dragRef);
    this.dndContainerItemDirectives = this.dndContainerItemDirectives.filter(item => item !== dragItem);
  }

  _isMouseOnFlipper(element: ElementChord, mousePosition: Point): boolean {
    const startX = element.x;
    const endX = element.x + element.width;

    const startY = element.y;
    const endY = element.y + element.height;

    return _between(mousePosition.x, startX, endX) && _between(mousePosition.y, startY, endY);
  }

  private _generateVirtualFlipper(): void {
    this._elementsCoordinates.forEach((item, index) => {
      if (index !== this._elementsCoordinates.length - 1) {
        const isVertical = this.dndContainerItemDirectives[index].isVertical;
        if (this.dndContainerItemDirectives[index].dndItemData.uniqueKey.startsWith('0.')) {
          debugger;
        }
        this._virtualFlipperCoordinates.push({
          x: isVertical ? item.x : item.x + item.width,
          y: isVertical ? (item.y + item.height) - FLIPPER_SIZE.verticalHeight / 2 : item.y,
          width: isVertical ? item.width : FLIPPER_SIZE.width,
          height: isVertical ? FLIPPER_SIZE.height / 2 : FLIPPER_SIZE.height
        });
      }
    });
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
