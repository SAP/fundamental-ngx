import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DragDrop, DragRef, Point } from '@angular/cdk/drag-drop';
import { IconBarDndItemDirective, ElementChord } from './icon-bar-dnd-item.directive';
import { Subject } from 'rxjs';
import { IconBarDndListDirective } from './icon-bar-dnd-list.directive';
import { takeUntil } from 'rxjs/operators';
import { FLIPPER_SIZE } from '../../constants';
import { IconTabBarItem } from '../../types';

export interface FdDnDEvent {
  draggableItem: IconTabBarItem;
  targetItem: IconTabBarItem;
  action: 'replace'|'insert'
}

@Directive({
  selector: '[fdIconBarDndContainer]'
})
export class IconBarDndContainerDirective implements OnDestroy {

  /** Defines if drag and drop feature should be enabled for list items */
  @Input()
  set draggable(draggable: boolean) {
    this._draggable = draggable;
    this._changeDraggableState(draggable);
  }

  /** Event that is thrown, when the item is dropped */
  @Output()
  dropped = new EventEmitter<FdDnDEvent>();

  /** @hidden */
  private _dragRefItems: DragRef[] = [];

  /** @hidden  */
  private dndItemDirectives: IconBarDndItemDirective[] = [];

  /** @hidden  */
  private _dndListDirectives: Set<IconBarDndListDirective> = new Set<IconBarDndListDirective>();

  /** @hidden */
  private _elementsCoordinates: ElementChord[];

  /** @hidden */
  private _virtualSeparatorsCoordinates: ElementChord[] = [];

  /** @hidden */
  private _closestItemIndex: number = null;

  /** @hidden */
  private _closestSeparatorIndex: number = null;

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
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  /** Method called, when element is started to be dragged */
  dragStart(): void {
    /** Counting all of the elements's chords */
    this._elementsCoordinates = this.dndItemDirectives.map((item: IconBarDndItemDirective) =>
        item.getElementCoordinates());
    this._generateVirtualFlipper();
  }

  /** Method called, when the item is being moved by 1 px */
  onMove(mousePosition: Point): void {
    /** Temporary object, to store lowest distance values */
    let newClosestIndex: number = null;
    let newClosestSeparatorIndex: number = null;

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
      this.dndItemDirectives[this._closestSeparatorIndex]?.toggleSeparatorStyles();
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
      this.dndItemDirectives[this._closestItemIndex]?.toggleHoveredStyles();
      this.dndItemDirectives[this._closestSeparatorIndex]?.toggleSeparatorStyles();
    }

    this._closestSeparatorIndex = newClosestSeparatorIndex;

    if (newClosestSeparatorIndex !== null) {
      this._closestItemIndex = null;
      this.dndItemDirectives[newClosestSeparatorIndex].toggleSeparatorStyles(true);
      return;
    }
  }

  /** Method called, when element is released */
  dragEnd(dragDir: IconBarDndItemDirective): void {
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

  registerDragItem(dragItem: IconBarDndItemDirective): void {
    this._dragRefItems.push(dragItem.dragRef);
    this.dndItemDirectives.push(dragItem);
    dragItem.moved.pipe(takeUntil(this._onDestroy$)).subscribe((position: Point) => this.onMove(position));
    dragItem.started.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragStart());
    dragItem.released.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.dragEnd(dragItem));
  }

  removeDragItem(dragItem: IconBarDndItemDirective): void {
    this._dragRefItems = this._dragRefItems.filter(item => item !== dragItem.dragRef);
    this.dndItemDirectives = this.dndItemDirectives.filter(item => item !== dragItem);
  }

  registerDndList(listDir: IconBarDndListDirective): void {
    this._dndListDirectives.add(listDir);
    listDir.changeDraggableState(this._draggable);
  }

  removeDndList(listDir: IconBarDndListDirective): void {
    this._dndListDirectives.delete(listDir);
  }

  /** @hidden */
  private _generateVirtualFlipper(): void {
    this._elementsCoordinates.forEach((item, index) => {
      if (index !== this._elementsCoordinates.length - 1) {
        const isVertical = this.dndItemDirectives[index].isVertical;
        this._virtualSeparatorsCoordinates.push({
          x: isVertical ? item.x : item.x - FLIPPER_SIZE.width,
          y: isVertical ? item.y + FLIPPER_SIZE.verticalHeight : item.y,
          width: isVertical ? item.width : FLIPPER_SIZE.width,
          height: isVertical ? FLIPPER_SIZE.verticalHeight : FLIPPER_SIZE.height
        });
      }
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

function _between(x: number, min: number, max: number): boolean {
  return x >= min && x <= max;
}
