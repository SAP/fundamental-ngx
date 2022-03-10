import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';

@Directive({
    selector: '[fnNotificationDismissButton]'
})
export class NotificationDismissButtonDirective extends TemplateRefDirective {}
