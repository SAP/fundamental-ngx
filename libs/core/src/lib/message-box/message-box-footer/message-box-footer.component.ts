import { AfterContentInit, Component, Optional } from '@angular/core';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from '../utils/message-box-config.class';
import { DialogFooterBase } from '../../dialog/base/dialog-footer-base.class';

/**
 * Message box component used to create the message box in object based approach
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
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxFooterComponent, multi: true }
    ]
})
export class MessageBoxFooterComponent extends DialogFooterBase implements AfterContentInit, MessageBoxConfigurableElement {

    /** @hidden */
    constructor(@Optional() public messageBoxConfig: MessageBoxConfig) {
        super();
        this.messageBoxConfig = this.messageBoxConfig || {};
    }

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}
