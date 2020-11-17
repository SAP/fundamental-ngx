import { Component, Inject } from '@angular/core';
import { MESSAGE_BOX_REF, MessageBoxRef } from '@fundamental-ngx/core';

@Component({
    template: `
        <fd-message-box>
            <fd-message-box-header>
                <h1 fd-title>{{ messageBoxRef.data.title }}</h1>
                <fd-message-box-close-icon (click)="messageBoxRef.dismiss('Close button')"></fd-message-box-close-icon>
            </fd-message-box-header>
            <fd-message-box-body>
                {{ messageBoxRef.data.text }}
            </fd-message-box-body>
            <fd-message-box-footer>
                <button
                    fd-button
                    fd-message-box-decisive-button
                    fdType="emphasized"
                    label="Ok"
                    [compact]="true"
                    (click)="this.messageBoxRef.close('Continue')">
                </button>
                <button
                    fd-button
                    fd-message-box-decisive-button
                    fdType="transparent"
                    label="Cancel"
                    [compact]="true"
                    (click)="this.messageBoxRef.dismiss('Cancel')">
                </button>
            </fd-message-box-footer>
        </fd-message-box>
    `
})
export class MessageBoxExampleComponent {
    constructor(@Inject(MESSAGE_BOX_REF) public messageBoxRef: MessageBoxRef) {}
}
