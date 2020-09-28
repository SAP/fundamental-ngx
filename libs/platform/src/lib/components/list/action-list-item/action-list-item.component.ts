import { Component, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ListConfig } from '../list.config';
import { BaseListItem } from '../base-list-item';


@Component({
    selector: 'fdp-action-list-item',
    templateUrl: './action-list-item.component.html',
    styleUrls: ['./action-list-item.component.scss'],
    providers: [
        { provide: BaseListItem, useExisting: forwardRef(() => ActionListItemComponent) }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionListItemComponent extends BaseListItem {


    /** @hidden */
    /**on keydown append active styles on actionable item */
    onKeyDown(event: any): void {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.itemEl.nativeElement.querySelector('button').classList.add('is-active');
        }
    }

    /** @hidden */
    /**on keyup remove active styles from actionable item*/
    onKeyUp(event: any): void {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.itemEl.nativeElement.querySelector('button').classList.remove('is-active');
        }
    }

    /** @hidden */
    constructor(_changeDetectorRef: ChangeDetectorRef, public itemEl: ElementRef,
        protected _listConfig: ListConfig) {
        super(_changeDetectorRef, itemEl, _listConfig);
    }

}
