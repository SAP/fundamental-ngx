import { Component } from '@angular/core';
import { BarElementDirective } from '@fundamental-ngx/core/bar';
import deprecated from "deprecated-decorator";

/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@Component({
    selector: 'fd-message-box-footer-button',
    template: '<ng-content></ng-content>'
})
@deprecated('fd-button-bar')
export class MessageBoxFooterButtonComponent extends BarElementDirective {}
