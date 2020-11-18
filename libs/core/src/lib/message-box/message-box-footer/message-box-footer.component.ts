import { AfterContentInit, Component, Optional } from '@angular/core';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from '../utils/message-box-config.class';
import { DialogFooterBase } from '../../dialog/base/dialog-footer-base.class';

@Component({
    selector: 'fd-message-box-footer',
    templateUrl: './message-box-footer.component.html',
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxFooterComponent, multi: true }
    ]
})
export class MessageBoxFooterComponent extends DialogFooterBase implements AfterContentInit, MessageBoxConfigurableElement {
    constructor(@Optional() public messageBoxConfig: MessageBoxConfig) {
        super();
        this.messageBoxConfig = this.messageBoxConfig || {};
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}
