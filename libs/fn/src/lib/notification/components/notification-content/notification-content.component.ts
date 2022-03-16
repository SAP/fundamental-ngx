import { Component, ContentChild } from '@angular/core';
import {
    FN_NOTIFICATION_ACTION_BUTTONS,
    FN_NOTIFICATION_DISMISS_BUTTON,
    FN_NOTIFICATION_SEMANTIC_ICON,
    FN_NOTIFICATION_SEMANTIC_TITLE,
    FN_NOTIFICATION_TEXT,
    FN_NOTIFICATION_TITLTE
} from '../../notification.tokens';
import { TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';

@Component({
    selector: 'fn-notification-content',
    templateUrl: './notification-content.component.html'
})
export class NotificationContentComponent {
    /**
     * Notification title directive.
     */
    @ContentChild(FN_NOTIFICATION_TITLTE)
    title?: TemplateRefProviderToken<void>;

    /**
     * Notification message directive
     */
    @ContentChild(FN_NOTIFICATION_TEXT)
    message?: TemplateRefProviderToken<void>;

    /**
     * Notification dismiss button.
     */
    @ContentChild(FN_NOTIFICATION_DISMISS_BUTTON)
    dismissButton?: TemplateRefProviderToken<void>;

    /**
     * Notification actionable buttons container.
     */
    @ContentChild(FN_NOTIFICATION_ACTION_BUTTONS)
    actionButtons?: TemplateRefProviderToken<void>;

    /**
     * Notification semantic title.
     */
    @ContentChild(FN_NOTIFICATION_SEMANTIC_TITLE)
    semanticTitle?: TemplateRefProviderToken<void>;

    /**
     * Notification semantic icon.
     */
    @ContentChild(FN_NOTIFICATION_SEMANTIC_ICON)
    semanticIcon?: TemplateRefProviderToken<void>;
}
