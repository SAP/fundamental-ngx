import { ElementRef, EventEmitter } from '@angular/core';
/**
 * A directive designed to help navigation elements determine the element currently in view of the user.
 */
export declare class ScrollSpyDirective {
    private elRef;
    /**
     * An array of tags to track.
     */
    trackedTags: string[];
    /**
     * Whether events are still fired if there is no tag present on the user's screen.
     */
    fireEmpty: boolean;
    /**
     * A number that represent at what location in the container the event is fired.
     * 0.5 would fire the events in the middle of the container,
     * 0 for the top and 1 for the bottom.
     */
    targetPercent: number;
    /**
     * Event fired on the scroll element when a new item becomes activated by the scrollspy .
     * The returned value is the HTMLElement itself.
     */
    readonly spyChange: EventEmitter<HTMLElement>;
    /** @hidden */
    private currentActive;
    /** @hidden */
    constructor(elRef: ElementRef);
    /** @hidden */
    onScroll(event: any): void;
}
