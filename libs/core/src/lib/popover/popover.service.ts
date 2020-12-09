import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import {
    AfterViewInit,
    ChangeDetectorRef,
    ElementRef,
    Injectable,
    Injector,
    Optional,
    Renderer2,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { DefaultPositions, PopoverPosition } from './popover-position/popover-position';
import { BasePopoverClass } from './base/base-popover.class';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
    ConnectedPosition,
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef, ViewportRuler
} from '@angular/cdk/overlay';
import { RtlService } from '../utils/services/rtl.service';
import { merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs/operators';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay/position/connected-position';

const MAX_BODY_SIZE = 99999999;

export interface PopoverTemplate {
    container: ViewContainerRef;
    popoverBody: PopoverBodyComponent;
    template: TemplateRef<any>
}

@Injectable()
export class PopoverService extends BasePopoverClass {

    stringContent: string;

    templateContent: TemplateRef<any>;

    /** @hidden */
    private _eventRef: Function[] = [];

    /** @hidden */
    private _overlayRef: OverlayRef;

    /** @hidden */
    private _refresh$: Observable<void>;

    /** @hidden */
    private readonly _placementRefresh$ = new Subject<void>();

    private popoverBody: PopoverBodyComponent;

    private _triggerElement: ElementRef;

    private _templateData: PopoverTemplate;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
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

    /** TODO */
    initialise(triggerElement: ElementRef, config?: BasePopoverClass, templateData?: PopoverTemplate): void {
        this._templateData = templateData;
        this._triggerElement = triggerElement;
        if (config) {
            Object.keys(new BasePopoverClass()).forEach(key => this[key] = config[key]);
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
            this._changeDetectorRef.detectChanges();

            if (this.isOpen) {
                this.isOpenChange.emit(false);
            }
            this.isOpen = false;
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

    refreshListeners(triggers: string[]): void {
        this.triggers = triggers;
        this._refreshTriggerListeners();
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

    onDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        if (this._overlayRef) {
            this._overlayRef.detach();
        }
    }

    /** @hidden */
    private _getOverlayConfig(position: FlexibleConnectedPositionStrategy): OverlayConfig {
        const direction = this._getDirection();

        return new OverlayConfig({
            direction: direction,
            positionStrategy: position,
            scrollStrategy: this.scrollStrategy || this._overlay.scrollStrategies.reposition()
        });
    }

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
            resultPosition = resultPosition.concat(DefaultPositions);
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

    /** Refresh listeners on trigger element events */
    private _refreshTriggerListeners(): void {
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

    /** TODO */
    private _attachTemplate(): void {
        this._passVariablesToBody();
        this._overlayRef.attach(new TemplatePortal(this._templateData.template, this._templateData.container));
    }

    private _attachBodyComponent(): void {
        const overlay = this._overlayRef.attach(new ComponentPortal(PopoverBodyComponent, null, this._injector));
        this.popoverBody = overlay.instance;
        this._passVariablesToBody();
    }

    /** @hidden */
    private _listenForPositionChange(positionChange: Observable<ConnectedOverlayPositionChange>): void {
        this._placementRefresh$.next();
        positionChange
            .pipe(
                takeUntil(this._placementRefresh$),
                filter(() => !this.noArrow && !!this._popoverBody),
                distinctUntilChanged(
                    (previous, current) =>
                        previous.connectionPair === current.connectionPair
                ))
            .subscribe(event => this._popoverBody._setArrowStyles(event.connectionPair, this._getDirection()))
        ;
    }

    /** Subscribe to close events from CDK Overlay, to throw proper events, change values */
    private _listenOnClose(): void {
        const closeEvents$ = merge(this._overlayRef.detachments(), this._popoverBody.onClose);

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
            this._popoverBody._popoverBodyMinWidth = width;
        } else if (this.fillControlMode === 'equal') {
            this._popoverBody._popoverBodyWidth = width;
        }
        this._detectChanges();
    }

    /** @hidden */
    private _passVariablesToBody(): void {
        this._popoverBody.text = this.stringContent;
        this._popoverBody._additionalBodyClass = this.additionalBodyClass;
        this._popoverBody._focusTrapped = this.focusTrapped;
        this._popoverBody._maxWidth = this.maxWidth;
        this._popoverBody._noArrow = this.noArrow;
        this._popoverBody._focusAutoCapture = this.focusAutoCapture;
        this._popoverBody._templateToDisplay = this.templateContent;
        this._popoverBody._closeOnEscapeKey = this.closeOnEscapeKey;
        console.log(this.additionalBodyClass);
        this._detectChanges();
    }

    /** @hidden */
    private _getTriggerWidth(): number {
        return this._triggerElement.nativeElement.offsetWidth;
    }

    private _detectChanges(): void {
        if (this._popoverBody) {
            this._popoverBody.detectChanges();
        }
    }

    private get _popoverBody(): PopoverBodyComponent {
        return this._templateData?.popoverBody || this.popoverBody;
    }

}
