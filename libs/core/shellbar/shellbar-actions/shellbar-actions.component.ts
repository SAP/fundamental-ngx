import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
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
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ShellbarSizes } from '../model/shellbar-sizes';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenu } from '../model/shellbar-user-menu';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarActionsMobileComponent } from '../shellbar-actions-mobile/shellbar-actions-mobile.component';
import { ShellbarComponent } from '../shellbar.component';
import { FD_SHELLBAR_ACTION_COMPONENT } from '../tokens';
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
    imports: [
        PortalModule,
        ShellbarActionsMobileComponent,
        ShellbarActionComponent,
        ShellbarUserMenuComponent,
        FdTranslatePipe
    ]
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

    /** Whether to show the assistive tools icon. */
    @Input()
    assistiveTools = false;

    /** @hidden */
    @Input()
    assistiveToolsCallback: Nullable<(event: MouseEvent) => void>;

    /**
     * Event emitted when search opened.
     */
    @Output()
    searchOpen = new EventEmitter<boolean>();

    /** @hidden */
    @ContentChildren(FD_SHELLBAR_ACTION_COMPONENT)
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @hidden */
    @ContentChild(ShellbarUserMenuComponent)
    userComponent: ShellbarUserMenuComponent;

    /** @hidden */
    @ViewChild(ShellbarUserMenuComponent)
    userComponentView: ShellbarUserMenuComponent;

    /** @hidden */
    @ContentChild(FD_COMBOBOX_COMPONENT)
    comboboxComponent: ComboboxInterface;

    /** @hidden */
    @ContentChild(FD_PRODUCT_SWITCH_COMPONENT, { static: false })
    productSwitchComponent: ProductSwitchComponent;

    /** @hidden */
    @ViewChild(CdkPortalOutlet)
    _portalOutlet: Nullable<CdkPortalOutlet>;

    /** @hidden */
    _addSearchIcon = false;

    /** @hidden */
    _searchPortal: DomPortal;

    /** @hidden */
    _showMobileActions = false;

    /**
     * Whether to show the search field.
     */
    showSearch = false;

    /** @hidden */
    currentSize: ShellbarSizes;

    /** @hidden */
    _elRef = inject(ElementRef);

    /** @hidden */
    private readonly _cd = inject(ChangeDetectorRef);

    /** @hidden */
    private _shellbar = inject(ShellbarComponent);

    /** @hidden */
    private _searchComponent: Nullable<SearchComponent>;

    /** @hidden */
    _toggleSearch: () => void = () => {
        this._setSearchVisibility(!this.showSearch);
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
    ngOnDestroy(): void {
        this._portalOutlet?.dispose();
    }

    /** @hidden */
    _handleOverflow(shouldOverflow: boolean): void {
        this._showMobileActions = shouldOverflow;

        this.shellbarActions.forEach((action) => {
            action._elRef.nativeElement.style.display = shouldOverflow ? 'none' : 'flex';
        });

        this._cd.detectChanges();
    }

    /** @hidden */
    _attachSearch(portal: DomPortal, searchComponent: Nullable<SearchComponent>, size: ShellbarSizes): void {
        this._searchPortal = portal;
        this._addSearchIcon = true;
        this.currentSize = size;
        this._searchComponent = searchComponent;
        this._toggleSearchPortal(this.showSearch);
        this._cd.detectChanges();
    }

    /** @hidden */
    _detachSearch(): void {
        if (this._portalOutlet?.hasAttached()) {
            this._portalOutlet.detach();
        }

        this._addSearchIcon = false;

        this._cd.detectChanges();
    }

    /** @hidden */
    _triggerItems(): void {
        if (!this.closePopoverOnSelect) {
            return;
        }
        this.userComponentView?.menu.close();
        this.userComponent?.menu.close();
    }

    /** @hidden */
    _setSearchVisibility(visible: boolean): void {
        this.showSearch = visible;
        this.searchOpen.emit(this.showSearch);

        if (this.currentSize === 's') {
            return;
        }

        this._toggleSearchPortal(visible, visible);
    }

    /** @hidden */
    private _toggleSearchPortal(visible: boolean, focusSearch = false): void {
        if (visible) {
            this._portalOutlet?.detach();
            this._portalOutlet?.attach(this._searchPortal);
        } else {
            this._portalOutlet?.detach();
        }
        this._cd.detectChanges();
        if (focusSearch) {
            this._searchComponent?.focus();
        }
        if (this._shellbar) {
            this._shellbar._searchToggledFromActions();
        }
    }
}
