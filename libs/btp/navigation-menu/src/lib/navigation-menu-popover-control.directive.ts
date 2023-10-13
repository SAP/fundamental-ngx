import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[fdbNavigationMenuPopoverControl]',
    standalone: true
})
export class NavigationMenuPopoverControlDirective {
    /** @hidden */
    constructor(readonly templateRef: TemplateRef<void>, private viewContainerRef: ViewContainerRef) {}
}
