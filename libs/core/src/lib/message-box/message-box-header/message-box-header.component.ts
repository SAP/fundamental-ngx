import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Optional } from '@angular/core';
import { DialogHeaderBase } from '../../dialog/base/dialog-header-base.class';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from '../utils/message-box-config.class';

/**
 * Applies fundamental layout and styling to the contents of a message box header.
 *
 * ```html
 * <fd-message-box-header>
 *     <h1 fd-title>Title</h1>
 *     <fd-message-box-close-icon></fd-message-box-close-icon>
 * </fd-message-box-header>
 * ```
 */
@Component({
    selector: 'fd-message-box-header',
    templateUrl: './message-box-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxHeaderComponent, multi: true }
    ]
})
export class MessageBoxHeaderComponent extends DialogHeaderBase implements AfterContentInit, MessageBoxConfigurableElement {

    constructor(
        @Optional() public messageBoxConfig: MessageBoxConfig,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(changeDetectorRef);
        this.messageBoxConfig = this.messageBoxConfig || {};
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}
