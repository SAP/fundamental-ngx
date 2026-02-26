import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NotificationGroupBaseDirective } from '../notification-utils/notification-group-base';

@Component({
    selector: 'fd-notification-body',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-notification__body'
    }
})
export class NotificationBodyComponent extends NotificationGroupBaseDirective {}
