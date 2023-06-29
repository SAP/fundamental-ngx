import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

import { DragDrop, DragRef, DropListRef } from '@angular/cdk/drag-drop';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';
import { IconTabBarDndItem, IconTabBarDndList } from '../../interfaces/icon-tab-bar-item.interface';

@Directive({
    selector: '[fdpIconBarDndList], [fdp-icon-bar-dnd-list]'
})
export class IconBarDndListDirective implements IconTabBarDndList, AfterViewInit, OnDestroy {
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
        private _dndContainer: IconBarDndContainerDirective
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._dropListRef = this._dragDrop.createDropList(this.elementRef.nativeElement);
        this._dropListRef.sortingDisabled = true;
        this._dropListRef.autoScrollDisabled = this.dndAutoScroll;
        this._dropListRef.disabled = true;
        this._dropListRef.withOrientation(this.dndOrientation);

        this._dndContainer.registerDndList(this);

        this._dndItems$
            .pipe(debounceTime(100), takeUntil(this._onDestroy$))
            .subscribe(() => this._dropListRef.withItems(this._dragRefItems));
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
     * @description Register IconTabBarDndItem to current list
     */
    registerDragItem(dragItem: IconTabBarDndItem): void {
        this._dragRefItems.push(dragItem.dragRef);
        this._dndItems$.next();
    }

    /**
     * @param dragItem
     * @description Remove registered IconTabBarDndItem to current list
     */
    removeDragItem(dragItem: IconTabBarDndItem): void {
        this._dragRefItems = this._dragRefItems.filter((item) => item !== dragItem.dragRef);
        this._dndItems$.next();
    }

    /**
     * @param draggable
     */
    changeDraggableState(draggable: boolean): void {
        this._dropListRef.disabled = !draggable;
    }
}
