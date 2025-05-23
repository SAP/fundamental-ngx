import { Component } from '@angular/core';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageBoxContent, MessageBoxService } from '@fundamental-ngx/core/message-box';

@Component({
    selector: 'fd-message-box-mobile-example',
    templateUrl: './message-box-mobile-example.component.html',
    providers: [
        // The MessageBoxService is already provided on the MessageBoxModule module.
        // We do it at the component level here, due to the limitations of our example generation script.
        MessageBoxService
    ],
    imports: [ButtonComponent]
})
export class MessageBoxMobileExampleComponent {
    title = 'Fruit facts';
    content = 'Strawberries have more vitamin C than oranges.';

    constructor(private _messageBoxService: MessageBoxService) {}

    open(): void {
        const content: MessageBoxContent = {
            title: this.title,
            content: this.content,
            approveButton: 'Ok',
            cancelButton: 'Cancel',
            approveButtonCallback: () => messageBoxRef.close('Approved'),
            cancelButtonCallback: () => messageBoxRef.close('Canceled'),
            closeButtonCallback: () => messageBoxRef.dismiss('Dismissed')
        };

        const messageBoxRef = this._messageBoxService.open(content, {
            mobile: true
        });
    }
}
