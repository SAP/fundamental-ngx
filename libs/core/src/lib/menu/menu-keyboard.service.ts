import { Subject } from 'rxjs';
import { Injectable, Output } from '@angular/core';
import { DefaultMenuItem } from './default-menu-item.class';
import { ListItemComponent } from '@fundamental-ngx/core/list';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

@Injectable()
export class MenuKeyboardService {
    /** Event emitted when an item link is clicked.*/
    @Output()
    public readonly itemClicked: Subject<number> = new Subject<number>();

    /** Whether user wants to remove keyboard handling */
    disableKeydownHandling = false;

    /** Function that is supposed to be called, when focus escape before list */
    focusEscapeBeforeList: () => void;

    /** Function that is supposed to be called, when focus escape after list */
    focusEscapeAfterList: () => void;

    /** Function that should be called every time, keydown event is used on some menu item,
     * it provides whole functionality for handling
     * ArrowDown - focus, ArrowUp - focus, Space bar - simulate click, Enter key - simulate click.
     * @param event KeyboardEvent
     * @param index index of items starts from 0
     * @param menuItems array of menu item directives
     * */
    keyDownHandler(event: KeyboardEvent, index: number, menuItems: DefaultMenuItem[] | ListItemComponent[]): void {
        if (this.disableKeydownHandling) {
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            if (menuItems.length > index + 1) {
                menuItems[index + 1].focus();
            } else {
                if (this.focusEscapeAfterList) {
                    this.focusEscapeAfterList();
                } else {
                    menuItems[0].focus();
                }
            }
            event.preventDefault();
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            if (index > 0) {
                menuItems[index - 1].focus();
            } else {
                if (this.focusEscapeBeforeList) {
                    this.focusEscapeBeforeList();
                } else {
                    menuItems[menuItems.length - 1].focus();
                }
            }
            event.preventDefault();
        } else if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            if (menuItems[index]) {
                menuItems[index].click();
                event.preventDefault();
            }
        }
    }
}
