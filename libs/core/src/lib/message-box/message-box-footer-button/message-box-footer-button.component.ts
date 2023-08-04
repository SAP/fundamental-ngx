import { Component } from '@angular/core';
import { BarElementDirective } from '@fundamental-ngx/core/bar';
import { warnOnce } from '@fundamental-ngx/core/utils';
/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@Component({
    selector: 'fd-message-box-footer-button',
    template: '<ng-content></ng-content>'
})
export class MessageBoxFooterButtonComponent extends BarElementDirective {
    /** @hidden */
    constructor() {
        super();
        warnOnce('`fd-message-box-footer-button` is deprecated. Consider using `fd-button-bar`');
    }
}
