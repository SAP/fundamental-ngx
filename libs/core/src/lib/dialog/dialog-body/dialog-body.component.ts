import { Component, ElementRef, HostBinding, Optional } from '@angular/core';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';

/**
 * Applies fundamental layout and styling to the contents of a dialog body.
 *
 * ```html
 * <fd-dialog-body>
 *     <!-- Content -->
 * </fd-dialog-body>
 * ```
 */
@Component({
    selector: 'fd-dialog-body',
    templateUrl: 'dialog-body.component.html',
    host: {
        '[class.fd-dialog__body]': 'true',
        '[class.fd-dialog__body--no-vertical-padding]': '!dialogConfig.verticalPadding',
        '[class.fd-dialog__body--no-horizontal-padding]': '!dialogConfig.horizontalPadding',
        '[style.min-height]': 'dialogConfig.bodyMinHeight'
    }
})
export class DialogBodyComponent {
    /** @hidden adds fd-scrollbar class. */
    @HostBinding('class.fd-scrollbar')
    _isScrollbar = true;

    /** @hidden */
    constructor(
        private _elRef: ElementRef,
        @Optional() public dialogConfig: DialogConfig,
        @Optional() public dialogRef: DialogRef
    ) {}

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elRef;
    }
}
