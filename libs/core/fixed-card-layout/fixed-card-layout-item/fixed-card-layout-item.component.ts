import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-fixed-card-layout-item',
    host: {
        style: 'display: block'
    },
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FixedCardLayoutItemComponent implements FocusableOption {
    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** Set focus on the element. */
    focus(): void {
        const header = this._elementRef.nativeElement.querySelector('.fd-card__header');
        if (header) {
            header.focus();
        }
    }
}
