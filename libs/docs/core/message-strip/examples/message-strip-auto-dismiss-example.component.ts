import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { AutoDismissMessageStripDirective, MessageStripComponent } from '@fundamental-ngx/core/message-strip';

@Component({
    selector: 'fd-message-strip-auto-dismiss-example',
    template: `
        <fd-message-strip
            #messageStripComponent="fdAutoDismissMessageStrip"
            mousePersist
            autoDismiss
            dismissible
            [duration]="5000"
        >
            Will be auto dismissed in 5 seconds, if mouse will not be over the message strip. If it's over it, then it
            will be dismissed in 5 seconds after mouse leaves.
        </fd-message-strip>
        <button fd-button (click)="messageStripComponent.open()">Open message strip</button>
    `,
    imports: [MessageStripComponent, AutoDismissMessageStripDirective, ButtonComponent]
})
export class MessageStripAutoDismissExampleComponent {}
