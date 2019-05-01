import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss'],
    host: {
        'class': 'fd-token',
        'role': 'button'
    }
})
export class TokenComponent {

    /** @hidden */
    @ViewChild('contentContainer')
    contentContainer: ElementRef;

    /** Emitted when the *x* icon is clicked. Specifically, any pseudo-element. */
    @Output()
    readonly onCloseClick: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    constructor(private elRef: ElementRef) {
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    clickHandler(event): void {
        if (this.contentContainer) {
            if (this.elRef.nativeElement.contains(event.target) && !this.contentContainer.nativeElement.contains(event.target)) {
                this.onCloseClick.emit();
            }
        }
    }

}


