import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
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
} from '@angular/cdk/overlay';
import { RtlService } from '../../utils/services/rtl.service';
import { BasePopoverClass } from '../base/base-popover.class';
import { TemplatePortal } from '@angular/cdk/portal';
import { merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay/position/connected-position';
import { DefaultPositions, Placement, PopoverPosition } from './popover-position';

let popoverUniqueId = 0;

/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 * PopoverComponent is an abstraction of PopoverDirective.
 */
@Component({
    selector: 'fd-cdk-popover, fd-popover',
    templateUrl: './cdk-popover.component.html',
    host: {
        '[class.fd-popover-custom]': 'true',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./cdk-popover.component.scss']
})
export class CdkPopoverComponent extends BasePopoverClass
    implements AfterViewInit, OnInit, OnDestroy, OnChanges {

    /** @hidden */
    @ViewChild('templateRef', { read: TemplateRef })
    templateRef: TemplateRef<any>;

    /** @hidden */
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    /** @hidden */
    @ViewChild(CdkOverlayOrigin)
    triggerOrigin: CdkOverlayOrigin;

    /** Whether the popover is disabled. */
    @Input()
    @HostBinding('class.fd-popover-custom--disabled')
    disabled = false;

    /** */
    @Input()
    placement: Placement;

    /** Id of the popover. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-popover-' + popoverUniqueId++;

    /** TODO: */
    arrowPosition = '';
    marginStyle = '';

    private _initialised = false;

    private _eventRef: Function[] = [];

    private _overlayRef: OverlayRef;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _renderer: Renderer2,
        private _changeDetectorReference: ChangeDetectorRef,
        private _overlay: Overlay,
        @Optional() private _rtlService: RtlService
    ) {
        super();
    }

    /** @hidden */
    ngOnInit(): void {
        if (!this.scrollStrategy) {
            this.scrollStrategy = this._overlay.scrollStrategies.reposition();
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
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this.isOpen = false;
            this._overlayRef.dispose();
            this._changeDetectorReference.detectChanges();
            this.isOpenChange.emit(this.isOpen);
        }
    }

    /** Opens the popover. */
    open(): void {
        if (!this._overlayRef || !this._overlayRef.hasAttached()) {
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef.attach(new TemplatePortal(this.templateRef, this.container));

            this.isOpen = true;
            this._changeDetectorReference.detectChanges();

            this.isOpenChange.emit(this.isOpen);
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

    /** Method called to refresh position of opened popover */
    refreshPosition(): void {
        if (this._overlayRef) {
            this._overlayRef.updatePosition();
        }
    }

    /** Listener for click events */
    private _listenOnOutClicks(): void {
        /** Merge observables - close or destroy */
        const refreshObs = merge(this.isOpenChange, this._onDestroy$);

        this._overlayRef.backdropClick().pipe(
            filter(event => this._shouldClose(event)),
            takeUntil(refreshObs)
        ).subscribe(() => this.close());

        this._overlayRef._outsidePointerEvents.pipe(
            filter(() => this.closeOnOutsideClick),
            takeUntil(refreshObs)
        ).subscribe(() => this.close());
    }

    /** Refresh listeners on trigger element events */
    private _refreshTriggerListeners(): void {
        this._removeTriggerListeners();
        if (this.triggers && this.triggers.length > 0) {
            this.triggers.forEach(trigger => {
                this._eventRef.push(this._renderer.listen(this.triggerOrigin.elementRef.nativeElement, trigger, () => {
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
        const triggerElement = this.triggerOrigin.elementRef.nativeElement;
        return triggerElement.contains(event.composedPath()[0]);
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

        return new OverlayConfig({
            direction: direction,
            positionStrategy: position,
            scrollStrategy: this.scrollStrategy
        });
    }

    /** @hidden */
    private _listenForPositionChange(positionChange: Observable<ConnectedOverlayPositionChange>): void {
        positionChange
            .pipe(
                takeUntil(this._onDestroy$),
                filter(() => !this.noArrow),
                distinctUntilChanged(
                    (previous, current) =>
                        previous.connectionPair === current.connectionPair
                ))
            .subscribe(event => {
                this.arrowPosition = PopoverPosition.getArrowPosition(event.connectionPair);
                this.marginStyle = PopoverPosition.getMarginStyle(this.arrowPosition);
                this._changeDetectorReference.detectChanges();
            })
        ;
    }

    /** @hidden */
    private _getPositionStrategy(positions?: ConnectedPosition[]): FlexibleConnectedPositionStrategy {

        const _resPosition = positions ? positions : this._getPositions();

        return this._overlay
            .position()
            .flexibleConnectedTo(this.triggerOrigin.elementRef)
            .withPositions(_resPosition)
            .withPush(false);
    }

    /** @hidden */
    private _getPositions(): ConnectedPosition[] {
        if (this.cdkPositions) {
            return this.cdkPositions.concat(DefaultPositions);
        }

        if (this.placement) {
            return [PopoverPosition.getCdkPlacement(this.placement)].concat(DefaultPositions);
        }

        return DefaultPositions;
    }
}
