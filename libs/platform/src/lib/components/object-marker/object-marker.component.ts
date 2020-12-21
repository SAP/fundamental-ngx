import { Component, Input } from '@angular/core';

@Component({
    selector: 'fdp-object-marker',
    templateUrl: './object-marker.component.html'
})
export class PlatformObjectMarkerComponent {
    /**
     * Glyph (icon) of the Object marker.
     */
    @Input()
    glyph: string;

    /** Whether the Object marker is clickable. */
    @Input()
    clickable: boolean;

    /** label for adding text to the marker */
    @Input()
    label: string;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: string = null;

    /** Sets control aria-hiden to a boolean attribute value */
    @Input()
    ariaHidden: boolean;

    /** Sets control aria-title to a string attribute value */
    @Input()
    title: string;
}
