import { Subject } from 'rxjs';
import { Injectable, Output } from '@angular/core';
import { DefaultMenuItem } from './default-menu-item.class';
import { ListItemDirective } from '../list/list-item.directive';
import { KeyUtil } from '../utils/functions/key-util';

@Injectable()
export class MenuKeyboardService {
    /** Event emitted when an item link is clicked.*/
    @Output()
    public readonly itemClicked: Subject<number> = new Subject<number>();

    /** Whether user wants to remove keyboard handling */
    disableKeydownHandling: boolean = false;

    /** Function that is supposed to be called, when focus escape before list */
    focusEscapeBeforeList: Function;

    /** Function that is supposed to be called, when focus escape after list */
    focusEscapeAfterList: Function;

    /** Function that should be called every time, keydown event is used on some menu item,
     * it provides whole functionality for handling
     * ArrowDown - focus, ArrowUp - focus, Space bar - simulate click, Enter key - simulate click.
     * @param event KeyboardEvent
     * @param index index of items starts from 0
     * @param menuItems array of menu item directives
     * */
    keyDownHandler(event: KeyboardEvent, index: number, menuItems: DefaultMenuItem[] | ListItemDirective[]): void {
        if (this.disableKeydownHandling) {
            return;
        }

        if (KeyUtil.isKey(event, 'ArrowDown')) {
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
        } else if (KeyUtil.isKey(event, 'ArrowUp')) {
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
        } else if (KeyUtil.isKey(event, [' ', 'Enter'])) {
            if (menuItems[index]) {
                menuItems[index].click();
                event.preventDefault();
            }
        }
    }
}
