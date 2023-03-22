import { Component, ElementRef, Inject, Optional } from '@angular/core';
import { FD_DIALOG_BODY_COMPONENT } from '../tokens';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';

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
        '[style.min-height]': 'dialogConfig.bodyMinHeight',
        '[style.padding]': 'dialogConfig.disablePaddings ? 0 : "1rem"'
    },
    providers: [
        {
            provide: FD_DIALOG_BODY_COMPONENT,
            useExisting: DialogBodyComponent
        }
    ],
    hostDirectives: [ScrollbarDirective]
})
export class DialogBodyComponent {
    /** @hidden */
    constructor(
        private _elRef: ElementRef,
        @Optional() public dialogConfig: DialogConfig,
        @Optional() public dialogRef: DialogRef,
        @Inject(ScrollbarDirective) private _scrollbarDirective: ScrollbarDirective
    ) {
        this._scrollbarDirective.overrideTabindex = false;
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elRef;
    }
}
