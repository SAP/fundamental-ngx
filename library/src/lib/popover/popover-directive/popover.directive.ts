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

@Directive({
    selector: '[fdPopover]'
})
export class PopoverDirective implements OnInit, OnDestroy, OnChanges {

    @Input('fdPopover')
    content: TemplateRef<any> | string;

    @Input()
    isOpen: boolean = false;

    @Input()
    triggers: string[] = ['click'];

    @Input()
    defaultArrow: boolean = false;

    @Input()
    placement: Placement;

    @Input()
    focusTrapped: boolean = false;

    @Input()
    closeOnEscapeKey: boolean = true;

    @Input()
    disabled: boolean = false;

    @Input()
    closeOnOutsideClick: boolean = true;

    @Input()
    appendTo: HTMLElement | 'body' = 'body';

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

    @Input()
    fillControl: boolean = false;

    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private containerRef: ComponentRef<PopoverContainer>;
    private popper: Popper;
    private eventRef: Function[] = [];
    private isSetup: boolean = false;

    constructor(private elRef: ElementRef,
                private cdRef: ChangeDetectorRef,
                private resolver: ComponentFactoryResolver,
                private injector: Injector,
                private appRef: ApplicationRef,
                private renderer: Renderer2) {
    }

    ngOnInit(): void {
        if (this.isOpen) {
            this.open();
        }

        this.initFillControl();
        this.initPlacement();

        this.addTriggerListeners();
        this.isSetup = true;
    }

    ngOnDestroy(): void {
        if (this.popper) {
            this.popper.destroy();
        }

        if (this.containerRef) {
            this.destroyContainer();
        }

        this.destroyTriggerListeners();
    }

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

    public toggle(fireEvent: boolean = true): void {
        if (this.isOpen) {
            this.close(fireEvent);
        } else {
            this.open(fireEvent);
        }
    }

    public open(fireEvent: boolean = true): void {
        if (!this.isOpen && !this.disabled) {
            this.createContainer();
            this.isOpen = true;

            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    }

    public close(fireEvent: boolean = true): void {
        if (this.isOpen) {
            this.destroyContainer();
            this.isOpen = false;

            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    }

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
