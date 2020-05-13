import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnDestroy
} from '@angular/core';
import { MenuTitleDirective } from '../directives/menu-title.directive';
import { DefaultMenuItem } from '../default-menu-item.class';
import { MenuLinkDirective } from '../directives/menu-link.directive';
import { SubMenuComponent } from '../../..';
import { MenuService } from '../services/menu.service';
import { defer, fromEvent, Subscription, timer } from 'rxjs';
import { filter, sample, switchMap, takeUntil } from 'rxjs/operators';

let menuUniqueId: number = 0;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'li[fd-menu-item]',
    exportAs: 'fd-menu-item',
    templateUrl: './menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-menu__item]': 'true',
    }
})
export class MenuItemComponent implements DefaultMenuItem, AfterContentInit, OnDestroy {

    /** Menu item id attribute value */
    @Input()
    itemId: string = `fd-menu-item-${menuUniqueId++}`;

    /** Reference to sub menu template */
    @Input()
    subMenu: SubMenuComponent;

    /** @hidden Reference to menu item title */
    @ContentChild(MenuTitleDirective)
    menuItemTitle: MenuTitleDirective;

    /** @hidden Reference to menu item title */
    @ContentChild(MenuLinkDirective)
    menuLink: MenuLinkDirective;

    /** @hidden */
    subLevelVisible: boolean = false;

    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(public elementRef: ElementRef,
                private _menuService: MenuService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this._initialiseLinkState();
        this._listenOnMenuLinkClick();
        this._listenOnMenuLinkHover();
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    /** Whether menu item has popup (desktop mode)  */
    get hasPopup(): boolean {
        return this.subMenu && !this._menuService.menu.mobile;
    }

    focus(): void {
        if (this.menuLink) {
            this.menuLink.elementRef.nativeElement.focus();
            this._changeDetectorRef.markForCheck();
        }
    }

    click(): void {
        if (this.menuLink) {
            this.menuLink.elementRef.nativeElement.click();
            this._changeDetectorRef.markForCheck();
        }
    }

    open(): void {
        this.menuLink.setSelected(true);
        this.subLevelVisible = true;
        this._changeDetectorRef.markForCheck();
    }

    close(): void {
        this.menuLink.setSelected(false);
        this.subLevelVisible = false;
        this._changeDetectorRef.markForCheck();
    }

    setSelected(isSelected: boolean): void {
        this.menuLink.setSelected(isSelected);
        this._changeDetectorRef.markForCheck();
    }

    private _listenOnMenuLinkClick(): void {
        this._subscriptions.add(
            fromEvent(this.menuLink.elementRef.nativeElement, 'click')
                .subscribe(() => this._menuService.setActive(this))
        )
    }

    private _listenOnMenuLinkHover(): void {
        const mouseEnter$ = fromEvent(this.menuLink.elementRef.nativeElement, 'mouseenter');
        const mouseLeave$ = fromEvent(this.menuLink.elementRef.nativeElement, 'mouseleave');

        // Set focus on hover
        this._subscriptions.add(
            mouseEnter$.subscribe(() => this._menuService.setFocused(this))
        );

        const timerFactory$ = defer(() => {
            return timer(this._menuService.menu.openOnHoverTime).pipe(takeUntil(mouseLeave$))
        });

        const timeTrigger$ = mouseEnter$.pipe(switchMap(() => timerFactory$));

        // Set active on long hover
        this._subscriptions.add(
            mouseEnter$.pipe(
                sample(timeTrigger$)
            ).subscribe(() => this._menuService.setActive(this))
        );
    }

    private _initialiseLinkState(): void {
        this.menuLink.setSubmenu(!!this.subMenu, this.itemId);
        // this.menuLink.setDisabled(disabled)
    }
}
