import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationMetadata], [fd-notification-metadata]'
})
export class NotificationMetadataDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__metadata')
    fdNotificationMetaDataClass: boolean = true;
}
