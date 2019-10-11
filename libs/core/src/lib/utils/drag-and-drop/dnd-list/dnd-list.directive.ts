import { AfterContentInit, ContentChildren, Directive, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { DndContainerDirective } from '../dnd-container/dnd-container.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


export type LinkPosition = 'after' | 'before';

export interface ElementChord {
    x: number;
    y: number;
    position: LinkPosition;
}

@Directive({
    // tslint:disable-next-line:directive-selector
  selector: '[fd-dnd-list]',
})
export class DndListDirective implements AfterContentInit {

    /** @hidden */
    @ContentChildren(DndContainerDirective)
    dndContainerItems: QueryList<DndContainerDirective>;

    /** Defines if the distance between elements should be counted only by vertical distance */
    @Input()
    listMode: boolean = false;

    /** Array of items, that will be sorted */
    @Input()
    public items: Array<any>;

    /** Event that is thrown, when the item is dropped */
    @Output()
    readonly itemsChange: EventEmitter<Array<any>> = new EventEmitter<any>();

    /** @hidden */
    private elementChords: ElementChord[];

    /** @hidden */
    private draggedItemIndex: number = 1000000;

    /** @hidden */
    private closestLinkIndex: number = null;

    /** @hidden */
    private closestLinkPosition: 'before' | 'after' = null;

    /** An RxJS Subject that will kill the current data stream (for unsubscribing)  */
    private readonly refresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    public ngAfterContentInit(): void {
        this.refreshQueryList();
        this.dndContainerItems.changes.subscribe(() => this.refreshQueryList());
    }

    /** Method called, when the item is being moved by 1 px */
    onMove(event: CdkDragMove): void {
        const distances: Array<number> = [];

        /** Taking mouse position */
        const mousePosition: {
            x: number;
            y: number;
        } = event.pointerPosition;

        /** Counting the distances by the mileage of the corner of element and cursor position */
        this.elementChords.forEach(linkChord => {
            const distance = Math.hypot(linkChord.x - mousePosition.x, linkChord.y - mousePosition.y);
            distances.push(distance);
        });

        /** Checking closest element */
        const closeLinkIndex: number = distances.indexOf(Math.min(...distances));

        /** If the closest element is different than the old one, new one is picked. It prevents from performance issues */
        if (closeLinkIndex !== this.closestLinkIndex) {
            this.closestLinkIndex = closeLinkIndex;
            this.closestLinkPosition = this.elementChords[closeLinkIndex].position;
            /** Generating line, that shows where the element will be placed, on drop */
            this.generateLine(this.closestLinkIndex, this.closestLinkPosition);
        }
    }

    /** Method called, when element is started to be dragged */
    dragStart(ind: number): void {
        this.draggedItemIndex = ind;
        /** Counting all of the elements's chords */
        this.elementChords = this.dndContainerItems.toArray().map((link, index: number) => {
            const isBefore = (): boolean => index < ind;
            return link.getElementChord(isBefore(), this.listMode);
        });
    }

    /** Method called, when element is released */
    dragEnd(): void {

        const draggedItemIndex = this.draggedItemIndex;
        const replacedItemIndex = this.closestLinkIndex;
        const draggedItem = this.items[draggedItemIndex];

        if (draggedItemIndex < replacedItemIndex) {
            for (let i = draggedItemIndex; i < replacedItemIndex; i++) {
                this.items[i] = this.items[i + 1];
            }
        } else {
            for (let i = draggedItemIndex; i > replacedItemIndex; i--) {
                this.items[i] = this.items[i - 1];
            }
        }

        /** Replacing items */
        this.items[replacedItemIndex] = draggedItem;

        this.itemsChange.emit(this.items);

        this.removeAllLines();

        /** Reset */
        this.elementChords = [];
        this.closestLinkIndex = null;
        this.closestLinkPosition = null;
    }

    /** @hidden */
    private removeAllLines(): void {
        this.dndContainerItems.forEach(item => item.removeLine());
    }

    /** @hidden */
    private generateLine(closestLinkIndex: number, linkPosition: LinkPosition): void {
        this.removeAllLines();
        this.dndContainerItems.toArray()[closestLinkIndex].createLine(linkPosition, this.listMode);
    }

    /** @hidden */
    private refreshQueryList(): void {
        this.refresh$.next();
        this.dndContainerItems.forEach((item, index) => {
            item.moved.pipe(takeUntil(this.refresh$)).subscribe(eventMove => this.onMove(eventMove));
            item.started.pipe(takeUntil(this.refresh$)).subscribe(() => this.dragStart(index));
            item.released.pipe(takeUntil(this.refresh$)).subscribe(() => this.dragEnd());
        });
    }
}
