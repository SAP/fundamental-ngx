import { Component } from '@angular/core';
import { BarElementDirective } from '../../bar/directives/bar-element.directive';

/**
 * Building block of the dialog used to create message box button.
 *
 * ```html
 * <fd-dialog-footer-button></fd-dialog-footer-button>
 * ```
 * */
@Component({
    selector: 'fd-dialog-footer-button',
    template: '<ng-content></ng-content>'
})
export class DialogFooterButtonComponent extends BarElementDirective { }
