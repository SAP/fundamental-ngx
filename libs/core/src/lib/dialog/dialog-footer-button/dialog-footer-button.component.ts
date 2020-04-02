import { Component } from '@angular/core';
import { BarElementDirective } from '../../bar/directives/bar-element.directive';

/**
 * Applies fundamental layout and styling to the contents of a dialog body.
 *
 * ```html
 * <fd-dialog-body>
 *     <div>Dialog body content</div>
 * </fd-dialog-body>
 * ```
 */
@Component({
    selector: 'fd-dialog-footer-button',
    template: '<ng-content></ng-content>',
})
export class DialogFooterButtonComponent extends BarElementDirective {
}
