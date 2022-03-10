import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';

@Directive({
    selector: '[fnNotificationTitle]'
})
export class NotificationTitleDirective extends TemplateRefDirective {}
