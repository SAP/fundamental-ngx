import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdkResizeHandle]',
    standalone: true
})
export class ResizeHandleDirective {
    /** @hidden */
    constructor(public elementRef: ElementRef) {}
}
