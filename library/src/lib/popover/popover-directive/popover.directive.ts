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
import Popper, { PopperOptions } from 'popper.js';

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
    defaultArrow: boolean = true;

    @Input()
    focusTrapped: boolean = true;

    @Input()
    closeOnEscapeKey: boolean = true;

    @Input()
    disabled: boolean = false;

    @Input()
    closeOnOutsideClick: boolean = true;

    // For modal, options --> modifiers --> preventOverflow --> boundariesElement = 'window'
    @Input()
    options: PopperOptions = Popper.Defaults;

    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private containerRef: ComponentRef<PopoverContainer>;
    private popper: Popper;
    private eventRef: Function[] = [];

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

        this.addTriggerListeners();
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
        if (changes.triggers) {
            this.destroyTriggerListeners();
            this.addTriggerListeners();
        }

        if (changes.isOpen) {
            if (changes.isOpen.currentValue === true) {
                this.open();
            } else {
                this.close();
            }
        }
    }

    public toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    public open(): void {
        if (!this.isOpen && !this.disabled) {
            this.createContainer();
            this.isOpen = true;
        }
        this.isOpenChange.emit(this.isOpen);
    }

    public close(): void {
        if (this.isOpen) {
            this.destroyContainer();
            this.isOpen = false;
        }
        this.isOpenChange.emit(this.isOpen);
    }

    private createContainer(): void {
        if (this.containerRef) {
            return;
        }
        const factory = this.resolver.resolveComponentFactory(PopoverContainer);
        this.containerRef = factory.create(this.injector);
        this.appRef.attachView(this.containerRef.hostView);

        // Set instance properties
        this.containerRef.instance.context = this;
        this.containerRef.instance.content = this.content;
        this.containerRef.instance.focusTrapped = this.focusTrapped;
        this.containerRef.instance.defaultArrow = this.defaultArrow;
        this.containerRef.instance.closeOnEscapeKey = this.closeOnEscapeKey;

        if (!this.defaultArrow) {
            this.containerRef.location.nativeElement.style.margin = 0;
        }

        const setupRef = this.containerRef.instance.isSetup.subscribe(() => {
            this.createPopper();
            setupRef.unsubscribe();
        });

        const containerEl = (this.containerRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(containerEl);
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

    @HostListener('document:click', ['$event'])
    clickHandler(event: MouseEvent): void {
        if (this.containerRef &&
            this.isOpen &&
            event.target !== this.elRef.nativeElement &&
            !this.elRef.nativeElement.contains(event.target) &&
            !this.containerRef.location.nativeElement.contains(event.target)) {
            event.preventDefault();
            event.stopPropagation();
            this.close();
        }
    }
}
