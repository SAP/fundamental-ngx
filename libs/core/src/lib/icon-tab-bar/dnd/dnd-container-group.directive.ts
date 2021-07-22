import { AfterContentInit, AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { DragDrop, DropListRef } from '@angular/cdk/drag-drop';
import { DndContainerItemDirective } from './dnd-container-item.directive';
import { Subject } from 'rxjs';
import { DndContainerDirective } from './dnd-container.directive';

@Directive({
  selector: '[fdDndContainerGroup]'
})
export class DndContainerGroupDirective implements AfterViewInit, OnDestroy {

  /** @hidden */
  private readonly _onDestroy$ = new Subject<void>();

  private _dropListRefList: DropListRef<any>[] = [];

  private initialized = false;

  constructor(
      public elementRef: ElementRef,
      private _dragDrop: DragDrop,
  ) {
  }

  /** @hidden */
  ngAfterViewInit(): void {
    this._updateConnections();
    this.initialized = true;
  }

  /** @hidden */
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  addDragItem(dragContainer: DndContainerDirective<any>): void {
    this._dropListRefList.push(dragContainer._dropListRef);
    if (this.initialized) {
      this._updateConnections();
    }
  }

  removeDragItem(dragContainer: DndContainerDirective<any>): void {
    this._dropListRefList = this._dropListRefList.filter(item => item !== dragContainer._dropListRef);
    if (this.initialized) {
      this._updateConnections();
    }
  }

  private _updateConnections(): void {
    this._dropListRefList.forEach(ref => {
      const arr = this._dropListRefList.filter(item => item !== ref);
      ref.connectedTo(arr);
    });
  }
}
