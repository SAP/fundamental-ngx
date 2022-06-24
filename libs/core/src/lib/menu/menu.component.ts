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

import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { BasePopoverClass, PopoverService } from '@fundamental-ngx/core/popover';
import { Nullable } from '@fundamental-ngx/core/shared';

import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { MenuMobileModule } from './menu-mobile/menu-mobile.module';
import { MenuService } from './services/menu.service';
import { MENU_COMPONENT, MenuInterface } from './menu.interface';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

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
    providers: [MenuService, PopoverService, contentDensityObserverProviders()]
})
export class MenuComponent
    extends BasePopoverClass
    implements MenuInterface, AfterContentInit, AfterViewInit, OnDestroy, OnInit
{
    /** Set menu in mobile mode */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('mobile')
    set setMobileMode(value: boolean) {
        this.mobile = value;
        this._menuService.setMenuMode(this.mobile);
    }

    /** Whether the popover is disabled. */
    @Input()
    disabled = false;

    /** Whether the popover should be focusTrapped. */
    @Input()
    focusTrapped = true;

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
    readonly activePath: EventEmitter<MenuItemComponent[]> = new EventEmitter<MenuItemComponent[]>();

    /** @hidden Reference to the menu root template */
    @ViewChild('menuRootTemplate')
    menuRootTemplate: TemplateRef<any>;

    /** @hidden Reference to all menu Items */
    @ContentChildren(MenuItemComponent, { descendants: true })
    menuItems: QueryList<MenuItemComponent>;

    /** Whether use menu in mobile mode */
    mobile = false;

    /** @hidden Whether Popover with the menu is opened */
    isOpen = false;

    /** @hidden Reference to external menu trigger */
    private _externalTrigger: ElementRef;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    private _mobileModeComponentRef: ComponentRef<MenuMobileComponent>;

    /** @hidden */
    private _clickEventListener: null | (() => void);

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
            if (!isOpen) {
                // when popover got closed by its own mechanism (e.x. click outside)
                // we need to clean up menu as well
                this._cleanUpMenuAfterClose();
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._menuService.setMenuRoot(this);
        this._listenOnMenuItemsChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._menuService.isMobileMode.subscribe((isMobile) => {
            this._setupView();
            if (isMobile) {
                // Since it is mobile it's needed to disable popoverService
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

    get trigger(): ElementRef {
        return this._externalTrigger;
    }

    set trigger(trigger: ElementRef) {
        this._externalTrigger = trigger;
        this._popoverService.initialise(this._externalTrigger);
        this._destroyEventListeners();
        this._listenOnTriggerRefClicks();
    }

    /** Opens the menu */
    open(): void {
        if (this.mobile) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
        if (!this.mobile) {
            this._popoverService.open();
        }
        this._changeDetectorRef.markForCheck();
    }

    /** Closes the menu */
    close(): void {
        if (this.mobile) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
        if (!this.mobile) {
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
            this._popoverService._onLoad.subscribe((elementRef) => this._manageKeyboardSupport(elementRef))
        );

        this._popoverService.templateContent = this.menuRootTemplate;
        this._popoverService.initialise(this._externalTrigger, this);
    }

    /** @hidden */
    private _manageKeyboardSupport(elementRef: ElementRef): void {
        this._menuService.addKeyboardSupport(elementRef);
    }

    /** @hidden Open Menu in mobile mode */
    private async _setupMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: MENU_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._mobileModeComponentRef = await this._dynamicComponentService.createDynamicModule(
            this.menuRootTemplate,
            MenuMobileModule,
            MenuMobileComponent,
            this._viewContainerRef,
            injector
        );

        this._listenOnTriggerRefClicks();
    }

    /** @hidden Listen on menu items change and rebuild menu */
    private _listenOnMenuItemsChange(): void {
        this._subscriptions.add(this.menuItems.changes.subscribe(() => this._menuService.rebuildMenu()));
        this.menuItems.forEach((m) => {
            if (m.submenu && m.submenu.menuItems) {
                this._subscriptions.add(m.submenu.menuItems.changes.subscribe(() => this._menuService.rebuildMenu()));
            }
        });
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
