import { DOWN_ARROW, END, ENTER, HOME, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable, Output } from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { ListItemComponent } from '@fundamental-ngx/core/list';
import { Subject } from 'rxjs';
import { DefaultMenuItem } from './default-menu-item.class';

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
     * ArrowDown - focus, ArrowUp - focus, Home - focus first enabled item, End - focus last enabled item,
     * Space bar - simulate click, Enter key - simulate click.
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
        } else if (KeyUtil.isKeyCode(event, HOME)) {
            const firstEnabled = this._findBoundaryEnabledIndex(menuItems, 'start');
            if (firstEnabled !== -1) {
                menuItems[firstEnabled].focus();
            }
            event.preventDefault();
        } else if (KeyUtil.isKeyCode(event, END)) {
            const lastEnabled = this._findBoundaryEnabledIndex(menuItems, 'end');
            if (lastEnabled !== -1) {
                menuItems[lastEnabled].focus();
            }
            event.preventDefault();
        } else if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            if (menuItems[index]) {
                menuItems[index].click();
                event.preventDefault();
            }
        }
    }

    /** @hidden Returns index of first/last enabled item. Falls back to first/last if disabled state is unavailable. */
    private _findBoundaryEnabledIndex(
        menuItems: DefaultMenuItem[] | ListItemComponent[],
        position: 'start' | 'end'
    ): number {
        if (!menuItems.length) {
            return -1;
        }

        if (position === 'start') {
            for (let i = 0; i < menuItems.length; i++) {
                if (!this._isItemDisabled(menuItems[i])) {
                    return i;
                }
            }
            return -1;
        }

        for (let i = menuItems.length - 1; i >= 0; i--) {
            if (!this._isItemDisabled(menuItems[i])) {
                return i;
            }
        }

        return -1;
    }

    /** @hidden Detects disabled state if supported by the item implementation. */
    private _isItemDisabled(menuItem: DefaultMenuItem | ListItemComponent): boolean {
        const maybeDisabled = (menuItem as { disabled?: boolean }).disabled;
        return maybeDisabled === true;
    }
}
