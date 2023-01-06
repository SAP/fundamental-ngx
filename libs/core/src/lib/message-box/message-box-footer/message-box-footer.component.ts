import { AfterContentInit, AfterViewInit, Component, Optional } from '@angular/core';
import { MessageBoxConfig, MessageBoxHost } from '../utils/message-box-config.class';
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
 *     <ng-template fdkTemplate="footer"><!--Content--></ng-template>
 * </fd-message-box-footer>
 * ```
 * */
@Component({
    selector: 'fd-message-box-footer',
    templateUrl: './message-box-footer.component.html'
})
export class MessageBoxFooterComponent extends DialogFooterBase implements AfterContentInit, AfterViewInit {
    /** @hidden */
    get messageBoxConfig(): MessageBoxConfig {
        return this.messageBox?._messageBoxConfig || {};
    }

    /** @hidden */
    constructor(@Optional() private messageBox?: MessageBoxHost) {
        super();
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
