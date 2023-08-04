import { Directive, HostBinding, Input } from '@angular/core';
import { warnOnce } from '@fundamental-ngx/core/utils';

/**
 * An element of the Bar.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-bar-element'
})
export class BarElementDirective {
    /** @deprecated */
    @Input()
    set isTitle(value: boolean) {
        warnOnce('isTitle is deprecated, it will be automatically set.');
        this._isTitle = value;
    }

    get isTitle(): boolean {
        return this._isTitle;
    }

    /** Whether the element should take the whole width of the container. */
    @Input()
    @HostBinding('class.fd-bar__element--full-width')
    fullWidth = false;

    /** @hidden */
    @HostBinding('class.fd-bar__element')
    barElement = true;

    /** @hidden */
    private _isTitle = false;
}
