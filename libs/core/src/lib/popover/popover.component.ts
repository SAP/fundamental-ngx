import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ContentChild,
    ElementRef,
    HostListener,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { DOWN_ARROW, ENTER, SPACE } from '@angular/cdk/keycodes';

import { DynamicComponentService, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import equal from 'fast-deep-equal';
import { BasePopoverClass } from './base/base-popover.class';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverService } from './popover-service/popover.service';
import { PopoverControlComponent } from './popover-control/popover-control.component';
import { POPOVER_COMPONENT } from './popover.interface';
import { PopoverMobileComponent } from './popover-mobile/popover-mobile.component';
import { PopoverMobileModule } from './popover-mobile/popover-mobile.module';
import { PopoverChildContent } from './popover-child-content.interface';
import { FD_POPOVER_COMPONENT } from './tokens';
import { NgIf } from '@angular/common';

export const SELECT_CLASS_NAMES = {
    selectControl: 'fd-select__control'
};

let cdkPopoverUniqueId = 0;

/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 */
@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        PopoverService,
        {
            provide: FD_POPOVER_COMPONENT,
            useExisting: PopoverComponent
        },
        contentDensityObserverProviders()
    ],
    host: {
        class: 'fd-popover-custom',
        '[class.fd-popover-custom--mobile]': 'mobile',
        '[attr.id]': 'id'
    },
    standalone: true,
    imports: [NgIf, CdkOverlayOrigin]
})
export class PopoverComponent
    extends BasePopoverClass
    implements AfterViewInit, AfterContentInit, OnDestroy, OnChanges
{
    /** Tooltip for popover */
    @Input()
    title: string;

    /** Reference to popover trigger element */
    @Input()
    set trigger(trigger: ElementRef) {
        if (equal(trigger, this._trigger)) {
            return;
        }
        this._trigger = trigger;
        this._popoverService.updateTriggerElement(this._trigger);
    }

    get trigger(): ElementRef {
        return this._trigger;
    }

    /** @hidden */
    private _trigger: ElementRef;

    /** Whether position shouldn't change, when popover approach the corner of page */
    @Input()
    fixedPosition = false;

    /** Id of the popover. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-popover-' + cdkPopoverUniqueId++;

    /** Whether the popover component should be displayed in mobile mode. */
    @Input()
    mobile = false;

    /** Config for the popover in mobile mode */
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

    /** @hidden */
    @ContentChild(PopoverBodyComponent)
    popoverBody: PopoverBodyComponent;

    /** @hidden */
    @ContentChild(PopoverControlComponent)
    popoverControl: PopoverControlComponent;

    /** @hidden - template for Dialog body content */
    @ContentChild('popoverBodyContent')
    popoverBodyContentTemplate: TemplateRef<any>;

    /** @hidden - template for Dialog footer content */
    @ContentChild('popoverFooterContent')
    popoverFooterContentTemplate: TemplateRef<any>;

    /** @deprecated
     * Left for backward compatibility
     */
    directiveRef: any;

    /** @hidden */
    private _clickEventListener: null | (() => void);

    /** @hidden */
    private _mobileModeComponentRef: ComponentRef<PopoverMobileComponent>;

    /** @hidden */
    constructor(
        private readonly _popoverService: PopoverService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _rendered: Renderer2,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        @Optional() private readonly _dynamicComponentService: DynamicComponentService
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
                this.popoverBody
                    ? {
                          template: this.templateRef,
                          container: this.container,
                          popoverBody: this.popoverBody
                      }
                    : null
            );
        }

        this._setupView();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.popoverControl && this.triggers.includes('click')) {
            this.popoverControl._tabbable = true;
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this._popoverService.refreshConfiguration(this);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyMobileComponent();
        this._destroyEventListeners();
        this._popoverService.onDestroy();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        const activeElement = document.activeElement;
        if (
            // popoverControl will be undefined when popover is used from "fdPopoverTrigger"
            this.popoverControl?.elRef.nativeElement.children[0] === activeElement &&
            activeElement?.tagName !== 'INPUT' &&
            activeElement?.tagName !== 'TEXTAREA' &&
            !activeElement?.classList.contains(SELECT_CLASS_NAMES.selectControl)
        ) {
            if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
                // prevent page scrolling on Space keydown
                event.preventDefault();
                this._popoverService.toggle();
            }
        }
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
    close(focusActiveElement = true): void {
        this.isOpen = false;
        this._popoverService.close(focusActiveElement);
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

    /** Handler for alt + arrow down keydown */
    triggerKeyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && event.altKey && !this.disabled) {
            this.open();
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /** @hidden Select and instantiate popover view mode */
    private _setupView(): void {
        if (this.mobile) {
            this._setupMobileMode();
        }

        this._cdr.detectChanges();
    }

    /** @hidden Open Popover in mobile mode */
    private async _setupMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: POPOVER_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._mobileModeComponentRef = await this._dynamicComponentService.createDynamicModule(
            {
                popoverBodyContentTemplate: this.popoverBodyContentTemplate,
                popoverFooterContentTemplate: this.popoverFooterContentTemplate
            } as PopoverChildContent,
            PopoverMobileModule,
            PopoverMobileComponent,
            this._viewContainerRef,
            injector
        );

        this._listenOnTriggerRefClicks();
    }

    /** @hidden - Listen on popover trigger ref clicks */
    private _listenOnTriggerRefClicks(): void {
        this._destroyEventListeners();

        if (this.trigger && this.mobile) {
            this._clickEventListener = this._rendered.listen(this.trigger.nativeElement, 'click', () => this.toggle());
        }
    }

    /**
     * @hidden
     * This is going to be removed in feature, on dialog and dynamic service component refactor
     */
    private _destroyEventListeners(): void {
        if (this._clickEventListener) {
            this._clickEventListener();
            this._clickEventListener = null;
        }
    }

    /** @hidden */
    private _destroyMobileComponent(): void {
        if (this._mobileModeComponentRef) {
            this._mobileModeComponentRef.destroy();
        }
    }
}
