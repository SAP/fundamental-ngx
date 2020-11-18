import { AfterContentInit, Component, Inject, Optional } from '@angular/core';
import { MESSAGE_BOX_CONFIG, MESSAGE_BOX_CONFIGURABLE_ELEMENT, MessageBoxConfig } from '../utils/message-box-config.class';
import { DialogFooterBase } from '../../dialog/base/dialog-footer-base.class';

@Component({
    selector: 'fd-message-box-footer',
    templateUrl: './message-box-footer.component.html',
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxFooterComponent, multi: true }
    ]
})
export class MessageBoxFooterComponent extends DialogFooterBase implements AfterContentInit {
    constructor(@Optional() @Inject(MESSAGE_BOX_CONFIG) public _messageBoxConfig: MessageBoxConfig) {
        super();
        this._messageBoxConfig = this._messageBoxConfig || {};
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }
}
