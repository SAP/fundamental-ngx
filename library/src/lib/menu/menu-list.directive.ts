import { AfterContentInit, ContentChildren, Directive, EventEmitter, HostBinding, OnDestroy, Output, QueryList } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';
import { Subscription } from 'rxjs';

/**
 * The directive that represents a listing structure of the menu.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-list]'
})
export class MenuListDirective implements AfterContentInit, OnDestroy {
    /** @hidden */
    @ContentChildren(MenuItemDirective)
    menuItems: QueryList<MenuItemDirective>;

    /** @hidden */
    @HostBinding('class.fd-menu__list')
    fdMenuListClass: boolean = true;

    /** @hidden
     *  Event emitted when the list of items is changed.
     * */
    @Output()
    public readonly listRefresh: EventEmitter<void> = new EventEmitter<void>();

    private onMenuItemsChangeSubscription: Subscription;

    /** @hidden */
    public get menuItemsWithAnchors(): MenuItemDirective[] {
        return this.menuItems.filter(item => item.isChildElementAnchor());
    }

    /** @hidden */
    public ngAfterContentInit(): void {
        this.onMenuItemsChangeSubscription = this.menuItems.changes.subscribe(() => this.listRefresh.emit());
    }

    /** @hidden */
    public ngOnDestroy(): void {
        if (this.onMenuItemsChangeSubscription) {
            this.onMenuItemsChangeSubscription.unsubscribe();
        }
    }

}
