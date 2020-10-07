import {
    Component, ChangeDetectorRef, ElementRef,
    forwardRef, ChangeDetectionStrategy, ViewEncapsulation,
    ContentChildren, QueryList
} from '@angular/core';
import { Router } from '@angular/router';

import { BaseListItem } from '../base-list-item';
import { ListConfig } from '../list.config';
import { ObjectListItemRowComponent } from './object-list-item-row.component';


@Component({
    selector: 'fdp-object-list-item',
    templateUrl: './object-list-item.component.html',
    styleUrls: ['./object-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: BaseListItem, useExisting: forwardRef(() => ObjectListItemComponent) }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectListItemComponent extends BaseListItem {

    @ContentChildren(ObjectListItemRowComponent)
    children: QueryList<ObjectListItemRowComponent>;

    /**
     * @hidden
     * Used to define if contentDensity value is 'compact' or not.
     */
    isCompact = this._contentDensity === 'compact';

    /** @hidden */
    constructor(_changeDetectorRef: ChangeDetectorRef, public itemEl: ElementRef,
        protected _listConfig: ListConfig, private _router: Router) {
        super(_changeDetectorRef, itemEl, _listConfig, _router);
    }

}
