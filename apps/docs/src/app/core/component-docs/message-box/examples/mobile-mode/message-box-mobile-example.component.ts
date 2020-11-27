import { Component } from '@angular/core';
import { MessageBoxContent, MessageBoxService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-message-box-mobile-example',
    templateUrl: './message-box-mobile-example.component.html'
})
export class MessageBoxMobileExampleComponent {

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

        const messageBoxRef = this._messageBoxService.open(content, { mobile: true });
    }
}
