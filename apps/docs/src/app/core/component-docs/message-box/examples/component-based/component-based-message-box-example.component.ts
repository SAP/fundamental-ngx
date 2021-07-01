import { Component } from '@angular/core';
import { MessageBoxService } from '@fundamental-ngx/core/message-box';
import { MessageBoxExampleComponent } from './message-box-example.component';

export interface TextData {
    title: string;
    text: string;
}

@Component({
    selector: 'fd-component-based-message-box-example',
    template: `
        <button fd-button label="Open from Component" (click)="open()"></button>
        <p>{{ closeReason }}</p>
    `
})
export class ComponentBasedMessageBoxExampleComponent {
    closeReason: string;

    constructor(private _messageBoxService: MessageBoxService) {}

    open(): void {
        const messageBoxRef = this._messageBoxService.open<TextData>(MessageBoxExampleComponent, {
            data: {
                title: 'Fruit facts',
                text: 'Coffee beans aren\'t beans. They are fruit pits.'
            },
            showSemanticIcon: true,
            customSemanticIcon: 'thumb-up',
            width: '400px'
        });

        messageBoxRef.afterClosed.subscribe(
            (result) => { this.closeReason = 'Message box closed with result: ' + result; },
            (error) => { this.closeReason = 'Message box dismissed with result: ' + error; }
        );
    }
}
