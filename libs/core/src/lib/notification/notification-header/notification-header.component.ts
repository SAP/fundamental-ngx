import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-notification-header',
    templateUrl: './notification-header.component.html',
    styleUrls: ['./notification-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotificationHeaderComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__header')
    fdNotificationHeaderClass: boolean = true;

    /** type of Notification 'success' | 'warning' | 'information' | 'error' */
    @Input()
    type: string;

    /** Whether user wants to hide close button at the top. It's shown by default. */
    @Input()
    closeButton: boolean = true;

    /** Event thrown always, when the close button is clicked */
    @Output()
    readonly closeButtonClick: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    public closeButtonClicked(): void {
        this.closeButtonClick.emit();
    }
}
