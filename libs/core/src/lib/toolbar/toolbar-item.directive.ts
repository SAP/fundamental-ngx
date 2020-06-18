import { Directive, ElementRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-toolbar-item]'
})
export class ToolbarItemDirective {
    constructor(public elementRef: ElementRef) {}
}
