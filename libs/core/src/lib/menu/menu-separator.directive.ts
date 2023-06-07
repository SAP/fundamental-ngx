import { Directive, ElementRef, inject } from '@angular/core';

/**
 * @deprecated
 * Use `hasSeparator` input on a `fd-menu-item` instead.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-menu-separator',
    host: {
        '[style.display]': '"none"'
    }
})
export class MenuSeparatorDirective {
    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    constructor() {
        console.error(
            '<fd-menu-separator> has been removed. Use `hasSeparator` input on a `fd-menu-item` instead.',
            this.elementRef.nativeElement
        );
    }
}

// Exporting as a old class name for the backward compatibility.
export { MenuSeparatorDirective as MenuSeparatorComponent };
