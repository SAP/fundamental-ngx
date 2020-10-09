import { Component, OnInit } from '@angular/core';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';

@Component({
    selector: 'fd-popover-scroll-example',
    templateUrl: './popover-scroll-example.component.html',
    styleUrls: ['./popover-scroll-example.component.scss']
})
export class PopoverScrollExampleComponent implements OnInit {

    /** Do nothing on scroll. */
    noopScrollStrategy: ScrollStrategy;

    /**
     * Close the overlay as soon as the user scrolls.
     * @param config Configuration to be used inside the scroll strategy.
     */
    closeScrollStrategy: ScrollStrategy;


    /** Block scrolling. */
    blockScrollStrategy: ScrollStrategy;


    /**
     * Update the overlay's position on scroll.
     * @param config Configuration to be used inside the scroll strategy.
     * Allows debouncing the reposition calls.
     */
    repositionScrollStrategy: ScrollStrategy;

    constructor(
        private _overlay: Overlay
    ) {}

    ngOnInit(): void {
        this.blockScrollStrategy = this._overlay.scrollStrategies.block();
        this.repositionScrollStrategy = this._overlay.scrollStrategies.reposition();
        this.noopScrollStrategy = this._overlay.scrollStrategies.noop();
        this.closeScrollStrategy = this._overlay.scrollStrategies.close();
    }

}
