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
import { DOWN_ARROW } from '@angular/cdk/keycodes';

import { Subject } from 'rxjs';
import { BasePopoverClass } from './base/base-popover.class';
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

    constructor(
        private _popoverService: PopoverService
    ) {
        super();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (!this.popoverBody) {
            this._popoverService.templateContent = this.templateRef;
        }
        this._popoverService.initialise(
            this._triggerElement,
            this,
            this.popoverBody ? {
            template: this.templateRef,
            container: this.container,
            popoverBody: this.popoverBody,
        } : null);

    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
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
        this._popoverService.onDestroy();
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
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && event.altKey && !this.disabled) {
            this.open();
        }
    }

    private get _triggerElement(): ElementRef {
        return this.trigger || this.triggerOrigin.elementRef;
    }
}
