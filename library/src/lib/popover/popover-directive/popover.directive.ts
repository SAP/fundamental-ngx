import {
    ApplicationRef,
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef, EmbeddedViewRef, EventEmitter, HostListener,
    Injector, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges,
    TemplateRef
} from '@angular/core';
import { PopoverContainer } from './popover-container';
import Popper, { Placement, PopperOptions } from 'popper.js';

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

    /** @Input Content of the popover. Used through the actual directive tag. Accepts strings or TemplateRefs. */
    @Input('fdPopover')
    content: TemplateRef<any> | string;

    /** @Input Whether the popover is open. Can be used through two-way binding. */
    @Input()
    isOpen: boolean = false;

    /** @Input The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** @Input Whether the popover should display the default arrow. */
    @Input()
    defaultArrow: boolean = false;

    /** @Input The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement;

    /** @Input Whether the popover should be focusTrapped. */
    @Input()
    focusTrapped: boolean = false;

    /** @Input Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey: boolean = true;

    /** @Input Whether the popover is disabled. */
    @Input()
    disabled: boolean = false;

    /** @Input Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick: boolean = true;

    /** @Input The element to which the popover should be appended. */
    @Input()
    appendTo: HTMLElement | 'body' = 'body';

    /** @Input The Popper.js options to attach to this popover.
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

    /** @Input Whether the Popover Body should try to have the same width as the Popover Control. */
    @Input()
    fillControl: boolean = false;

    /** @Output Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private containerRef: ComponentRef<PopoverContainer>;
    private popper: Popper;
    private eventRef: Function[] = [];
    private isSetup: boolean = false;

    /** @hidden */
    constructor(private elRef: ElementRef,
                private cdRef: ChangeDetectorRef,
                private resolver: ComponentFactoryResolver,
                private injector: Injector,
                private appRef: ApplicationRef,
                private renderer: Renderer2) {
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.isOpen) {
            this.open();
        }

        this.initFillControl();
        this.initPlacement();

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
                this.initPlacement();
            });
        }

        if (changes.fillControl) {
            setTimeout(() => {
                this.initFillControl();
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
        this.containerRef.instance.defaultArrow = this.defaultArrow;
        this.containerRef.instance.closeOnEscapeKey = this.closeOnEscapeKey;

        if (!this.defaultArrow) {
            this.containerRef.location.nativeElement.style.margin = 0;
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
            this.eventRef.forEach(event => {
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

    private initPlacement(): void {
        if (this.placement) {
            if (this.options) {
                this.options.placement = this.placement;
            } else {
                this.options = {placement: this.placement}
            }
        }
    }

    private initFillControl(): void {
        if (this.fillControl) {
            if (this.options && this.options.modifiers) {
                this.options.modifiers.fillReference = {
                    enabled: true,
                    fn: this.fillReference,
                    order: 840
                }
            } else {
                this.options = {
                    modifiers: {
                        fillReference: {
                            enabled: true,
                            fn: this.fillReference,
                            order: 840
                        }
                    }
                };
            }
        }
    }

    /** @hidden */
    @HostListener('document:click', ['$event'])
    clickHandler(event: MouseEvent): void {
        if (this.containerRef &&
            this.isOpen &&
            this.closeOnOutsideClick &&
            event.target !== this.elRef.nativeElement &&
            !this.elRef.nativeElement.contains(event.target) &&
            !this.containerRef.location.nativeElement.contains(event.target)) {
            event.preventDefault();
            event.stopPropagation();
            this.close();
        }
    }
}
