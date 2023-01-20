import {
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewEncapsulation,
    ContentChild,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    inject,
    Output,
    EventEmitter
} from '@angular/core';

import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { ProductSwitchComponent } from '@fundamental-ngx/core/product-switch';

import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarUserMenu } from '../model/shellbar-user-menu';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenuComponent } from '../user-menu/shellbar-user-menu.component';
import { CdkPortalOutlet, DomPortal } from '@angular/cdk/portal';
import { ShellbarSizes } from '../shellbar.component';

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

    /**
     * @deprecated use i18n capabilities instead
     * Label for the collapsed item menu.
     */
    @Input()
    collapsedItemMenuLabel: string;

    /**
     * Event emitted when search opened.
     */
    @Output()
    searchOpen = new EventEmitter<boolean>();

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
    @ViewChild(CdkPortalOutlet)
    portal: CdkPortalOutlet;

    /** @hidden */
    _addSearchIcon = false;

    /** @hidden */
    _searchPortal: DomPortal;

    /** @hidden */
    showSearch = false;

    /** @hidden */
    private readonly _cd = inject(ChangeDetectorRef);

    /** @hidden */
    currentSize: ShellbarSizes;

    /** @hidden */
    toggleSearch: () => void = () => {
        this.setSearchVisibility(!this.showSearch);
    };

    /** @hidden */
    public get userItem(): ShellbarUser {
        if (this.userComponent) {
            return this.userComponent.user;
        } else {
            return this.user;
        }
    }

    /** @hidden */
    attachSearch(portal: DomPortal, size: ShellbarSizes): void {
        this._searchPortal = portal;
        this._addSearchIcon = true;
        this.currentSize = size;
        this._toggleSearchPortal(this.showSearch);
        this._cd.detectChanges();
    }

    /** @hidden */
    detachSearch(): void {
        if (this.portal?.hasAttached()) {
            this.portal.detach();
        }

        this._addSearchIcon = false;

        this._cd.detectChanges();
    }

    /** @hidden */
    triggerItems(): void {
        if (!this.closePopoverOnSelect) {
            return;
        }
        this.userComponentView?.menu.close();
        this.userComponent?.menu.close();
    }

    /** @hidden */
    setSearchVisibility(visible: boolean): void {
        this.showSearch = visible;
        this.searchOpen.emit(this.showSearch);

        if (this.currentSize === 's') {
            return;
        }

        this._toggleSearchPortal(visible);
    }

    /** @hidden */
    private _toggleSearchPortal(visible: boolean): void {
        if (visible) {
            this.portal.detach();
            this.portal.attach(this._searchPortal);
        } else {
            this.portal.detach();
        }
        this._cd.detectChanges();
    }
}
