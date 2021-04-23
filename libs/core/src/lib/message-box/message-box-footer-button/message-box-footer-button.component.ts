import { Component } from '@angular/core';
import { BarElementDirective } from '../../bar/directives/bar-element.directive';

/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@Component({
  selector: 'fd-message-box-footer-button',
  template: '<ng-content></ng-content>'
})
export class MessageBoxFooterButtonComponent extends BarElementDirective { }
