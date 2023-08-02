import { Component } from '@angular/core';
import { BarElementDirective } from '@fundamental-ngx/core/bar';
import deprecated from "deprecated-decorator";

/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@deprecated('fd-button-bar')
@Component({
    selector: 'fd-message-box-footer-button',
    template: '<ng-content></ng-content>'
})
export class MessageBoxFooterButtonComponent extends BarElementDirective {}
