import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';
import {
    FN_NOTIFICATION_ACTION_BUTTONS,
    FN_NOTIFICATION_DISMISS_BUTTON,
    FN_NOTIFICATION_SEMANTIC_ICON,
    FN_NOTIFICATION_SEMANTIC_TITLE,
    FN_NOTIFICATION_TEXT,
    FN_NOTIFICATION_TITLTE
} from './notification.tokens';

@Directive({
    selector: '[fnNotificationActionButtons]',
    providers: [
        {
            provide: FN_NOTIFICATION_ACTION_BUTTONS,
            useExisting: NotificationActionButtonsDirective
        }
    ]
})
export class NotificationActionButtonsDirective extends TemplateRefDirective {}

@Directive({
    selector: '[fnNotificationDismissButton]',
    providers: [
        {
            provide: FN_NOTIFICATION_DISMISS_BUTTON,
            useExisting: NotificationDismissButtonDirective
        }
    ]
})
export class NotificationDismissButtonDirective extends TemplateRefDirective {}

@Directive({
    selector: '[fnNotificationSemanticIcon]',
    providers: [
        {
            provide: FN_NOTIFICATION_SEMANTIC_ICON,
            useExisting: NotificationSemanticIconDirective
        }
    ]
})
export class NotificationSemanticIconDirective extends TemplateRefDirective {}

@Directive({
    selector: '[fnNotificationSemanticTitle]',
    providers: [
        {
            provide: FN_NOTIFICATION_SEMANTIC_TITLE,
            useExisting: NotificationSemanticTitleDirective
        }
    ]
})
export class NotificationSemanticTitleDirective extends TemplateRefDirective {}

@Directive({
    selector: '[fnNotificationText]',
    providers: [
        {
            provide: FN_NOTIFICATION_TEXT,
            useExisting: NotificationTextDirective
        }
    ]
})
export class NotificationTextDirective extends TemplateRefDirective {}

@Directive({
    selector: '[fnNotificationTitle]',
    providers: [
        {
            provide: FN_NOTIFICATION_TITLTE,
            useExisting: NotificationTitleDirective
        }
    ]
})
export class NotificationTitleDirective extends TemplateRefDirective {}
