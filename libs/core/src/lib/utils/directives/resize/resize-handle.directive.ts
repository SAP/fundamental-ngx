import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[fdResizeHandle], [fd-resize-handle]'
})
export class ResizeHandleDirective {
    constructor(public elementRef: ElementRef) {}
}
