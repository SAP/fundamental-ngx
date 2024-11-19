import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChild
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
import { ShellbarActionsToolbarComponent } from '../shellbar-actions-toolbar/shellbar-actions-toolbar.component';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-shellbar__group]': 'true',
        '[class.fd-shellbar__group--actions]': 'true'
    },
    styles: [
        `
            :host {
                flex: 1;
            }
        `
    ],
    standalone: true,
    imports: [PortalModule, ShellbarActionsToolbarComponent, ShellbarActionComponent, ShellbarUserMenuComponent]
})
export class ShellbarActionsComponent implements OnDestroy {
    /** The user data. */
    @Input() user: ShellbarUser;

    /** The user menu data. */
    @Input() userMenu: ShellbarUserMenu[];

    /** Whether to close the popover after selecting an option. */
    @Input() closePopoverOnSelect = false;

    /** Event emitted when the search is toggled. */
    @Output() searchOpen = new EventEmitter<boolean>();

    /** Shellbar action components projected into the content. */
    @ContentChildren(FD_SHELLBAR_ACTION_COMPONENT) shellbarActions: QueryList<ShellbarActionComponent>;

    /** Shellbar user menu component projected into the content. */
    @ContentChild(ShellbarUserMenuComponent) userComponent: ShellbarUserMenuComponent;

    /** Shellbar user menu component view child. */
    @ViewChild(ShellbarUserMenuComponent) userComponentView: ShellbarUserMenuComponent;

    /** Combobox component projected into the content. */
    @ContentChild(FD_COMBOBOX_COMPONENT) comboboxComponent: ComboboxInterface;

    /** Product switch component projected into the content. */
    @ContentChild(FD_PRODUCT_SWITCH_COMPONENT, { static: false }) productSwitchComponent: ProductSwitchComponent;

    /** Portal outlet for search. */
    @ViewChild(CdkPortalOutlet) _portalOutlet: Nullable<CdkPortalOutlet>;

    /** Whether to add the search icon. */
    _addSearchIcon = false;

    /** Portal for search component. */
    _searchPortal: DomPortal;

    /** Whether to show the search field. */
    showSearch = false;

    /** Current size of the shellbar. */
    currentSize: ShellbarSizes;

    /** @hidden */
    private readonly _cd = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _shellbar = inject(FD_SHELLBAR_COMPONENT, { optional: true });

    /** @hidden */
    private _searchComponent: Nullable<SearchComponent>;

    /** @hidden */
    @HostBinding('class.fd-shellbar__group--shrink')
    private get _groupShrink(): boolean {
        return !!this._shellbar?.groupFlex?.actions?.shrink;
    }

    /** @hidden */
    @HostBinding('class.fd-shellbar__group--basis-auto')
    private get _groupBasisAuto(): boolean {
        return !!this._shellbar?.groupFlex?.actions?.flexBasisAuto;
    }

    /** @hidden */
    public get userItem(): ShellbarUser {
        return this.userComponent ? this.userComponent.user : this.user;
    }

    /** @hidden */
    _toggleSearch: () => void = () => {
        this._setSearchVisibility(!this.showSearch);
    };

    /** @hidden */
    ngOnDestroy(): void {
        this._portalOutlet?.dispose();
    }

    /** Attach the search portal. */
    _attachSearch(portal: DomPortal, searchComponent: Nullable<SearchComponent>, size: ShellbarSizes): void {
        this._searchPortal = portal;
        this._addSearchIcon = true;
        this.currentSize = size;
        this._searchComponent = searchComponent;
        this._toggleSearchPortal(this.showSearch);
        this._cd.detectChanges();
    }

    /** Detach the search portal. */
    _detachSearch(): void {
        this._portalOutlet?.detach();
        this._addSearchIcon = false;
        this._cd.detectChanges();
    }

    /** @hidden */
    _triggerItems(): void {
        if (this.closePopoverOnSelect) {
            this.userComponentView?.menu.close();
            this.userComponent?.menu.close();
        }
    }

    /** Set the visibility of the search field. */
    _setSearchVisibility(visible: boolean): void {
        this.showSearch = visible;
        this.searchOpen.emit(this.showSearch);

        if (this.currentSize !== 's') {
            this._toggleSearchPortal(visible, visible);
        }
    }

    /** Toggle the search portal. */
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
    }
}
