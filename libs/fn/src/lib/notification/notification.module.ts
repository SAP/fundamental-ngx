import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { BaseToastOverlayContainer } from '@fundamental-ngx/cdk/utils';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { NotificationTextComponent } from './components/notification-text/notification-text.component';
import { NotificationContentComponent } from './components/notification-content/notification-content.component';
import {
    NotificationActionButtonsDirective,
    NotificationDismissButtonDirective,
    NotificationSemanticIconDirective,
    NotificationSemanticTitleDirective,
    NotificationTextDirective,
    NotificationTitleDirective
} from './structural-directives';

@NgModule({
    imports: [CommonModule, PortalModule, OverlayModule, ButtonModule, IconModule],
    exports: [
        NotificationComponent,
        NotificationTextComponent,
        NotificationContentComponent,
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
        NotificationContentComponent,
        NotificationTitleDirective,
        NotificationTextDirective,
        NotificationDismissButtonDirective,
        NotificationActionButtonsDirective,
        NotificationSemanticTitleDirective,
        NotificationSemanticIconDirective
    ],
    providers: [NotificationService, { provide: OverlayContainer, useClass: BaseToastOverlayContainer }]
})
export class NotificationModule {}
