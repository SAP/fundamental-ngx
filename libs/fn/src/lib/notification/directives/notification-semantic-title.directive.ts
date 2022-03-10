import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';

@Directive({
    selector: '[fnNotificationSemanticTitle]'
})
export class NotificationSemanticTitleDirective extends TemplateRefDirective {}
