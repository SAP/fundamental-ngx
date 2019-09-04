import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationGroupComponent } from './notification-group/notification-group.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationTitleDirective } from './directives/notification-title.directive';
import { NotificationContentDirective } from './directives/notification-content.directive';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';
import { NotificationFooterComponent } from './notification-footer/notification-footer.component';
import { NotificationAvatarDirective } from './directives/notification-avatar.directive';
import { NotificationDescriptionDirective } from './directives/notification-description.directive';
import { NotificationMetadataDirective } from './directives/notification-metadata.directive';
import { NotificationBodyComponent } from './notification-body/notification-body.component';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { NotificationContainer } from './notification-utils/notification-container';
import { NotificationTextDirective } from './directives/notification-text.directive';
import { NotificationActionsDirective } from './directives/notification-actions.directive';
import { NotificationService } from './notification-service/notification.service';
import { DefaultNotificationComponent } from './notification-utils/default-notification/default-notification.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        NotificationGroupComponent,
        NotificationComponent,
        NotificationTitleDirective,
        NotificationContentDirective,
        NotificationHeaderComponent,
        NotificationFooterComponent,
        NotificationAvatarDirective,
        NotificationDescriptionDirective,
        NotificationMetadataDirective,
        NotificationBodyComponent,
        NotificationContainer,
        NotificationTextDirective,
        NotificationActionsDirective,
        DefaultNotificationComponent
    ],
    exports: [
        NotificationGroupComponent,
        NotificationComponent,
        NotificationTitleDirective,
        NotificationContentDirective,
        NotificationHeaderComponent,
        NotificationFooterComponent,
        NotificationAvatarDirective,
        NotificationDescriptionDirective,
        NotificationMetadataDirective,
        NotificationBodyComponent,
        NotificationContainer,
        NotificationTextDirective,
        NotificationActionsDirective,
        DefaultNotificationComponent
    ],
    providers: [
        DynamicComponentService,
        NotificationService
    ],
    entryComponents: [
        NotificationContainer,
        NotificationComponent,
        NotificationGroupComponent,
        DefaultNotificationComponent
    ]
})
export class NotificationModule {}
