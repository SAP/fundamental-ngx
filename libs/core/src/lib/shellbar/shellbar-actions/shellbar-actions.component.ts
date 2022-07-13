import {
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewEncapsulation,
    ContentChild,
    ViewChild,
    ChangeDetectionStrategy,
    ElementRef,
    AfterViewInit
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
export class ShellbarActionsComponent implements AfterViewInit {
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

    /** @hidden */
    @ViewChild('shellBarCombobox')
    shellBarCombobox: ElementRef<HTMLInputElement>;

    @Input()
    enableSearchComponentOnMobileMode = false;

    showInput = false;

    handleClickSearch(data: boolean): void {
        this.enableSearchComponentOnMobileMode = data;
        this.comboboxComponent.hideInput = false;
        this.applyComboboxFullLengthMode();
    }

    handleCancleInMobileMode(data: boolean): void {
        this.enableSearchComponentOnMobileMode = data;
        this.applyComboboxFullLengthMode();
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

    applyComboboxFullLengthMode(): void {
        if (this.enableSearchComponentOnMobileMode) {
            if (this.shellBarCombobox.nativeElement) {
                this.shellBarCombobox.nativeElement.style.cssText = `width:100%; z-index:2; position: absolute; left: 0px; top: 0px;`;
            }
        } else {
            if (this.shellBarCombobox.nativeElement) {
                this.shellBarCombobox.nativeElement.style.cssText = '';
            }
        }
    }
    /** @hidden */
    ngAfterViewInit(): void {
        this.applyComboboxFullLengthMode();
    }
}
