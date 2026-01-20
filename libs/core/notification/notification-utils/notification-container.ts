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
                top: 2rem;
                right: 2rem;
            }
        `
    ],
    host: {
        class: 'fd-notification-container'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotificationContainer {}
