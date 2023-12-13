import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[fdbNavigationHome]',
    standalone: true
})
export class NavigationHomeDirective {
    /** @ignore */
    constructor(readonly templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) {}
}
