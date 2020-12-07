import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ContentChild, ContentChildren,
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
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOWN_ARROW, ESCAPE } from '@angular/cdk/keycodes';


import { merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs/operators';

import { RtlService } from '../utils/services/rtl.service';
import { BasePopoverClass } from './base/base-popover.class';
import { ArrowPosition, DefaultPositions, Placement, PopoverFlippedDirection, PopoverPosition } from './popover-position/popover-position';
import { KeyUtil } from '../utils/functions/key-util';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverService } from './popover.service';

let cdkPopoverUniqueId = 0;

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
    styleUrls: ['./popover.component.scss'],
    providers: [PopoverService]
})
export class PopoverComponent extends BasePopoverClass
    implements AfterViewInit, OnDestroy, OnChanges {

    /** Reference to popover trigger element */
    @Input()
    trigger: ElementRef;

    /** Whether position shouldn't change, when popover approach the corner of page */
    @Input()
    fixedPosition = false;

    /** Id of the popover. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-popover-' + cdkPopoverUniqueId++;

    /** @hidden */
    @ViewChild('templateRef', { read: TemplateRef })
    templateRef: TemplateRef<any>;

    /** @hidden */
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    /** @hidden */
    @ViewChild(CdkOverlayOrigin)
    triggerOrigin: CdkOverlayOrigin;

    @ContentChild(PopoverBodyComponent)
    popoverBody: PopoverBodyComponent

    /** @hidden */
    directiveRef: any;

    /** @hidden */
    private _initialised = false;

    /** @hidden */
    private _overlayRef: OverlayRef;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _popoverService: PopoverService
    ) {
        super();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._popoverService.initialise(
            this._triggerElement,
            this,
            {
            template: this.templateRef,
            container: this.container,
            popoverBody: this.popoverBody,
        });
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
            this._popoverService.refreshListeners(changes['triggers'].currentValue)
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

    /** Closes the popover. */
    close(): void {
        this._popoverService.close();
    }

    /** Opens the popover. */
    open(): void {
        this._popoverService.open();
    }

    /**
     * Method called to change position of popover,
     * recommended to be used only when popover is opened, otherwise change position or cdkPlacement
     */
    applyNewPosition(positions: ConnectedPosition[]): void {
        this._popoverService.applyNewPosition(positions);
    }

    /** @deprecated
     * Left for backward compatibility
     */
    updatePopover(): void {
        this.refreshPosition();
    }

    /** Method called to refresh position of opened popover */
    refreshPosition(): void {
        this._popoverService.refreshPosition();
    }

    /** Handler for alt + arrow down keydown */
    triggerKeyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && event.altKey && !this.isOpen) {
            this.open();
        }
    }

    private get _triggerElement(): ElementRef<any> {
        return this.trigger || this.triggerOrigin.elementRef;
    }
}
