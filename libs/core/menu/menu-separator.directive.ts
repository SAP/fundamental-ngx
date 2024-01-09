import { Directive, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

/**
 * @deprecated
 * Use `hasSeparator` input on a `fd-menu-item` instead.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-menu-separator',
    host: {
        '[style.display]': '"none"'
    },
    standalone: true
})
export class MenuSeparatorDirective implements HasElementRef {
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
