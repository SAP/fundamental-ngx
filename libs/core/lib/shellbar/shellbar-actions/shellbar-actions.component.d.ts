import { OnInit, AfterContentChecked, QueryList } from '@angular/core';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { SearchInputComponent } from '../../search-input/search-input.component';
import { PopoverComponent } from '../../popover/popover.component';
/**
 * The component that represents shellbar actions.
 * It is a container wrapper for all product actions and links (required element).
 * ```html
 * <fd-shellbar-actions [user]="user"
 *                      [userMenu]="userMenu"
 *                      [productSwitcher]="productSwitcher">
 *        <button fd-button [fdType]="'standard'">Custom Button</button>
 *
 *        <fd-shellbar-action *ngFor="let action of actions"
 *                            [glyph]="action.glyph"
 *                            [callback]="action.callback"
 *                            [label]="action.label"
 *                            [notificationCount]="action.notificationCount"
 *                            [notificationLabel]="action.notificationLabel">
 *        </fd-shellbar-action>
 * </fd-shellbar-actions>
 * ```
 */
export declare class ShellbarActionsComponent implements OnInit, AfterContentChecked {
    /** @hidden */
    actionsCollapsed: boolean;
    /** @hidden */
    showCollapsedProducts: boolean;
    /** The product switcher data. */
    productSwitcher: any[];
    /** The user data. */
    user: any;
    /** The user menu data. */
    userMenu: any[];
    /** When set to true, popover list will be closed after selecting the option */
    closePopoverOnSelect: boolean;
    /** Label for the collapsed item menu. */
    collapsedItemMenuLabel: string;
    /** @hidden */
    shellbarActions: QueryList<ShellbarActionComponent>;
    /** @hidden */
    popoverComponents: QueryList<PopoverComponent>;
    /** @hidden */
    searchInputComponent: SearchInputComponent;
    /** @hidden */
    totalNotifications: number;
    /** @hidden */
    onResize(): void;
    /**
     * @hidden
     */
    itemClicked(item: any, event: any): void;
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngAfterContentChecked(): void;
    /** @hidden */
    toggleCollapsedProducts(event: any): void;
}
