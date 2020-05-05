import {
    ApplicationRef,
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    HostBinding,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    Optional,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { PopoverContainer } from './popover-container';
import Popper, { Placement, PopperOptions } from 'popper.js';
import { startWith } from 'rxjs/operators';
import { RtlService } from '../../utils/services/rtl.service';

export type PopoverFillMode = 'at-least' | 'equal';

/**
 * Directive which manages the popper and popover components of the library.
 * It can be attached to any element. To bind it to a body, use the following syntax.
 * ```html
 * <div [fdPopover]="template">Control Element</div>
 * <ng-template #template>
 *     Popover Body
 * </ng-template>
 * ```
 */
@Directive({
    selector: '[fdPopover]'
})
export class PopoverDirective implements OnInit, OnDestroy, OnChanges {
    /** Content of the popover. Used through the actual directive tag. Accepts strings or TemplateRefs. */
    @Input('fdPopover')
    content: TemplateRef<any> | string;

    /** Whether the popover is open. Can be used through two-way binding. */
    @Input()
    isOpen: boolean = false;

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** Whether the popover should display the default arrow. */
    @Input()
    noArrow: boolean = true;

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-start';

    /** Whether the popover should be focusTrapped. */
    @Input()
    focusTrapped: boolean = false;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey: boolean = true;

    /** Whether the popover is disabled. */
    @Input()
    @HostBinding('class.fd-popover-custom--disabled')
    disabled: boolean = false;

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick: boolean = true;

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: HTMLElement | 'body' = 'body';

    /** List of additional classes that will be added to popover container element */
    @Input()
    additionalClasses: string[] = [];

    /** The Popper.js options to attach to this popover.
     * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details. */
    @Input()
    options: PopperOptions = {
        placement: 'bottom-start',
        modifiers: {
            preventOverflow: {
                enabled: true,
                escapeWithReference: true,
                boundariesElement: 'scrollParent'
            }
        }
    };

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: PopoverFillMode;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private containerRef: ComponentRef<PopoverContainer>;
    private popper: Popper;
    private eventRef: Function[] = [];
    private isSetup: boolean = false;
    private _outsideClickEventReference: () => void;

    /** @hidden */
    constructor(
        private elRef: ElementRef,
        private cdRef: ChangeDetectorRef,
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef,
        private renderer: Renderer2,
        @Optional() private _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.isOpen) {
            this.open();
        }

        this.setupFillBehaviour();
        if (this.placement) {
            this._initPlacement(this.placement);
        }

        if (this._rtlService && this._rtlService.rtl) {
            this._rtlService.rtl.pipe(
                startWith(this._rtlService.rtl.getValue())
            ).subscribe(rtl => this._handleRtlChange(rtl));
        }

        this.addTriggerListeners();
        this.isSetup = true;
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this.popper) {
            this.popper.destroy();
        }

        if (this.containerRef) {
            this.destroyContainer();
        }

        this.destroyTriggerListeners();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this.isSetup) {
            return;
        }

        if (changes.triggers) {
            setTimeout(() => {
                this.destroyTriggerListeners();
                this.addTriggerListeners();
            });
        }

        if (changes.isOpen) {
            if (changes.isOpen.currentValue) {
                setTimeout(() => {
                    this.isOpen = false;
                    this.open(false);
                });
            } else {
                setTimeout(() => {
                    this.isOpen = true;
                    this.close(false);
                });
            }
        }

        if (changes.placement) {
            setTimeout(() => {
                this._initPlacement(this.placement);
            });
        }

        if (changes.fillControl) {
            setTimeout(() => {
                this.setupFillBehaviour();
            });
        }
    }

    /**
     * Toggles the popover open state.
     */
    public toggle(fireEvent: boolean = true): void {
        if (this.isOpen) {
            this.close(fireEvent);
        } else {
            this.open(fireEvent);
        }
    }

    /**
     * Opens the popover.
     */
    public open(fireEvent: boolean = true): void {
        if (!this.isOpen && !this.disabled) {
            this.createContainer();
            this._addListenerForOutsideClick();
            this.isOpen = true;

            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    }

    /**
     * Closes the popover.
     */
    public close(fireEvent: boolean = true): void {
        if (this._outsideClickEventReference) {
            this._outsideClickEventReference();
            this._outsideClickEventReference = null;
        }

        if (this.isOpen) {
            this.destroyContainer();
            this.isOpen = false;

            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    }

    /**
     * Forces an update of the popover's positioning calculation.
     */
    public updatePopper(): void {
        if (this.popper) {
            this.popper.scheduleUpdate();
        }
    }

    private createContainer(): void {
        if (this.containerRef) {
            return;
        }

        const factory = this.resolver.resolveComponentFactory(PopoverContainer);
        this.containerRef = factory.create(this.injector);

        // Set instance properties
        this.containerRef.instance.context = this;
        this.containerRef.instance.content = this.content;
        this.containerRef.instance.focusTrapped = this.focusTrapped;
        this.containerRef.instance.noArrow = this.noArrow;
        this.containerRef.instance.closeOnEscapeKey = this.closeOnEscapeKey;

        if (this.additionalClasses.length > 0) {
            this.containerRef.location.nativeElement.classList.add(...this.additionalClasses);
        }

        this.appRef.attachView(this.containerRef.hostView);
        const setupRef = this.containerRef.instance.isSetup.subscribe(() => {
            this.createPopper();
            setupRef.unsubscribe();
        });

        const containerEl = (this.containerRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        if (this.appendTo === 'body') {
            document.body.appendChild(containerEl);
        } else {
            this.appendTo.appendChild(containerEl);
        }
    }

    private destroyTriggerListeners(): void {
        if (this.eventRef && this.eventRef.length > 0) {
            this.eventRef.forEach((event) => {
                event();
            });
            this.eventRef = [];
        }
    }

    private addTriggerListeners(): void {
        if (this.triggers && this.triggers.length > 0) {
            this.triggers.forEach(trigger => {
                this.eventRef.push(this.renderer.listen(this.elRef.nativeElement, trigger, () => {
                    this.toggle();
                }));
            });
        }
    }

    private destroyContainer(): void {
        if (this.containerRef) {
            this.appRef.detachView(this.containerRef.hostView);
            this.containerRef.destroy();
            this.containerRef = null;
        }

        if (this.popper) {
            this.popper.destroy();
            this.popper = null;
        }
    }

    private createPopper(): void {
        this.popper = new Popper(
            this.elRef.nativeElement as HTMLElement,
            this.containerRef.location.nativeElement as HTMLElement,
            this.options
        );
    }

    private fillReference(data): any {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.offsets.popper.width = data.styles.width = data.offsets.reference.width;
        return data;
    }

    private atLeastReference(data): any {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.styles.minWidth = data.offsets.reference.width + 'px';
        return data;
    }

    private _initPlacement(placement: Placement): void {
        if (this.options) {
            this.options.placement = placement;
        } else {
            this.options = { placement: placement };
        }
    }

    private setupFillBehaviour(): void {
        if (this.fillControlMode) {
            if (this.options && this.options.modifiers) {
                this.options.modifiers.fillReference = {
                    enabled: true,
                    fn: this.fillControlMode === 'equal' ? this.fillReference : this.atLeastReference,
                    order: 840
                };
            } else {
                this.options = {
                    modifiers: {
                        fillReference: {
                            enabled: true,
                            fn: this.fillControlMode === 'equal' ? this.fillReference : this.atLeastReference,
                            order: 840
                        }
                    }
                };
            }
        }
    }

    private _addListenerForOutsideClick(): void {
        if (!this._outsideClickEventReference) {
            this._outsideClickEventReference = this.renderer.listen('document', 'click', (event: MouseEvent) => {
                if (this._shouldClose(event)) {
                    this.close();
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }
    }

    private _shouldClose(event: MouseEvent): boolean {
        return (
            this.containerRef &&
            this.isOpen &&
            this.closeOnOutsideClick &&
            event.target !== this.elRef.nativeElement &&
            !this.elRef.nativeElement.contains(event.target) &&
            !this.containerRef.location.nativeElement.contains(event.target)
        );
    }

    private _handleRtlChange(rtl: boolean): void {
        if (this.placement) {
            if (rtl) {
                const hash = {
                    end: 'start',
                    start: 'end',
                    left: 'right',
                    right: 'left'
                };
                const placement = <Placement>this.placement.replace(
                    /start|end|right|left/g,
                    matched => hash[matched]
                );
                this._initPlacement(placement);
            } else {
                this._initPlacement(this.placement);
            }
        }
    }
}
