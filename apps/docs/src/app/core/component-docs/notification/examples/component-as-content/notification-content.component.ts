import { Component } from '@angular/core';
import { NotificationRef } from '@fundamental-ngx/core/notification';

@Component({
    selector: 'fd-notification-example-content',
    template: `
        <fd-message-strip type="success" [dismissible]="false" marginBottom="1rem">
            A success message strip.
        </fd-message-strip>
        <fd-notification-body>
            <fd-notification-content>
                <fd-notification-header>
                    <h2 fd-notification-title [unread]="true">
                        {{ notificationRef.data.title }}
                    </h2>
                </fd-notification-header>
                <p fd-notification-paragraph>
                    {{ notificationRef.data.paragraph }}
                </p>
                <fd-notification-footer>
                    <span fd-notification-footer-content>
                        {{ notificationRef.data.firstFooterContent }}
                    </span>
                    <span fd-notification-separator></span>
                    <span fd-notification-footer-content>
                        {{ notificationRef.data.secondFooterContent }}
                    </span>
                </fd-notification-footer>
            </fd-notification-content>
            <fd-notification-actions>
                <button
                    fd-button
                    [label]="notificationRef.data.open"
                    [compact]="true"
                    (click)="notificationRef.close('Open Button Clicked')"
                ></button>
                <button
                    fd-button
                    fdType="transparent"
                    glyph="decline"
                    title="close"
                    [compact]="true"
                    (click)="notificationRef.close('Close Button Click')"
                ></button>
            </fd-notification-actions>
        </fd-notification-body>
    `
})
export class NotificationExampleContentComponent {
    constructor(public notificationRef: NotificationRef) {}
}
