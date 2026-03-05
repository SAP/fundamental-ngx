import {
    AfterContentInit,
    afterNextRender,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    contentChildren,
    DestroyRef,
    effect,
    ElementRef,
    forwardRef,
    inject,
    Injector,
    input,
    model,
    OnDestroy,
    output,
    Renderer2,
    runInInjectionContext,
    signal,
    TemplateRef,
    untracked,
    viewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverConfig, PopoverService, TriggerConfig } from '@fundamental-ngx/core/popover';
import { Placement, PopoverFillMode } from '@fundamental-ngx/core/shared';

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
    host: {
        '[class.fd-popover-custom--disabled]': 'disabled()'
    }
})
export class MenuComponent implements MenuInterface, AfterContentInit, AfterViewInit, OnDestroy {
    /** Open submenu on hover after given milliseconds */
    readonly openOnHoverTime = input(0);

    /** Aria-label for navigation */
    readonly ariaLabel = input<string | null>(null);

    /** Aria-Labelledby for element describing navigation */
    readonly ariaLabelledby = input<string | null>(null);

    /** Id of the control. */
    readonly id = input(`fd-menu-${menuUniqueId++}`);

    /**
     * Configuration object for popover settings.
     * When provided, these settings will be merged with individual input properties.
     * Individual inputs take precedence over config object values.
     */
    readonly config = input<PopoverConfig>({});

    /** Whether the menu should be displayed in mobile mode */
    readonly mobile = input(false, { transform: booleanAttribute });

    /** Mobile mode configuration */
    readonly mobileConfig = input<MobileModeConfig>({
        approveButtonText: '',
        title: '',
        hasCloseButton: true
    });

    /** Popover placement */
    readonly placement = input<Placement>('bottom-start');

    /** Whether to close popover on escape key */
    readonly closeOnEscapeKey = input(true, { transform: booleanAttribute });

    /** Whether to auto-capture focus when opened */
    readonly focusAutoCapture = input(true, { transform: booleanAttribute });

    /** Whether the menu/popover is disabled */
    readonly disabled = input(false, { transform: booleanAttribute });

    /** Whether to disable scrollbar */
    readonly disableScrollbar = input(false, { transform: booleanAttribute });

    /** Trigger events for opening/closing */
    readonly triggers = input<(string | TriggerConfig)[]>(['click']);

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    readonly fillControlMode = input<PopoverFillMode | null>(null);

    /** Whether to close on outside click */
    readonly closeOnOutsideClick = input(true, { transform: booleanAttribute });

    /** Whether to hide the arrow */
    readonly noArrow = input(true, { transform: booleanAttribute });

    /** Whether the popover should trap focus within its boundaries */
    readonly focusTrapped = input(true, { transform: booleanAttribute });

    /** Additional CSS classes for the popover body container */
    readonly additionalBodyClass = input<string | null>(null);

    /** Two-way binding for menu open state */
    readonly isOpen = model(false);

    /** Emits when menu open state changes - required for MenuInterface compatibility */
    readonly isOpenChange = output<boolean>();

    /** Emits array of active menu items */
    readonly activePath = output<MenuItemComponent[]>();

    /** Event emitted right before the popover is being opened. */
    readonly beforeOpen = output<void>();

    /** @hidden Injected dependencies using inject() function */
    readonly elementRef = inject(ElementRef);
    readonly dialogConfig = inject(DialogConfig, { optional: true });
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** Public getter for menu items - used by MenuService */
    get menuItems(): readonly MenuItemComponent[] {
        return this._menuItems() as readonly MenuItemComponent[];
    }

    /** @hidden */
    _navContainerRole = 'menu';

    /** @hidden */
    _menuListContainerRole = 'none';

    /** @hidden Reference to the menu root template */
    protected readonly _menuRootTemplate = viewChild<TemplateRef<any>>('menuRootTemplate');

    /** @hidden Reference to all menu Items */
    protected readonly _menuItems = contentChildren(FD_MENU_ITEM_COMPONENT);

    /** @hidden Menu item segmented item headers */
    protected readonly _segmentedButtonHeaderItems = contentChildren(SegmentedButtonHeaderDirective);

