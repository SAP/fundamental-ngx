import {
    Component,
    ContentChildren,
    HostListener,
    Input,
    OnInit,
    AfterContentChecked,
    QueryList,
    ViewEncapsulation,
    ContentChild, ViewChild
} from '@angular/core';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarMenuItem } from '../model/shellbar-menu-item';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenuComponent } from '../user-menu/shellbar-user-menu.component';
import { ComboboxComponent } from '../../combobox/combobox.component';

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

@Component({
    selector: 'fd-shellbar-actions',
    templateUrl: './shellbar-actions.component.html',
    styleUrls: ['./shellbar-actions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShellbarActionsComponent implements OnInit, AfterContentChecked {

    /** @hidden */
    actionsCollapsed: boolean = false;

    /** @hidden */
    showCollapsedProducts: boolean = false;

    /** The user data. */
    @Input()
    user: ShellbarUser;

    /** The user menu data. */
    @Input()
    userMenu: ShellbarMenuItem[];

    /** When set to true, popover list will be closed after selecting the option */
    @Input()
    closePopoverOnSelect: boolean = false;

    /** Label for the collapsed item menu. */
    @Input()
    collapsedItemMenuLabel: string = 'Collapsed Item Menu';

    /** @hidden */
    @ContentChildren(ShellbarActionComponent)
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @hidden */
    @ContentChild(ShellbarUserMenuComponent, { static: false })
    userComponent: ShellbarUserMenuComponent;

    /** @hidden */
    @ViewChild(ShellbarUserMenuComponent, { static: false })
    userComponentView: ShellbarUserMenuComponent;

    /** @hidden */
    @ContentChild(ComboboxComponent, { static: false })
    comboboxComponent: ComboboxComponent;

    /** @hidden */
    totalNotifications: number;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        this.actionsCollapsed = window.innerWidth < 1024;
    }

    /**
     * @hidden
     */
    actionClicked(item: ShellbarActionComponent, event: any): void {
        this.triggerItems();
        item.callback(event);
    }

    /** @hidden */
    triggerItems(): void {
        if (this.closePopoverOnSelect) {
            if (this.userComponentView) {
                this.userComponentView.close();
            }
            if (this.userComponent) {
                this.userComponent.close();
            }
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.onResize();
    }

    /** @hidden */
    ngAfterContentChecked(): void {
        this.totalNotifications = 0;
        this.shellbarActions.forEach((action) => {
            if (action.notificationCount && typeof action.notificationCount === 'number') {
                this.totalNotifications = this.totalNotifications + action.notificationCount;
            }
        });
    }

    /** @hidden */
    toggleCollapsedProducts(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.showCollapsedProducts = !this.showCollapsedProducts;
    }

    public get userItem(): ShellbarUser {
        if (this.userComponent) {
            return this.userComponent.user;
        } else {
            return this.user;
        }
    }

}
