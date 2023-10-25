import { NgModule } from '@angular/core';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { NotificationFooterContentDirective } from './directives/notification-footer-content.directive';
import { NotificationIndicatorDirective } from './directives/notification-indicator.directive';
import { NotificationLimitDescriptionDirective } from './directives/notification-limit-description.directive';
import { NotificationLimitTitleDirective } from './directives/notification-limit-title.directive';
import { NotificationParagraphDirective } from './directives/notification-paragraph.directive';
import { NotificationSeparatorDirective } from './directives/notification-separator.directive';
import { NotificationTitleDirective } from './directives/notification-title.directive';
import { NotificationActionsComponent } from './notification-actions/notification-actions.component';
import { NotificationBodyComponent } from './notification-body/notification-body.component';
import { NotificationContentComponent } from './notification-content/notification-content.component';
import { NotificationFooterComponent } from './notification-footer/notification-footer.component';
import { NotificationGroupHeaderComponent } from './notification-group-header/notification-group-header.component';
import { NotificationGroupListComponent } from './notification-group-list/notification-group-list.component';
import { NotificationGroupComponent } from './notification-group/notification-group.component';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';
import { NotificationLimitComponent } from './notification-limit/notification-limit.component';
import { NotificationService } from './notification-service/notification.service';
import { NotificationContainer } from './notification-utils/notification-container';
import { NotificationComponent } from './notification/notification.component';

const components = [
    NotificationComponent,
    NotificationHeaderComponent,
    NotificationFooterComponent,
    NotificationBodyComponent,
    NotificationContainer,
    NotificationActionsComponent,
    NotificationContentComponent,
    NotificationLimitComponent,
    NotificationGroupHeaderComponent,
    NotificationGroupComponent,
    NotificationGroupListComponent,
    NotificationTitleDirective,
    NotificationIndicatorDirective,
    NotificationParagraphDirective,
    NotificationFooterContentDirective,
    NotificationSeparatorDirective,
    NotificationLimitTitleDirective,
    NotificationLimitDescriptionDirective
];

@NgModule({
    imports: [...components],
    exports: [...components],
    providers: [DynamicComponentService, NotificationService]
})
export class NotificationModule {}
