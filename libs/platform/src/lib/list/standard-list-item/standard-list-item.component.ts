import { ChangeDetectionStrategy, Component, ViewEncapsulation, forwardRef } from '@angular/core';

import { BaseListItem } from '../base-list-item';

@Component({
    selector: 'fdp-standard-list-item',
    templateUrl: './standard-list-item.component.html',
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => StandardListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class StandardListItemComponent extends BaseListItem {}
