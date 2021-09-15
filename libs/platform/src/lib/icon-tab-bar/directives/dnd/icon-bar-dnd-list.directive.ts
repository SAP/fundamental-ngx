import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

import { DragDrop, DragRef, DropListRef } from '@angular/cdk/drag-drop';
import { IconBarDndItemDirective } from './icon-bar-dnd-item.directive';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';

@Directive({
    selector: '[fdpIconBarDndList], [fdp-icon-bar-dnd-list]',
})
export class IconBarDndListDirective implements AfterViewInit, OnDestroy {

    /**
     * @description Direction in which the list is oriented.
     */
    @Input()
    dndOrientation: 'horizontal' | 'vertical' = 'vertical';

    /**
     * @description Is disabled autoscroll inside draggable list
     */
    @Input()
    dndAutoScroll = true;

    /** @hidden */
    private _dropListRef: DropListRef;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    private _dragRefItems: DragRef[] = [];

    /** @hidden */
    private readonly _dndItems$ = new ReplaySubject<void>(1);

    /** @hidden */
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

    /**
     * @param dragItem
     * @description Register IconBarDndItemDirective to current list
     */
    registerDragItem(dragItem: IconBarDndItemDirective): void {
        this._dragRefItems.push(dragItem.dragRef);
        this._dndItems$.next();
    }

    /**
     * @param dragItem
     * @description Remove registered IconBarDndItemDirective to current list
     */
    removeDragItem(dragItem: IconBarDndItemDirective): void {
        this._dragRefItems = this._dragRefItems.filter(item => item !== dragItem.dragRef);
        this._dndItems$.next();
    }

    /**
     * @param draggable
     */
    changeDraggableState(draggable: boolean): void {
        this._dropListRef.disabled = !draggable;
    }
}
