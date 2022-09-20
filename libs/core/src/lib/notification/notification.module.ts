import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { NotificationContainer } from './notification-utils/notification-container';
import { NotificationService } from './notification-service/notification.service';
import { NotificationComponent } from './notification/notification.component';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';
import { NotificationFooterComponent } from './notification-footer/notification-footer.component';
import { NotificationBodyComponent } from './notification-body/notification-body.component';
import { NotificationActionsComponent } from './notification-actions/notification-actions.component';
import { NotificationContentComponent } from './notification-content/notification-content.component';
import { NotificationLimitComponent } from './notification-limit/notification-limit.component';
import { NotificationGroupHeaderComponent } from './notification-group-header/notification-group-header.component';
import { NotificationGroupComponent } from './notification-group/notification-group.component';
import { NotificationGroupListComponent } from './notification-group-list/notification-group-list.component';
import { NotificationTitleDirective } from './directives/notification-title.directive';
import { NotificationIndicatorDirective } from './directives/notification-indicator.directive';
import { NotificationParagraphDirective } from './directives/notification-paragraph.directive';
import { NotificationFooterContentDirective } from './directives/notification-footer-content.directive';
import { NotificationSeparatorDirective } from './directives/notification-separator.directive';
import { NotificationLimitTitleDirective } from './directives/notification-limit-title.directive';
import { NotificationLimitDescriptionDirective } from './directives/notification-limit-description.directive';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@NgModule({
    imports: [CommonModule, ButtonModule, A11yModule, SkeletonModule],
    declarations: [
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
    ],
    exports: [
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
    ],
    providers: [DynamicComponentService, NotificationService]
})
export class NotificationModule {}
