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
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';

import { A11yModule } from '@angular/cdk/a11y';
import { DynamicComponentService, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import equal from 'fast-deep-equal';
import { BasePopoverClass } from './base/base-popover.class';
import { PopoverBodyDirective } from './popover-body.directive';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverControlComponent } from './popover-control/popover-control.component';
import { PopoverMobileComponent } from './popover-mobile/popover-mobile.component';
import { PopoverService, PopoverTemplate } from './popover-service/popover.service';
import { POPOVER_COMPONENT } from './popover.interface';
import { FD_POPOVER_COMPONENT } from './tokens';

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
    standalone: true,
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
    imports: [CdkOverlayOrigin, A11yModule]
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
    set trigger(trigger: ElementRef | HTMLElement) {
        if (equal(trigger, this._trigger)) {
            return;
        }
        this._trigger = trigger;
        this._popoverService.updateTriggerElement(this._trigger);
    }

    get trigger(): ElementRef | HTMLElement {
        return this._trigger;
    }

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

    /**
     * Whether the popover should prevent page scrolling when space key is pressed.
     **/
    @Input()
    preventSpaceKeyScroll = true;

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
    @ContentChild(PopoverBodyDirective)
    popoverBodyDirective: PopoverBodyDirective;

    /** @hidden */
    @ContentChild(PopoverControlComponent)
    popoverControl: PopoverControlComponent;

    /** @hidden - template for Dialog body content */
    @ContentChild('popoverBodyContent')
    popoverBodyContentTemplate: TemplateRef<any>;

    /** @hidden - template for Dialog footer content */
    @ContentChild('popoverFooterContent')
    popoverFooterContentTemplate: TemplateRef<any>;

    /** @hidden */
    private get _triggerElement(): HTMLElement {
        return this._trigger instanceof ElementRef ? this._trigger.nativeElement : this._trigger;
    }

    /** @hidden */
    private _trigger: ElementRef | HTMLElement;

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
    @HostListener('keydown.space', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (!this.preventSpaceKeyScroll) {
            return;
        }
        const activeElement = document.activeElement;
        if (
            // popoverControl will be undefined when popover is used from "fdPopoverTrigger"
            this.popoverControl?.elRef.nativeElement.children[0] === activeElement &&
            activeElement?.tagName !== 'INPUT' &&
            activeElement?.tagName !== 'TEXTAREA' &&
            !activeElement?.classList.contains(SELECT_CLASS_NAMES.selectControl)
        ) {
            // prevent page scrolling on Space keydown
            event.preventDefault();
            this._popoverService.toggle();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setupView();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.popoverControl && this.triggers.includes('click')) {
            this.popoverControl._tabbable = true;
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this._popoverService.refreshConfiguration(this);

        if (changes.disableScrollbar && this.popoverBody && this.popoverBody._scrollbar) {
            this.popoverBody._scrollbar._inPopover = changes.disableScrollbar.currentValue;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyMobileComponent();
        this._destroyEventListeners();
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
        this._popoverService.open();
        this._cdr.markForCheck();
    }

    /** Closes the popover. */
    close(focusActiveElement = true): void {
        this._popoverService.close(focusActiveElement);
        this._cdr.markForCheck();
    }

    /** Temporary sets the ignoring of the event triggers. */
    setIgnoreTriggers(ignore: boolean): void {
        this._popoverService.setIgnoreTriggers(ignore);
    }

    /**
     * Method called to change position of popover,
     * recommended to be used only when popover is opened, otherwise change position or cdkPlacement
     */
    applyNewPosition(positions: ConnectedPosition[]): void {
        this._popoverService.applyNewPosition(positions);
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
        if (!this.mobile) {
            this._popoverService._mobile = false;
            if (!this.popoverBody) {
                this._popoverService.templateContent = this.templateRef;
            }
            this._popoverService.initialise(
                this._triggerElement || this.triggerOrigin.elementRef,
                this,
                this._getPopoverBodyContent()
            );
        } else {
            this._setupMobileMode();
        }

        this._cdr.detectChanges();
    }

    /**
     * Depending on a used popover body type, returns a popover body content
     **/
    private _getPopoverBodyContent(): PopoverTemplate | TemplateRef<void> | null {
        if (this.popoverBody) {
            return {
                template: this.templateRef,
                container: this.container,
                popoverBody: this.popoverBody
            };
        }
        if (this.popoverBodyDirective) {
            return this.popoverBodyDirective.templateRef;
        }
        return null;
    }

    /** @hidden Open Popover in mobile mode */
    private async _setupMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: POPOVER_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._popoverService._mobile = true;

        this._mobileModeComponentRef = this._dynamicComponentService.createDynamicComponent(
            {
                popoverBodyContentTemplate: this.popoverBodyContentTemplate,
                popoverFooterContentTemplate: this.popoverFooterContentTemplate
            },
            PopoverMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );

        this._listenOnTriggerRefClicks();
    }

    /** @hidden - Listen on popover trigger ref clicks */
    private _listenOnTriggerRefClicks(): void {
        this._destroyEventListeners();

        if (this.trigger && this.mobile) {
            this._clickEventListener = this._rendered.listen(this._triggerElement, 'click', () => this.toggle());
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
