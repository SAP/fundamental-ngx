import { Component } from '@angular/core';
import { MessageBoxRef } from '@fundamental-ngx/core';
import { TextData } from './component-based-message-box-example.component';

@Component({
    template: `
        <fd-message-box>
            <fd-message-box-header>
                <h1 fd-title>{{ messageBoxRef.data.title }}</h1>
                <fd-message-box-close-icon (click)="messageBoxRef.dismiss('Close button')"></fd-message-box-close-icon>
            </fd-message-box-header>
            <fd-message-box-body>
                {{ messageBoxRef.data.text }}
            </fd-message-box-body>
            <fd-message-box-footer>
                <fd-message-box-footer-button>
                    <button
                        fd-button
                        fd-initial-focus
                        fd-message-box-decisive-button
                        fdType="emphasized"
                        label="Ok"
                        [compact]="true"
                        (click)="messageBoxRef.close('Ok')">
                    </button>
                </fd-message-box-footer-button>
                <fd-message-box-footer-button>
                    <button
                        fd-button
                        fd-message-box-decisive-button
                        fdType="transparent"
                        label="Cancel"
                        [compact]="true"
                        (click)="messageBoxRef.dismiss('Cancel')">
                    </button>
                </fd-message-box-footer-button>
            </fd-message-box-footer>
        </fd-message-box>
    `
})
export class MessageBoxExampleComponent {
    constructor(public messageBoxRef: MessageBoxRef<TextData>) {}
}
