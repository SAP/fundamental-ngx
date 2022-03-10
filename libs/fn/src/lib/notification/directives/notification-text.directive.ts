import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';

@Directive({
    selector: '[fnNotificationText]'
})
export class NotificationTextDirective extends TemplateRefDirective {}
