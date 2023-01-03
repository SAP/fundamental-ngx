import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdResizeHandle], [fd-resize-handle]'
})
export class ResizeHandleDirective {
    /** @hidden */
    constructor(public elementRef: ElementRef) {}
}
