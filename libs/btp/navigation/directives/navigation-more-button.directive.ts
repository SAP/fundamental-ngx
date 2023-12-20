import { Directive, Injector, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[fdbNavigationMoreButton]',
    standalone: true
})
export class NavigationMoreButtonDirective {
    /** Template reference. */
    readonly templateRef = inject(TemplateRef);
}

@Directive({
    selector: '[fdbNavigationMoreButtonContainer]',
    standalone: true,
    exportAs: 'fdbNavigationMoreButtonContainer'
})
export class NavigationMoreBUttonContainerDirective {
    /** Directive injector. */
    readonly injector = inject(Injector);
}
