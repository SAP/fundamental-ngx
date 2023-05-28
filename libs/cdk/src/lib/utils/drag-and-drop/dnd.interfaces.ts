import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Nullable } from '../models/nullable';

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
    insertAt: 'before' | 'after' | null;
    mode: FdDndDropEventMode;
}

export interface ElementPosition {
    x: number;
    y: number;
}

export interface DndItem<T = any> {
    elementRef: ElementRef;
    item: Nullable<T>;
    getElementCoordinates(isBefore: boolean, gridMode: boolean): ElementChord;
    removeLine(): void;
    removeReplaceIndicator(): void;
    createLine(linkPosition: LinkPosition, gridMode: boolean): void;
    createReplaceIndicator(): void;
    moved: Observable<ElementPosition>;
    released: Observable<void>;
    started: Observable<void>;
    listDraggable: boolean;
    changeCDKDragState(): void;
    setDisabledState(state: boolean): void;
}

export type FdDndDropType = 'shift' | 'group' | 'auto';
export type FdDndDropEventMode = 'shift' | 'group';
