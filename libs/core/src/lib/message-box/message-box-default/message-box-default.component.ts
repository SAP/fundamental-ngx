import { AfterViewInit, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MessageBoxContent } from '../utils/message-box-content.interface';
import { MESSAGE_BOX_CONFIG, MessageBoxConfig } from '../utils/message-box-config.class';

@Component({
    selector: 'fd-message-box-default',
    templateUrl: './message-box-default.component.html'
})
export class MessageBoxDefaultComponent implements AfterViewInit {

    /** @hidden */
    @ViewChild('textContent')
    textContentTemplate: TemplateRef<any>;

    /** @hidden */
    contentTemplate: TemplateRef<any>;

    /** @hidden */
    messageBoxContent: MessageBoxContent;

    /** @hidden */
    constructor(@Inject(MESSAGE_BOX_CONFIG) public messageBoxConfig: MessageBoxConfig) { }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setContentTemplate();
    }

    /** @hidden */
    onCloseButton(): void {
        this.messageBoxContent.closeButtonCallback();
    }

    /** @hidden */
    onApproveButton(): void {
        this.messageBoxContent.approveButtonCallback();
    }

    /** @hidden */
    onCancelButton(): void {
        this.messageBoxContent.cancelButtonCallback();
    }

    /** @hidden */
    private _setContentTemplate(): void {
        this.contentTemplate = this.messageBoxContent.content instanceof TemplateRef
            ? this.messageBoxContent.content
            : this.textContentTemplate
    }
}
