import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import { DragDrop, DragRef, Point } from '@angular/cdk/drag-drop';
import { DndContainerDirective } from './dnd-container.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type LinkPosition = 'after' | 'before';

export interface ElementChord {
  x: number;
  y: number;
  position?: LinkPosition;
  width: number;
  height: number;
}

@Directive({
  selector: '[fdDndContainerItem], [fd-dnd-container-item]'
})
export class DndContainerItemDirective implements AfterContentInit, OnDestroy {

  @Input()
  dndItemData: any

  @Input()
  orientation: 'horizontal'|'vertical' = 'horizontal';

  /** Defines if element is draggable */
  @Input()
  set draggable(draggable: boolean) {
    this._draggable = draggable;
    this.changeCDKDragState();
  }

  /** Event thrown when the element is moved by 1px */
  @Output()
  readonly moved = new EventEmitter<Point>();

  /** Event thrown when the element is released */
  @Output()
  readonly released = new EventEmitter<void>();

  /** Event thrown when the element is started to be dragged */
  @Output()
  readonly started = new EventEmitter<void>();

  /** @hidden */
  private readonly _onDestroy$ = new Subject<void>();

  /** @hidden */
  private _draggable = true;

  /** @hidden
   * Drag reference, object created from DND CDK Service
   */
   dragRef: DragRef;

  /** @hidden */
  constructor(
      public elementRef: ElementRef,
      protected _dragDrop: DragDrop,
      protected _vcr: ViewContainerRef,
      @Optional() private _dndContainerDir: DndContainerDirective<any>,
      ) {}

  /** @hidden */
  ngAfterContentInit(): void {
    this._setCDKDrag();
  }

  /** @hidden */
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this._dndContainerDir.removeDragItem(this);
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  /** @hidden */
  private _setCDKDrag(): void {
    this.dragRef = this._dragDrop.createDrag(this.elementRef);
    this.dragRef.previewClass = 'fd-icon-tab-bar-dnd-preview';

    this._dndContainerDir.addDragItem(this);

    this.dragRef.moved
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(event => this.onCdkMove(event.pointerPosition))

    this.dragRef.released
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(() => this.onCdkDragReleased())

    this.dragRef.started
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(() => this.onCdkDragStart())
  }

  /** @hidden */
  onCdkDragStart(): void {
    /** Adds class */
    this.started.emit();
  }

  /** @hidden */
  onCdkMove(position: Point): void {
    this.moved.emit(position);
  }

  /** @hidden */
  onCdkDragReleased(): void {
    /** Remove class which is added, when element is dragged */
    this.released.emit();

    /** Resets the position of element. */
    // this._dragRef.reset();
  }

  /** @hidden */
  changeCDKDragState(): void {
    if (this.dragRef) {
      this.dragRef.disabled = !this._draggable;
    }
  }

  /** @hidden */
  getElementCoordinates(isBefore: boolean): ElementChord {
    /** Takes distance from the beginning of window page */
    const rect = <DOMRect>this.elementRef.nativeElement.getBoundingClientRect();

    const position: LinkPosition = isBefore ? 'before' : 'after';

    /** Vertically distance is counted by distance from top of the side + half of the element height */
    return {
      x: rect.left,
      position: position,
      y: rect.top,
      width: rect.width,
      height: rect.height
    };
  }
}
