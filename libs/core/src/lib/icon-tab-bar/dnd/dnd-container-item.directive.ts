import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { DndContainerDirective } from './dnd-container.directive';
import { Subject } from 'rxjs';
import { DndItemDirective, ElementChord, LinkPosition } from '@fundamental-ngx/core';
import { takeUntil } from 'rxjs/operators';

interface ElementPosition {
  x: number;
  y: number;
}

@Directive({
  selector: '[fdDndContainerItem], [fd-dnd-container-item]'
})
export class DndContainerItemDirective extends DndItemDirective implements AfterViewInit, OnDestroy {

  @Input()
  dndItemData: any


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
      private _dndContainerDir: DndContainerDirective<any>,
      ) {
    super(elementRef, _dragDrop)
  }

  /** @hidden */
  ngAfterViewInit(): void {
    this._setCDKDrag();
  }

  /** @hidden */
  ngOnDestroy(): void {
    this._dndContainerDir.removeDragItem(this);
    this._onDestroy$.next();
    this._onDestroy$.complete();
    super.ngOnDestroy();
  }

  /** @hidden */
  protected _setCDKDrag(): void {
    this.dragRef = this._dragDrop.createDrag(this.elementRef);
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
}
