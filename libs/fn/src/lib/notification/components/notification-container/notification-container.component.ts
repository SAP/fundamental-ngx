import { Component, ContentChild } from '@angular/core';
import { NotificationActionButtonsDirective } from '../../directives/notification-action-buttons.directive';
import { NotificationDismissButtonDirective } from '../../directives/notification-dismiss-button.directive';
import { NotificationSemanticIconDirective } from '../../directives/notification-semantic-icon.directive';
import { NotificationSemanticTitleDirective } from '../../directives/notification-semantic-title.directive';
import { NotificationTextDirective } from '../../directives/notification-text.directive';
import { NotificationTitleDirective } from '../../directives/notification-title.directive';

@Component({
    selector: 'fn-notification-container',
    templateUrl: './notification-container.component.html'
})
export class NotificationContainerComponent {
    /**
     * Notification title directive.
     */
    @ContentChild(NotificationTitleDirective)
    title?: NotificationTitleDirective;

    /**
     * Notification message directive
     */
    @ContentChild(NotificationTextDirective)
    message?: NotificationTextDirective;

    /**
     * Notification dismiss button.
     */
    @ContentChild(NotificationDismissButtonDirective)
    dismissButton?: NotificationDismissButtonDirective;

    /**
     * Notification actionable buttons container.
     */
    @ContentChild(NotificationActionButtonsDirective)
    actionButtons?: NotificationActionButtonsDirective;

    /**
     * Notification semantic title.
     */
    @ContentChild(NotificationSemanticTitleDirective)
    semanticTitle?: NotificationSemanticTitleDirective;

    /**
     * Notification semantic icon.
     */
    @ContentChild(NotificationSemanticIconDirective)
    semanticIcon?: NotificationSemanticIconDirective;
}
