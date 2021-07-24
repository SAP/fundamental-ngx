import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Optional } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

import { DragDrop, DragRef, DropListRef } from '@angular/cdk/drag-drop';
import { DndContainerItemDirective } from './dnd-container-item.directive';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DndContainerGroupDirective } from './dnd-container-group.directive';

export interface FdDnDEvent<T> {
    draggableItem: T;
    targetItem: T;
}

@Directive({
    selector: '[fdDndContainer], [fd-dnd-container]',
})
export class DndContainerDirective<T> implements AfterViewInit, OnDestroy {

    /** Direction in which the list is oriented. */
    @Input()
    orientation: 'horizontal' | 'vertical' = 'vertical';

    /** @hidden */
    private _dropListRef: DropListRef;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    private _dragRefItems: DragRef[] = [];

    private readonly _dndItems$ = new ReplaySubject<void>(1);

    constructor(
        public elementRef: ElementRef,
        private _dragDrop: DragDrop,
        @Optional() private _dndGroup: DndContainerGroupDirective<T>,
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


        this._dndItems$
            .pipe(
                debounceTime(100),
                takeUntil(this._onDestroy$)
            )
            .subscribe(_ => this._dropListRef.withItems(this._dragRefItems));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this._dropListRef.dispose();
    }

    addDragItem(dragItem: DndContainerItemDirective): void {
        this._dragRefItems.push(dragItem.dragRef);
        this._dndItems$.next();
    }

    removeDragItem(dragItem: DndContainerItemDirective): void {
        this._dragRefItems = this._dragRefItems.filter(item => item !== dragItem.dragRef);
        this._dndItems$.next();
    }
}
