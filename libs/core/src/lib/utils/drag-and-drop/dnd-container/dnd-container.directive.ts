import {
    AfterContentInit,
    ContentChild, Directive,
    ElementRef, EventEmitter, Input,
    Output
} from '@angular/core';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { ElementChord, LinkPosition } from '../dnd-list/dnd-list.directive';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dnd-container]',
    host: {
        'class': 'fd-dnd-container'
    }
})
export class DndContainerDirective implements AfterContentInit {

    /** Class added to element, when it's dragged. */
    readonly CLASS_WHEN_ELEMENT_DRAGGED: string = 'fd-dnd-on-drag';

    private placeholderElement: HTMLElement;

    private lineElement: HTMLElement;
    /** Event thrown when the element is moved by 1px */
    @Output()
    readonly moved: EventEmitter<CdkDragMove> = new EventEmitter<CdkDragMove>();

    /** Event thrown when the element is released */
    @Output()
    readonly released: EventEmitter<void> = new EventEmitter<void>();

    /** Event thrown when the element is started to be dragged */
    @Output()
    readonly started: EventEmitter<void> = new EventEmitter<void>();

    /** Whether this element should stick in one place, without changing position */
    @Input() stickInPlace: boolean = false;

    /** @hidden */
    @ContentChild(CdkDrag)
    cdkDrag: CdkDrag;

    constructor(
        public element: ElementRef,
    ) {}

    /** @hidden */
    public getElementChord(isBefore: boolean, listMode: boolean): ElementChord {

        /** Takes distance from the beginning of window page */
        const rect = <DOMRect>this.element.nativeElement.getBoundingClientRect();

        const position: LinkPosition = isBefore ? 'before' : 'after';

        /** Depending on the position, gets the left or right side of element */
        const x = rect.x + (isBefore || listMode ? 0 : this.element.nativeElement.offsetWidth);

        /** Vertically distance is counted by distance from top of the side + half of the element height */
        return {
            x: x,
            position: position,
            y: rect.y + (this.element.nativeElement.offsetHeight / 2),
            stickToPosition: this.stickInPlace
        };
    }

    /** @hidden */
    public ngAfterContentInit(): void {
        this.cdkDrag.moved.subscribe((event: CdkDragMove) => {
            this.onCdkMove(event);
        });
        this.cdkDrag.released.subscribe(() => {
            this.onCdkDragReleased();
        });
        this.cdkDrag.started.subscribe(() => {
            this.onCdkDragStart();
        });
    }

    /** @hidden */
    public onCdkMove(cdkMovedEvent: CdkDragMove): void {
        this.moved.emit(cdkMovedEvent);
    }

    /** @hidden */
    public onCdkDragReleased(): void {
        /** Remove class which is added, when element is dragged */
        this.element.nativeElement.classList.remove(this.CLASS_WHEN_ELEMENT_DRAGGED);
        this.released.emit();

        /** Resets the position of element. */
        this.cdkDrag.reset();

        /** Removes placeholder element */
        this.removePlaceholder();
    }

    /** @hidden */
    public onCdkDragStart(): void {
        /** Adds class */
        this.element.nativeElement.classList.add(this.CLASS_WHEN_ELEMENT_DRAGGED);
        if (!this.placeholderElement) {
            this.createPlaceHolder();
        }
        this.started.emit();
    }

    /** @hidden */
    public removePlaceholder(): void {
        if (this.placeholderElement) {
            this.placeholderElement.remove();
            this.placeholderElement = null;
        }
    }

    /** @hidden */
    public removeLine(): void {
        if (this.lineElement) {
            this.lineElement.remove();
            this.lineElement = null;
        }
    }

    /** @hidden */
    public createLine(position: LinkPosition, listMode: boolean): void {
        /** Creating of line element */
        this.lineElement = document.createElement('DIV');
        if (listMode) {
            this.lineElement.classList.add('drop-area__line');
            this.lineElement.classList.add('drop-area__line--horizontal');
        } else {
            this.lineElement.classList.add('drop-area__line');
            this.lineElement.classList.add('drop-area__line--vertical');
        }
        if (position === 'after') {
            this.lineElement.classList.add('after');
        }
        if (position === 'before') {
            this.lineElement.classList.add('before');
        }

        /** Putting element to the container */
        this.element.nativeElement.appendChild(this.lineElement);
    }

    /** @hidden */
    private createPlaceHolder(): void {
        /** Cloning container element */
        const clone = this.cdkDrag.element.nativeElement.cloneNode(true);

        /** Taking cloned element reference */
        this.placeholderElement = clone.firstChild.parentElement;

        this.placeholderElement.classList.add('fd-dnd-placeholder');

        /** Including element to the container */
        this.element.nativeElement.appendChild(clone);
    }
}
