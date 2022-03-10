import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { ToastOverlayContainer } from '@fundamental-ngx/fn/cdk';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { NotificationTextComponent } from './components/notification-text/notification-text.component';
import { NotificationContainerComponent } from './components/notification-container/notification-container.component';
import { NotificationTitleDirective } from './directives/notification-title.directive';
import { NotificationTextDirective } from './directives/notification-text.directive';
import { NotificationDismissButtonDirective } from './directives/notification-dismiss-button.directive';
import { NotificationActionButtonsDirective } from './directives/notification-action-buttons.directive';
import { NotificationSemanticTitleDirective } from './directives/notification-semantic-title.directive';
import { NotificationSemanticIconDirective } from './directives/notification-semantic-icon.directive';

@NgModule({
    imports: [CommonModule, PortalModule, OverlayModule, ButtonModule, IconModule],
    exports: [
        NotificationComponent,
        NotificationTextComponent,
        NotificationContainerComponent,
        NotificationTitleDirective,
        NotificationTextDirective,
        NotificationDismissButtonDirective,
        NotificationActionButtonsDirective,
        NotificationSemanticTitleDirective,
        NotificationSemanticIconDirective
    ],
    declarations: [
        NotificationComponent,
        NotificationTextComponent,
        NotificationContainerComponent,
        NotificationTitleDirective,
        NotificationTextDirective,
        NotificationDismissButtonDirective,
        NotificationActionButtonsDirective,
        NotificationSemanticTitleDirective,
        NotificationSemanticIconDirective
    ],
    providers: [NotificationService, { provide: OverlayContainer, useClass: ToastOverlayContainer }]
})
export class NotificationModule {}
