import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SimpleChanges
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
        '[class.fd-menu__item]': 'true'
    }
})
export class MenuItemComponent implements DefaultMenuItem, OnChanges, AfterContentInit, OnDestroy {

    /** Set the Menu Item as selected/unselected */
    @Input()
    selected: boolean = false;

    /** Set the Menu Item as disabled/enabled */
    @Input()
    disabled: boolean = false;

    /** Menu Item id attribute value */
    @Input()
    itemId: string = `fd-menu-item-${menuUniqueId++}`;

    /** Reference to sub-menu component */
    @Input()
    subMenu: SubMenuComponent;

    @Output()
    selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden Reference to the Menu Item title */
    @ContentChild(MenuTitleDirective)
    menuItemTitle: MenuTitleDirective;

    /** @hidden Reference to the Menu Item interactive element */
    @ContentChild(MenuLinkDirective)
    menuLink: MenuLinkDirective;

    /** @hidden Whether sub-menu is currently visible*/
    subMenuVisible: boolean = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(public elementRef: ElementRef,
                private _changeDetectorRef: ChangeDetectorRef,
                @Optional() private _menuService: MenuService,
                @Optional() private _subMenu: SubMenuComponent) {
    }

    /** @hidden */
    ngAfterContentInit() {
        this._setMenuService();
        this._initialiseItemState();
        this._listenOnMenuLinkClick();
        this._listenOnMenuLinkHover();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges) {
        if (changes['selected'] && !changes['selected'].firstChange) {
            if (this.selected) {
                this._menuService.setSelectProgrammatic(this);
            }
        }
    }

    /** @hidden */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    /** Whether menu item has popup (desktop mode)  */
    get hasPopup(): boolean {
        return this.subMenu && !this._menuService.menu.mobile;
    }

    /** Focuses Menu Item interactive element */
    focus(): void {
        if (this.menuLink) {
            this.menuLink.elementRef.nativeElement.focus();
        }
    }

    /** Clicks Menu Item interactive element */
    click(): void {
        if (this.menuLink) {
            this.menuLink.elementRef.nativeElement.click();
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden Opens submenu level */
    open(): void {
        this.menuLink.setSelected(true);
        this.subMenuVisible = true;
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden Closes submenu level */
    close(): void {
        this.menuLink.setSelected(false);
        this.subMenuVisible = false;
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden Sets menu item as selected/unselected based on isSelected flag */
    setSelected(isSelected: boolean): void {
        this.menuLink.setSelected(isSelected);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden Creates click listener on menu item interactive element */
    private _listenOnMenuLinkClick(): void {
        this._subscriptions.add(
            fromEvent(this.menuLink.elementRef.nativeElement, 'click')
                .subscribe(() => this._menuService.setActive(true, this))
        )
    }

    /** @hidden Creates hover listeners for activating/deactivating menu item */
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
                filter(() => !this._menuService.menu.mobile && !!this.subMenu),
                sample(timeTrigger$)
            ).subscribe(() => this._menuService.setActive(true, this))
        );
    }

    /** @hidden Initializes menu link state based on item initial state */
    private _initialiseItemState(): void {
        this.menuLink.setSubmenu(!!this.subMenu, this.itemId);
        this.menuLink.setDisabled(this.disabled);
        if (this.selected) {
            setTimeout(() => this._menuService.setSelectProgrammatic(this));
        }
    }

    /** @hidden Checks for Menu Service dependency and passes it if further */
    private _setMenuService(): void {
        this._menuService = this._menuService || this._subMenu.menuService;
        if (this.subMenu) {
            this.subMenu.menuService = this._menuService;
        }
    }
}
