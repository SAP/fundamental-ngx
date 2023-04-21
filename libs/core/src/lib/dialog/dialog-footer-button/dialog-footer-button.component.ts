import { Component } from '@angular/core';
import { BarElementDirective } from '@fundamental-ngx/core/bar';
/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@Component({
    selector: 'fd-dialog-footer-button',
    template: '<ng-content></ng-content>',
    standalone: true
})
export class DialogFooterButtonComponent extends BarElementDirective {}
