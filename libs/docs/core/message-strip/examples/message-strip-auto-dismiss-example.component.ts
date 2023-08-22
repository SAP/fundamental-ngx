import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { AutoDismissMessageStripDirective } from '@fundamental-ngx/core/message-strip';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';

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
    `,
    standalone: true,
    imports: [MessageStripComponent, AutoDismissMessageStripDirective, ButtonModule]
})
export class MessageStripAutoDismissExampleComponent {}
