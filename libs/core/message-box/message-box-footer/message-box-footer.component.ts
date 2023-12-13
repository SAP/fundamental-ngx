import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, Optional } from '@angular/core';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogFooterBase } from '@fundamental-ngx/core/dialog';
import { MessageBoxConfig, MessageBoxHost } from '../utils/message-box-config.class';

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
    templateUrl: './message-box-footer.component.html',
    standalone: true,
    imports: [BarComponent, ContentDensityDirective, NgTemplateOutlet, BarRightDirective]
})
export class MessageBoxFooterComponent extends DialogFooterBase implements AfterContentInit, AfterViewInit {
    /** @ignore */
    get messageBoxConfig(): MessageBoxConfig {
        return this.messageBox?._messageBoxConfig || {};
    }

    /** @ignore */
    constructor(@Optional() private messageBox?: MessageBoxHost) {
        super();
    }

    /** @ignore */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._listenForButtonChanges(MessageBoxButtonClass);
    }
}
