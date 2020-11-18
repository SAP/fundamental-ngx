import { Component } from '@angular/core';
import { BarElementDirective } from '../../bar/directives/bar-element.directive';

@Component({
    selector: 'fd-dialog-footer-button',
    template: '<ng-content></ng-content>'
})
export class DialogFooterButtonComponent extends BarElementDirective { }
