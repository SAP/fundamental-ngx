import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy } from '@angular/core';
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
    dndItemData: any;

    /** Direction in which the list is oriented. */
    @Input()
    previewClass: string[] = ['fd-icon-tab-dnd-preview'];

    /** Direction in which the list is oriented. */
    @Input()
    dndHoveredClass: string[] = ['fd-icon-tab-dnd-hovered'];

    /** Direction in which the list is oriented. */
    @Input()
    dndSeparatorClass: string[] = ['fd-icon-tab-dnd-separator', 'fd-icon-tab-dnd-separator--vertical'];

    /** Event thrown when the element is moved by 1px */
    readonly moved = new EventEmitter<Point>();

    /** Event thrown when the element is released */
    readonly released = new EventEmitter<void>();

    /** Event thrown when the element is started to be dragged */
    readonly started = new EventEmitter<void>();

    /** @hidden */
    isVertical = false;
    /** @hidden
     * Drag reference, object created from DND CDK Service
     */
    dragRef: DragRef;
    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(
        public elementRef: ElementRef,
        protected _dragDrop: DragDrop,
        private _dndContainerDir: IconBarDndListDirective<any>,
        private _dndContainerGroupDir: IconBarDndContainerDirective<any>
    ) {
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.isVertical = this._dndContainerDir.dndOrientation === 'vertical';
        this._setCDKDrag();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._dndContainerDir.removeDragItem(this);
        this._dndContainerGroupDir.removeDragItem(this);
        this._onDestroy$.next();
        this._onDestroy$.complete();
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
        this.released.emit();
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

    /** @hidden */
    private _setCDKDrag(): void {
        this.dragRef = this._dragDrop.createDrag(this.elementRef);
        this.dragRef.previewClass = this.previewClass;

        this._dndContainerDir.addDragItem(this);
        this._dndContainerGroupDir.registerDragItem(this);

        this.dragRef.moved
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(event => this.onCdkMove(event.pointerPosition));

        this.dragRef.released
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this.onCdkDragReleased());

        this.dragRef.started
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this.onCdkDragStart());
    }
}
