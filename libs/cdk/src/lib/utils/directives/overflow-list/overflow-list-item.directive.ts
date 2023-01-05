import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdkOverflowListItem], [fdOverflowListItem], [fd-overflow-list-item]',
    standalone: true
})
export class OverflowListItemDirective {
    /** @hidden */
    constructor(public el: ElementRef) {}
}
