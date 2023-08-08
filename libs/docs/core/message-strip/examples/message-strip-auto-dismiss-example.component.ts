import { Component } from '@angular/core';

@Component({
    selector: 'message-strip-auto-dismiss-example',
    template: `
        <fd-message-strip
            #messageStripComponent="fdAutoDismissMessageStrip"
            [duration]="5000"
            [mousePersist]="true"
            [dismissible]="true"
            [autoDismiss]="true"
        >
            Will be auto dismissed in 5 seconds, if mouse will not be over the message strip. If it's over it, then it
            will be dismissed in 5 seconds after mouse leaves.
        </fd-message-strip>
        <button fd-button (click)="messageStripComponent.open()">Open message strip</button>
    `
})
export class MessageStripAutoDismissExampleComponent {}
