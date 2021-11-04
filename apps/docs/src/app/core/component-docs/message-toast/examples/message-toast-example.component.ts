import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { MessageToastContentExampleComponent } from './message-toast-content-example.component';

@Component({
    selector: 'fd-message-toast-example',
    templateUrl: './message-toast-example.component.html',
    styleUrls: ['message-toast-example.component.scss']
})
export class MessageToastExampleComponent {
    messageToastText: string = null;

    constructor(public messageToastService: MessageToastService, public liveAnnouncer: LiveAnnouncer) {}

    openFromComponent(): void {
        this.messageToastService.open(MessageToastContentExampleComponent, {
            mousePersist: true,
            duration: 5000,
            maxWidth: '25rem'
        });
        this.messageToastText = this.messageToastService.textMessage;
        this.liveAnnouncer.announce(this.messageToastText);
    }

    openFromString(): void {
        this.messageToastText = 'Message Toast created from string. Will disappear after 5000ms';
        this.messageToastService.open(this.messageToastText, {
            duration: 5000
        });
        this.liveAnnouncer.announce(this.messageToastText);
    }

    openFromTemplate(template): void {
        this.messageToastText = 'Message Toast created from template.';
        const messageToast = this.messageToastService.open(template, {
            data: {
                content: this.messageToastText
            }
        });
        this.liveAnnouncer.announce(this.messageToastText);
    }
}
