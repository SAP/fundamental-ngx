import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
/**
 * Tool directive used to achieve the infinite scroll mechanism.
 */
export declare class InfiniteScrollDirective implements OnInit, OnDestroy {
    private element;
    /** Scroll percentage at which the onScrollAction event is fired. */
    scrollPercent: number;
    /** Event emitted when the scrollPercent threshold is met. */
    onScrollAction: EventEmitter<any>;
    private scrollEvent;
    private subscription;
    /** @hidden */
    constructor(element: ElementRef);
    /** @hidden */
    ngOnInit(): void;
    ngOnDestroy(): void;
}
