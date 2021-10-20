import { AfterContentInit, AfterViewInit, Component, Optional } from '@angular/core';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from '../utils/message-box-config.class';
import { DialogFooterBase } from '@fundamental-ngx/core/dialog';

export const MessageBoxButtonClass = 'fd-message-box__decisive-button';

/**
 * Building block of the message box used to create message box header.
 *
 * ```html
 * <fd-message-box-footer><!--Content--></fd-message-box-footer>
 *
 * Complex footer:
 * <fd-message-box-footer>
 *     <ng-template fdTemplate="footer"><!--Content--></ng-template>
 * </fd-message-box-footer>
 * ```
 * */
@Component({
    selector: 'fd-message-box-footer',
    templateUrl: './message-box-footer.component.html',
    providers: [{ provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxFooterComponent, multi: true }]
})
export class MessageBoxFooterComponent
    extends DialogFooterBase
    implements AfterContentInit, AfterViewInit, MessageBoxConfigurableElement
{
    /** @hidden */
    constructor(@Optional() public messageBoxConfig: MessageBoxConfig) {
        super();
        this.messageBoxConfig = this.messageBoxConfig || {};
    }

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenForButtonChanges(MessageBoxButtonClass);
    }
}
