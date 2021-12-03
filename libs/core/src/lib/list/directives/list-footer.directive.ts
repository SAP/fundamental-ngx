import { Attribute, Directive, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: '[fdListFooter], [fd-list-footer]'
})
export class ListFooterDirective {
    /** @hidden */
    @HostBinding('class.fd-list__footer')
    fdListFooterClass = true;

    /** Whether to apply "aria-hidden" attribute. */
    @Input()
    @HostBinding('attr.aria-hidden')
    ariaHidden = true;

    constructor(@Attribute('aria-hidden') _originalAriaHidden?: string) {
        if (_originalAriaHidden !== null) {
            this.ariaHidden = coerceBooleanProperty(_originalAriaHidden);
        }
    }
}
