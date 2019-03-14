import {
    AfterViewInit,
    ChangeDetectorRef,
    Component, ElementRef, EmbeddedViewRef,
    EventEmitter,
    HostBinding, HostListener, OnDestroy,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import focusTrap from 'focus-trap';

@Component({
    selector: 'fd-popover-container',
    template: `        
        <div class="fd-popover-default-arrow" *ngIf="defaultArrow" x-arrow></div>
        <ng-container #vc></ng-container>
    `,
    styleUrls: ['./popover-container.scss'],
    host: {
        'tabindex': '-1'
    }
})
export class PopoverContainer implements AfterViewInit, OnDestroy {

    @ViewChild('vc', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    @Output()
    isSetup = new EventEmitter<undefined>();

    @HostBinding('class.fd-popover__body')
    popoverBodyClass = true;

    @HostBinding('class.fd-popover__body--no-arrow')
    popoverBodyClassArrow = true;

    content: TemplateRef<any> | string;

    context: any;

    focusTrapped: boolean;

    defaultArrow: boolean;

    closeOnEscapeKey: boolean;

    private componentRef: EmbeddedViewRef<any>;
    private focusTrap: any;

    constructor(private elRef: ElementRef,
                private cdRef: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        if (this.content instanceof TemplateRef) {
            this.loadFromTemplate(this.content);
            this.setupFocusTrap();
            this.cdRef.detectChanges();
        }
        this.isSetup.emit();
    }

    ngOnDestroy(): void {
        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }
    }

    private loadFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {
            $implicit: this.context
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    }

    private setupFocusTrap(): void {
        if (this.focusTrapped) {
            try {
                this.focusTrap = focusTrap(this.elRef.nativeElement, {
                    clickOutsideDeactivates: true,
                    escapeDeactivates: false,
                    initialFocus: this.elRef.nativeElement
                });
                this.focusTrap.activate();
            } catch (e) {
                console.warn('Attempted to focus trap the popover, but no tabbable elements were found.');
            }
        }
    }

    @HostListener('keydown.escape')
    escapeHandler(): void {
        if (this.containerRef && this.context.isOpen && this.closeOnEscapeKey) {
            this.context.close();
        }
    }
}
