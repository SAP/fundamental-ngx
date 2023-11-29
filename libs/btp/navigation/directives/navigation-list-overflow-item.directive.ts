import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[fdbNavigationListOverflowItem]',
    standalone: true
})
export class NavigationListOverflowItemDirective {
    /** @hidden */
    readonly templateRef = inject(TemplateRef);
}
