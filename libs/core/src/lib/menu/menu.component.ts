import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { BasePopoverClass, PopoverService } from '@fundamental-ngx/core/popover';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { MenuMobileModule } from './menu-mobile/menu-mobile.module';
import { MenuService } from './services/menu.service';
import { MENU_COMPONENT, MenuInterface } from './menu.interface';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

let menuUniqueId = 0;

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MenuService, PopoverService, contentDensityObserverProviders()],
    standalone: true
})
export class MenuComponent
    extends BasePopoverClass
    implements MenuInterface, AfterContentInit, AfterViewInit, OnDestroy, OnInit
{
    /** Set menu in mobile mode */
    @Input()
    set mobile(value: BooleanInput) {
        this._mobile = coerceBooleanProperty(value);
        this._menuService.setMenuMode(this.mobile);
    }
    get mobile(): boolean {
        return this._mobile;
    }

    /** Whether the popover is disabled. */
    @Input()
    disabled = false;

    /** Whether the popover should be focusTrapped. */
    @Input()
    focusTrapped = true;

    /**
     * Whether the popover should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    @Input()
    focusAutoCapture = true;

    /** Should fd-scrollbar have tabindex*/
    @Input()
    tabbableScrollbar = false;

    /** Open submenu on hover after given milliseconds */
    @Input()
    openOnHoverTime = 0;

    /** Display menu without integrated popover */
    @Input()
    mobileConfig: MobileModeConfig = { cancelButtonText: 'Cancel' };

    /** Aria-label for navigation */
    @Input()
    ariaLabel: Nullable<string>;

    /** Aria-Labelledby for element describing navigation */
    @Input()
    ariaLabelledby: Nullable<string>;

    /** Id of the control. */
    @Input()
    id = `fd-menu-${menuUniqueId++}`;

    /** Emits array of active menu items */
    @Output()
    readonly activePath = new EventEmitter<MenuItemComponent[]>();

    /** @hidden Reference to the menu root template */
    @ViewChild('menuRootTemplate')
    _menuRootTemplate: TemplateRef<any>;

    /** @hidden Reference to all menu Items */
    @ContentChildren(MenuItemComponent)
    _menuItems: QueryList<MenuItemComponent>;

    /** @hidden Whether use a menu in mobile mode */
    private _mobile = false;

    /** @hidden Reference to external menu trigger */
    private _externalTrigger: ElementRef;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _mobileModeComponentRef: ComponentRef<MenuMobileComponent>;

    /** @hidden */
    private _clickEventListener: null | (() => void);

    /** @hidden */
    private get _popoverConfig(): BasePopoverClass {
        return {
            ...this,
            additionalBodyClass: (this.additionalBodyClass ?? '') + ' fd-popover--menu'
        };
    }

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        @Optional() public readonly dialogConfig: DialogConfig,
        private readonly _rendered: Renderer2,
        private readonly _menuService: MenuService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _popoverService: PopoverService,
        private readonly _injector: Injector,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() private readonly _dynamicComponentService: DynamicComponentService,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {
        super();
    }

    /** @hidden */
    ngOnInit(): void {
        /** keep isOpen up to date */
        this.isOpenChange.subscribe((isOpen) => {
            this.isOpen = isOpen;

            // when popover got closed by its own mechanism (e.x. click outside)
            // we need to clean up a menu as well
            if (!isOpen) {
                this._cleanUpMenuAfterClose();
            }

            this._changeDetectorRef.markForCheck();
        });
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._menuService.setMenuComponent(this);
        this._listenOnMenuItemsChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._menuService.isMobileMode.subscribe((isMobile) => {
            this._setupView();

            // Since it is mobile, it's needed to disable popoverService
            if (isMobile) {
                this._popoverService.deactivate();
            }
        });

        this._menuService.setMenuMode(this.mobile);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyMobileComponent();
        this._destroyEventListeners();
        this._menuService.onDestroy();
        this._subscriptions.unsubscribe();
        this._popoverService.onDestroy();
    }

    /** @hidden */
    set trigger(trigger: ElementRef) {
        this._externalTrigger = trigger;
        this._popoverService.initialise(this._externalTrigger);
        this._destroyEventListeners();
        this._listenOnTriggerRefClicks();
    }
    get trigger(): ElementRef {
        return this._externalTrigger;
    }

    /** Opens the menu */
    open(): void {
        if (this.mobile) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        } else {
            this._popoverService.open();
        }

        this._changeDetectorRef.markForCheck();
    }

    /** Closes the menu */
    close(): void {
        if (this.mobile) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        } else {
            this._popoverService.close();
        }

        this._cleanUpMenuAfterClose();
        this._focusTrigger();
        this._changeDetectorRef.markForCheck();
    }

    /** Toggles menu open/close state */
    toggle(): void {
        this.isOpen ? this.close() : this.open();
    }

    /** Method called to refresh position of opened popover */
    refreshPosition(): void {
        this._popoverService.refreshPosition();
    }

    /** @hidden */
    private _cleanUpMenuAfterClose(): void {
        this._menuService.resetMenuState();
    }

    /** @hidden Select and instantiate menu view mode */
    private _setupView(): void {
        if (this.mobile) {
            this._setupMobileMode();
        } else {
            this._setupPopoverService();
        }

        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    private _setupPopoverService(): void {
        this._subscriptions.add(
            this._popoverService._onLoad.subscribe((elementRef) => this._menuService.addKeyboardSupport(elementRef))
        );

        this._popoverService.templateContent = this._menuRootTemplate;
        this._popoverService.initialise(this._externalTrigger, this._popoverConfig);
    }

    /** @hidden Open Menu in mobile mode */
    private async _setupMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: MENU_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._mobileModeComponentRef = await this._dynamicComponentService.createDynamicModule(
            this._menuRootTemplate,
            MenuMobileModule,
            MenuMobileComponent,
            this._viewContainerRef,
            injector
        );

        this._listenOnTriggerRefClicks();
    }

    /** @hidden Listen on menu items change and rebuild menu */
    private _listenOnMenuItemsChange(): void {
        this._subscriptions.add(this._menuItems.changes.subscribe(() => this._menuService.rebuildMenu()));

        // Whether menu have submenu or not.
        let isSubmenu = false;
        this._menuItems.forEach((menuItem) => {
            if (menuItem.submenu?.menuItems) {
                isSubmenu = true;
                this._subscriptions.add(
                    menuItem.submenu._menuItemsChange$.subscribe(() => this._menuService.rebuildMenu())
                );
            }
        });
        this.disableScrollbar = isSubmenu;
    }

    /**
     * @hidden
     * This is going to be removed in feature, on dialog and dynamic service component refactor
     */
    private _listenOnTriggerRefClicks(): void {
        this._destroyEventListeners();

        if (this.trigger && this.mobile) {
            this._clickEventListener = this._rendered.listen(this.trigger.nativeElement, 'click', () => this.toggle());
        }
    }

    /**
     * @hidden
     * This is going to be removed in feature, on dialog and dynamic service component refactor
     */
    private _destroyEventListeners(): void {
        if (this._clickEventListener) {
            this._clickEventListener();
            this._clickEventListener = null;
        }
    }

    /** @hidden */
    private _destroyMobileComponent(): void {
        if (this._mobileModeComponentRef) {
            this._mobileModeComponentRef.destroy();
        }
    }

    /** @hidden */
    private _focusTrigger(): void {
        if (this.focusTrapped && this.trigger) {
            this.trigger.nativeElement.focus();
        }
    }
}
