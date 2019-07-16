import {
    AfterContentInit,
    Component,
    ContentChildren, EventEmitter, HostBinding,
    Input, OnDestroy, Output, QueryList,
    ViewEncapsulation
} from '@angular/core';
import { MenuGroupComponent } from './menu-group.component';
import { MenuListDirective } from './menu-list.directive';
import { MenuItemDirective } from './menu-item.directive';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

/**
 * The component that represents a menu. Provides some keyboard event default handler.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements AfterContentInit {

    /** @hidden */
    @ContentChildren(MenuGroupComponent)
    menuGroup: QueryList<MenuGroupComponent>;

    /** @hidden */
    @ContentChildren(MenuListDirective)
    menuList: QueryList<MenuListDirective>;

    /** @hidden */
    @HostBinding('class.fd-menu')
    fdMenuClass: boolean = true;

    /** Event emitted when an item link is clicked.*/
    @Output()
    public readonly itemClicked: EventEmitter<number> = new EventEmitter<number>();

    /** Whether user wants to remove default keyboard handling */
    @Input()
    disableKeydownHandling: boolean = false;

    /** Function that is supposed to be called, when focus escape before list */
    @Input()
    focusEscapeBeforeList: Function;

    /** Function that is supposed to be called, when focus escape after list */
    @Input()
    focusEscapeAfterList: Function;

    private itemEventsSubscription: Subscription[];

    private readonly destroy = new Subject<void>();

    /** @hidden */
    public ngAfterContentInit(): void {

        this.menuList.forEach(list => list.listRefresh
            .pipe(startWith(null), takeUntil(this.destroy))
            .subscribe(() => this.refreshList()))
        ;
        this.menuGroup.forEach(list => list.menuList.listRefresh
            .pipe(startWith(null), takeUntil(this.destroy))
            .subscribe(() => this.refreshList()))
        ;
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
        this.menuGroup.filter(group => !!group.menuList).forEach(group =>
            items = items.concat(group.menuList.menuItemsWithAnchors)
        );
        this.menuList.forEach(list =>
            items = items.concat(list.menuItemsWithAnchors)
        );
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
                        .subscribe(() => this.itemClicked.emit(index))
                );
            }
        )
    }
}
