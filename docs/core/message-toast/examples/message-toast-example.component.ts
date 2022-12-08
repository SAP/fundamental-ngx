import { Component } from '@angular/core';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { MessageToastContentExampleComponent } from './message-toast-content-example.component';

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
            duration: 5000,
            maxWidth: '25rem'
        });
    }

    openFromString(): void {
        const content = 'Message Toast created from string. Will disappear after 5000ms';
        this.messageToastService.open(content, {
            duration: 5000
        });
    }

    openFromTemplate(template): void {
        this.messageToastService.open(template, {
            data: {
                content: 'Message Toast created from template.'
            }
        });
    }
}
