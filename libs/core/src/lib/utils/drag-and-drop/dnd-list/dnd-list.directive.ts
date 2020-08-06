import {
    AfterContentInit,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList
} from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { DndItemDirective } from '../dnd-item/dnd-item.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type LinkPosition = 'after' | 'before';

export interface ElementChord {
    x: number;
    y: number;
    position: LinkPosition;
    stickToPosition?: boolean;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dnd-list]'
})
export class DndListDirective implements AfterContentInit {
    /** @hidden */
    @ContentChildren(DndItemDirective)
    dndContainerItems: QueryList<DndItemDirective>;

    /** Defines if the distance between elements should be counted only by vertical distance */
    @Input()
    listMode = false;

    /** When enabled, replace indicator will appear on whole element, instead of horizontal/vertical line */
    @Input()
    replaceMode = false;

    /** Array of items, that will be sorted */
    @Input()
    public items: Array<any>;

    /** Event that is thrown, when the item is dropped */
    @Output()
    readonly itemsChange = new EventEmitter<any>();

    /** @hidden */
    private _elementChords: ElementChord[];

    /** @hidden */
    private _draggedItemIndex = 1000000;

    /** @hidden */
    private _closestLinkIndex: number = null;

    /** @hidden */
    private _closestLinkPosition: 'before' | 'after' = null;

    /** An RxJS Subject that will kill the current data stream (for unsubscribing)  */
    private readonly _refresh$ = new Subject<void>();

    /** @hidden */
    public ngAfterContentInit(): void {
        this._refreshQueryList();
        this.dndContainerItems.changes.subscribe(() => this._refreshQueryList());
    }

    /** Method called, when the item is being moved by 1 px */
    onMove(event: CdkDragMove): void {
        /** Taking mouse position */
        const mousePosition: {
            x: number;
            y: number;
        } = event.pointerPosition;

        /** Temporary object, to store lowest distance values */
        let lowestDistanceItem: {
            index: number;
            distance: number;
        } = null;

        this._elementChords.forEach((element, index) => {
            /** Check if element can be replaced */
            if (!element.stickToPosition) {
                /** Counting the distances by the mileage of the corner of element and cursor position */
                const distance = Math.hypot(element.x - mousePosition.x, element.y - mousePosition.y);
                if (!lowestDistanceItem || distance < lowestDistanceItem.distance) {
                    lowestDistanceItem = { distance: distance, index: index };
                }
            }
        });

        /** If the closest element is different than the old one, new one is picked. It prevents from performance issues */
        if (lowestDistanceItem.index !== this._closestLinkIndex) {
            this._closestLinkIndex = lowestDistanceItem.index;
            this._closestLinkPosition = this._elementChords[lowestDistanceItem.index].position;
            // If closest item index is same as dragged item, just remove indicators
            if (lowestDistanceItem.index === this._draggedItemIndex) {
                this._removeAllLines();
                this._removeAllReplaceIndicators();
                return;
            }
            /** Generating line, that shows where the element will be placed, on drop */
            if (this.replaceMode) {
                this._generateReplacementIndicator(this._closestLinkIndex);
            } else {
                this._generateLine(this._closestLinkIndex, this._closestLinkPosition);
            }
        }
    }

    /** Method called, when element is started to be dragged */
    dragStart(ind: number): void {
        this._draggedItemIndex = ind;
        const draggedItemElement = this.dndContainerItems.toArray()[ind].element;
        /** Counting all of the elements's chords */
        this._elementChords = this.dndContainerItems
            .toArray()
            .map((link) => link.getElementChord(this._isBefore(draggedItemElement, link.element), this.listMode));
    }

    /** Method called, when element is released */
    dragEnd(): void {
        const draggedItemIndex = this._draggedItemIndex;
        const replacedItemIndex = this._closestLinkIndex;
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

        this._removeAllLines();
        this._removeAllReplaceIndicators();

        /** Reset */
        this._elementChords = [];
        this._closestLinkIndex = null;
        this._closestLinkPosition = null;
    }

    /** @hidden */
    private _removeAllLines(): void {
        this.dndContainerItems.forEach((item) => item.removeLine());
    }

    /** @hidden */
    private _removeAllReplaceIndicators(): void {
        this.dndContainerItems.forEach((item) => item.removeReplacement());
    }

    /** @hidden */
    private _generateLine(closestLinkIndex: number, linkPosition: LinkPosition): void {
        this._removeAllLines();
        this.dndContainerItems.toArray()[closestLinkIndex].createLine(linkPosition, this.listMode);
    }

    /** @hidden */
    private _generateReplacementIndicator(closestLinkIndex: number): void {
        this._removeAllReplaceIndicators();
        this.dndContainerItems.toArray()[closestLinkIndex].createReplaceIndicator();
    }

    /** @hidden */
    private _refreshQueryList(): void {
        this._refresh$.next();
        this.dndContainerItems.forEach((item, index) => {
            item.moved.pipe(takeUntil(this._refresh$)).subscribe((eventMove) => this.onMove(eventMove));
            item.started.pipe(takeUntil(this._refresh$)).subscribe(() => this.dragStart(index));
            item.released.pipe(takeUntil(this._refresh$)).subscribe(() => this.dragEnd());
        });
    }

    /**
     *  @hidden
     * Return information if element is placed before the dragged element
     */
    private _isBefore(draggedElement: ElementRef, targetElement: ElementRef): boolean {
        /** Sometimes the element are not straight in one column, that's why offset is needed */
        const VERTICAL_OFFSET = 20;

        /** Distances from the top of screen */
        const draggedElementBound = <DOMRect>draggedElement.nativeElement.getBoundingClientRect();
        const targetElementBound = <DOMRect>targetElement.nativeElement.getBoundingClientRect();

        if (draggedElementBound.top - targetElementBound.top > VERTICAL_OFFSET) {
            /** If element is higher than the dragged element, it's for sure before */
            return true;
        } else if (targetElementBound.top - draggedElementBound.top > VERTICAL_OFFSET) {
            /** If element is lower than the dragged element, it's for sure after */
            return false;
        } else {
            /** If elements are in same level, the horizontal position decides if it's before/after */
            return draggedElementBound.left - targetElementBound.left > 0;
        }
    }
}
