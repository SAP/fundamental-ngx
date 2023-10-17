import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[fdbNavigationHome]',
    standalone: true
})
export class NavigationHomeDirective {
    /** @hidden */
    public readonly templateRef = inject(TemplateRef<any>);
}
