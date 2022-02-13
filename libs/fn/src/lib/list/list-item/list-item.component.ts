import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { canAssignAdditionalClasses, hasTabIndex } from '@fundamental-ngx/fn/cdk';

const mixinBaseListItem = hasTabIndex(canAssignAdditionalClasses(Object));

@Component({
    selector: 'fn-list-item, [fn-list-item]',
    templateUrl: './list-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: `fn-list__item`
    }
})
export class ListItemComponent extends mixinBaseListItem {
    constructor(private _elementRef: ElementRef) {
        super();
    }
}
