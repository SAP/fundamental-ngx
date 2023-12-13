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
    forwardRef,
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
import { combineLatest, map, startWith, Subscription, tap } from 'rxjs';

import { DynamicComponentService, Nullable } from '@fundamental-ngx/cdk/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { BasePopoverClass, PopoverService } from '@fundamental-ngx/core/popover';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { SegmentedButtonHeaderDirective } from './directives/segmented-button/segmented-button-header.directive';
import { SegmentedButtonOptionDirective } from './directives/segmented-button/segmented-button-option.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { MENU_COMPONENT, MenuInterface } from './menu.interface';
import { FD_MENU_COMPONENT, FD_MENU_ITEM_COMPONENT } from './menu.tokens';
import { MenuService } from './services/menu.service';

let menuUniqueId = 0;

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    styleUrl: 'menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MenuService,
        PopoverService,
        DynamicComponentService,
        {
            provide: FD_MENU_COMPONENT,
            useExisting: forwardRef(() => MenuComponent)
        },
        contentDensityObserverProviders()
    ],
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

    /** @ignore Reference to the menu root template */
    @ViewChild('menuRootTemplate')
    _menuRootTemplate: TemplateRef<any>;

    /** @ignore Reference to all menu Items */
    @ContentChildren(FD_MENU_ITEM_COMPONENT)
    _menuItems: QueryList<MenuItemComponent>;

    /** @ignore Menu item segmented item headers */
    @ContentChildren(SegmentedButtonHeaderDirective)
    _segmentedButtonHeaderItems: QueryList<SegmentedButtonHeaderDirective<unknown>>;

    /** @ignore Menu item segmented item options */
    @ContentChildren(SegmentedButtonOptionDirective)
    _segmentedButtonOptions: QueryList<SegmentedButtonOptionDirective<unknown>>;

    /** @ignore Whether use a menu in mobile mode */
    private _mobile = false;

    /** @ignore Reference to external menu trigger */
    private _externalTrigger: ElementRef;

    /** @ignore */
    private _addons: Set<unknown> = new Set();

    /** @ignore */
    private _subscriptions = new Subscription();

    /** @ignore */
    private _mobileModeComponentRef: ComponentRef<MenuMobileComponent>;

    /** @ignore */
    private _clickEventListener: null | (() => void);

    /** @ignore */
    get hasAddons(): boolean {
        return this._addons.size > 0;
    }

    /** @ignore */
    private get _popoverConfig(): BasePopoverClass {
        return {
            ...this,
            additionalBodyClass: (this.additionalBodyClass ?? '') + ' fd-popover--menu'
        };
    }

    /** @ignore */
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

    /** @ignore */
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

    /** Register addon */
    registerAddon(addon: unknown): void {
        this._addons.add(addon);
        this._changeDetectorRef.markForCheck();
    }

    /** Unregister addon */
    unregisterAddon(addon: unknown): void {
        this._addons.delete(addon);
        this._changeDetectorRef.markForCheck();
    }

    /** @ignore */
    ngAfterContentInit(): void {
        this._menuService.setMenuComponent(this);
        this._listenOnMenuItemsChange();
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._menuService.isMobileMode.subscribe((isMobile) => {
            this._setupView();

            // Since it is mobile, it's needed to disable popoverService
            if (isMobile) {
                this._popoverService.deactivate();
            }
        });

        this._menuService.setMenuMode(this.mobile);

        combineLatest([
            this._menuItems.changes.pipe(
                startWith(this._menuItems),
                map((items) => items.toArray())
            ),
            this._segmentedButtonHeaderItems.changes.pipe(
                startWith(this._segmentedButtonHeaderItems),
                map((items) => items.toArray())
            ),
            this._segmentedButtonOptions.changes.pipe(
                startWith(this._segmentedButtonOptions),
                map((items) => items.toArray())
            )
        ])
            .pipe(
                map(([menuItems, segmentedButtonHeaderItems, segmentedButtonOptions]) =>
                    menuItems.map((item, index) => ({
                        menuItem: item,
                        segmentedButtonHeaderItem: segmentedButtonHeaderItems.find(
                            (headerItem) => headerItem.elementRef.nativeElement === item.elementRef.nativeElement
                        ),
                        segmentedButtonOption: segmentedButtonOptions.find(
                            (option) => option.elementRef.nativeElement === item.elementRef.nativeElement
                        ),
                        index
                    }))
                ),
                map((items) => {
                    let headers = items.filter((item) => !!item.segmentedButtonHeaderItem);
                    const options = items.filter((item) => !!item.segmentedButtonOption);
                    headers = headers.map((header, headerIndex) => ({
                        ...header,
                        options: options.reduce((acc, option) => {
                            const lastOption = acc[acc.length - 1];
                            const optionIndex = option.index;
                            if (!lastOption || optionIndex === lastOption.index + 1) {
                                if (headerIndex === headers.length - 1 && optionIndex > header.index) {
                                    acc.push(option);
                                } else if (optionIndex > header.index && optionIndex < headers[headerIndex + 1].index) {
                                    acc.push(option);
                                }
                            }
                            return acc;
                        }, [])
                    }));
                    return headers;
                }),
                tap((headers) =>
                    headers.forEach(({ segmentedButtonHeaderItem, options }) => {
                        segmentedButtonHeaderItem.setOptions(options.map((option) => option.segmentedButtonOption));
                    })
                )
            )
            .subscribe();
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._destroyMobileComponent();
        this._destroyEventListeners();
        this._menuService.onDestroy();
        this._subscriptions.unsubscribe();
        this._popoverService.onDestroy();
    }

    /** @ignore */
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

    /** @ignore */
    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }

    /** @ignore */
    private _cleanUpMenuAfterClose(): void {
        this._menuService.resetMenuState();
    }

    /** @ignore Select and instantiate menu view mode */
    private _setupView(): void {
        if (this.mobile) {
            this._setupMobileMode();
        } else {
            this._setupPopoverService();
        }

        this.detectChanges();
    }

    /** @ignore */
    private _setupPopoverService(): void {
        this._subscriptions.add(
            this._popoverService._onLoad.subscribe((elementRef) => this._menuService.addKeyboardSupport(elementRef))
        );

        this._popoverService.templateContent = this._menuRootTemplate;
        this._popoverService.initialise(this._externalTrigger, this._popoverConfig);
    }

    /** @ignore Open Menu in mobile mode */
    private async _setupMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: MENU_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._mobileModeComponentRef = this._dynamicComponentService.createDynamicComponent(
            this._menuRootTemplate,
            MenuMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );

        this._listenOnTriggerRefClicks();
    }

    /** @ignore Listen on menu items change and rebuild menu */
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
        if (!this.disableScrollbar && isSubmenu) {
            this.disableScrollbar = isSubmenu;
        }
    }

    /**
     * @ignore
     * This is going to be removed in feature, on dialog and dynamic service component refactor
     */
    private _listenOnTriggerRefClicks(): void {
        this._destroyEventListeners();

        if (this.trigger && this.mobile) {
            this._clickEventListener = this._rendered.listen(this.trigger.nativeElement, 'click', () => this.toggle());
        }
    }

    /**
     * @ignore
     * This is going to be removed in feature, on dialog and dynamic service component refactor
     */
    private _destroyEventListeners(): void {
        if (this._clickEventListener) {
            this._clickEventListener();
            this._clickEventListener = null;
        }
    }

    /** @ignore */
    private _destroyMobileComponent(): void {
        if (this._mobileModeComponentRef) {
            this._mobileModeComponentRef.destroy();
        }
    }

    /** @ignore */
    private _focusTrigger(): void {
        if (this.focusTrapped && this.trigger) {
            this.trigger.nativeElement.focus();
        }
    }
}
