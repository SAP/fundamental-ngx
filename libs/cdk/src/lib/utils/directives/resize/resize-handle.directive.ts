import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdkResizeHandle], [fdResizeHandle], [fd-resize-handle]',
    standalone: true
})
export class ResizeHandleDirective {
    /** @hidden */
    constructor(public elementRef: ElementRef) {}
}
