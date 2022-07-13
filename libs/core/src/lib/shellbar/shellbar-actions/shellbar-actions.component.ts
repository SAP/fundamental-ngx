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

    /** toggles combobox. Shows combobox if true.*/
    showCombobox = false;

    /** @hidden */
    @ContentChildren(ShellbarActionComponent)
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @hidden */
    @ContentChild(ShellbarUserMenuComponent)
    userComponent: ShellbarUserMenuComponent;

    /** @hidden */
    @ContentChild(ComboboxComponent, { static: false })
    comboboxComponent: ComboboxComponent;

    /** @hidden */
    @ContentChild(SelectComponent, { static: false })
    selectComponent: SelectComponent;

    /** @hidden */
    @ContentChild(ProductSwitchComponent, { static: false })
    productSwitchComponent: ProductSwitchComponent;

    /** @hidden */
    @ViewChild(ShellbarUserMenuComponent)
    userComponentView: ShellbarUserMenuComponent;

    /** @hidden */
    @ViewChild('searchButton')
    searchButton: ButtonComponent;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(private readonly _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.comboboxComponent) {
            this.handleComboboxSearchClick();
        }
    }

    /** called when clicked search button. shows combobox */
    onSearchButtonClick(): void {
        this.showCombobox = true;
        setTimeout(() => {
            this.comboboxComponent.isOpenChangeHandle(true);
        });
        this._cdRef.detectChanges();
        this.comboboxComponent.searchInputElement.nativeElement.focus();
    }

    /** called when clicked search button on combobox. hides combobox if input-text is empty */
    handleComboboxSearchClick(): void {
        this._subscriptions.add(
            this.comboboxComponent.primaryButtonClicked.subscribe(() => {
                if (this.comboboxComponent.isEmptyValue) {
                    this.showCombobox = false;
                    this.comboboxComponent.isOpenChangeHandle(false);
                    this._cdRef.detectChanges();

                    this.searchButton.elementRef().nativeElement.focus();
                }
            })
        );
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

    /** @hidden */
    public get userItem(): ShellbarUser {
        if (this.userComponent) {
            return this.userComponent.user;
        } else {
            return this.user;
        }
    }
}
