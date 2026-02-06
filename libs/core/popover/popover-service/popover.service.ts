import {
    ConnectedOverlayPositionChange,
    ConnectedPosition,
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef,
    ViewportRuler
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
    DestroyRef,
    ElementRef,
    Injectable,
    Injector,
    Renderer2,
    TemplateRef,
    ViewContainerRef,
    inject
} from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs/operators';

import { Nullable, RtlService, destroyObservable, isOdd } from '@fundamental-ngx/cdk/utils';
import { GetDefaultPosition, PopoverPosition } from '@fundamental-ngx/core/shared';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BasePopoverClass, TriggerConfig } from '../base/base-popover.class';
import { PopoverBodyComponent } from '../popover-body/popover-body.component';
import { PopoverContainerDirective } from '../popover-container/popover-container.directive';

const MAX_BODY_SIZE = 99999999;

export interface PopoverTemplate {
    container: ViewContainerRef;
    popoverBody: PopoverBodyComponent;
    template: TemplateRef<any>;
}

@Injectable()
export class PopoverService extends BasePopoverClass {
    /** String content displayed inside popover body */
    stringContent: Nullable<string>;

    /** Template content displayed inside popover body */
    templateContent: Nullable<TemplateRef<any>>;

    /** @hidden */
    _onLoad = new Subject<ElementRef>();

    /** @hidden */
    _mobile = false;

    /** @hidden */
    private _eventRef: (() => void)[] = [];

    /** @hidden */
    private _overlayRef: OverlayRef;

    /** @hidden */
    private _refresh$: Observable<boolean | void>;

    /** @hidden */
    private _stopCloseListening$ = new Subject<void>();

    /** @hidden */
    private readonly _placementRefresh$ = new Subject<void>();

    /** @hidden */
    private _popoverBody: PopoverBodyComponent;

    /** @hidden */
    private _triggerElement: ElementRef<HTMLElement> | HTMLElement;

    /** @hidden */
    private _lastActiveElement: HTMLElement;

    /** @hidden */
    private _templateData: Nullable<PopoverTemplate>;

    /** @hidden */
    private _placementContainer: BasePopoverClass['placementContainer'];

    /** @hidden */
    private _ignoreTriggers = false;

    /** @hidden */
    private _modalBodyClass = 'fd-overlay-active';

    /** @hidden */
    private _modalTriggerClass = 'fd-popover__modal';

    /** @hidden */
    private _isModal = false;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _popoverContainer = inject(PopoverContainerDirective, { optional: true });

    /** @hidden */
    private get _triggerHtmlElement(): HTMLElement {
        return this._triggerElement instanceof ElementRef ? this._triggerElement.nativeElement : this._triggerElement;
    }

    /** @hidden */
    constructor(
        private _overlay: Overlay,
        private _renderer: Renderer2,
        private _viewportRuler: ViewportRuler,
        private _injector: Injector
    ) {
        super();

        /** Merge observables - close or destroy */
        this._refresh$ = merge(this.isOpenChange, destroyObservable(this._destroyRef));

        this._destroyRef.onDestroy(() => {
            this._removeTriggerListeners();
            if (this._overlayRef) {
                this._overlayRef.detach();
                this._overlayRef.dispose();
            }

            if (this._isModal) {
                this._removeOverlay(this._modalBodyClass, this._modalTriggerClass);
            }
        });
    }

    /**
     * Method initialising the popover service - should be called, after view is initialised, params:
     * - triggerElement - element, which is equivalent for cdkOverlayOrigin, or fd-popover-control,
     *   by default to this element the popover body will lbe appended and events on this element will trigger
     *   popover's  toggle
     * - config - configuration object - in this case the intention is to use inheritance of BasePopoverClass in component
     * - templateData - in case of having already PopoverBodyComponent, there is way to pass container, template containing
     *   PopoverComponent and PopoverComponent instance
     */
    initialise(
        triggerElement: ElementRef | HTMLElement,
        config?: BasePopoverClass,
        templateData?: PopoverTemplate | TemplateRef<void> | null
    ): void {
        if (templateData instanceof TemplateRef) {
            this.templateContent = templateData;
        } else {
            this._templateData = templateData;
        }
        this._triggerElement = triggerElement;

        if (config) {
            this.refreshConfiguration(config);
        }

        this._refreshTriggerListeners();

        if (this.isOpen) {
            this.open();
        }

        // If wrapper container height changes outside, refresh popover position.
        this._popoverContainer?.refreshPosition$.pipe(takeUntil(this._refresh$)).subscribe(() => {
            this.refreshPosition();
        });
    }

