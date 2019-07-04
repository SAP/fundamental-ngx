import { AfterContentInit, ContentChildren, Directive, EventEmitter, OnDestroy, Output, QueryList } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';
import { Subscription } from 'rxjs';

/**
 * The directive that represents a listing structure of the menu.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-list]',
    host: {
        'class': 'fd-menu__list'
    }
})
export class MenuListDirective implements AfterContentInit, OnDestroy {
    /** @hidden */
    @ContentChildren(MenuItemDirective) menuItems: QueryList<MenuItemDirective>;

    /** @hidden */
    public get menuItemsWithAnchors(): MenuItemDirective[] {
        return this.menuItems.filter(item => item.isChildElementAnchor());
    }

    /** @hidden */
    @Output() listRefresh = new EventEmitter();

    private onMenuItemsChangeSubscription: Subscription;

    /** @hidden */
    public ngAfterContentInit(): void {
        this.onMenuItemsChangeSubscription = this.menuItems.changes.subscribe(() => this.listRefresh.emit());
    }

    /** @hidden */
    public ngOnDestroy(): void {
        this.onMenuItemsChangeSubscription.unsubscribe();
    }

}
