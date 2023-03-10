import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { BaseListItem } from '../base-list-item';

@Component({
    selector: 'fdp-display-list-item',
    templateUrl: './display-list-item.component.html',
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => DisplayListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayListItemComponent extends BaseListItem {}
