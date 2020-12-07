import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {
    CdkOverlayOrigin,
    ConnectedPosition,
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef,
    ViewportRuler
} from '@angular/cdk/overlay';
import { ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay/position/connected-position';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOWN_ARROW, ESCAPE } from '@angular/cdk/keycodes';


import { merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs/operators';

import { RtlService } from '../utils/services/rtl.service';
import { BasePopoverClass } from './base/base-popover.class';
import { ArrowPosition, DefaultPositions, Placement, PopoverFlippedDirection, PopoverPosition } from './popover-position/popover-position';
import { KeyUtil } from '../utils/functions/key-util';

let cdkPopoverUniqueId = 0;

const MAX_BODY_SIZE = 99999999;

/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 * PopoverComponent is an abstraction of PopoverDirective.
 */
@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html',
    host: {
        '[class.fd-popover-custom]': 'true',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent extends BasePopoverClass
    implements AfterViewInit, OnInit, OnDestroy, OnChanges {

    /** Reference to popover trigger element */
    @Input()
    trigger: ElementRef;

    /** Whether position shouldn't change, when popover approach the corner of page */
    @Input()
    fixedPosition = false;

    /** Whether the popover is disabled. */
    @Input()
    @HostBinding('class.fd-popover-custom--disabled')
    disabled = false;

    /** Id of the popover. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-popover-' + cdkPopoverUniqueId++;

    /** Maximum width of popover body in px, prevents from overextending body by `fillControlMode`  */
    @Input()
    maxWidth: number;

    /** @hidden */
    @ViewChild('templateRef', { read: TemplateRef })
    templateRef: TemplateRef<any>;

    /** @hidden */
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    /** @hidden */
    @ViewChild(CdkOverlayOrigin)
    triggerOrigin: CdkOverlayOrigin;

    /** Direction of arrow */
    _arrowDirection: ArrowPosition = null;

    /** Classes added to arrow element */
    _arrowClasses: string[] = [];

    /** Additional style to put margin into body component, to give a place for arrow */
    _marginStyle: string = null;

    /** @hidden Properties bind to popover's body */
    _popoverBodyWidth: number;
    _popoverBodyMinWidth: number;

    /** @hidden */
    directiveRef: any;

    /** @hidden */
    childContent: {
        basePopoverSettings: BasePopoverClass,
        triggerElement: ElementRef,
        stringContent: string,
        templateContent: TemplateRef<any>
    } = null;

    /** @hidden */
    private _initialised = false;

    /** @hidden */
    private _refresh$: Observable<void>;

    /** @hidden */
    private readonly _placementRefresh$ = new Subject<void>();

    /** @hidden */
    private _eventRef: Function[] = [];

    /** @hidden */
    private _overlayRef: OverlayRef;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _renderer: Renderer2,
        private _changeDetectorRef: ChangeDetectorRef,
        private _overlay: Overlay,
        private _viewportRuler: ViewportRuler,
        @Optional() private _rtlService: RtlService
    ) {
        super();

        /** Merge observables - close or destroy */
        this._refresh$ = merge(this.isOpenChange, this._onDestroy$);
    }

    /** @hidden */
    ngOnInit(): void {
        if (!this.scrollStrategy) {
            this.scrollStrategy = this._overlay.scrollStrategies.reposition();
        }


        if (this.childContent) {
            Object.keys(this.childContent.basePopoverSettings)
                .forEach(key => this[key] = this.childContent.basePopoverSettings[key]
            );
            this.trigger = this.childContent.triggerElement;
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initialised = true;
        this._refreshTriggerListeners();
        if (this.isOpen) {
            this.open();
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this._initialised) {
            return;
        }

        if (changes['isOpen']) {
            if (changes['isOpen'].currentValue) {
                this.open();
            } else {
                this.close();
            }
        }

        if (changes['triggers']) {
            this._refreshTriggerListeners();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        if (this._overlayRef) {
            this._overlayRef.detach();
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

    /** Closes the popover. */
    close(): void {
        if (this._overlayRef) {
            this._removeArrowStyles();
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
        if ((!this._overlayRef || !this._overlayRef.hasAttached()) && !this.disabled) {
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef.attach(new TemplatePortal(this.templateRef, this.container));

            this._changeDetectorRef.detectChanges();

            if (!this.isOpen) {
                this.isOpenChange.emit(true);
            }
            this.isOpen = true;

            if (this.fillControlMode) {
                this._listenOnResize();
            }

            this._listenOnClose();
            this._listenOnOutClicks();
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

    /** @deprecated
     * Left for backward compatibility
     */
    updatePopover(): void {
        this.refreshPosition();
    }

    /** Method called to refresh position of opened popover */
    refreshPosition(): void {
        if (this._overlayRef) {
            this._overlayRef.updatePosition();
        }
    }

    /** Handler for alt + arrow down keydown */
    triggerKeyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && event.altKey && !this.isOpen) {
            this.open();
        }
    }

    /** Handler escape keydown */
    bodyKeydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE) && this.isOpen && this.closeOnEscapeKey) {
            this.close();
        }
    }

    private get _triggerElement(): ElementRef<any> {
        return this.trigger || this.triggerOrigin.elementRef;
    }

    /** Subscribe to close events from CDK Overlay, to throw proper events, change values */
    private _listenOnClose(): void {
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

    /** remove listeners from trigger element events */
    private _removeTriggerListeners(): void {
        this._eventRef.forEach(event => event());
        this._eventRef = [];
    }

    /** @hidden */
    private _triggerContainsTarget(event: Event): boolean {
        const triggerElement = this._triggerElement.nativeElement;
        return triggerElement.contains(this._getEventTarget(event));
    }

    /** @hidden */
    private _getEventTarget(event: Event): EventTarget {
        return event.composedPath
            ? event.composedPath()[0]
            : event.target;
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
    private _getDirection(): 'rtl' | 'ltr' {
        if (!this._rtlService) {
            return 'ltr';
        }

        return this._rtlService.rtl.getValue() ? 'rtl' : 'ltr';
    }

    /** @hidden */
    private _getOverlayConfig(): OverlayConfig {
        const direction = this._getDirection();
        const position = this._getPositionStrategy();
        this._listenForPositionChange(position.positionChanges);

        return new OverlayConfig({
            direction: direction,
            positionStrategy: position,
            scrollStrategy: this.scrollStrategy
        });
    }

    /** @hidden */
    private _listenForPositionChange(positionChange: Observable<ConnectedOverlayPositionChange>): void {
        this._placementRefresh$.next();
        positionChange
            .pipe(
                takeUntil(this._placementRefresh$),
                filter(() => !this.noArrow),
                distinctUntilChanged(
                    (previous, current) =>
                        previous.connectionPair === current.connectionPair
                ))
            .subscribe(event => this._setArrowStyles(event.connectionPair))
        ;
    }

    /** @hidden */
    private _setArrowStyles(position: ConnectionPositionPair): void {

        this._arrowClasses = [];

        this._arrowDirection = PopoverPosition.getArrowPosition(position, this._getDirection() === 'rtl');
        this._arrowClasses.push(`fd-popover__arrow--${this._arrowDirection}`);

        if (this._arrowDirection === 'top' || this._arrowDirection === 'bottom') {
            let _position: string = position.overlayX;
            if (this._getDirection() === 'rtl') {
                _position = PopoverFlippedDirection[_position];
            }
            this._arrowClasses.push(`fd-popover__arrow-x--${_position}`)
        } else if (this._arrowDirection === 'start' || this._arrowDirection === 'end') {
            this._arrowClasses.push(`fd-popover__arrow-y--${position.overlayY}`)
        }

        this._marginStyle = PopoverPosition.getMarginStyle(this._arrowDirection);

        this._changeDetectorRef.detectChanges();
    }

    private _listenOnResize(): void {
        this._viewportRuler.change(15).pipe(
            takeUntil(this._refresh$),
            startWith(1)
        ).subscribe(() => this._applyWidthOverlay());
    }

    /** @hidden */
    private _applyWidthOverlay(): void {
        const maxWidthLimit = this.maxWidth ? this.maxWidth : MAX_BODY_SIZE;
        const width = Math.min(this._getTriggerWidth(), maxWidthLimit);
        if (this.fillControlMode === 'at-least') {
            this._popoverBodyMinWidth = width;
        } else if (this.fillControlMode === 'equal') {
            this._popoverBodyWidth = width;
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    private _getTriggerWidth(): number {
        return this._triggerElement.nativeElement.offsetWidth;
    }

    /** @hidden */
    private _removeArrowStyles(): void {
        this._arrowDirection = null;
        this._arrowClasses = [];
        this._marginStyle = null;
    }

    /** @hidden */
    private _getPositionStrategy(positions?: ConnectedPosition[]): FlexibleConnectedPositionStrategy {

        let resultPosition = positions ? positions : this._getPositions();

        if (!this.fixedPosition) {
            resultPosition = resultPosition.concat(DefaultPositions);
        }

        return this._overlay
            .position()
            .flexibleConnectedTo(this.appendTo || this._triggerElement)
            .withPositions(resultPosition)
            .withPush(false);
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
}
