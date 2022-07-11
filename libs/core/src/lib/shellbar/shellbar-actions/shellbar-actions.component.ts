import {
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewEncapsulation,
    ContentChild,
    ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';

import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { ProductSwitchComponent } from '@fundamental-ngx/core/product-switch';

import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarUserMenu } from '../model/shellbar-user-menu';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenuComponent } from '../user-menu/shellbar-user-menu.component';

/**
 * The component that represents shellbar actions.
 * It is a container wrapper for all product actions and links (required element).
 * ```html
 * <fd-shellbar-actions [user]="user"
 *                      [userMenu]="userMenu"
 *                      [productSwitcher]="productSwitcher">
 *        <button fd-button fdType="standard">Custom Button</button>
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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-shellbar__group]': 'true',
        '[class.fd-shellbar__group--actions]': 'true'
    }
})
export class ShellbarActionsComponent {
    /** The user data. */
    @Input()
    user: ShellbarUser;

    /** The user menu data. */
    @Input()
    userMenu: ShellbarUserMenu[];

    /** When set to true, popover list will be closed after selecting the option */
    @Input()
    closePopoverOnSelect = false;

    /** Label for the collapsed item menu. */
    @Input()
    collapsedItemMenuLabel = 'Collapsed Item Menu';

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
    @ContentChild(ProductSwitchComponent, { static: false })
    productSwitchComponent: ProductSwitchComponent;

    enableSearchComponentOnMobileMode = false;

    showInput = false;

    handleClickSearch(data: boolean): void {
        this.enableSearchComponentOnMobileMode = data;
        this.showInput = true;
    }

    handleCancleInMobileMode(data: boolean): void {
        this.enableSearchComponentOnMobileMode = data;
    }

    /** @hidden */
    triggerItems(): void {
        if (this.closePopoverOnSelect) {
            if (this.userComponentView) {
                this.userComponentView.menu.close();
            }
            if (this.userComponent) {
                this.userComponent.menu.close();
            }
        }
    }

    public get userItem(): ShellbarUser {
        if (this.userComponent) {
            return this.userComponent.user;
        } else {
            return this.user;
        }
    }
}
