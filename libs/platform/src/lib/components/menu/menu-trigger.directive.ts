import {
    Directive,
    Input,
    HostListener,
    OnDestroy,
    ViewContainerRef,
    ElementRef,
    Optional,
    Self,
    AfterContentInit
} from '@angular/core';
import {
    Overlay,
    OverlayRef,
    OverlayConfig,
    ConnectedPosition
} from '@angular/cdk/overlay';

import { MenuComponent, MenuCloseMethod } from './menu.component';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription, fromEvent } from 'rxjs';
import { MenuItemComponent } from './menu-item.component';
import { take, filter } from 'rxjs/operators';

@Directive({
    selector: `[fdpMenuTriggerFor]`,
    host: {
        'aria-haspopup': 'true',
        '[attr.aria-expanded]': 'isMenuOpen || null',
        '[attr.aria-controls]': 'isMenuOpen ? menu.menuId : null'
    }
})
export class MenuTriggerDirective implements OnDestroy, AfterContentInit {

    private _menu: MenuComponent;
    private _overlayRef: OverlayRef;
    private _portal: TemplatePortal;
    private _isMenuOpen = false;

    private outsideClickSubscription: Subscription = Subscription.EMPTY;
    private menuCloseSubscription: Subscription = Subscription.EMPTY;
    private parentMenuCloseSubscription: Subscription = Subscription.EMPTY;
    private menuItemHoverChangeSubscription: Subscription = Subscription.EMPTY;

    @Input('fdpMenuTriggerFor')
    get menu() { return this._menu; }
    set menu(menu: MenuComponent) {
        if (this._menu === menu) {
            return;
        }
        this._menu = menu;
        this.menuCloseSubscription.unsubscribe();
    }

    constructor(
        private _element: ElementRef<HTMLElement>,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        @Optional() @Self() private _menuItem: MenuItemComponent,
        @Optional() private _parentMenu: MenuComponent
    ) {

    }

    ngAfterContentInit() {
        if (this._isMenuItem()) {

            // mark menu item as trigger
            this._menuItem.isTrigger = true;

            // subscribe to changes of menu item hover state
            this.menuItemHoverChangeSubscription = this._parentMenu.menuItemHoverChange().subscribe((item) => {
                if (item === this._menuItem) {
                    if (!this.isMenuOpen) {
                        this.openMenu();
                    }
                } else {
                    this.closeMenu();
                }
            });
        }
    }

    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this.outsideClickSubscription.unsubscribe();
        this.menuCloseSubscription.unsubscribe();
        this.parentMenuCloseSubscription.unsubscribe();
        this.menuItemHoverChangeSubscription.unsubscribe();
    }

    @HostListener('click', ['$event']) onTriggerClick($event: MouseEvent) {
        // Need to interupt default menu behavior of closing the menu
        if (this._isMenuItem()) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this.toggleMenu();
    }

    @HostListener('keydown', ['$event']) onTriggerKeydown($event: KeyboardEvent) {
        switch ($event.key) {
            case 'Enter':
                // Need to interupt default menu item behavior of closing the menu
                if (this._isMenuItem()) {
                    $event.preventDefault();
                    $event.stopPropagation();
                }
                this.openMenu();
                break;
            case 'ArrowRight':
            case 'Right':
                if (this._menu.cascadesRight()) {
                    this.openMenu();
                }
                break;
            case 'ArrowLeft':
            case 'Left':
                if (this._menu.cascadesLeft()) {
                    this.openMenu();
                }
                break;
        }
    }

    get isMenuOpen(): boolean {
        return this._isMenuOpen;
    }

    toggleMenu() {
        this._isMenuOpen ? this.destroyMenu() : this.openMenu();
    }

    openMenu() {

        // create overlay
        const overlayConfig = this._getOverlayConfig();
        this._overlayRef = this._overlay.create(overlayConfig);

        // get portal and attach to overlay
        this._portal = new TemplatePortal(this._menu.templateRef, this._viewContainerRef);
        this._overlayRef.attach(this._portal);

        // add subscription to capture clicks outside menu
        this.outsideClickSubscription = fromEvent<MouseEvent>(document, 'click')
            .pipe(
                filter(event => {
                    const target = event.target as HTMLElement;
                    return !this._element.nativeElement.contains(target)
                        && (!!this._overlayRef && !this._overlayRef.overlayElement.contains(target))
                        && this.isMenuOpen;
                }),
                take(1)
            ).subscribe((event) => {
                this.closeMenu();
            });


        // add subscription to menu 'close' event
        this.menuCloseSubscription = this._menu.close.subscribe((method: MenuCloseMethod) => {
            this.destroyMenu();
            // Need to close parent menu if closing of menu was done by terminating action
            if (this._parentMenu && (method === 'keyboard' || method === 'mouse')) {
                this._parentMenu.closeMenu(method);
            }
        });

        // add subscription to parent menu 'close' event
        if (this._parentMenu) {
            this.parentMenuCloseSubscription = this._parentMenu.close.subscribe((method: MenuCloseMethod) => {
                this.closeMenu();
            });
        }

        // set focus to menu
        this._menu.focusOnFirstItem();

        this._isMenuOpen = true;
    }

    closeMenu() {
        this._menu.closeMenu();
    }

    destroyMenu() {
        if (!this._overlayRef || !this._isMenuOpen) {
            return;
        }
        this._element.nativeElement.focus();
        this._overlayRef.detach();
        this._isMenuOpen = false;
    }

    private _getOverlayConfig(): OverlayConfig {
        const positions = this._getPositions();
        const positionStrategy = this._overlay.position()
            .flexibleConnectedTo(this._element)
            .withLockedPosition()
            .withPositions(positions);

        const scrollStrategy = this._overlay.scrollStrategies.reposition();

        const overlayConfig = new OverlayConfig({
            positionStrategy: positionStrategy,
            scrollStrategy: scrollStrategy,
            backdropClass: 'cdk-overlay-transparent-backdrop'
        });
        return overlayConfig;
    }

    private _getPositions(): ConnectedPosition[] {
        let positions: ConnectedPosition[] = [];
        const offsetYPosition = 0;
        const offsetXPosition = 0;
        if (this._isMenuItem()) {
            if (this._menu.cascadesLeft()) {
                positions = [{
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'top',
                    offsetX: offsetXPosition
                }, {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'bottom',
                    offsetX: offsetXPosition
                }];
            } else {
                positions = [{
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetX: -offsetXPosition
                }, {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetX: -offsetXPosition
                }];
            }
        } else {
            if (this._menu.cascadesLeft()) {
                positions = [{
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                    offsetY: offsetYPosition,
                    offsetX: offsetXPosition
                }, {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                    offsetY: -offsetYPosition,
                    offsetX: offsetXPosition
                }];
            } else {
                positions = [{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: offsetYPosition,
                    offsetX: -offsetXPosition
                }, {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetY: -offsetYPosition,
                    offsetX: -offsetXPosition
                }];
            }
        }

        return positions;
    }

    private _isMenuItem(): boolean {
        return !!(this._parentMenu && this._menuItem);
    }

}
