import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { canAssignAdditionalClasses, hasTabIndex } from '@fundamental-ngx/fn/cdk';
import { ListItemTitleDirective } from '../list-item-title/list-item-title.directive';

const mixinBaseListItem = hasTabIndex(canAssignAdditionalClasses(Object));

@Component({
    selector: 'fn-list-item, [fn-list-item]',
    templateUrl: './list-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[class.fn-list__item]': 'true'
    }
})
export class ListItemComponent extends mixinBaseListItem {
    @ContentChild(ListItemTitleDirective)
    titleDirective?: ListItemTitleDirective;

    constructor(private _elementRef: ElementRef) {
        super();
    }
}
