import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';
import { FN_LIST_ACTIONS, FN_LIST_END, FN_LIST_ICON, FN_LIST_TITLE } from './list.tokens';

@Directive({
    selector: '[fnListItemIcon]',
    providers: [
        {
            provide: FN_LIST_ICON,
            useExisting: ListItemIconDirective
        }
    ]
})
export class ListItemIconDirective extends TemplateRefDirective<void> {}

@Directive({
    selector: '[fnListItemActions]',
    providers: [
        {
            provide: FN_LIST_ACTIONS,
            useExisting: ListItemActionsDirective
        }
    ]
})
export class ListItemActionsDirective extends TemplateRefDirective<void> {}

@Directive({
    selector: '[fnListItemTitle]',
    providers: [
        {
            provide: FN_LIST_TITLE,
            useExisting: ListItemTitleDirective
        }
    ]
})
export class ListItemTitleDirective extends TemplateRefDirective<void> {}

@Directive({
    selector: '[fnListItemEnd]',
    providers: [
        {
            provide: FN_LIST_END,
            useExisting: ListItemEndDirective
        }
    ]
})
export class ListItemEndDirective extends TemplateRefDirective<void> {}
