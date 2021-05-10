import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-notification-container',
    template: ``,
    styles: [
        `
            .fd-notification-container {
                position: fixed;
                display: flex;
                flex-direction: column;
                z-index: 5000;
                align-items: flex-end;
                top: 4.75rem;
                right: 2rem;
            }
        `
    ],
    host: {
        '[class.fd-notification-container]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationContainer {}
