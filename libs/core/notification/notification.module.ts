import { NgModule } from '@angular/core';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';

// Directives
import { NotificationFooterContentDirective } from './directives/notification-footer-content.directive';
import { NotificationGroupGrowingItemTitleDirective } from './directives/notification-group-growing-item-title.directive';
import { NotificationGroupHeaderTitleDirective } from './directives/notification-group-header-title.directive';
import { NotificationListDirective } from './directives/notification-list.directive';
import { NotificationMessageStripContainerDirective } from './directives/notification-message-strip-container.directive';
import { NotificationMessageStripDirective } from './directives/notification-message-strip.directive';
import { NotificationParagraphDirective } from './directives/notification-paragraph.directive';
import { NotificationPopoverDirective } from './directives/notification-popover.directive';
import { NotificationSeparatorDirective } from './directives/notification-separator.directive';
import { NotificationTitleDirective } from './directives/notification-title.directive';

// Components
import { NotificationActionsComponent } from './notification-actions/notification-actions.component';
import { NotificationBodyComponent } from './notification-body/notification-body.component';
import { NotificationContentComponent } from './notification-content/notification-content.component';
import { NotificationFooterComponent } from './notification-footer/notification-footer.component';
import { NotificationGroupGrowingItemComponent } from './notification-group-growing-item/notification-group-growing-item.component';
import { NotificationGroupHeaderComponent } from './notification-group-header/notification-group-header.component';
import { NotificationGroupListComponent } from './notification-group-list/notification-group-list.component';
import { NotificationGroupComponent } from './notification-group/notification-group.component';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';
import { NotificationLinkComponent } from './notification-link/notification-link.component';
import { NotificationComponent } from './notification/notification.component';

// Utils
import { NotificationService } from './notification-service/notification.service';
import { NotificationContainer } from './notification-utils/notification-container';

const components = [
    NotificationComponent,
    NotificationContainer,
    NotificationLinkComponent,
    NotificationBodyComponent,
    NotificationGroupComponent,
    NotificationHeaderComponent,
    NotificationFooterComponent,
    NotificationActionsComponent,
    NotificationContentComponent,
    NotificationGroupListComponent,
    NotificationGroupHeaderComponent,
    NotificationGroupGrowingItemComponent,
    NotificationListDirective,
    NotificationTitleDirective,
    NotificationPopoverDirective,
    NotificationSeparatorDirective,
    NotificationParagraphDirective,
    NotificationMessageStripDirective,
    NotificationFooterContentDirective,
    NotificationGroupHeaderTitleDirective,
    NotificationMessageStripContainerDirective,
    NotificationGroupGrowingItemTitleDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components],
    providers: [DynamicComponentService, NotificationService]
})
export class NotificationModule {}
