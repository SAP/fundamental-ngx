import { fromEvent, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuItemDirective } from './menu-item.directive';
import { OnDestroy, Output, QueryList } from '@angular/core';
import { MenuListDirective } from './menu-list.directive';
import { MenuGroupComponent } from './menu-group.component';
import { MenuComponent } from './menu.component';

export class MenuKeyboardService implements OnDestroy {

    /** Event emitted when an item link is clicked.*/
    @Output()
    public readonly itemClicked: Subject<number> = new Subject<number>();

    /** Whether user wants to remove keyboard handling */
    disableKeydownHandling: boolean = false;

    /** Function that is supposed to be called, when focus escape before list */
    focusEscapeBeforeList: Function;

    /** Function that is supposed to be called, when focus escape after list */
    focusEscapeAfterList: Function;

    private menuGroup: QueryList<MenuGroupComponent>;
    private menuList: QueryList<MenuListDirective>;
    private itemEventsSubscription: Subscription[];

    private readonly destroy = new Subject<void>();

    /** @hidden */
    ngOnDestroy(): void {
        this.destroy.next();
    }

    /**
     * This function starts to provide support for keyboard for menu items, anytime there are any changes,
     * list of items is refreshed so it's possible to use it even on dynamic lists, for example in combobox.
     * */
    initialise(menuComponent: MenuComponent): void {
        if (menuComponent && menuComponent.menuList) {
            this.menuList = menuComponent.menuList;
            this.menuList.forEach(list => list.listRefresh
                .pipe(takeUntil(this.destroy))
                .subscribe(() => this.refreshList()))
            ;
        }
        if (menuComponent && menuComponent.menuGroup) {
            this.menuGroup = menuComponent.menuGroup;
            this.menuGroup.forEach(list => list.menuList.listRefresh
                .pipe(takeUntil(this.destroy))
                .subscribe(() => this.refreshList()))
            ;
        }
        this.refreshList();
    }

    /** Focuses first menu-item element which has anchor element */
    public focusFirst(): void {
        this.focus(0);
    }

    /** Focuses n menu-item element which has anchor element */
    public focus(index: number): void {
        if (this.links[index]) {
            this.links[index].focus();
        }
    }

    /** Method that returns all menu-item directives inside menu component */
    public get links(): MenuItemDirective[] {
        let items: MenuItemDirective[] = [];
        if (this.menuGroup) {
            this.menuGroup.filter(group => !!group.menuList).forEach(group =>
                items = items.concat(group.menuList.menuItems.toArray())
            );
        }
        if (this.menuList) {
            this.menuList.forEach(list =>
                items = items.concat(list.menuItems.toArray())
            );
        }
        return items;
    }

    /** @hidden */
    keyDownHandler(event: KeyboardEvent, index: number): void {

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

    private refreshList(): void {
        this.itemEventsSubscription = [];
        this.links.forEach((link, index) => {
                this.itemEventsSubscription.push(
                    fromEvent(link.itemEl.nativeElement, 'keydown')
                        .pipe(takeUntil(this.destroy))
                        .subscribe((event: KeyboardEvent) => this.keyDownHandler(event, index))
                );
                this.itemEventsSubscription.push(
                    fromEvent(link.itemEl.nativeElement, 'click')
                        .pipe(takeUntil(this.destroy))
                        .subscribe(() => this.itemClicked.next(index))
                );
            }
        )
    }
}
