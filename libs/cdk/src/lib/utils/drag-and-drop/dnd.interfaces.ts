import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

export type LinkPosition = 'after' | 'before';

export interface ElementChord {
    x: number;
    y: number;
    position: LinkPosition;
    stickToPosition?: boolean;
    width: number;
    height: number;
}

export interface FdDropEvent<T> {
    items: Array<T>;
    replacedItemIndex: number;
    draggedItemIndex: number;
}

export interface ElementPosition {
    x: number;
    y: number;
}

export interface DndItem {
    elementRef: ElementRef;
    getElementCoordinates: (isBefore: boolean, gridMode: boolean) => ElementChord;
    removeLine: () => void;
    removeReplaceIndicator: () => void;
    createLine: (linkPosition: LinkPosition, gridMode: boolean) => void;
    createReplaceIndicator: () => void;
    moved: Observable<ElementPosition>;
    released: Observable<void>;
    started: Observable<void>;
    listDraggable: boolean;
    changeCDKDragState: () => void;
}
