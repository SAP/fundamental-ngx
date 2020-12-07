import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import {
    ChangeDetectorRef,
    ElementRef,
    Injectable,
    Injector,
    Input,
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
    OverlayRef,
} from '@angular/cdk/overlay';
import { RtlService } from '../utils/services/rtl.service';
import { merge, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ScrollStrategy } from '@angular/cdk/overlay/scroll/scroll-strategy';
import { InlineHelpComponent } from '../inline-help/inline-help.component';

@Injectable()
export class PopoverService extends BasePopoverClass {

    constructor(
        private _dynamicComponentService: DynamicComponentService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _overlay: Overlay,
        @Optional() private _rtlService: RtlService,
        private _renderer: Renderer2,
    ) {
        super();

        /** Merge observables - close or destroy */
        this._refresh$ = merge(this.isOpenChange, this._onDestroy$);
    }

    basePopoverSettings: BasePopoverClass;
    triggerElement: ElementRef;
    containerElement: ElementRef;
    stringContent: string;
    templateContent: TemplateRef<any>;
    scrollStrategy: ScrollStrategy;

    templateRef: TemplateRef<any>;

    container: ViewContainerRef;

    isOpen = false;

    closeOnOutsideClick = true;

    placement: Placement;

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


    /** Closes the popover. */
    close(): void {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._changeDetectorRef.detectChanges();
            this.isOpen = false;
        }
    }

    /** Opens the popover. */
    open(): void {
        if ((!this._overlayRef || !this._overlayRef.hasAttached())) {
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
            const component = new ComponentPortal(InlineHelpComponent);
            this._overlayRef.attach(component);
            console.log('opened');

            this._changeDetectorRef.detectChanges();
            this.isOpen = true;
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

    setUpListeners(triggers: string[]): void {
        this.triggers = triggers;
        this._refreshTriggerListeners();
    }


    // public setUpPopover(): void {
    //     this._dynamicComponentService.createDynamicComponent(
    //         {
    //             basePopoverSettings: this.basePopoverSettings,
    //             triggerElement: this.triggerElement,
    //             stringContent: this.stringContent,
    //             templateContent: this.templateContent
    //         },
    //         PopoverComponent,
    //         { container: this.containerElement.nativeElement }
    //     )
    // }

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
        // if (this.cdkPositions) {
        //     return this.cdkPositions;
        // }

        if (this.placement) {
            return [PopoverPosition.getCdkPlacement(this.placement)];
        }

        return [];
    }

}
