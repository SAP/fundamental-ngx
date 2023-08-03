import { Component } from '@angular/core';
import { BarElementDirective } from '@fundamental-ngx/core/bar';

/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@Component({
    selector: 'fd-dialog-footer-button',
    template: '<ng-content></ng-content>'
})
export class DialogFooterButtonComponent extends BarElementDirective {
    /** @hidden */
    constructor() {
        super();
        console.warn('fd-dialog-footer-button is deprecated, use fd-button-bar instead.');
    }
}
