import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-notification-container',
    template: ``,
    styles: [`
        .fd-notification-container {
            position: fixed;
            display: flex;
            flex-direction: column;
            z-index: 5000;
            align-items: center;
            top: 1rem;
            right: 1rem;
        }
    `],
    host: {
        '[class.fd-notification-container]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class NotificationContainer {}
