import { Subject } from 'rxjs';
import { DefaultMenuItem } from './default-menu-item';
export declare class MenuKeyboardService {
    /** Event emitted when an item link is clicked.*/
    readonly itemClicked: Subject<number>;
    /** Whether user wants to remove keyboard handling */
    disableKeydownHandling: boolean;
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
    keyDownHandler(event: KeyboardEvent, index: number, menuItems: DefaultMenuItem[]): void;
}
