import {
    Component,
    ElementRef,
    OnInit,
    Input,
    AfterViewInit,
    Type,
    TemplateRef,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Optional, ChangeDetectorRef, HostListener, OnDestroy
} from '@angular/core';
import { ModalRef } from './modal-ref';
import * as createFocusTrap from 'focus-trap';

@Component({
    selector: 'fd-modal',
    styleUrls: ['modal.component.scss'],
    templateUrl: './modal.component.html',
    host: {
        class: 'fd-modal',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-describedby]': 'ariaDescribedBy',
        '[attr.id]': 'id',
    }
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    id: string;

    @ViewChild('vc', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    @Input()
    width: string;

    @Input()
    height: string;

    @Input()
    escKeyCloseable: boolean = true;

    @Input()
    focusTrapped: boolean = true;

    @Input()
    ariaLabelledBy: string = null;

    @Input()
    ariaLabel: string = null;

    @Input()
    ariaDescribedBy: string = null;

    childComponentType: TemplateRef<any> | Type<any>;

    backdropClickCloseable: boolean = true;

    hasBackdrop: boolean  = true;

    private componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    private focusTrap: any;

    constructor(private elRef: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private cdRef: ChangeDetectorRef,
                @Optional() private modalRef: ModalRef) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }
    }

    ngAfterViewInit(): void {
        if (this.childComponentType) {
            if (this.childComponentType instanceof Type) {
                this.loadFromComponent(this.childComponentType);
            } else if (this.childComponentType instanceof TemplateRef) {
                this.loadFromTemplate(this.childComponentType);
            }
        }
        if (this.focusTrapped) {
            try {
                this.focusTrap = (createFocusTrap as any)(this.elRef.nativeElement, {
                    clickOutsideDeactivates: this.backdropClickCloseable && this.hasBackdrop,
                    escapeDeactivates: false
                });
                this.focusTrap.activate();
            } catch (e) {
                console.warn('Attempted to focus trap the modal, but no tabbable elements were found.')
            }
        }
        this.cdRef.detectChanges();
    }

    @HostListener('keyup', ['$event'])
    closeModalEsc(event: KeyboardEvent): void {
        if (this.escKeyCloseable && event.key === 'Escape') {
            this.modalRef.dismiss('escape');
        }
    }

    private loadFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    private loadFromTemplate(content: TemplateRef<any>): void {
        const context = {
            $implicit: this.modalRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    }
}
