import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification/notification.component';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';
import { NotificationFooterComponent } from './notification-footer/notification-footer.component';
import { NotificationBodyComponent } from './notification-body/notification-body.component';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { NotificationContainer } from './notification-utils/notification-container';
import { NotificationService } from './notification-service/notification.service';
import { ButtonModule } from '../button/button.module';

// Directives
import { NotificationTitleDirective } from './directives/notification-title.directive';
import { NotificationIndicatorDirective } from './directives/notification-indicator.directive';
import { NotificationParagraphDirective } from './directives/notification-paragraph.directive';
import { NotificationFooterContentDirective } from './directives/notification-footer-content.directive';
import { NotificationSeparatorDirective } from './directives/notification-separator.directive';
import { NotificationLimitTitleDirective } from './directives/notification-limit-title.directive';
import { NotificationLimitDescriptionDirective } from './directives/notification-limit-description.directive';

// New Components
import { NotificationActionsComponent } from './notification-actions/notification-actions.component';
import { NotificationContentComponent } from './notification-content/notification-content.component';
import { NotificationLimitComponent } from './notification-limit/notification-limit.component';
import { NotificationGroupHeaderComponent } from './notification-group-header/notification-group-header.component';

@NgModule({
    imports: [CommonModule, ButtonModule],
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


        NotificationTitleDirective,
        NotificationIndicatorDirective,
        NotificationParagraphDirective,
        NotificationFooterContentDirective,
        NotificationSeparatorDirective,
        NotificationLimitTitleDirective,
        NotificationLimitDescriptionDirective
    ],
    providers: [DynamicComponentService, NotificationService],
    entryComponents: [
        NotificationContainer,
        NotificationComponent
    ]
})
export class NotificationModule {}
