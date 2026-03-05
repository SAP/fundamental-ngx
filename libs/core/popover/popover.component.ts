import {
    AfterContentInit,
    afterNextRender,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    computed,
    contentChild,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    Injector,
    input,
    model,
    OnDestroy,
    output,
    Renderer2,
    TemplateRef,
    viewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { A11yModule } from '@angular/cdk/a11y';
import { DynamicComponentService, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { Placement, PopoverFillMode } from '@fundamental-ngx/core/shared';
import { PopoverConfig, TriggerConfig } from './base/popover-config.interface';
import { PopoverBodyDirective } from './popover-body.directive';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverControlComponent } from './popover-control/popover-control.component';
import { PopoverMobileComponent } from './popover-mobile/popover-mobile.component';
import { PopoverService, PopoverTemplate } from './popover-service/popover.service';
import { POPOVER_COMPONENT } from './popover.interface';
import { FD_POPOVER_COMPONENT } from './tokens';

export const SELECT_CLASS_NAMES = {
    selectControl: 'fd-select__control'
};

let cdkPopoverUniqueId = 0;

/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 */
@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        PopoverService,
        {
            provide: FD_POPOVER_COMPONENT,
            useExisting: PopoverComponent
        },
        contentDensityObserverProviders()
    ],
    host: {
        class: 'fd-popover-custom',
        '[class.fd-popover-custom--mobile]': 'mobile()',
        '[class.fd-popover-custom--disabled]': 'disabled()',
        '[attr.id]': 'id()',
        '(keydown.escape)': '_onEscapeKey($event)',
        '(keydown.space)': '_onKeyDown($event)',
        '(keydown.enter)': '_onKeyDown($event)'
    },
    imports: [CdkOverlayOrigin, A11yModule]
})
export class PopoverComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    /**
     * Configuration object for popover settings.
     * When provided, these settings will be merged with individual input properties.
     * Individual inputs take precedence over config object values.
     */
    readonly config = input<PopoverConfig>({});

    /** Tooltip for popover */
    readonly title = input<string>('');

    /** Reference to popover trigger element */
    readonly trigger = model<ElementRef | HTMLElement | null>(null);

    /** Id of the popover. If none is provided, one will be generated. */
    readonly id = input<string>(`fd-popover-${cdkPopoverUniqueId++}`);

    /** Whether the popover component should be displayed in mobile mode. */
    readonly mobile = input(false, { transform: booleanAttribute });

    /** Config for the popover in mobile mode */
    readonly mobileConfig = input<MobileModeConfig>({ hasCloseButton: true });

    /**
     * Whether the popover should prevent page scrolling when space key is pressed.
     **/
    readonly preventSpaceKeyScroll = input(true, { transform: booleanAttribute });

    /** Popover placement */
    readonly placement = input<Placement>('bottom-start');

    /** Maximum width of popover body in px, prevents from overextending body by `fillControlMode` */
    readonly maxWidth = input<number | null>(null);

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    readonly fillControlMode = input<PopoverFillMode | null>(null);

    /** Whether clicking outside popover should close it */
    readonly closeOnOutsideClick = input(true, { transform: booleanAttribute });

    /** Whether escape key should close the popover */
    readonly closeOnEscapeKey = input(true, { transform: booleanAttribute });

    /** Whether the popover is disabled */
    readonly disabled = input(false, { transform: booleanAttribute });

    /** Popover trigger events configuration */
    readonly triggers = input<(string | TriggerConfig)[]>(['click']);

    /** Whether the popover should trap focus */
    readonly focusTrapped = input(true, { transform: booleanAttribute });

    /** Whether focus should be automatically captured when popover opens */
    readonly focusAutoCapture = input(true, { transform: booleanAttribute });

    /**
     * Whether to move the focus after popover is closed to the last focused element before popover was opened.
     */
    readonly restoreFocusOnClose = input(true, { transform: booleanAttribute });

    /** Whether the arrow should be hidden */
    readonly noArrow = input(true, { transform: booleanAttribute });

    /** Whether scrollbar should be disabled */
    readonly disableScrollbar = input(false, { transform: booleanAttribute });

    /** The element to which the overlay is attached. By default it is body */
    readonly appendTo = input<ElementRef | Element | null>(null);

    /** Placement of the popover element */
    readonly placementContainer = input<ElementRef | Element | null>(null);

    /** Scroll strategy for the overlay */
    readonly scrollStrategy = input<any>(null);

    /** List of position options for CDK overlay */
    readonly cdkPositions = input<ConnectedPosition[] | null>(null);

    /** Whether to apply a background overlay */
    readonly applyOverlay = input(false, { transform: booleanAttribute });

    /** Additional CSS class for the popover body container */
    readonly additionalBodyClass = input<string | null>(null);

    /** Additional CSS class for the popover trigger element */
    readonly additionalTriggerClass = input<string | null>(null);

    /** Whether to close the popover on router navigation start */
    readonly closeOnNavigation = input(true, { transform: booleanAttribute });

    /** Whether position shouldn't change when popover approaches the corner of page */
    readonly fixedPosition = input(false, { transform: booleanAttribute });

    /** Whether the popover body is resizable */
    readonly resizable = input(false, { transform: booleanAttribute });

    /** Two-way binding for popover open state */
    readonly isOpen = model(false);

    /** Event emitted when the state of the isOpen property changes. */
    readonly isOpenChange = output<boolean>();

    /** Event emitted right before the popover is being opened. */
    readonly beforeOpen = output<void>();

    /** @hidden */
    readonly templateRef = viewChild('templateRef', { read: TemplateRef<any> });

    /** @hidden */
    readonly container = viewChild('container', { read: ViewContainerRef });

    /** @hidden */
    readonly triggerOrigin = viewChild(CdkOverlayOrigin);

    /** @hidden */
    readonly popoverBody = contentChild(PopoverBodyComponent);

    /** @hidden */
    readonly popoverBodyDirective = contentChild(PopoverBodyDirective);

    /** @hidden */
    readonly popoverControl = contentChild(PopoverControlComponent);

    /** @hidden - template for Dialog body content */
    readonly popoverBodyContentTemplate = contentChild<TemplateRef<any>>('popoverBodyContent');

    /** @hidden - template for Dialog footer content */
    readonly popoverFooterContentTemplate = contentChild<TemplateRef<any>>('popoverFooterContent');

    /** @hidden */
    get _triggerElement(): HTMLElement | null {
        const trigger = this.trigger();
        if (!trigger) {
            return null;
        }
        return trigger instanceof ElementRef ? trigger.nativeElement : trigger;
    }

    /** @hidden */
    private readonly _popoverService = inject(PopoverService);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _dynamicComponentService = inject(DynamicComponentService, { optional: true });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _clickEventListener: (() => void) | null = null;

    /** @hidden */
    private _mobileModeComponentRef: ComponentRef<PopoverMobileComponent> | null = null;

    /** @hidden Flag to prevent circular sync between component and service */
    private _syncingIsOpen = false;

    /** @hidden Computed signal that merges config with individual inputs */
    private readonly _effectiveConfig = computed(() => {
        const cfg = this.config();
        return {
            placement: this.placement() ?? cfg.placement ?? 'bottom-start',
            maxWidth: this.maxWidth() ?? cfg.maxWidth ?? null,
            fillControlMode: this.fillControlMode() ?? cfg.fillControlMode ?? null,
            closeOnOutsideClick: this.closeOnOutsideClick() ?? cfg.closeOnOutsideClick ?? true,
            closeOnEscapeKey: this.closeOnEscapeKey() ?? cfg.closeOnEscapeKey ?? true,
            disabled: this.disabled() ?? cfg.disabled ?? false,
            triggers: this.triggers() ?? cfg.triggers ?? ['click'],
            focusTrapped: this.focusTrapped() ?? cfg.focusTrapped ?? true,
            focusAutoCapture: this.focusAutoCapture() ?? cfg.focusAutoCapture ?? true,
            restoreFocusOnClose: this.restoreFocusOnClose() ?? cfg.restoreFocusOnClose ?? true,
            noArrow: this.noArrow() ?? cfg.noArrow ?? true,
            disableScrollbar: this.disableScrollbar() ?? cfg.disableScrollbar ?? false,
            appendTo: this.appendTo() ?? cfg.appendTo ?? null,
            placementContainer: this.placementContainer() ?? cfg.placementContainer ?? null,
            scrollStrategy: this.scrollStrategy() ?? cfg.scrollStrategy ?? null,
            cdkPositions: this.cdkPositions() ?? cfg.cdkPositions ?? null,
            applyOverlay: this.applyOverlay() ?? cfg.applyOverlay ?? false,
            additionalBodyClass: this.additionalBodyClass() ?? cfg.additionalBodyClass ?? null,
            additionalTriggerClass: this.additionalTriggerClass() ?? cfg.additionalTriggerClass ?? null,
            closeOnNavigation: this.closeOnNavigation() ?? cfg.closeOnNavigation ?? true,
            fixedPosition: this.fixedPosition() ?? cfg.fixedPosition ?? false,
            resizable: this.resizable() ?? cfg.resizable ?? false
        };
    });

    /** @hidden */
    constructor() {
        // Sync component → service and emit events
        let previousIsOpen = false;
        effect(() => {
            const currentIsOpen = this.isOpen();

            // Emit beforeOpen when transitioning from closed to open
            if (currentIsOpen && !previousIsOpen) {
                this.beforeOpen.emit();
            }

            // Emit isOpenChange when state changes
            if (currentIsOpen !== previousIsOpen) {
                this.isOpenChange.emit(currentIsOpen);
            }

            // Sync to service only if not already syncing (prevents loop)
            if (!this._syncingIsOpen) {
                this._syncingIsOpen = true;
                this._popoverService.isOpen.set(currentIsOpen);
                this._syncingIsOpen = false;
            }
            previousIsOpen = currentIsOpen;
        });

        // Subscribe to service changes for bidirectional sync using afterNextRender
        // to ensure service is fully initialized
        afterNextRender(
            () => {
                // Service will emit when it closes/opens programmatically (escape key, close button, etc.)
                this._popoverService.isOpenChange
                    .pipe(takeUntilDestroyed(this._destroyRef))
                    .subscribe((serviceIsOpen) => {
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

        // Watch effective config changes and sync to service
        // Using computed signal eliminates the need to read all signals individually
        effect(() => {
            const effectiveConfig = this._effectiveConfig();
            const triggerValue = this.trigger();

            // Always sync disabled state to service (for both trigger directive and control usage)
            this._popoverService.disabled.set(effectiveConfig.disabled);

            // Full sync only when trigger is set (for fdPopoverTrigger directive)
            if (triggerValue) {
                this._syncToService(effectiveConfig, triggerValue);
            }
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setupView();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        const control = this.popoverControl();
        if (control && this.triggers().includes('click')) {
            control._tabbable = true;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyMobileComponent();
        this._destroyEventListeners();
    }

    /** Toggles menu open/close state */
    toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    /** Opens the popover. */
    open(): void {
        this._popoverService.open();
    }

    /** Closes the popover. */
    close(focusActiveElement = true): void {
        this._popoverService.close(focusActiveElement);
    }

    /** Temporary sets the ignoring of the event triggers. */
    setIgnoreTriggers(ignore: boolean): void {
        this._popoverService.setIgnoreTriggers(ignore);
    }

    /**
     * Method called to change position of popover,
     * recommended to be used only when popover is opened, otherwise change position or cdkPlacement
     */
    applyNewPosition(positions: ConnectedPosition[]): void {
        this._popoverService.applyNewPosition(positions);
    }

    /** Method called to refresh position of opened popover */
    refreshPosition(): void {
        this._popoverService.refreshPosition();
    }

    /** Handler for alt + arrow down keydown */
    triggerKeyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && event.altKey && !this.disabled()) {
            this.open();
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /** Handler escape keydown */
    protected _onEscapeKey(event: Event): void {
        if (this.closeOnEscapeKey() && this.isOpen()) {
            // In case if popover belongs to the element inside dialog
            event.preventDefault();
            event.stopImmediatePropagation();
            this.popoverBody()?.onClose.emit();
        }
    }

    /** @hidden */
    protected _onKeyDown(event: Event): void {
        if (!this.preventSpaceKeyScroll()) {
            return;
        }
        const activeElement = document.activeElement;
        if (
            // popoverControl will be undefined when popover is used from "fdPopoverTrigger"
            this.popoverControl()?.elRef.nativeElement.children[0] === activeElement &&
            activeElement?.tagName !== 'INPUT' &&
            activeElement?.tagName !== 'TEXTAREA' &&
            !activeElement?.classList.contains(SELECT_CLASS_NAMES.selectControl)
        ) {
            // prevent page scrolling on Space keydown
            event.preventDefault();
            this._popoverService.toggle();
        }
    }

    /** @hidden - Sync all input signals to the service */
    private _syncToService(
        effectiveConfig: ReturnType<typeof this._effectiveConfig>,
        triggerValue: ElementRef | HTMLElement
    ): void {
        this._popoverService.placement.set(effectiveConfig.placement);
        this._popoverService.maxWidth.set(effectiveConfig.maxWidth);
        this._popoverService.fillControlMode.set(effectiveConfig.fillControlMode);
        this._popoverService.closeOnOutsideClick.set(effectiveConfig.closeOnOutsideClick);
        this._popoverService.closeOnEscapeKey.set(effectiveConfig.closeOnEscapeKey);
        this._popoverService.disabled.set(effectiveConfig.disabled);
        this._popoverService.triggers.set(effectiveConfig.triggers);
        this._popoverService.focusTrapped.set(effectiveConfig.focusTrapped);
        this._popoverService.focusAutoCapture.set(effectiveConfig.focusAutoCapture);
        this._popoverService.restoreFocusOnClose.set(effectiveConfig.restoreFocusOnClose);
        this._popoverService.noArrow.set(effectiveConfig.noArrow);
        this._popoverService.disableScrollbar.set(effectiveConfig.disableScrollbar);
        this._popoverService.appendTo.set(effectiveConfig.appendTo);
        this._popoverService.placementContainer.set(effectiveConfig.placementContainer);
        this._popoverService.scrollStrategy.set(effectiveConfig.scrollStrategy);
        this._popoverService.cdkPositions.set(effectiveConfig.cdkPositions);
        this._popoverService.applyOverlay.set(effectiveConfig.applyOverlay);
        this._popoverService.additionalBodyClass.set(effectiveConfig.additionalBodyClass);
        this._popoverService.additionalTriggerClass.set(effectiveConfig.additionalTriggerClass);
        this._popoverService.closeOnNavigation.set(effectiveConfig.closeOnNavigation);
        this._popoverService.fixedPosition.set(effectiveConfig.fixedPosition);
        this._popoverService.resizable.set(effectiveConfig.resizable);
        this._popoverService.isOpen.set(this.isOpen());
        this._popoverService.updateTriggerElement(triggerValue);
    }

    /** @hidden Select and instantiate popover view mode */
    private _setupView(): void {
        if (!this.mobile()) {
            this._popoverService._mobile = false;
            if (!this.popoverBody()) {
                this._popoverService.templateContent = this.templateRef() || null;
            }
            const triggerOriginRef = this.triggerOrigin();
            const triggerElement = this._triggerElement || (triggerOriginRef ? triggerOriginRef.elementRef : null);
            if (triggerElement) {
                this._popoverService.initialise(
                    triggerElement,
                    this._effectiveConfig() as PopoverConfig,
                    this._getPopoverBodyContent()
                );
            }
        } else {
            this._setupMobileMode();
        }
    }

    /**
     * Depending on a used popover body type, returns a popover body content
     **/
    private _getPopoverBodyContent(): PopoverTemplate | TemplateRef<void> | null {
        const body = this.popoverBody();
        const templateRef = this.templateRef();
        const container = this.container();

        if (body && templateRef && container) {
            return {
                template: templateRef,
                container,
                popoverBody: body
            };
        }
        const bodyDirective = this.popoverBodyDirective();
        if (bodyDirective) {
            return bodyDirective.templateRef;
        }
        return null;
    }

    /** @hidden Open Popover in mobile mode */
    private async _setupMobileMode(): Promise<void> {
        if (!this._dynamicComponentService) {
            return;
        }

        const injector = Injector.create({
            providers: [{ provide: POPOVER_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._popoverService._mobile = true;

        this._mobileModeComponentRef = this._dynamicComponentService.createDynamicComponent(
            {
                popoverBodyContentTemplate: this.popoverBodyContentTemplate(),
                popoverFooterContentTemplate: this.popoverFooterContentTemplate()
            },
            PopoverMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );

        this._listenOnTriggerRefClicks();
    }

    /** @hidden - Listen on popover trigger ref clicks */
    private _listenOnTriggerRefClicks(): void {
        this._destroyEventListeners();

        const triggerElement = this.trigger();
        if (triggerElement && this.mobile()) {
            this._clickEventListener = this._renderer.listen(this._triggerElement, 'click', () => {
                if (!this.disabled()) {
                    this.toggle();
                }
            });
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
}
