import { Component } from '@angular/core';
import { BarElementDirective } from '../../bar/directives/bar-element.directive';

@Component({
  selector: 'fd-message-box-footer-button',
  template: '<ng-content></ng-content>'
})
export class MessageBoxFooterButtonComponent extends BarElementDirective { }
