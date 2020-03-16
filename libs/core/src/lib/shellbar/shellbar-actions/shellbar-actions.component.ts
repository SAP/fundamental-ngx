import {
    Component,
    ContentChildren,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewEncapsulation,
    ContentChild, ViewChild, ChangeDetectionStrategy
} from '@angular/core';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarMenuItem } from '../model/shellbar-menu-item';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenuComponent } from '../user-menu/shellbar-user-menu.component';
import { ComboboxComponent } from '../../combobox/combobox.component';
import { ProductSwitchComponent } from '../../product-switch/product-switch/product-switch.component';

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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellbarActionsComponent implements OnInit {

    /** @hidden */
    actionsCollapsed: boolean = false;

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
    @ContentChild(ShellbarUserMenuComponent)
    userComponent: ShellbarUserMenuComponent;

    /** @hidden */
    @ViewChild(ShellbarUserMenuComponent)
    userComponentView: ShellbarUserMenuComponent;

    /** @hidden */
    @ContentChild(ComboboxComponent)
    comboboxComponent: ComboboxComponent;

    /** @hidden */
    @ContentChild(ProductSwitchComponent, {static: false})
    productSwitchComponent: ProductSwitchComponent;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        this.actionsCollapsed = window.innerWidth < 1024;
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

    public get userItem(): ShellbarUser {
        if (this.userComponent) {
            return this.userComponent.user;
        } else {
            return this.user;
        }
    }

}
