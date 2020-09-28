import { Component, ChangeDetectorRef, ElementRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { BaseListItem } from '../base-list-item';
import { ListConfig } from '../list.config';

@Component({
    selector: 'fdp-object-list-item',
    templateUrl: './object-list-item.component.html',
    styleUrls: ['./object-list-item.component.scss'],
    providers: [
        { provide: BaseListItem, useExisting: forwardRef(() => ObjectListItemComponent) }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectListItemComponent extends BaseListItem {
    /** @hidden */
    _contentDensity = this._listConfig.contentDensity;

    /**
     * @hidden
     * Used to define if contentDensity value is 'compact' or not.
     */
    isCompact = this._contentDensity === 'compact';
    /** @hidden */
    constructor(_changeDetectorRef: ChangeDetectorRef, public itemEl: ElementRef,
        protected _listConfig: ListConfig) {
        super(_changeDetectorRef, itemEl, _listConfig);
    }

}
