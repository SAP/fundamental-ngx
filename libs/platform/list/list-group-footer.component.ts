import { Component } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { LIST_ITEM_TYPE } from './base-list-item';

@Component({
    selector: 'fdp-list-footer',
    template: `<div #listFooter class="fd-list__footer" [attr.id]="id" role="option"><ng-content></ng-content></div>`,
    standalone: true,
    host: {
        role: 'none'
    }
})
export class ListFooterComponent extends BaseComponent {
    /** @hidden */
    _type = LIST_ITEM_TYPE.FOOTER;
}
