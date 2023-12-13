import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';

import { ComboboxInterface, FD_COMBOBOX_COMPONENT } from '@fundamental-ngx/core/combobox';
import { FD_PRODUCT_SWITCH_COMPONENT, ProductSwitchComponent } from '@fundamental-ngx/core/product-switch';

import { CdkPortalOutlet, DomPortal, PortalModule } from '@angular/cdk/portal';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SearchComponent } from '@fundamental-ngx/core/shared';
import { ShellbarSizes } from '../model/shellbar-sizes';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenu } from '../model/shellbar-user-menu';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarActionsMobileComponent } from '../shellbar-actions-mobile/shellbar-actions-mobile.component';
import { FD_SHELLBAR_ACTION_COMPONENT, FD_SHELLBAR_COMPONENT } from '../tokens';
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
    },
    standalone: true,
    imports: [PortalModule, ShellbarActionsMobileComponent, ShellbarActionComponent, ShellbarUserMenuComponent]
})
export class ShellbarActionsComponent implements OnDestroy {
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
     * Event emitted when search opened.
     */
    @Output()
    searchOpen = new EventEmitter<boolean>();

    /** @ignore */
    @ContentChildren(FD_SHELLBAR_ACTION_COMPONENT)
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @ignore */
    @ContentChild(ShellbarUserMenuComponent)
    userComponent: ShellbarUserMenuComponent;

    /** @ignore */
    @ViewChild(ShellbarUserMenuComponent)
    userComponentView: ShellbarUserMenuComponent;

    /** @ignore */
    @ContentChild(FD_COMBOBOX_COMPONENT)
    comboboxComponent: ComboboxInterface;

    /** @ignore */
    @ContentChild(FD_PRODUCT_SWITCH_COMPONENT, { static: false })
    productSwitchComponent: ProductSwitchComponent;

    /** @ignore */
    @ViewChild(CdkPortalOutlet)
    _portalOutlet: CdkPortalOutlet;

    /** @ignore */
    _addSearchIcon = false;

    /** @ignore */
    _searchPortal: DomPortal;

    /**
     * Whether to show the search field.
     */
    showSearch = false;

    /** @ignore */
    currentSize: ShellbarSizes;

    /** @ignore */
    private readonly _cd = inject(ChangeDetectorRef);

    /** @ignore */
    private readonly _shellbar = inject(FD_SHELLBAR_COMPONENT, {
        optional: true
    });

    /** @ignore */
    @HostBinding('class.fd-shellbar__group--shrink')
    private get _groupShrink(): boolean {
        return !!this._shellbar?.groupFlex?.actions?.shrink;
    }

    /** @ignore */
    @HostBinding('class.fd-shellbar__group--basis-auto')
    private get _groupBasisAuto(): boolean {
        return !!this._shellbar?.groupFlex?.actions?.flexBasisAuto;
    }

    /** @ignore */
    private _searchComponent: Nullable<SearchComponent>;

    /** @ignore */
    _toggleSearch: () => void = () => {
        this._setSearchVisibility(!this.showSearch);
    };

    /** @ignore */
    public get userItem(): ShellbarUser {
        if (this.userComponent) {
            return this.userComponent.user;
        } else {
            return this.user;
        }
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._portalOutlet?.dispose();
    }

    /** @ignore */
    _attachSearch(portal: DomPortal, searchComponent: Nullable<SearchComponent>, size: ShellbarSizes): void {
        this._searchPortal = portal;
        this._addSearchIcon = true;
        this.currentSize = size;
        this._searchComponent = searchComponent;
        this._toggleSearchPortal(this.showSearch);
        this._cd.detectChanges();
    }

    /** @ignore */
    _detachSearch(): void {
        if (this._portalOutlet?.hasAttached()) {
            this._portalOutlet.detach();
        }

        this._addSearchIcon = false;

        this._cd.detectChanges();
    }

    /** @ignore */
    _triggerItems(): void {
        if (!this.closePopoverOnSelect) {
            return;
        }
        this.userComponentView?.menu.close();
        this.userComponent?.menu.close();
    }

    /** @ignore */
    _setSearchVisibility(visible: boolean): void {
        this.showSearch = visible;
        this.searchOpen.emit(this.showSearch);

        if (this.currentSize === 's') {
            return;
        }

        this._toggleSearchPortal(visible, visible);
    }

    /** @ignore */
    private _toggleSearchPortal(visible: boolean, focusSearch = false): void {
        if (visible) {
            this._portalOutlet.detach();
            this._portalOutlet.attach(this._searchPortal);
        } else {
            this._portalOutlet.detach();
        }
        this._cd.detectChanges();
        if (focusSearch) {
            this._searchComponent?.focus();
        }
    }
}
