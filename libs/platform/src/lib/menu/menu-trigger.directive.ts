import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Self,
    ViewContainerRef
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { KeyUtil } from '@fundamental-ngx/core/utils';
import { MenuCloseMethod, MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';

@Directive({
    selector: `[fdpMenuTriggerFor]`,
    host: {
        'aria-haspopup': 'menu',
        '[attr.aria-expanded]': 'isMenuOpen || null',
        '[attr.aria-controls]': 'isMenuOpen ? menu.menuId : null'
    }
})
export class MenuTriggerDirective implements OnDestroy, AfterContentInit {
    /** Set Menu Component for which this trigger will be associated. */
    @Input('fdpMenuTriggerFor')
    get menu(): MenuComponent {
        return this._menu;
    }
    set menu(menu: MenuComponent) {
        if (this._menu === menu) {
            return;
        }
        this._menu = menu;
        this._menuCloseSubscription.unsubscribe();
    }

    /** @hidden */
    private _menu: MenuComponent;
    /** @hidden */
    private _overlayRef: OverlayRef | null;
    /** @hidden */
    private _portal: TemplatePortal;
    /** @hidden */
    private _isMenuOpen = false;
    /** @hidden */
    private _outsideClickSubscription: Subscription = Subscription.EMPTY;
    /** @hidden */
    private _menuCloseSubscription: Subscription = Subscription.EMPTY;
    /** @hidden */
    private _parentMenuCloseSubscription: Subscription = Subscription.EMPTY;
    /** @hidden */
    private _menuItemHoverChangeSubscription: Subscription = Subscription.EMPTY;

    /** @hidden */
    constructor(
        private _element: ElementRef<HTMLElement>,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        @Optional() @Self() private _menuItem: MenuItemComponent,
        @Optional() private _parentMenu: MenuComponent
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this._isMenuItem()) {
            // mark menu item as trigger
            this._menuItem.isTrigger = true;

            // subscribe to changes of menu item hover state
            this._menuItemHoverChangeSubscription = this._parentMenu._menuItemHoverChange().subscribe((item) => {
                if (item === this._menuItem) {
                    if (!this.isMenuOpen) {
                        this._menuItem.isSelected = true;
                        this.openMenu();
                    }
                } else {
                    this._menuItem.isSelected = false;
                    this.closeMenu();
                }
            });
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this._outsideClickSubscription.unsubscribe();
        this._menuCloseSubscription.unsubscribe();
        this._parentMenuCloseSubscription.unsubscribe();
        this._menuItemHoverChangeSubscription.unsubscribe();
    }

    /** Flag to determine if associated menu is open. */
    get isMenuOpen(): boolean {
        return this._isMenuOpen;
    }

    /**
     * @hidden
     * Handle click on trigger element.
     */
    @HostListener('click', ['$event'])
    _onTriggerClick(event: MouseEvent): void {
        // Need to interupt default menu behavior of closing the menu
        if (this._isMenuItem()) {
            event.preventDefault();
            event.stopPropagation();
        }
        // filter out clicks initiated by keyboard enter.
        // For IE 11, MouseEvent fires a MSPointerEvent object instead of MouseEvent.
        if (event.detail > 0 || (event instanceof PointerEvent && event.detail === 0)) {
            this.toggleMenu();
        }
    }

    /**
     * @hidden
     * Handled keypress which focus is on trigger element.
     */
    @HostListener('keydown', ['$event'])
    _onTriggerKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            if (KeyUtil.isKeyCode(event, [SPACE])) {
                event.preventDefault();
            }

            // Need to interupt default menu item behavior of closing the menu
            if (this._isMenuItem()) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this._menuItem) {
                this._menuItem.isSelected = true;
            }
            this.openMenu();
        } else if (KeyUtil.isKeyCode(event, [RIGHT_ARROW])) {
            if (this._menu._cascadesRight() && this._menu.openByArrowKeys) {
                if (this._menuItem) {
                    this._menuItem.isSelected = true;
                }
                this.openMenu();
            }
        } else if (KeyUtil.isKeyCode(event, [LEFT_ARROW])) {
            if (this._menu._cascadesLeft() && this._menu.openByArrowKeys) {
                if (this._menuItem) {
                    this._menuItem.isSelected = true;
                }
                this.openMenu();
            }
        }
    }

    /**
     * @hidden
     * Toggle display of associated menu.
     */
    toggleMenu(): void {
        /**
         * Need to add delay here to ensure that any "closeMenu" operation which
         * has been invoked within an "outsideClickSubscription" gets resolved
         * before "openMenu" is called. This can happen when there are multiple
         * triggers for the same menu.
         */
        setTimeout(() => {
            this._isMenuOpen ? this._destroyMenu() : this.openMenu();
        }, 0);
    }

    /**
     * @hidden
     * Open associated menu.
     */
    openMenu(): void {
        // create overlay
        const overlayConfig = this._getOverlayConfig();
        this._overlayRef = this._overlay.create(overlayConfig);

        // get portal and attach to overlay
        this._portal = new TemplatePortal(this._menu.templateRef, this._viewContainerRef);
        this._overlayRef.attach(this._portal);

        // add subscription to capture clicks outside menu
        if (this._outsideClickSubscription) {
            this._outsideClickSubscription.unsubscribe();
        }
        this._outsideClickSubscription = fromEvent<MouseEvent>(document, 'click')
            .pipe(
                filter((event) => {
                    const target = event.target as HTMLElement;
                    return (
                        !this._element.nativeElement.contains(target) &&
                        !!this._overlayRef &&
                        !this._overlayRef.overlayElement.contains(target) &&
                        this.isMenuOpen
                    );
                }),
                take(1)
            )
            .subscribe(() => {
                this.closeMenu();
            });

        // add subscription to menu 'close' event
        if (this._menuCloseSubscription) {
            this._menuCloseSubscription.unsubscribe();
        }
        this._menuCloseSubscription = this._menu.close.subscribe((method: MenuCloseMethod) => {
            this._destroyMenu();
            // Need to close parent menu if closing of menu was done by terminating action
            if (this._parentMenu && (method === 'keyboard' || method === 'mouse')) {
                this._parentMenu.closeMenu(method);
            }
        });

        // add subscription to parent menu 'close' event
        if (this._parentMenu) {
            if (this._parentMenuCloseSubscription) {
                this._parentMenuCloseSubscription.unsubscribe();
            }
            this._parentMenuCloseSubscription = this._parentMenu.close.subscribe(() => {
                this.closeMenu();
            });
        }

        // set focus to menu
        this._menu.focusOnFirstItem();

        this._isMenuOpen = true;
    }

    /**
     * @hidden
     * Close associated menu.
     */
    closeMenu(): void {
        this._menu.closeMenu();
    }

    /**
     * @hidden
     * destroy associated menu.
     */
    private _destroyMenu(): void {
        if (this._menuItem) {
            this._menuItem.isSelected = false;
        }
        if (!this._overlayRef || !this._isMenuOpen) {
            return;
        }
        if (this._menuItem) {
            this._menuItem.focus();
        } else {
            this._element.nativeElement.focus();
        }
        this._overlayRef.detach();
        this._isMenuOpen = false;
    }

    /** @hidden */
    private _getOverlayConfig(): OverlayConfig {
        const positions = this._getPositions();
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this._element)
            .withLockedPosition()
            .withPositions(positions);

        const scrollStrategy = this._overlay.scrollStrategies.reposition();

        const overlayConfig = new OverlayConfig({
            positionStrategy,
            scrollStrategy,
            backdropClass: 'cdk-overlay-transparent-backdrop'
        });
        return overlayConfig;
    }

    /** @hidden */
    private _getPositions(): ConnectedPosition[] {
        let positions: ConnectedPosition[] = [];
        const offsetYPosition = 0;
        const offsetXPosition = 0;
        const subMenuXPadding = 4; // horizontal padding of 0.25rem(4px) is needed for sub-menu
        const subMenuYPadding = 4; // vertical padding of 0.25rem(4px) is needed for sub-menu

        if (this._isMenuItem()) {
            if (this._menu._cascadesLeft()) {
                positions = [
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'top',
                        offsetX: subMenuXPadding,
                        offsetY: subMenuYPadding
                    },
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'bottom',
                        offsetX: subMenuXPadding,
                        offsetY: -subMenuYPadding
                    }
                ];
            } else {
                positions = [
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetX: -subMenuXPadding,
                        offsetY: subMenuYPadding
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'bottom',
                        offsetX: -subMenuXPadding,
                        offsetY: -subMenuYPadding
                    }
                ];
            }
        } else {
            if (this._menu._cascadesLeft()) {
                positions = [
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                        offsetY: offsetYPosition,
                        offsetX: offsetXPosition
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                        offsetY: -offsetYPosition,
                        offsetX: offsetXPosition
                    }
                ];
            } else {
                positions = [
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetY: offsetYPosition,
                        offsetX: -offsetXPosition
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                        offsetY: -offsetYPosition,
                        offsetX: -offsetXPosition
                    }
                ];
            }
        }

        return positions;
    }

    /** @hidden */
    private _isMenuItem(): boolean {
        return !!(this._parentMenu && this._menuItem);
    }
}