    /** Closes the popover. */
    close(focusActiveElement = true): void {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }

        const prevState = this.isOpen;
        this.isOpen = false;
        if (prevState !== this.isOpen) {
            this.isOpenChange.emit(this.isOpen);
        }

        this.checkModalBackground();
        this._focusLastActiveElementBeforeOpen(focusActiveElement);
    }

    /** Opens the popover. */
    open(): void {
        if ((!this._overlayRef || !this._overlayRef.hasAttached()) && !this.disabled && this._triggerElement) {
            this.beforeOpen.emit();
            const position = this._getPositionStrategy();
            this._overlayRef = this._overlay.create(this._getOverlayConfig(position));

            if (this._placementContainer) {
                const placementElement =
                    this._placementContainer instanceof ElementRef
                        ? this._placementContainer.nativeElement
                        : this._placementContainer;

                placementElement.append(this._overlayRef.hostElement);
            }

            if (this._templateData) {
                this._attachTemplate();
            } else {
                this._attachBodyComponent();
            }

            this._stopCloseListening$.next();
            this._listenForPositionChange(position.positionChanges);

            if (this.fillControlMode) {
                this._listenOnResize();
            }

            const prevState = this.isOpen;
            this.isOpen = true;
            if (prevState !== this.isOpen) {
                this.isOpenChange.emit(this.isOpen);
            }

            this._detectChanges();

            this._listenOnClose();
            this._focusFirstTabbableElement();
            this._onLoad.next(this._getPopoverBody()._elementRef);
            this._overlayRef.updatePosition();
        }
    }

    /** method updating template or text inside rendered PopoverBody */
    updateContent(
        stringContent: Nullable<string> | Nullable<TemplateRef<any>>,
        templateContent: Nullable<TemplateRef<any>>
    ): void {
        templateContent = !templateContent
            ? typeof stringContent === 'string'
                ? null
                : stringContent
            : templateContent;
        stringContent = typeof stringContent === 'string' ? stringContent : null;
        this.stringContent = stringContent;
        this.templateContent = templateContent;
        if (this._getPopoverBody()) {
            this._passVariablesToBody();
        }
    }

    /** Changes background theming when modal */
    /** @hidden */
    checkModalBackground(): void {
        const isClosingConditions = (!this.closeOnOutsideClick || !this.closeOnEscapeKey) && this.applyOverlay;
        if (isClosingConditions && this.isOpen) {
            this._addModalOverlay(this._modalBodyClass, this._modalTriggerClass);
        } else if (isClosingConditions && !this.isOpen) {
            this._removeOverlay(this._modalBodyClass, this._modalTriggerClass);
        }
    }

    /** Toggles the popover open state */
    toggle(openAction = true, closeAction = true): void {
        if (this.isOpen) {
            closeAction && this.close();
        } else {
            openAction && this.open();
            this.checkModalBackground();
        }
    }

    /**
     * Method called to change position of popover,
     * recommended to be used only when popover is opened, otherwise change position or cdkPlacement
     */
    applyNewPosition(positions: ConnectedPosition[]): void {
        const refPosition = this._getPositionStrategy(positions);
        this._listenForPositionChange(refPosition.positionChanges);
        this._overlayRef.updatePositionStrategy(refPosition);
    }

    /** Method called to refresh position of opened popover */
    refreshPosition(): void {
        this._overlayRef?.updatePosition();
    }

    /** Temporary sets the ignoring of the event triggers. */
    setIgnoreTriggers(ignore: boolean): void {
        this._ignoreTriggers = ignore;
    }

    /**
     * Method that sets configuration/options, it detects if there is something changed and overwrites them
     */
    refreshConfiguration(config: BasePopoverClass): void {
        this._placementContainer = config.placementContainer;
        const onlyChanged = Object.keys(new BasePopoverClass()).filter((key) => this[key] !== config[key]);

        if (onlyChanged.includes('isOpen')) {
            if (config.isOpen) {
                this.open();
            } else {
                this.close();
            }
        }

        if (onlyChanged.includes('placementContainer')) {
            this._placementContainer = config.placementContainer;
        }

        /** TODO
         * This overriding is dangerous thing and leads to unexpected behavior
         * We have to avoid this.
         */
        onlyChanged.forEach((key) => (this[key] = config[key]));

        if (onlyChanged.includes('triggers')) {
            this._refreshTriggerListeners();
        }
    }

    /**
     * This method is intended to be called in order
     * to postpone the main functionality but be able
     * to enable it back in the future by initialise()
     */
    deactivate(): void {
        this._removeTriggerListeners();
    }

    /** Refresh listeners on trigger element events */
    _refreshTriggerListeners(): void {
        if (!this._triggerElement) {
            return;
        }

        this._removeTriggerListeners();

        if (this.triggers?.length) {
            this._normalizeTriggers().forEach((trigger) => {
                this._eventRef.push(
                    this._renderer.listen(this._triggerHtmlElement, trigger.trigger, (event: Event) => {
                        if (this._ignoreTriggers) {
                            return;
                        }
                        const closeAction = !!trigger.closeAction;
                        const openAction = !!trigger.openAction;
                        this.toggle(openAction, closeAction);

                        if (trigger.stopPropagation) {
                            event.stopImmediatePropagation();
                        }
                    })
                );
            });
        }
    }

    /**
     * Updates trigger element and refreshes the listeners.
     * @param trigger Trigger element ref.
     */
    updateTriggerElement(trigger: ElementRef | HTMLElement): void {
        this._triggerElement = trigger;
        this._refreshTriggerListeners();
    }

    /** @hidden */
    private _normalizeTriggers(): TriggerConfig[] {
        return this.triggers.map((trigger, index) => {
            if (typeof trigger === 'object' && trigger.trigger) {
                return trigger;
            }

            const oddNumber = isOdd(index + 1);

            return {
                trigger,
                openAction: this.triggers.length === 1 || oddNumber,
                closeAction: this.triggers.length === 1 || !oddNumber,
                stopPropagation: false
            } as TriggerConfig;
        });
    }

    /** @hidden */
    private _getOverlayConfig(position: FlexibleConnectedPositionStrategy): OverlayConfig {
        const direction = this._getDirection();

        return new OverlayConfig({
            direction,
            disposeOnNavigation: this.closeOnNavigation,
            positionStrategy: position,
            scrollStrategy: this.scrollStrategy || this._overlay.scrollStrategies.reposition()
        });
    }

    /** @hidden */
    private _listenOnResize(): void {
        this._viewportRuler
            .change(15)
            .pipe(takeUntil(this._refresh$), startWith(1))
            .subscribe(() => this._applyWidthOverlay());
    }

    /** @hidden */
    private _getDirection(): 'rtl' | 'ltr' {
        return this._rtlService?.rtl() ? 'rtl' : 'ltr';
    }

    /** @hidden */
    private _getPositionStrategy(forcedPositions?: ConnectedPosition[]): FlexibleConnectedPositionStrategy {
        let resultPosition = forcedPositions ? forcedPositions : this._getPositions();

        if (!this.fixedPosition) {
            resultPosition = resultPosition.concat(GetDefaultPosition(resultPosition));
        }

        return this._overlay
            .position()
            .flexibleConnectedTo(this.appendTo || this._triggerElement)
            .withPositions(resultPosition)
            .withPush(false)
            .withGrowAfterOpen(true);
    }

    /** remove listeners from trigger element events */
    private _removeTriggerListeners(): void {
        this._eventRef.forEach((event) => event());
        this._eventRef = [];
    }

    private _addModalOverlay(bodyClass: string, triggerClass: string): void {
        this._renderer.addClass(document.body, bodyClass);
        this._renderer.addClass((this._triggerElement as ElementRef).nativeElement, triggerClass);
        this._isModal = true;
    }

    private _removeOverlay(bodyClass: string, triggerClass: string): void {
        this._renderer.removeClass(document.body, bodyClass);
        this._renderer.removeClass((this._triggerElement as ElementRef).nativeElement, triggerClass);
        this._isModal = false;
    }

    /** Attach template containing popover body to overlay */
    private _attachTemplate(): void {
        this._passVariablesToBody();
        if (this._templateData) {
            this._overlayRef.attach(new TemplatePortal(this._templateData.template, this._templateData.container));
        }
    }

    /** Create PopoverBodyComponent and attach it into overlay */
    private _attachBodyComponent(): void {
        const overlay = this._overlayRef.attach(new ComponentPortal(PopoverBodyComponent, null, this._injector));
        this._popoverBody = overlay.instance;
        this._passVariablesToBody();
    }

    /** @hidden */
    private _listenForPositionChange(positionChange: Observable<ConnectedOverlayPositionChange>): void {
        this._placementRefresh$.next();
        positionChange
            .pipe(
                filter(() => !this.noArrow && !!this._getPopoverBody()),
                distinctUntilChanged((previous, current) => previous.connectionPair === current.connectionPair),
                takeUntil(this._placementRefresh$),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((event) => this._getPopoverBody()._setArrowStyles(event.connectionPair, this._getDirection()));
    }

    /** Subscribe to close events from CDK Overlay, to throw proper events, change values */
    private _listenOnClose(): void {
        const closeEvents$ = merge(
            this._overlayRef.detachments(),
            this._getPopoverBody().onClose,
            this._outsideClicks$()
        );
        const finalizer$ = merge(this._stopCloseListening$, this._refresh$);
        closeEvents$.pipe(takeUntil(finalizer$)).subscribe(() => this.close());
    }

    /** Listener for click events */
    private _outsideClicks$(): Observable<MouseEvent> {
        return merge(this._overlayRef.backdropClick(), this._overlayRef._outsidePointerEvents).pipe(
            filter((event) => this._shouldClose(event))
        );
    }

    /** @hidden */
    private _shouldClose(event: MouseEvent): boolean {
        return (
            this.isOpen &&
            this.closeOnOutsideClick &&
            !this._triggerContainsTarget(event) &&
            !this._targetIsPopoverMobileDialog(event)
        );
    }

    /** @hidden */
    private _targetIsPopoverMobileDialog(event: MouseEvent): boolean {
        if (this._mobile) {
            let el = (event.target as HTMLElement).parentElement;
            while (el) {
                if (el.hasAttribute('data-mobile-popover')) {
                    return true;
                } else {
                    el = el.parentElement;
                }
            }
        }

        return false;
    }

    /** @hidden */
    private _getEventTarget(event: Event): EventTarget | null {
        return event.composedPath ? event.composedPath()[0] : event.target;
    }

    /** @hidden */
    private _triggerContainsTarget(event: Event): boolean {
        return this._triggerHtmlElement.contains(this._getEventTarget(event) as HTMLElement);
    }

    /** @hidden */
    private _getPositions(): ConnectedPosition[] {
        if (this.cdkPositions) {
            return this.cdkPositions;
        }

        if (this.placement) {
            return [PopoverPosition.getCdkPlacement(this.placement, this._getDirection())];
        }

        return [];
    }

    /** @hidden */
    private _applyWidthOverlay(): void {
        const maxWidthLimit = this.maxWidth ? this.maxWidth : MAX_BODY_SIZE;
        const width = Math.min(this._getTriggerWidth(), maxWidthLimit);
        if (this.fillControlMode === 'at-least') {
            this._getPopoverBody()._popoverBodyMinWidth = width;
        } else if (this.fillControlMode === 'equal') {
            this._getPopoverBody()._popoverBodyWidth = width;
        }
        this._detectChanges();
    }

    /** @hidden */
    private _passVariablesToBody(): void {
        const body = this._getPopoverBody();
        body.text = this.stringContent;
        body._additionalBodyClass = this.additionalBodyClass;
        body._focusTrapped = this.focusTrapped;
        body._maxWidth = this.maxWidth;
        body._noArrow = this.noArrow;
        body._focusAutoCapture = this.focusAutoCapture;
        body._disableScrollbar = this.disableScrollbar;
        body._templateToDisplay = this.templateContent!;
        body._closeOnEscapeKey = this.closeOnEscapeKey;
        body._bodyRole = this._bodyRole;
        body._bodyId = this._bodyId;
        body._resizable = this.resizable;
        body._setBodyComponentClasses(this.additionalBodyComponentClasses);
        this._detectChanges();
    }

    /** @hidden */
    private _getTriggerWidth(): number {
        return this._triggerHtmlElement.offsetWidth;
    }

    /** @hidden */
    private _getPopoverBody(): PopoverBodyComponent {
        return this._templateData?.popoverBody || this._popoverBody;
    }

    /** @hidden */
    private _detectChanges(): void {
        if (this._getPopoverBody()) {
            this._getPopoverBody().detectChanges();
        }
    }

    /** @hidden */
    private _focusFirstTabbableElement(focusLastElement = true): void {
        if (focusLastElement && this.focusAutoCapture) {
            this._lastActiveElement = <HTMLElement>document.activeElement;
            this._getPopoverBody()?._focusFirstTabbableElement();
        }
    }

    /** @hidden */
    private _focusLastActiveElementBeforeOpen(focusLastElement = true): void {
        if (focusLastElement && this.restoreFocusOnClose && this.focusAutoCapture && this._lastActiveElement) {
            this._lastActiveElement.focus();
        }
    }
}
