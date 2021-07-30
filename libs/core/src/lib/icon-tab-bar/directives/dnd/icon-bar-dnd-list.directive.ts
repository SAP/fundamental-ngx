import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Optional } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

import { DragDrop, DragRef, DropListRef } from '@angular/cdk/drag-drop';
import { IconBarDndItemDirective } from './icon-bar-dnd-item.directive';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';

@Directive({
    selector: '[fdIconBarDndList]',
})
export class IconBarDndListDirective implements AfterViewInit, OnDestroy {

    /** Direction in which the list is oriented. */
    @Input()
    dndOrientation: 'horizontal' | 'vertical' = 'vertical';

    @Input()
    dndAutoScroll = true;

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
        private _dndContainer: IconBarDndContainerDirective,
    ) {
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._dropListRef = this._dragDrop.createDropList(this.elementRef.nativeElement);
        this._dropListRef.sortingDisabled = true;
        this._dropListRef.autoScrollDisabled = this.dndAutoScroll;
        this._dropListRef.disabled = true;
        this._dropListRef.withOrientation(this.dndOrientation);

        this._dndContainer.registerDndList(this);


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
        this._dndContainer.removeDndList(this);
    }

    registerDragItem(dragItem: IconBarDndItemDirective): void {
        this._dragRefItems.push(dragItem.dragRef);
        this._dndItems$.next();
    }

    removeDragItem(dragItem: IconBarDndItemDirective): void {
        this._dragRefItems = this._dragRefItems.filter(item => item !== dragItem.dragRef);
        this._dndItems$.next();
    }

    changeDraggableState(draggable: boolean): void {
        this._dropListRef.disabled = !draggable;
    }
}
