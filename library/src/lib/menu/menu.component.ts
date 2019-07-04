import {
    AfterContentInit,
    Component,
    ContentChildren, EventEmitter,
    Input, OnDestroy, Output, QueryList,
    ViewEncapsulation
} from '@angular/core';
import { MenuGroupComponent } from './menu-group.component';
import { MenuListDirective } from './menu-list.directive';
import { MenuItemDirective } from './menu-item.directive';
import { Subscription } from 'rxjs';

/**
 * The component that represents a menu. Provides some keyboard event default handler.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'fd-menu'
    }
})
export class MenuComponent implements AfterContentInit, OnDestroy {

    /** @hidden */
    @ContentChildren(MenuGroupComponent) menuGroup: QueryList<MenuGroupComponent>;

    /** @hidden */
    @ContentChildren(MenuListDirective) menuList: QueryList<MenuListDirective>;

    /** Event thrown always, when item link is clicked */
    @Output() itemClicked = new EventEmitter<number>();

    /** Whether user wants to remove default keyboard handling */
    @Input() disableKeydownHandling: boolean = false;

    /** Whether user wants to define own function, that is supposed to be called, when focus escape before list*/
    @Input() focusEscapeBeforeList: Function;

    /** Whether user wants to define own function, that is supposed to be called, when focus escape after list*/
    @Input() focusEscapeAfterList: Function;

    private onItemKeyDownSubscription: Subscription[];
    private onItemClickSubscription: Subscription[];

    /** @hidden */
    public ngAfterContentInit(): void {
        this.refreshList();
        this.menuList.forEach(list => list.listRefresh.subscribe(() => this.refreshList()));
        this.menuGroup.forEach(list => list.menuList.listRefresh.subscribe(() => this.refreshList()));
    }

    /** @hidden */
    public ngOnDestroy(): void {
        this.onItemKeyDownSubscription = [];
        this.onItemClickSubscription = [];
    }

    /** Focuses first menu-item element which has anchor element */
    public focusFirst() {
        this.focus(0);
    }

    /** Focuses n menu-item element which has anchor element */
    public focus(index: number) {
        if (this.links[index]) {
            this.links[index].focus();
        }
    }

    /** @hidden */
    keyDownHandler(event: any, index: number) {

        if (this.disableKeydownHandling) {
            return;
        }

        switch (event.code) {
            case ('ArrowDown'): {
                if (this.links.length > index + 1) {
                    this.focus(index + 1);
                } else {
                    if (this.focusEscapeAfterList) {
                        this.focusEscapeAfterList();
                    } else {
                        this.focus(0);
                    }
                }
                event.preventDefault();
                break;
            }
            case ('ArrowUp'): {
                if (index > 0) {
                    this.focus(index - 1);
                } else {
                    if (this.focusEscapeBeforeList) {
                        this.focusEscapeBeforeList();
                    } else {
                        this.focus(this.links.length - 1);
                    }
                }
                event.preventDefault();
                break;
            }
            case ('Space'): {
                if (this.links[index]) {
                    this.links[index].click();
                    event.preventDefault();
                }
                break;
            }
            case ('Enter'): {
                if (this.links[index]) {
                    this.links[index].click();
                    event.preventDefault();
                }
                break;
            }
        }
    }

    private refreshList() {
        this.onItemKeyDownSubscription = [];
        this.onItemClickSubscription = [];
        this.links.forEach((link, index) => {
                this.onItemKeyDownSubscription.push(
                    link.onKeyDown.subscribe(event => this.keyDownHandler(event, index))
                );
                this.onItemClickSubscription.push(
                    link.onClick.subscribe(() => this.itemClicked.emit(index))
                );
            }
        )
    }

    public get links(): MenuItemDirective[] {
        let items: MenuItemDirective[] = [];
        this.menuGroup.filter(group => !!group.menuList).forEach(group =>
            items = items.concat(group.menuList.menuItemsWithAnchors)
        );
        this.menuList.forEach(list =>
            items = items.concat(list.menuItemsWithAnchors)
        );
        return items;
    }
}
