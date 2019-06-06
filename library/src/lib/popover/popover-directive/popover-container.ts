import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    HostListener,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import focusTrap from 'focus-trap';

@Component({
    selector: 'fd-popover-container',
    template: `
        <div class="fd-popover-default-arrow" *ngIf="defaultArrow" x-arrow></div>
        <ng-container #vc>
            {{contentString}}
        </ng-container>
    `,
    styleUrls: ['./popover-container.scss'],
    host: {
        class: 'fd-popover__body fd-popover__body--no-arrow fd-popover-container-custom',
        'tabindex': '-1'
    },
    encapsulation: ViewEncapsulation.None
})
export class PopoverContainer implements AfterViewInit, OnDestroy {

    @ViewChild('vc', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    @Output()
    isSetup = new EventEmitter<undefined>();

    content: TemplateRef<any> | string;

    contentString: string;

    context: any;

    focusTrapped: boolean;

    defaultArrow: boolean = false;

    closeOnEscapeKey: boolean;

    private componentRef: EmbeddedViewRef<any>;
    private focusTrap: any;

    constructor(private elRef: ElementRef,
                private cdRef: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
        if (this.content instanceof TemplateRef) {
            this.loadFromTemplate(this.content);
        } else {
            this.contentString = this.content;
        }
        this.setupFocusTrap();
        this.isSetup.emit();
        this.cdRef.detectChanges();
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
