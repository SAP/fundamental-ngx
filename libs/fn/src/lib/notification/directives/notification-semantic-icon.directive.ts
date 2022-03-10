import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';

@Directive({
    selector: '[fnNotificationSemanticIcon]'
})
export class NotificationSemanticIconDirective extends TemplateRefDirective {}
