import { Component } from '@angular/core';
import { MessageBoxRef } from '@fundamental-ngx/core/message-box';
import { TextData } from './component-based-message-box-example.component';

@Component({
    template: `
        <fd-message-box>
            <fd-message-box-header>
                <h1 fd-title id="fd-message-box-component-base-header">{{ messageBoxRef.data.title }}</h1>
            </fd-message-box-header>
            <fd-message-box-body>
                <p id="fd-message-box-component-base-body" role="dialog">
                    {{ messageBoxRef.data.text }}
                </p>
            </fd-message-box-body>
            <fd-message-box-footer>
                <fd-button-bar
                    fd-initial-focus
                    label="Ok"
                    ariaLabel="Ok"
                    fdType="emphasized"
                    (click)="messageBoxRef.close('Ok')"
                >
                </fd-button-bar>
                <fd-button-bar
                    label="Cancel"
                    ariaLabel="Cancel"
                    (click)="messageBoxRef.dismiss('Cancel')"
                ></fd-button-bar>
            </fd-message-box-footer>
        </fd-message-box>
    `
})
export class MessageBoxExampleComponent {
    constructor(public messageBoxRef: MessageBoxRef<TextData>) {}
}
