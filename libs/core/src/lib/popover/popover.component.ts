import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
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
} from '@angular/cdk/overlay';

import { BasePopoverClass } from './base/base-popover.class';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverService } from './popover-service/popover.service';
import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { POPOVER_COMPONENT } from './popover.interface';
import { PopoverMobileComponent } from './popover-mobile/popover-mobile.component';

let cdkPopoverUniqueId = 0;

/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 */
@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html',
    host: {
        '[class.fd-popover-custom]': 'true',
        '[class.fd-popover-custom--mobile]': 'mobile',
        '[attr.id]': 'id'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./popover.component.scss'],
    providers: [PopoverService]
})
export class PopoverComponent extends BasePopoverClass implements AfterViewInit, OnDestroy, OnChanges {

    /** Tooltip for popover */
    @Input()
    title: string;

    /** Reference to popover trigger element */
    @Input()
    trigger: ElementRef;

    /** Whether position shouldn't change, when popover approach the corner of page */
    @Input()
    fixedPosition = false;

    /** Id of the popover. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-popover-' + cdkPopoverUniqueId++;

    /** Whether the select component should be displayed in mobile mode. */
    @Input()
    mobile = false;

    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true };

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

    /** @deprecated
     * Left for backward compatibility
     */
    directiveRef: any;

    /** @hidden */
    private _clickEventListener: Function;

    constructor(
        private _elementRef: ElementRef,
        private _popoverService: PopoverService,
        private _cdr: ChangeDetectorRef,
        private _rendered: Renderer2,
        @Optional() private _dynamicComponentService: DynamicComponentService
    ) {
        super();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (!this.mobile) {
            if (!this.popoverBody) {
                this._popoverService.templateContent = this.templateRef;
            }
            this._popoverService.initialise(
                this.trigger || this.triggerOrigin.elementRef,
                this,
                this.popoverBody ? {
                template: this.templateRef,
                container: this.container,
                popoverBody: this.popoverBody,
            } : null);
        }

        this._setupView();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this._popoverService.refreshConfiguration(this);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._popoverService.onDestroy();
    }

    /** Toggles menu open/close state */
    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /** Opens the popover. */
    open(): void {
        this.isOpen = true;
        this._popoverService.open();
        this.isOpenChange.emit(this.isOpen);
        this._cdr.markForCheck();
    }

    /** Closes the popover. */
    close(): void {
        this.isOpen = false;
        this._popoverService.close();
        this.isOpenChange.emit(this.isOpen);
        this._cdr.markForCheck();
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

    private _setupView(): void {
        if (this.mobile) {
            this._setupMobileMode();
        }

        this._cdr.detectChanges();
    }

    private _setupMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            this.templateRef,
            PopoverMobileComponent,
            { container: this._elementRef.nativeElement },
            {
                injector: Injector.create({
                    providers: [{ provide: POPOVER_COMPONENT, useValue: this }]
                })
            }
        );

        this._listenOnTriggerRefClicks();
    }

    private _listenOnTriggerRefClicks(): void {
        this._destroyEventListeners();

        if (this.trigger && this.mobile) {
            this._clickEventListener = this._rendered.listen(
                this.trigger.nativeElement, 'click', () => this.toggle()
            );
        }
    }

    private _destroyEventListeners(): void {
        if (this._clickEventListener) {
            this._clickEventListener();
            this._clickEventListener = null;
        }
    }
}
