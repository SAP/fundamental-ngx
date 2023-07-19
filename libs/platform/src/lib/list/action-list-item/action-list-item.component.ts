import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Output,
    ViewChild
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/cdk/utils';

import { BaseListItem, IS_ACTIVE_CLASS } from '../base-list-item';

export class ActionChangeEvent {
    /** Action List Item component */
    source: ActionListItemComponent;
}

@Component({
    selector: 'fdp-action-list-item',
    templateUrl: './action-list-item.component.html',
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => ActionListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionListItemComponent extends BaseListItem {
    /** Access button element*/
    @ViewChild('action', { read: ElementRef })
    button: ElementRef<HTMLButtonElement>;

    /** Event sent when action in clicked */
    @Output()
    actionClicked = new EventEmitter<ActionChangeEvent>();

    /**
     * @hidden
     * Handles action click
     */
    _onActionClick(): void {
        const event = new ActionChangeEvent();
        event.source = this;
        this.actionClicked.emit(event);
    }

    /**
     * @hidden
     * on keydown append active styles on actionable item
     */
    _onKeyDown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.button.nativeElement.classList.add(IS_ACTIVE_CLASS);
        }
    }

    /**
     * @hidden
     * on keyup remove active styles from actionable item
     */
    _onKeyUp(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.button.nativeElement.classList.remove(IS_ACTIVE_CLASS);
            this._onActionClick();
        }
    }
}
