import { Component, Inject, Optional } from '@angular/core';
import { DIALOG_CONFIG, DialogConfig } from '../../..';

/**
 * Applies fundamental layout and styling to the contents of a dialog body.
 *
 * ```html
 * <fd-dialog-body>
 *     <div>Modal body content</div>
 * </fd-dialog-body>
 * ```
 */
@Component({
    selector: 'fd-dialog-body',
    templateUrl: './dialog-body.component.html',
    host: {
        '[class.fd-dialog__body]': 'true',
        '[class.fd-dialog__body--no-vertical-padding]': '!dialogConfig.verticalPadding',
    }
})
export class DialogBodyComponent {
    constructor(@Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig) { }
}
