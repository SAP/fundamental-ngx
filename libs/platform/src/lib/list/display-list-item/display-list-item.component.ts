import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef } from '@angular/core';

import { BaseListItem } from '../base-list-item';
import { ListConfig } from '../list.config';

@Component({
    selector: 'fdp-display-list-item',
    templateUrl: './display-list-item.component.html',
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => DisplayListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayListItemComponent extends BaseListItem {
    /** @hidden */
    constructor(
        _changeDetectorRef: ChangeDetectorRef,
        itemEl: ElementRef<HTMLElement>,
        protected _listConfig: ListConfig
    ) {
        super(_changeDetectorRef, itemEl, _listConfig);
    }
}
