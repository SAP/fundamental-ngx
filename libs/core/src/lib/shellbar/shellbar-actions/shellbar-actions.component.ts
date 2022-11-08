import {
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewEncapsulation,
    ContentChild,
    ViewChild,
    ChangeDetectionStrategy,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';

import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { SelectComponent } from '@fundamental-ngx/core/select';
import { ProductSwitchComponent } from '@fundamental-ngx/core/product-switch';

import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarUserMenu } from '../model/shellbar-user-menu';
import { ShellbarUser } from '../model/shellbar-user';
import { ShellbarUserMenuComponent } from '../user-menu/shellbar-user-menu.component';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '@fundamental-ngx/core/button';

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

    /**
     * @deprecated use i18n capabilities instead
     * Label for the collapsed item menu.
     */
    @Input()
    collapsedItemMenuLabel: string;

    /** @hidden toggles combobox. Shows combobox if true.*/
    _showCombobox = false;

    /** @hidden
     *  Enable combobox in mobile mode.
     */
    _enableComboboxForMobileMode = false;

    /** @hidden */
    @ContentChildren(ShellbarActionComponent)
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @hidden */
    @ContentChild(ShellbarUserMenuComponent)
    userComponent: ShellbarUserMenuComponent;

    /** @hidden */
    @ContentChild(ComboboxComponent, { static: false })
    _comboboxComponent: ComboboxComponent;

    /** @hidden */
    @ContentChild(SelectComponent, { static: false })
    _selectComponent: SelectComponent;

    /** @hidden */
    @ContentChild(ProductSwitchComponent, { static: false })
    _productSwitchComponent: ProductSwitchComponent;

    /** @hidden */
    @ViewChild(ShellbarUserMenuComponent)
    _userComponentView: ShellbarUserMenuComponent;

    /** @hidden
     * search button when combobox is hidden.
     */
    @ViewChild('searchButton')
    _searchButton: ButtonComponent;

    /** @hidden
     * True when shellbar takes full width of whole shellbar. For example, in 'S' size.
     */
    _fullWidthOnMobile = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(private readonly _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this._comboboxComponent) {
            this._handleComboboxSearchClick();
        }
    }

    /** @hidden
     * called when clicked search button. shows combobox
     */
    _onSearchButtonClick(shouldOpenPopover = true): void {
        this._showCombobox = true;
        if (shouldOpenPopover) {
            setTimeout(() => {
                this._comboboxComponent.isOpenChangeHandle(true);
            });
        }
        this._cdRef.detectChanges();
        this._comboboxComponent._focusSearchInput();
    }

    /** @hidden
     * called when clicked search button on combobox. hides combobox if input-text is empty
     */
    _handleComboboxSearchClick(): void {
        this._subscriptions.add(
            this._comboboxComponent.primaryButtonClicked.subscribe(() => {
                if (this._comboboxComponent.isEmptyValue) {
                    this._showFullWidthCombobox(false);
                }
                this._searchButton.focus();
            })
        );
    }

    /** @hidden
     * hides combobox.
     */
    _hideCombobox(): void {
        this._showCombobox = false;
        this._comboboxComponent.isOpenChangeHandle(false);
        this._cdRef.detectChanges();
    }

    /** @hidden
     *  called for value=false when cancel clicked and for true when search clicked from action sheet
     */
    _showFullWidthCombobox(value: boolean, shouldOpenPopover = true): void {
        this._enableComboboxForMobileMode = value;
        if (value) {
            this._onSearchButtonClick(shouldOpenPopover);
            this._addFullWidthClass(true);
            this._comboboxComponent._comboboxElement.style.width = '100%';
        } else {
            this._hideCombobox();
            this._addFullWidthClass(false);
            this._comboboxComponent._comboboxElement.style.width = '';
        }
    }

    /** @hidden */
    _addFullWidthClass(value: boolean): void {
        this._fullWidthOnMobile = value;
        this._cdRef.detectChanges();
    }

    /** @hidden */
    triggerItems(): void {
        if (this.closePopoverOnSelect) {
            if (this._userComponentView) {
                this._userComponentView.menu.close();
            }
            if (this.userComponent) {
                this.userComponent.menu.close();
            }
        }
    }

    /** @hidden */
    public get userItem(): ShellbarUser {
        if (this.userComponent) {
            return this.userComponent.user;
        } else {
            return this.user;
        }
    }
}
