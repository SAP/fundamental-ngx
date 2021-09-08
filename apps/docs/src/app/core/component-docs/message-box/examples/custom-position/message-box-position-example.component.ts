import { Component } from '@angular/core';

import { MessageBoxContent, MessageBoxService } from '@fundamental-ngx/core/message-box';

@Component({
    selector: 'fd-message-box-position-example',
    templateUrl: './message-box-position-example.component.html',
    providers: [
        // The MessageBoxService is already provided on the MessageBoxModule module.
        // We do it at the component level here, due to the limitations of our example generation script.
        MessageBoxService
    ]
})
export class MessageBoxPositionExampleComponent {
    constructor(private _messageBoxService: MessageBoxService) {}

    open(): void {
        const content: MessageBoxContent = {
            title: 'Fruit facts',
            content: 'Strawberries have more vitamin C than oranges.',
            approveButton: 'Ok',
            cancelButton: 'Cancel',
            approveButtonCallback: () => messageBoxRef.close('Approved'),
            cancelButtonCallback: () => messageBoxRef.close('Canceled'),
            closeButtonCallback: () => messageBoxRef.dismiss('Dismissed')
        };

        const messageBoxRef = this._messageBoxService.open(content, {
            width: '300px',
            position: { top: '25px' }
        });
    }
}
