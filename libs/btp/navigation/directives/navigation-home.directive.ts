import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[fdbNavigationHome]',
    standalone: true
})
export class NavigationHomeDirective {
    /** @hidden */
    constructor(readonly templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}
}
