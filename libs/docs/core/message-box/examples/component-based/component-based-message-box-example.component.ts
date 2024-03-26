import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { MessageBoxService } from '@fundamental-ngx/core/message-box';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageBoxExampleComponent } from './message-box-example.component';

export interface TextData {
    title: string;
    text: string;
}

@Component({
    selector: 'fd-component-based-message-box-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <button fd-button label="Open from Component" (click)="open()"></button>
        <p>{{ closeReason }}</p>
    `,
    providers: [
        // The MessageBoxService is already provided on the MessageBoxModule module.
        // We do it at the component level here, due to the limitations of our example generation script.
        MessageBoxService
    ],
    standalone: true,
    imports: [ButtonComponent]
})
export class ComponentBasedMessageBoxExampleComponent {
    closeReason: string;

    constructor(
        private _messageBoxService: MessageBoxService,
        private _cdr: ChangeDetectorRef
    ) {}

    open(): void {
        const messageBoxRef = this._messageBoxService.open<TextData>(MessageBoxExampleComponent, {
            data: {
                title: 'Fruit facts',
                text: "Coffee beans aren't beans. They are fruit pits."
            },
            showSemanticIcon: true,
            customSemanticIcon: 'thumb-up',
            width: '400px',
            ariaLabelledBy: 'fd-message-box-component-base-header fd-message-box-component-base-body'
        });

        messageBoxRef.afterClosed.subscribe(
            (result) => {
                this.closeReason = 'Message box closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.closeReason = 'Message box dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }
}