    /** @hidden Menu item segmented item options */
    protected readonly _segmentedButtonOptions = contentChildren(SegmentedButtonOptionDirective);

    /** @hidden */
    protected get hasAddons(): boolean {
        return this._addons().size > 0;
    }

    /** @hidden Reference to external menu trigger */
    private _externalTrigger: ElementRef | null = null;

    /** @hidden */
    private _addons = signal<Set<unknown>>(new Set());

    /** @hidden */
    private _mobileModeComponentRef: ComponentRef<MenuMobileComponent> | null = null;

    /** @hidden */
    private _clickEventListener: null | (() => void);

    /** @hidden Flag to prevent circular sync between component and service */
    private _syncingIsOpen = false;

    /** @hidden */
    private readonly _renderer = inject(Renderer2);
    private readonly _menuService = inject(MenuService);
    private readonly _popoverService = inject(PopoverService);
    private readonly _injector = inject(Injector);
    private readonly _viewContainerRef = inject(ViewContainerRef);
    private readonly _dynamicComponentService = inject(DynamicComponentService, { optional: true });
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        // Watch mobile mode changes
        effect(() => {
            this._menuService.setMenuMode(this.mobile());
        });

        // Sync component → service and emit beforeOpen
        let previousIsOpen = false;
        effect(() => {
            const openState = this.isOpen();

            // Emit beforeOpen when transitioning from closed to open
            if (openState && !previousIsOpen) {
                this.beforeOpen.emit();
            }

            // Emit isOpenChange for MenuMobileComponent and other consumers
            this.isOpenChange.emit(openState);

            // Sync to service only if not already syncing (prevents loop)
            if (!this._syncingIsOpen) {
                this._syncingIsOpen = true;
                this._popoverService.isOpen.set(openState);
                this._syncingIsOpen = false;
            }

            if (!openState) {
                this._cleanUpMenuAfterClose();
            }

            previousIsOpen = openState;
        });

        // Sync popover configuration with service
        effect(() => {
            const cfg = this.config();

            this._popoverService.placement.set(this.placement() ?? cfg.placement ?? 'bottom-start');
            this._popoverService.closeOnEscapeKey.set(this.closeOnEscapeKey() ?? cfg.closeOnEscapeKey ?? true);
            this._popoverService.disabled.set(this.disabled() ?? cfg.disabled ?? false);
            this._popoverService.focusTrapped.set(this.focusTrapped() ?? cfg.focusTrapped ?? false);
            this._popoverService.focusAutoCapture.set(this.focusAutoCapture() ?? cfg.focusAutoCapture ?? true);
            // Note: disableScrollbar is handled separately when checking for submenus (see afterNextRender effect)
            // We don't set it here to avoid race conditions where this effect might override the submenu logic
            this._popoverService.triggers.set(this.triggers() ?? cfg.triggers ?? ['click']);
            this._popoverService.fillControlMode.set(this.fillControlMode() ?? cfg.fillControlMode ?? null);
            this._popoverService.closeOnOutsideClick.set(this.closeOnOutsideClick() ?? cfg.closeOnOutsideClick ?? true);
            this._popoverService.noArrow.set(this.noArrow() ?? cfg.noArrow ?? true);

            const bodyClass = this.additionalBodyClass() ?? cfg.additionalBodyClass ?? '';
            this._popoverService.additionalBodyClass.set(bodyClass + ' fd-popover--menu');
        });

