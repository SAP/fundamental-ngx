import { Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, forwardRef } from '@angular/core';
import { BaseListItem } from '../base-list-item';


@Component({
    selector: 'fdp-standard-list-item',
    templateUrl: './standard-list-item.component.html',
    styleUrls: ['./standard-list-item.component.scss'],
    providers: [
        { provide: BaseListItem, useExisting: forwardRef(() => StandardListItemComponent) }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class StandardListItemComponent extends BaseListItem {

    /** @hidden */
    constructor(_changeDetectorRef: ChangeDetectorRef, public itemEl: ElementRef) {
        super(_changeDetectorRef, itemEl);
    }

}
