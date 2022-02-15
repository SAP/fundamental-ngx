import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { canAssignAdditionalClasses, hasTabIndex } from '@fundamental-ngx/fn/cdk';
import { ListItemTitleDirective, ListItemActionsDirective, ListItemEndDirective } from '../structural-directives';

const mixinBaseListItem = hasTabIndex(canAssignAdditionalClasses(Object));

@Component({
    selector: 'fn-list-item, [fn-list-item]',
    templateUrl: './list-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fn-list__item]': 'true'
    }
})
export class ListItemComponent extends mixinBaseListItem {
    @ContentChild(ListItemTitleDirective)
    titleDirective?: ListItemTitleDirective;
    @ContentChild(ListItemActionsDirective)
    actionsDirective?: ListItemActionsDirective;
    @ContentChild(ListItemEndDirective)
    endDirective?: ListItemEndDirective;

    constructor(private _elementRef: ElementRef) {
        super();
    }
}
