import {
    ElementRef,
    Injectable,
    Injector,
    Optional,
    Renderer2,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
    ConnectedPosition,
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef, ViewportRuler
} from '@angular/cdk/overlay';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay/position/connected-position';

import { merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs/operators';

import { GetDefaultPosition, PopoverPosition } from '../popover-position/popover-position';
import { BasePopoverClass } from '../base/base-popover.class';
import { RtlService } from '../../utils/services/rtl.service';
import { PopoverBodyComponent } from '../popover-body/popover-body.component';

const MAX_BODY_SIZE = 99999999;

export interface PopoverTemplate {
    container: ViewContainerRef;
    popoverBody: PopoverBodyComponent;
    template: TemplateRef<any>
}

@Injectable()
export class PopoverService extends BasePopoverClass {
    /** String content displayed inside popover body */
    stringContent: string;

    /** Template content displayed inside popover body */
    templateContent: TemplateRef<any>;

    /** @hidden */
    _onLoad = new Subject<ElementRef>();

    /** @hidden */
    private _eventRef: Function[] = [];

    /** @hidden */
    private _overlayRef: OverlayRef;

    /** @hidden */
    private _refresh$: Observable<boolean | void>;

    /** @hidden */
    private readonly _placementRefresh$ = new Subject<void>();

    /** @hidden */
    private _popoverBody: PopoverBodyComponent;

    /** @hidden */
    private _triggerElement: ElementRef;

    /** @hidden */
    private _lastActiveElement: HTMLElement;

    /** @hidden */
    private _templateData: PopoverTemplate;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _overlay: Overlay,
        private _renderer: Renderer2,
        private _viewportRuler: ViewportRuler,
        private _injector: Injector,
        @Optional() private _rtlService: RtlService
    ) {
        super();

        /** Merge observables - close or destroy */
        this._refresh$ = merge(this.isOpenChange, this._onDestroy$);
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
    initialise(triggerElement: ElementRef, config?: BasePopoverClass, templateData?: PopoverTemplate): void {
        this._templateData = templateData;
        this._triggerElement = triggerElement;
        if (config) {
            this.refreshConfiguration(config);
        }

        this._refreshTriggerListeners();
        if (this.isOpen) {
            this.open();
        }
    }

    /** Closes the popover. */
    close(): void {
        if (this._overlayRef) {
            this._overlayRef.dispose();

            if (this.isOpen) {
                this.isOpenChange.emit(false);
            }
            this.isOpen = false;
            this._focusLastActiveElementBeforeOpen();
        }
    }

    /** Opens the popover. */
    open(): void {
        if ((!this._overlayRef || !this._overlayRef.hasAttached()) && !this.disabled && this._triggerElement) {
            const position = this._getPositionStrategy();
            this._overlayRef = this._overlay.create(this._getOverlayConfig(position));

            if (this._templateData) {
                this._attachTemplate();
            } else {
                this._attachBodyComponent();
            }

            this._listenForPositionChange(position.positionChanges);

            if (this.fillControlMode) {
                this._listenOnResize();
            }

            if (!this.isOpen) {
                this.isOpenChange.emit(true);
            }

            this.isOpen = true;

            this._detectChanges();

            this._listenOnClose();
            this._listenOnOutClicks();
            this._focusFirstTabbableElement();
            this._onLoad.next(this._getPopoverBody()._elementRef);
        }
    }

    /** method updating template or text inside rendered PopoverBody */
    updateContent(stringContent: string, templateContent: TemplateRef<any>): void {
        this.stringContent = stringContent;
        this.templateContent = templateContent;
        if (this._getPopoverBody()) {
            this._passVariablesToBody();
        }
    }

    /** Toggles the popover open state */
    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
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
        if (this._overlayRef) {
            this._overlayRef.updatePosition();
        }
    }

    /** Equivalent for ngOnDestroy method, whether component is destroyed, this method should be called */
    onDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        if (this._overlayRef) {
            this._overlayRef.detach();
        }
    }

    /**
     * Method that sets configuration/options, it detects if there is something changed and overwrites them
     */
    refreshConfiguration(config: BasePopoverClass): void {
        const onlyChanged = Object.keys(new BasePopoverClass()).filter(key => this[key] !== config[key]);

        if (onlyChanged.some(key => key === 'isOpen')) {
            if (config['isOpen']) {
                this.open();
            } else {
                this.close();
            }
        }

        onlyChanged.forEach(key => this[key] = config[key]);

        if (onlyChanged.some(key => key === 'triggers')) {
            this._refreshTriggerListeners();
        }
    }

    /** Refresh listeners on trigger element events */
    _refreshTriggerListeners(): void {
        if (!this._triggerElement) {
            return;
        }

        this._removeTriggerListeners();
        if (this.triggers?.length) {
            this.triggers.forEach(trigger => {
                this._eventRef.push(this._renderer.listen(this._triggerElement.nativeElement, trigger, () => {
                    this.toggle();
                }));
            });
        }
    }

    /** @hidden */
    private _getOverlayConfig(position: FlexibleConnectedPositionStrategy): OverlayConfig {
        const direction = this._getDirection();

        return new OverlayConfig({
            direction: direction,
            disposeOnNavigation: this.closeOnNavigation,
            positionStrategy: position,
            scrollStrategy: this.scrollStrategy || this._overlay.scrollStrategies.reposition()
        });
    }

    /** @hidden */
    private _listenOnResize(): void {
        this._viewportRuler.change(15).pipe(
            takeUntil(this._refresh$),
            startWith(1)
        ).subscribe(() => this._applyWidthOverlay());
    }

    /** @hidden */
    private _getDirection(): 'rtl' | 'ltr' {
        if (!this._rtlService) {
            return 'ltr';
        }

        return this._rtlService.rtl.getValue() ? 'rtl' : 'ltr';
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
            .withPush(false);
    }

    /** remove listeners from trigger element events */
    private _removeTriggerListeners(): void {
        this._eventRef.forEach(event => event());
        this._eventRef = [];
    }

    /** Attach template containing popover body to overlay */
    private _attachTemplate(): void {
        this._passVariablesToBody();
        this._overlayRef.attach(new TemplatePortal(this._templateData.template, this._templateData.container));
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
                takeUntil(this._placementRefresh$),
                filter(() => !this.noArrow && !!this._getPopoverBody()),
                distinctUntilChanged(
                    (previous, current) =>
                        previous.connectionPair === current.connectionPair
                ))
            .subscribe(event => this._getPopoverBody()._setArrowStyles(event.connectionPair, this._getDirection()))
        ;
    }

    /** Subscribe to close events from CDK Overlay, to throw proper events, change values */
    private _listenOnClose(): void {
        const closeEvents$ = merge(this._overlayRef.detachments(), this._getPopoverBody().onClose);

        closeEvents$.pipe(takeUntil(this._refresh$))
            .subscribe(() => this.close())
        ;
    }

    /** Listener for click events */
    private _listenOnOutClicks(): void {
        const closeEvents$ = merge(this._overlayRef.backdropClick(), this._overlayRef._outsidePointerEvents);

        closeEvents$.pipe(
            filter(event => this._shouldClose(event)),
            takeUntil(this._refresh$)
        ).subscribe(() => this.close());
    }

    /** @hidden */
    private _shouldClose(event: MouseEvent): boolean {
        return (
            this.isOpen &&
            this.closeOnOutsideClick &&
            !this._triggerContainsTarget(event)
        );
    }

    /** @hidden */
    private _getEventTarget(event: Event): EventTarget {
        return event.composedPath
            ? event.composedPath()[0]
            : event.target;
    }

    /** @hidden */
    private _triggerContainsTarget(event: Event): boolean {
        const triggerElement = this._triggerElement.nativeElement;
        return triggerElement.contains(this._getEventTarget(event));
    }

    /** @hidden */
    private _getPositions(): ConnectedPosition[] {
        if (this.cdkPositions) {
            return this.cdkPositions;
        }

        if (this.placement) {
            return [PopoverPosition.getCdkPlacement(this.placement)];
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
        this._getPopoverBody().text = this.stringContent;
        this._getPopoverBody()._additionalBodyClass = this.additionalBodyClass;
        this._getPopoverBody()._focusTrapped = this.focusTrapped;
        this._getPopoverBody()._maxWidth = this.maxWidth;
        this._getPopoverBody()._noArrow = this.noArrow;
        this._getPopoverBody()._focusAutoCapture = this.focusAutoCapture;
        this._getPopoverBody()._templateToDisplay = this.templateContent;
        this._getPopoverBody()._closeOnEscapeKey = this.closeOnEscapeKey;
        this._detectChanges();
    }

    /** @hidden */
    private _getTriggerWidth(): number {
        return this._triggerElement.nativeElement.offsetWidth;
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
    private _focusFirstTabbableElement(): void {
        if (this.focusAutoCapture) {
            this._lastActiveElement = <HTMLElement>document.activeElement;
            this._getPopoverBody()?._focusFirstTabbableElement();
        }
    }

    /** @hidden */
    private _focusLastActiveElementBeforeOpen(): void {
        if (this.focusAutoCapture && this._lastActiveElement) {
            this._lastActiveElement.focus();
        }
    }

}
