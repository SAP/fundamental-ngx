import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { canAssignAdditionalClasses, hasTabIndex } from '@fundamental-ngx/fn/cdk';
import { FN_LIST_ACTIONS, FN_LIST_END, FN_LIST_TITLE } from '../list.tokens';
import { TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';

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
    @ContentChild(FN_LIST_TITLE)
    titleProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_ACTIONS)
    actionsProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_END)
    endProvider?: TemplateRefProviderToken<void>;

    constructor(private _elementRef: ElementRef) {
        super();
    }
}
