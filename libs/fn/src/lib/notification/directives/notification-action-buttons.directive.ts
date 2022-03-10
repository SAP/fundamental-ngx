import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';

@Directive({
    selector: '[fnNotificationActionButtons]'
})
export class NotificationActionButtonsDirective extends TemplateRefDirective {}
