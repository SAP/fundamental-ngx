import {
    Component, ChangeDetectorRef, ElementRef, forwardRef,
    ChangeDetectionStrategy, Optional
} from '@angular/core';

import { BaseListItem } from '../base-list-item';
import { ListConfig } from '../list.config';
import { Router } from '@angular/router';

@Component({
    selector: 'fdp-display-list-item',
    templateUrl: './display-list-item.component.html',
    providers: [
        { provide: BaseListItem, useExisting: forwardRef(() => DisplayListItemComponent) }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayListItemComponent extends BaseListItem {
    /** @hidden */
    constructor(_changeDetectorRef: ChangeDetectorRef, itemEl: ElementRef,
        protected _listConfig: ListConfig, @Optional() protected _router: Router) {
        super(_changeDetectorRef, itemEl, _listConfig, _router);
    }

}
