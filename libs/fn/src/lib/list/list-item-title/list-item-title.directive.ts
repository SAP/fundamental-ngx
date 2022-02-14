import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[fnListItemTitle]'
})
export class ListItemTitleDirective {
    constructor(readonly templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}
}
