import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { defer, fromEvent, Observable, Subscription, timer } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { MenuTitleDirective } from '../directives/menu-title.directive';
import { DefaultMenuItem } from '../default-menu-item.class';
import { MenuInteractiveDirective } from '../directives/menu-interactive.directive';
import { MenuService } from '../services/menu.service';
import { Nullable } from '@fundamental-ngx/core/shared';

let menuUniqueId = 0;

export interface BaseSubmenu {
    templateRef: TemplateRef<any>;
    menuItems: QueryList<any>;
    menuService: MenuService;
    ariaLabel: Nullable<string>;
    ariaLabelledby: Nullable<string>;
}

export const SUBMENU = new InjectionToken<BaseSubmenu>('Submenu component dependency');

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'li[fd-menu-item]',
    exportAs: 'fd-menu-item',
    templateUrl: './menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'attr.role': 'presentation',
        '[class.fd-menu__item]': 'true'
    }
})
export class MenuItemComponent implements DefaultMenuItem, OnChanges, AfterContentInit, OnDestroy {
    /** Set the Menu Item as disabled/enabled */
    @Input()
    disabled = false;

    /** Menu Item id attribute value */
    @Input()
    itemId = `fd-menu-item-${menuUniqueId++}`;

    /** Reference to sub-menu component */
    @Input()
    submenu: BaseSubmenu | undefined;

    /** Emitted when the menu item is selected. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onSelect: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden Reference to the Menu Item title */
    @ContentChild(MenuTitleDirective)
    menuItemTitle: MenuTitleDirective;

    /** @hidden Reference to the Menu Item interactive element */
    @ContentChild(MenuInteractiveDirective)
    menuInteractive: MenuInteractiveDirective;

    /** @hidden Whether sub-menu is currently visible*/
    submenuVisible = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    private _hoverSubscriptions: Subscription = new Subscription();

    /** @hidden */
    constructor(
        public elementRef: ElementRef,
        @Optional() public menuService: MenuService | null,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() @Inject(SUBMENU) private _submenu: BaseSubmenu | null
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._setMenuService();
        this._initialiseItemState();
        this._listenOnMenuLinkClick();
        this._listenOnOuterFocus();
        this._listenOnMenuMode();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabled'] && !changes['disabled'].firstChange) {
            this.menuInteractive.setDisabled(this.disabled);
        }
        if (changes['submenu'] && !changes['submenu'].firstChange) {
            this.menuInteractive.setSubmenu(!!this.submenu, this.submenu ? this.itemId : undefined);
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._hoverSubscriptions.unsubscribe();
    }

    /** Whether menu item has popup (desktop mode)  */
    get hasPopup(): boolean {
        return !!this.submenu && (!this.menuService?.menu || !this.menuService?.menu.mobile);
    }

    /** Focuses Menu Item interactive element */
    focus(): void {
        if (this.menuInteractive) {
            this.menuInteractive.elementRef.nativeElement.focus();
        }
    }

    /** Clicks Menu Item interactive element */
    click(): void {
        if (this.menuInteractive) {
            this.menuInteractive.elementRef.nativeElement.click();
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden Sets menu item as selected/unselected based on isSelected flag */
    setSelected(isSelected: boolean, fromSplit?: boolean): void {
        this.menuInteractive.setSelected(isSelected);
        this.submenuVisible = isSelected && !!this.submenu;
        if (!fromSplit) {
            this.onSelect.emit();
        }
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden Creates click listener on menu item interactive element */
    private _listenOnMenuLinkClick(): void {
        this._subscriptions.add(
            fromEvent(this.menuInteractive.elementRef.nativeElement, 'click').subscribe(() =>
                this.menuService?.setActive(true, this)
            )
        );
    }

    /** @hidden Creates hover listeners for activating/deactivating menu item */
    private _listenOnMenuLinkHover(): Subscription {
        const hoverSubscriptions: Subscription = new Subscription();

        const mouseEnter$: Observable<MouseEvent> = fromEvent(
            this.menuInteractive.elementRef.nativeElement,
            'mouseenter'
        );
        const mouseLeave$: Observable<MouseEvent> = fromEvent(
            this.menuInteractive.elementRef.nativeElement,
            'mouseleave'
        );

        const timerFactory$ = defer(() =>
            timer(this.menuService ? this.menuService.menu.openOnHoverTime : 0).pipe(takeUntil(mouseLeave$))
        );

        // Set active on hover
        hoverSubscriptions.add(
            mouseEnter$
                .pipe(
                    filter(() => !!this.menuService),
                    switchMap(() => timerFactory$)
                )
                .subscribe(() => {
                    if (this.submenu) {
                        // Open submenu
                        this.menuService!.setActive(true, this);
                    }
                    if (!this.submenu) {
                        // Close sibling submenu if opened
                        this.menuService!.setInactiveSiblingMenuItem(this);
                    }
                })
        );

        return hoverSubscriptions;
    }

    /** @hidden Initializes menu link state based on item initial state */
    private _initialiseItemState(): void {
        this.menuInteractive.setSubmenu(!!this.submenu, this.itemId);
        this.menuInteractive.setDisabled(this.disabled);
    }

    /** @hidden Checks for Menu Service dependency and passes it if further */
    private _setMenuService(): void {
        this.menuService = this.menuService || this._submenu?.menuService || null;
        if (this.submenu && this.menuService) {
            this.submenu.menuService = this.menuService;
        }
    }

    /** @hidden Listen on menu mode and set proper mode listeners */
    private _listenOnMenuMode(): void {
        this.menuService?.isMobileMode.subscribe((isMobile) => {
            this._hoverSubscriptions.unsubscribe();
            if (!isMobile) {
                this._hoverSubscriptions = this._listenOnMenuLinkHover();
            }
        });
    }

    /** @hidden Updates focused menu item on outer focus */
    private _listenOnOuterFocus(): void {
        this._subscriptions.add(
            fromEvent(this.menuInteractive.elementRef.nativeElement, 'focus').subscribe(() => {
                if (this.menuService && this.menuService.focusedNode !== this.menuService.menuMap.get(this)) {
                    this.menuService.setFocused(this);
                }
            })
        );
    }
}

@Component({
    selector: 'fd-submenu',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: SUBMENU, useExisting: SubmenuComponent }],
    exportAs: 'fdSubmenu'
})
export class SubmenuComponent implements BaseSubmenu {
    /** Aria-label for navigation */
    @Input()
    ariaLabel: Nullable<string>;

    /** Aria-Labelledby for element describing navigation */
    @Input()
    ariaLabelledby: Nullable<string>;

    /** @hidden Reference to template with Submenu items  */
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    /** @hidden Reference to Submenu MenuItems  */
    @ContentChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    /** @hidden Reference to MenuService used by MenuItems */
    menuService: MenuService;
}
