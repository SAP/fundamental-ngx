import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdkOverflowListItem]',
    standalone: true
})
export class OverflowListItemDirective {
    /** @ignore */
    constructor(public el: ElementRef) {}
}
