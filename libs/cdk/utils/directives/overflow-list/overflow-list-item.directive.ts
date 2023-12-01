import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdkOverflowListItem]',
    standalone: true
})
export class OverflowListItemDirective {
    /** @hidden */
    constructor(public el: ElementRef) {}
}
