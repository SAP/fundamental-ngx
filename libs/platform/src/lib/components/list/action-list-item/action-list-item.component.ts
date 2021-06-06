import {
    Component, ChangeDetectorRef, ElementRef,
    ChangeDetectionStrategy, forwardRef, Input, Output, EventEmitter, ViewChild, Optional
} from '@angular/core';
import { Router } from '@angular/router';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/core';

import { ListConfig } from '../list.config';
import { ActionChangeEvent, BaseListItem, IS_ACTIVE_CLASS } from '../base-list-item';

@Component({
    selector: 'fdp-action-list-item',
    templateUrl: './action-list-item.component.html',
    providers: [
        { provide: BaseListItem, useExisting: forwardRef(() => ActionListItemComponent) }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionListItemComponent extends BaseListItem {

    @Input()
    title: string;

    /** Access button element*/
    @ViewChild('action', { read: ElementRef })
    button: ElementRef;

    /** Event sent when action in clicked */
    @Output()
    actionClicked = new EventEmitter<ActionChangeEvent>();

    /** @hidden */
    constructor(_changeDetectorRef: ChangeDetectorRef, public itemEl: ElementRef,
        protected _listConfig: ListConfig, @Optional() protected _router: Router) {
        super(_changeDetectorRef, itemEl, _listConfig, _router);
    }
    /**
     *  @hidden
     *  Handles action click
     */
    _onActionClick($event: MouseEvent | KeyboardEvent | TouchEvent): void {
        const event = new ActionChangeEvent();
        event.source = this;
        this.actionClicked.emit(event);
    }

    /** @hidden */
    /**on keydown append active styles on actionable item */
    _onKeyDown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
            this.button.nativeElement.classList.add(IS_ACTIVE_CLASS);
        }
    }

    /** @hidden */
    /**on keyup remove active styles from actionable item*/
    _onKeyUp(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
            this.button.nativeElement.classList.remove(IS_ACTIVE_CLASS);
            this._onActionClick(event);

        }
    }

}
