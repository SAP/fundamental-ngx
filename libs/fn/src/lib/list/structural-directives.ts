import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';

@Directive({
    selector: '[fnListItemActions]'
})
export class ListItemActionsDirective extends TemplateRefDirective<void> {}

@Directive({
    selector: '[fnListItemTitle]'
})
export class ListItemTitleDirective extends TemplateRefDirective<void> {}

@Directive({
    selector: '[fnListItemEnd]'
})
export class ListItemEndDirective extends TemplateRefDirective<void> {}
