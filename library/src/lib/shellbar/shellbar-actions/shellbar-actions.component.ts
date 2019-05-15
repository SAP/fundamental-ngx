import { Component, ContentChildren, HostListener, Input, OnInit, AfterContentChecked, QueryList } from '@angular/core';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';

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
    templateUrl: './shellbar-actions.component.html'
})
export class ShellbarActionsComponent implements OnInit, AfterContentChecked {
    /** @hidden */
    actionsCollapsed: boolean = false;

    /** @hidden */
    showCollapsedProducts: boolean = false;

    /** The product switcher data. */
    @Input()
    productSwitcher: any[];

    /** The user data. */
    @Input()
    user: any;

    /** The user menu data. */
    @Input()
    userMenu: any[];

    /** Label for the collapsed item menu. */
    @Input()
    collapsedItemMenuLabel: string = 'Collapsed Item Menu';

    /** @hidden */
    @ContentChildren(ShellbarActionComponent)
    shellbarActions: QueryList<ShellbarActionComponent>;

    /** @hidden */
    totalNotifications: number;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize() {
        this.actionsCollapsed = window.innerWidth < 1024;
    }

    /** @hidden */
    ngOnInit() {
        this.onResize();
    }

    /** @hidden */
    ngAfterContentChecked() {
        this.totalNotifications = 0;
        this.shellbarActions.forEach((action) => {
            if (action.notificationCount && typeof action.notificationCount === 'number') {
                this.totalNotifications = this.totalNotifications + action.notificationCount;
            }
        });
    }

    /** @hidden */
    toggleCollapsedProducts(event) {
        event.preventDefault();
        event.stopPropagation();
        this.showCollapsedProducts = !this.showCollapsedProducts;
    }

}
