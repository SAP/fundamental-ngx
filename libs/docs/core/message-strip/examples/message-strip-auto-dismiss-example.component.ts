import { Component, inject, OnDestroy } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    AutoDismissMessageStripDirective,
    MessageStripAlertService,
    MessageStripComponent
} from '@fundamental-ngx/core/message-strip';

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
        <button fd-button (click)="onClick()">Open message strip</button>
    `,
    standalone: true,
    imports: [MessageStripComponent, AutoDismissMessageStripDirective, ButtonComponent]
})
export class MessageStripAutoDismissExampleComponent implements OnDestroy {
    private _msgStripService = inject(MessageStripAlertService);

    ngOnDestroy(): void {
        console.log('destroyed');
    }

    onClick() {
        const ref = this._msgStripService.open({
            position: 'bottom-middle',
            content: 'Message from the future',
            closeOnNavigation: true,
            messageStrip: {
                duration: 2000,
                mousePersist: true,
                type: 'error',
                dismissible: true
            }
        });
        ref.onDismiss$.subscribe({
            next: () => {
                console.log('dismissed alright ');
            },
            complete: () => {
                console.log('completed dismiss');
            }
        });
    }
}
