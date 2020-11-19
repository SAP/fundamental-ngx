import { Component } from '@angular/core';
import { BarElementDirective } from '../../bar/directives/bar-element.directive';

/**
 * Building block of the message box used to create message box footer.
 *
 * ```html
 * <fd-message-box-footer-button></fd-message-box-footer-button>
 * ```
 * */
@Component({
  selector: 'fd-message-box-footer-button',
  template: '<ng-content></ng-content>'
})
export class MessageBoxFooterButtonComponent extends BarElementDirective { }