        // Listen on menu items change and rebuild menu
        // Use afterNextRender to ensure this runs after ngAfterContentInit sets the menu component
        afterNextRender(() => {
            runInInjectionContext(this._injector, () => {
                // Track previous subscriptions to clean up when effect re-runs
                let submenuSubscriptions: (() => void)[] = [];

                effect((onCleanup) => {
                    // Clean up previous subscriptions before creating new ones
                    submenuSubscriptions.forEach((unsubscribe) => unsubscribe());
                    submenuSubscriptions = [];

                    const menuItems = this._menuItems() as readonly MenuItemComponent[];
                    this._menuService.rebuildMenu();

                    // Whether menu have submenu or not.
                    let hasSubmenus = false;
                    menuItems.forEach((menuItem: MenuItemComponent) => {
                        if (menuItem.submenu) {
                            hasSubmenus = true;
                            // Subscribe to submenu changes and track subscription for cleanup
                            const subscription = menuItem.submenu._menuItemsChange$.subscribe(() =>
                                this._menuService.rebuildMenu()
                            );
                            submenuSubscriptions.push(() => subscription.unsubscribe());
                        }
                    });

                    // Always disable scrollbar when menu has submenus to prevent clipping
                    // Only respect the user's disableScrollbar input if they explicitly enabled it or there are no submenus
                    const cfg = this.config();
                    const shouldDisableScrollbar =
                        hasSubmenus || (this.disableScrollbar() ?? cfg.disableScrollbar ?? false);
                    this._popoverService.disableScrollbar.set(shouldDisableScrollbar);

                    // Cleanup callback when effect is destroyed or re-runs
                    onCleanup(() => {
                        submenuSubscriptions.forEach((unsubscribe) => unsubscribe());
                        submenuSubscriptions = [];
                    });
                });
            });
        });

        // Process segmented button items (needs to run after view init)
        afterNextRender(() => {
            runInInjectionContext(this._injector, () => {
                effect(() => {
                    const menuItems = this._menuItems() as readonly MenuItemComponent[];
                    const segmentedHeaders = this._segmentedButtonHeaderItems();
                    const segmentedOptions = this._segmentedButtonOptions();

                    // Process segmented button items
                    const items = menuItems.map((item, index) => ({
                        menuItem: item,
                        segmentedButtonHeaderItem: segmentedHeaders.find(
                            (headerItem) => headerItem.elementRef.nativeElement === item.elementRef.nativeElement
                        ),
                        segmentedButtonOption: segmentedOptions.find(
                            (option) => option.elementRef.nativeElement === item.elementRef.nativeElement
                        ),
                        index
                    }));

                    const headers = items.filter((item) => !!item.segmentedButtonHeaderItem);
                    const options = items.filter((item) => !!item.segmentedButtonOption);

                    const headersWithOptions = headers.map((header, headerIndex) => ({
                        ...header,
                        options: options.reduce((acc, option) => {
                            const lastOption = acc[acc.length - 1];
                            const optionIndex = option.index;
                            if (!lastOption || optionIndex === lastOption.index + 1) {
                                if (headerIndex === headers.length - 1 && optionIndex > header.index) {
                                    acc.push(option);
                                } else if (
                                    optionIndex > header.index &&
                                    optionIndex < headers[headerIndex + 1]?.index
                                ) {
                                    acc.push(option);
                                }
                            }
                            return acc;
                        }, [] as any[])
                    }));

                    headersWithOptions.forEach(({ segmentedButtonHeaderItem, options: headerOptions }) => {
                        segmentedButtonHeaderItem?.setOptions(
                            headerOptions.map((option) => option.segmentedButtonOption)
                        );
                    });
                });
            });
        });

        // Watch for mobile mode changes (needs to run after view init)
        afterNextRender(() => {
            runInInjectionContext(this._injector, () => {
                effect(() => {
                    const mobileValue = this.mobile();
                    // Use untracked to prevent _setupView from running in reactive context
                    // This avoids NG0602 errors when _setupView calls other setup methods
                    untracked(() => {
                        this._setupView();

                        if (mobileValue) {
                            this._popoverService.deactivate();
                        }
                    });
                });
            });
        });

