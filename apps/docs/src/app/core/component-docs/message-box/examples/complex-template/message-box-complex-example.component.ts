import { Component } from '@angular/core';
import { MessageBoxRef } from '@fundamental-ngx/core/message-box';

@Component({
    selector: 'fd-message-box-complex-example',
    template: `
        <fd-message-box>
            <fd-message-box-header>
                <ng-template fdTemplate="header">
                    <div fd-bar-left>
                        <fd-bar-element>
                            <fd-message-box-semantic-icon glyph="activate"></fd-message-box-semantic-icon>
                            <h1 fd-title>Fruit facts</h1>
                        </fd-bar-element>
                    </div>
                    <div fd-bar-right>
                        <fd-bar-element>
                            <small>Fact 1 of 12</small>
                        </fd-bar-element>
                    </div>
                </ng-template>
            </fd-message-box-header>

            <fd-message-box-body>
                The jackfruit has been determined to be the largest tree fruit in the world. The jackfruit can weigh as
                much as 100 pounds. There have been jackfruit that has grown as tall as 4 feet in height!
            </fd-message-box-body>

            <fd-message-box-footer>
                <ng-template fdTemplate="footer">
                    <div fd-bar-middle>
                        <fd-button-bar
                                fd-initial-focus
                                label="Ok"
                                fdType="emphasized"
                                (click)="messageBoxRef.close('Ok')">
                        </fd-button-bar>
                    </div>
                </ng-template>
            </fd-message-box-footer>
        </fd-message-box>
    `
})
export class MessageBoxComplexExampleComponent {
    constructor(public messageBoxRef: MessageBoxRef) {}
}
