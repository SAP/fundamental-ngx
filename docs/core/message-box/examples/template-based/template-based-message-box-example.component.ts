import { Component, TemplateRef } from '@angular/core';

import { MessageBoxService } from '@fundamental-ngx/core/message-box';

@Component({
    selector: 'fd-template-based-message-box-example',
    templateUrl: './template-based-message-box-example.component.html'
})
export class TemplateBasedMessageBoxExampleComponent {
    confirmationReason: string;

    constructor(private _messageBoxService: MessageBoxService) {}

    open(messageBox: TemplateRef<any>): void {
        const messageBoxRef = this._messageBoxService.open(messageBox, {
            ariaLabelledBy: 'fd-message-box-template-base-header fd-message-box-template-base-body',
            focusTrapped: true
        });

        messageBoxRef.afterClosed.subscribe(
            (result) => {
                this.confirmationReason = 'Message box closed with result: ' + result;
            },
            (error) => {
                this.confirmationReason = 'Message box dismissed with result: ' + error;
            }
        );
    }
}