        // Subscribe to service changes for bidirectional sync using afterNextRender
        // to ensure service is fully initialized
        afterNextRender(
            () => {
                // Service will emit when it closes/opens programmatically (escape key, close button, etc.)
                this._popoverService.isOpenChange
                    .pipe(takeUntilDestroyed(this._destroyRef))
                    .subscribe((serviceIsOpen) => {
                        // Don't sync in mobile mode - the mobile dialog manages its own open/close state
                        if (this.mobile()) {
                            return;
                        }

                        // Only update if different and not already syncing (prevents loop)
                        if (!this._syncingIsOpen && this.isOpen() !== serviceIsOpen) {
                            this._syncingIsOpen = true;
                            this.isOpen.set(serviceIsOpen);
                            this._syncingIsOpen = false;
                        }
                    });
            },
            { injector: this._injector }
        );
    }

    /** Register addon */
    registerAddon(addon: unknown): void {
        const currentAddons = this._addons();
        currentAddons.add(addon);
        this._addons.set(new Set(currentAddons));
    }

    /** Unregister addon */
    unregisterAddon(addon: unknown): void {
        const currentAddons = this._addons();
        currentAddons.delete(addon);
        this._addons.set(new Set(currentAddons));
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._menuService.setMenuComponent(this);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._menuService.setMenuMode(this.mobile());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyMobileComponent();
        this._destroyEventListeners();
    }

    /** @hidden */
    set trigger(trigger: ElementRef | null) {
        this._externalTrigger = trigger;
        if (trigger) {
            this._popoverService.initialise(trigger);
        }
        this._destroyEventListeners();
        this._listenOnTriggerRefClicks();
    }

    get trigger(): ElementRef | null {
        return this._externalTrigger;
    }

    /** Opens the menu */
    open(): void {
        // Always update component state for consistency
        this.isOpen.set(true);

        // In desktop mode, also explicitly open the popover service
        if (!this.mobile()) {
            this._popoverService.open();
        }
    }

    /** Closes the menu */
    close(): void {
        // Always update component state for consistency
        this.isOpen.set(false);

        // In desktop mode, also explicitly close the popover service
        if (!this.mobile()) {
            this._popoverService.close();
        }

        this._cleanUpMenuAfterClose();
        this._focusTrigger();
    }

    /** Toggles menu open/close state */
    toggle(): void {
        this.isOpen() ? this.close() : this.open();
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
        if (this.mobile()) {
            this._setupMobileMode();
        } else {
            this._setupPopoverService();
        }
    }

    /** @hidden */
    private _setupPopoverService(): void {
        // Subscribe to popover load event to add keyboard support
        // This is set up once, not reactively, so no effect() needed
        this._popoverService._onLoad.subscribe((elementRef) => this._menuService.addKeyboardSupport(elementRef));

        const template = this._menuRootTemplate();
        if (template) {
            this._popoverService.templateContent = template;
        }

        if (this._externalTrigger) {
            // Create config from current signal values
            const cfg = this.config();
            const configToPass: PopoverConfig = {
                placement: this.placement() ?? cfg.placement,
                closeOnEscapeKey: this.closeOnEscapeKey() ?? cfg.closeOnEscapeKey,
                disabled: this.disabled() ?? cfg.disabled,
                focusTrapped: this.focusTrapped() ?? cfg.focusTrapped,
                focusAutoCapture: this.focusAutoCapture() ?? cfg.focusAutoCapture,
                // Note: disableScrollbar is handled by the submenu detection effect, don't set it here
                triggers: this.triggers() ?? cfg.triggers,
                fillControlMode: this.fillControlMode() ?? cfg.fillControlMode,
                closeOnOutsideClick: this.closeOnOutsideClick() ?? cfg.closeOnOutsideClick,
                noArrow: this.noArrow() ?? cfg.noArrow,
                additionalBodyClass: (
                    (this.additionalBodyClass() ?? cfg.additionalBodyClass ?? '') + ' fd-popover--menu'
                ).trim()
            };

            this._popoverService.initialise(this._externalTrigger, configToPass);
        }
    }

    /** @hidden Open Menu in mobile mode */
    private async _setupMobileMode(): Promise<void> {
        if (!this._dynamicComponentService) {
            return;
        }

        const injector = Injector.create({
            providers: [{ provide: MENU_COMPONENT, useValue: this }],
            parent: this._injector
        });

        const template = this._menuRootTemplate();
        if (!template) {
            return;
        }

        this._mobileModeComponentRef = this._dynamicComponentService.createDynamicComponent(
            template,
            MenuMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );

        this._listenOnTriggerRefClicks();
    }

    /**
     * @hidden
     * This is going to be removed in feature, on dialog and dynamic service component refactor
     */
    private _listenOnTriggerRefClicks(): void {
        this._destroyEventListeners();

        if (this.trigger && this.mobile()) {
            this._clickEventListener = this._renderer.listen(this.trigger.nativeElement, 'click', () => this.toggle());
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
        if (this.focusTrapped() && this.trigger) {
            this.trigger.nativeElement.focus();
        }
    }
}
