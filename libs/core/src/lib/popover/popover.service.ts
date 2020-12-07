import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import {
    AfterViewInit,
    ChangeDetectorRef,
    ElementRef,
    Injectable,
    Injector,
    Input, OnInit,
    Optional,
    Renderer2,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { PopoverComponent } from './popover.component';
import { DefaultPositions, Placement, PopoverPosition } from './popover-position/popover-position';
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
import { ScrollStrategy } from '@angular/cdk/overlay/scroll/scroll-strategy';
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

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _overlay: Overlay,
        private _renderer: Renderer2,
        private _viewportRuler: ViewportRuler,
        @Optional() private _rtlService: RtlService,
    ) {
        super();

        /** Merge observables - close or destroy */
        this._refresh$ = merge(this.isOpenChange, this._onDestroy$);
    }

    triggerElement: ElementRef;

    stringContent: string;
    templateContent: TemplateRef<any>;

    popoverBody: PopoverBodyComponent;

    templateData: PopoverTemplate

    private _initialised = false;

    /** Whether position shouldn't change, when popover approach the corner of page */
    @Input()
    fixedPosition = false;

    /** @hidden */
    private _eventRef: Function[] = [];

    /** @hidden */
    private _overlayRef: OverlayRef;

    /** @hidden */
    private _refresh$: Observable<void>;

    /** @hidden */
    private readonly _placementRefresh$ = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    initialise(triggerElement: ElementRef, config?: BasePopoverClass, templateData?: PopoverTemplate): void {
        this.templateData = templateData;
        this.triggerElement = triggerElement;
        if (config) {
            Object.keys(new BasePopoverClass()).forEach(key => this[key] = config[key])
        }

        if (!this.scrollStrategy) {
            this.scrollStrategy = this._overlay.scrollStrategies.reposition();
        }

        if (!this.scrollStrategy) {
            this.scrollStrategy = this._overlay.scrollStrategies.reposition();
        }

        this._initialised = true;
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
        if ((!this._overlayRef || !this._overlayRef.hasAttached()) || !this.disabled) {
            const position = this._getPositionStrategy();
            this._overlayRef = this._overlay.create(this._getOverlayConfig(position));

            if (!this.templateData) {
                const overlay = this._overlayRef.attach(new ComponentPortal(PopoverBodyComponent));
                this.popoverBody = overlay.instance;
            } else {
                this._overlayRef.attach(new TemplatePortal(this.templateData.template, this.templateData.container));
            }

            this._listenForPositionChange(position.positionChanges);

            this._passVariablesToBody();

            if (this.fillControlMode) {
                this._listenOnResize();
            }

            this._changeDetectorRef.detectChanges();

            if (!this.isOpen) {
                this.isOpenChange.emit(true);
            }

            this.isOpen = true;

            this._listenOnClose();
            this._listenOnOutClicks()
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

    /** @hidden */
    private _getOverlayConfig(position: FlexibleConnectedPositionStrategy): OverlayConfig {
        const direction = this._getDirection();

        return new OverlayConfig({
            direction: direction,
            positionStrategy: position,
            scrollStrategy: this.scrollStrategy
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
    private _getPositionStrategy(positions?: ConnectedPosition[]): FlexibleConnectedPositionStrategy {

        let resultPosition = positions ? positions : this._getPositions();

        if (!this.fixedPosition) {
            resultPosition = resultPosition.concat(DefaultPositions);
        }

        return this._overlay
            .position()
            .flexibleConnectedTo(this._triggerElement)
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
    private _listenForPositionChange(positionChange: Observable<ConnectedOverlayPositionChange>): void {
        this._placementRefresh$.next();
        positionChange
            .pipe(
                takeUntil(this._placementRefresh$),
                filter(() => !this.noArrow && !!this.popoverBody),
                distinctUntilChanged(
                    (previous, current) =>
                        previous.connectionPair === current.connectionPair
                ))
            .subscribe(event => this.popoverBody._setArrowStyles(event.connectionPair, this._getDirection()))
        ;
    }

    /** Subscribe to close events from CDK Overlay, to throw proper events, change values */
    private _listenOnClose(): void {
        console.log(this._overlayRef);
        this._overlayRef.detachments()
            .pipe(takeUntil(this._refresh$))
            .subscribe(() => this.close())
        ;
    }

    /** Listener for click events */
    private _listenOnOutClicks(): void {
        const closeEvents$ = merge( this._overlayRef.backdropClick(), this._overlayRef._outsidePointerEvents)

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

    private get _triggerElement(): ElementRef<any> {
        return this.triggerElement;
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
            this.popoverBody._popoverBodyMinWidth = width;
        } else if (this.fillControlMode === 'equal') {
            this.popoverBody._popoverBodyWidth = width;
        }
        this._changeDetectorRef.detectChanges();
    }

    private _passVariablesToBody(): void {
        this._popoverBody.text = this.stringContent;
        this._popoverBody._additionalBodyClass = this.additionalBodyClass;
        this._popoverBody._focusTrapped = this.focusTrapped;
        this._popoverBody._maxWidth = this.maxWidth;
        this._popoverBody._focusAutoCapture = this.focusAutoCapture;
        this._popoverBody._templateToDisplay = this.templateContent;
    }

    /** @hidden */
    private _getTriggerWidth(): number {
        return this._triggerElement.nativeElement.offsetWidth;
    }

    private get _popoverBody(): PopoverBodyComponent {
        return this.templateData?.popoverBody || this.popoverBody;
    }

}
