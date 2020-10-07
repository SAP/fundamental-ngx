import { Component } from '@angular/core';
import { MessageToastContentExampleComponent } from './message-toast-content-example.component';
import { MessageToastConfig, MessageToastService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-message-toast-example',
    templateUrl: './message-toast-example.component.html',
    styleUrls: ['message-toast-example.component.scss']
})
export class MessageToastExampleComponent {
    constructor(public messageToastService: MessageToastService) {}

    openFromComponent(): void {
        this.messageToastService.open(MessageToastContentExampleComponent, {
            mousePersist: true,
            duration: 7500,
            maxWidth: '25rem'
        } as MessageToastConfig);
    }

    openFromString(): void {
        const content = 'Message Toast created from string. Will disappear after 5000ms';
        this.messageToastService.open(content, {
            duration: 5000
        } as MessageToastConfig);
    }

    openFromTemplate(template): void {
        const messageToast = this.messageToastService.open(template, {
            data: {
                content: 'Message Toast created from template.'
            }
        } as MessageToastConfig);
    }
}
