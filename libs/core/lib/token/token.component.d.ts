import { ElementRef, EventEmitter } from '@angular/core';
/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
export declare class TokenComponent {
    private elRef;
    /** @hidden */
    contentContainer: ElementRef;
    /** Whether the token is disabled. */
    disabled: boolean;
    /** Emitted when the *x* icon is clicked. Specifically, any pseudo-element. */
    readonly onCloseClick: EventEmitter<void>;
    /** @hidden */
    constructor(elRef: ElementRef);
    /** @hidden */
    clickHandler(event: any): void;
}
