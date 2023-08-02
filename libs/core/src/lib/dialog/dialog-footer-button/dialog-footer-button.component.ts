import { Component } from '@angular/core';
import { BarElementDirective } from '@fundamental-ngx/core/bar';
import deprecated from 'deprecated-decorator';

/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@deprecated('fd-button-bar')
@Component({
    selector: 'fd-dialog-footer-button',
    template: '<ng-content></ng-content>'
})
export class DialogFooterButtonComponent extends BarElementDirective {}
