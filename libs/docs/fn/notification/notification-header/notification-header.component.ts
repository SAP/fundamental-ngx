import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-notification-header',
    templateUrl: './notification-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationHeaderComponent {}
