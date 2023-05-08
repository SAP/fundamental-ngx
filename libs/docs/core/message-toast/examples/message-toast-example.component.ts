import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { MessageToastContentExampleComponent } from './message-toast-content-example.component';

@Component({
    selector: 'fd-message-toast-example',
    templateUrl: './message-toast-example.component.html',
    styles: [
        `
            .fd-button {
                margin-right: 12px;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastExampleComponent {
    constructor(public messageToastService: MessageToastService) {}

    openFromComponent(): void {
        this.messageToastService.open(MessageToastContentExampleComponent, {
            mousePersist: true,
            duration: 5000,
            maxWidth: '25rem',
            data: {
                content: `Message Toast created from component.
                It will stay open if the cursor is above it.
                Has a customized width and will disappear after 7500ms`
            }
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

    openAnimatedToast(): void {
        const content = 'Message Toast created from string. Will disappear after 5000ms';
        this.messageToastService.open(content, {
            duration: 5000,
            animated: true
        });
    }
}
