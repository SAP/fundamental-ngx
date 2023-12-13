import { DragDrop, DragRef, Point } from '@angular/cdk/drag-drop';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ElementChord, IconTabBarDndItem, IconTabBarItem } from '../../interfaces/icon-tab-bar-item.interface';
import { IconBarDndContainerDirective } from './icon-bar-dnd-container.directive';
import { IconBarDndListDirective } from './icon-bar-dnd-list.directive';

@Directive({
    selector: '[fdpIconBarDndItem], [fdp-icon-bar-dnd-item]',
    standalone: true
})
export class IconBarDndItemDirective implements IconTabBarDndItem, AfterViewInit, OnDestroy {
    /**
     * @description Tab info
     */
    @Input()
    dndItemData: IconTabBarItem;

    /**
     * @description Classes for draggable preview
     */
    @Input()
    previewClass: string[] = ['fd-icon-tab-bar__item--dnd-preview'];

    /**
     * @description Classes for hovered state
     */
    @Input()
    dndHoveredClass: string[] = ['fd-icon-tab-bar__item--dnd-hovered'];

    /**
     * @description Classes for separator, when draggable element between two tabs
     */
    @Input()
    dndSeparatorClass: string[] = [
        'fd-icon-tab-bar__item--dnd-separator',
        'fd-icon-tab-bar__item--dnd-separator-vertical'
    ];

    /**
     * @description Event thrown when the element is moved by 1px
     */
    readonly moved = new Subject<Point>();

    /**
     * @description Event thrown when the element is released
     */
    readonly released = new Subject<void>();

    /**
     * @description Event thrown when the element is started to be dragged
     */
    readonly started = new Subject<void>();

    /** @ignore */
    isVertical = false;

    /**
     * @ignore
     * @description Drag reference, object created from DND CDK Service
     */
    dragRef: DragRef;

    /** @ignore */
    private readonly _onDestroy$ = new Subject<void>();

    /** @ignore */
    constructor(
        public elementRef: ElementRef,
        protected _dragDrop: DragDrop,
        private _dndListDir: IconBarDndListDirective,
        private _dndContainerDir: IconBarDndContainerDirective
    ) {}

    /** @ignore */
    ngAfterViewInit(): void {
        this.isVertical = this._dndListDir?.dndOrientation === 'vertical';
        this._setCDKDrag();
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._dndListDir.removeDragItem(this);
        this._dndContainerDir.removeDragItem(this);
        this.dragRef.dispose();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @ignore */
    onCdkDragStart(): void {
        /** Adds class */
        this.started.next();
    }

    /** @ignore */
    onCdkMove(position: Point): void {
        this.moved.next(position);
    }

    /** @ignore */
    onCdkDragReleased(): void {
        this.released.next();
    }

    /** @ignore */
    getElementCoordinates(): ElementChord {
        /** Takes distance from the beginning of window page */
        const rect = this.elementRef.nativeElement.getBoundingClientRect();

        /** Vertically distance is counted by distance from top of the side + half of the element height */
        return {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
        };
    }

    /**
     * @description Add/delete separator classes
     */
    toggleSeparatorStyles(force: boolean = false): void {
        force
            ? this.elementRef.nativeElement.classList.add(...this.dndSeparatorClass)
            : this.elementRef.nativeElement.classList.remove(...this.dndSeparatorClass);
    }

    /**
     * @description Add/delete hovered state classes
     */
    toggleHoveredStyles(force: boolean = false): void {
        force
            ? this.elementRef.nativeElement.classList.add(...this.dndHoveredClass)
            : this.elementRef.nativeElement.classList.remove(...this.dndHoveredClass);
    }

    /** @ignore */
    private _setCDKDrag(): void {
        this.dragRef = this._dragDrop.createDrag(this.elementRef);
        this.dragRef.previewClass = this.previewClass;

        this._dndListDir?.registerDragItem(this);
        this._dndContainerDir?.registerDragItem(this);

        this.dragRef.moved
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((event) => this.onCdkMove(event.pointerPosition));

        this.dragRef.released.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.onCdkDragReleased());

        this.dragRef.started.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.onCdkDragStart());
    }
}
