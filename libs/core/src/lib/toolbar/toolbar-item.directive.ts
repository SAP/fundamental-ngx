import { Directive, ElementRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-toolbar-item]'
})
export class ToolbarItemDirective {
    constructor(public elementRef: ElementRef) {}
}
