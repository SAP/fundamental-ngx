import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Optional,
    ViewEncapsulation,
    booleanAttribute,
    input
} from '@angular/core';
import { FD_DIALOG_BODY_COMPONENT } from '../tokens';

import { AsyncPipe } from '@angular/common';
import { DynamicPortalComponent } from '@fundamental-ngx/cdk/utils';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
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
        '[style.min-height]': 'dialogConfig.bodyMinHeight',
        '[style.padding]': 'dialogConfig.disablePaddings || disablePaddings() ? 0 : "1rem"'
    },
    providers: [
        {
            provide: FD_DIALOG_BODY_COMPONENT,
            useExisting: DialogBodyComponent
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ScrollbarDirective],
    imports: [DynamicPortalComponent, BusyIndicatorComponent, AsyncPipe]
})
export class DialogBodyComponent {
    /**
     * property to remove the horizontal and vertical paddings from the body
     * default is set to false
     */
    disablePaddings = input(false, { transform: booleanAttribute });

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        @Optional() public dialogConfig: DialogConfig,
        @Optional() public dialogRef: DialogRef
    ) {}
}
