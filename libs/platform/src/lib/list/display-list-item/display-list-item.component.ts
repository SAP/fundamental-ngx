import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Optional } from '@angular/core';
import { Router } from '@angular/router';

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
        itemEl: ElementRef,
        protected _listConfig: ListConfig,
        @Optional() protected _router: Router
    ) {
        super(_changeDetectorRef, itemEl, _listConfig, _router);
    }
}
