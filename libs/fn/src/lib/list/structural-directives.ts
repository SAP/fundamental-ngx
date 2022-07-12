import { Directive } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';
import {
    FN_LIST_ACTIONS,
    FN_LIST_POSTFIX,
    FN_LIST_ICON,
    FN_LIST_PREFIX,
    FN_LIST_TITLE,
    FN_LIST_BYLINE
} from './list.tokens';

@Directive({
    selector: '[fnListItemPrefix]',
    providers: [
        {
            provide: FN_LIST_PREFIX,
            useExisting: ListItemPrefixDirective
        }
    ]
})
export class ListItemPrefixDirective extends TemplateRefDirective<void> {}

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
    selector: '[fnListItemByline]',
    providers: [
        {
            provide: FN_LIST_BYLINE,
            useExisting: ListItemBylineDirective
        }
    ]
})
export class ListItemBylineDirective extends TemplateRefDirective<void> {}

@Directive({
    selector: '[fnListItemPostfix]',
    providers: [
        {
            provide: FN_LIST_POSTFIX,
            useExisting: ListItemPostfixDirective
        }
    ]
})
export class ListItemPostfixDirective extends TemplateRefDirective<void> {}
