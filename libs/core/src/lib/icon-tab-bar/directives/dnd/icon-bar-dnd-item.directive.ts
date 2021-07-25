import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { DragDrop, DragRef, Point } from '@angular/cdk/drag-drop';
import { IconBarDndListDirective } from './icon-bar-dnd-list.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';


export interface ElementChord {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Directive({
  selector: '[fdIconBarDndItem]'
})
export class IconBarDndItemDirective implements AfterViewInit, OnDestroy {

  @Input()
  dndItemData: any

  /** Direction in which the list is oriented. */
  @Input()
  private previewClass: string[] = ['fd-icon-tab-bar-dnd-preview'];

  /** Direction in which the list is oriented. */
  @Input()
  private dndHoveredClass: string[] = ['fd-icon-tab-bar-dnd-hovered'];

  /** Direction in which the list is oriented. */
  @Input()
  private dndSeparatorClass: string[] = ['fd-icon-tab-dnd-separator', 'fd-icon-tab-dnd-separator--vertical'];

  /** Event thrown when the element is moved by 1px */
  readonly moved = new EventEmitter<Point>();

  /** Event thrown when the element is released */
  readonly released = new EventEmitter<void>();

  /** Event thrown when the element is started to be dragged */
  readonly started = new EventEmitter<void>();

  /** @hidden */
  isVertical = false;

  /** @hidden */
  private readonly _onDestroy$ = new Subject<void>();

  /** @hidden
   * Drag reference, object created from DND CDK Service
   */
   dragRef: DragRef;

  /** @hidden */
  constructor(
      public elementRef: ElementRef,
      protected _dragDrop: DragDrop,
      private _dndContainerDir: IconBarDndListDirective<any>,
      private _dndContainerGroupDir: IconBarDndContainerDirective<any>,
  ) {}

  /** @hidden */
  ngAfterViewInit(): void {
    this.isVertical = this._dndContainerDir.orientation === 'vertical';
    this._setCDKDrag();
  }

  /** @hidden */
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this._dndContainerDir.removeDragItem(this);
    this._dndContainerGroupDir.removeDragItem(this);
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  /** @hidden */
  private _setCDKDrag(): void {
    this.dragRef = this._dragDrop.createDrag(this.elementRef);
    this.dragRef.previewClass = this.previewClass;

    this._dndContainerDir.addDragItem(this);
    this._dndContainerGroupDir.registerDragItem(this);

    this.dragRef.moved
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(event => this.onCdkMove(event.pointerPosition))

    this.dragRef.released
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(() => this.onCdkDragReleased())

    this.dragRef.started
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(() => this.onCdkDragStart());
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
  getElementCoordinates(): ElementChord {
    /** Takes distance from the beginning of window page */
    const rect = <DOMRect>this.elementRef.nativeElement.getBoundingClientRect();

    /** Vertically distance is counted by distance from top of the side + half of the element height */
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    };
  }

  toggleSeparatorStyles(force: boolean = false): void {
    force
        ? this.elementRef.nativeElement.classList.add(...this.dndSeparatorClass)
        : this.elementRef.nativeElement.classList.remove(...this.dndSeparatorClass);
  }

  toggleHoveredStyles(force: boolean = false): void {
    force
        ? this.elementRef.nativeElement.classList.add(...this.dndHoveredClass)
        : this.elementRef.nativeElement.classList.remove(...this.dndHoveredClass);
  }
}
