import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { modalFadeNgIf } from './modal-utils/modal-animations';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import focusTrap from 'focus-trap';
import { ModalRef } from './modal-utils/modal-ref';

@Component({
    selector: 'fd-modal',
    styleUrls: ['modal.component.scss'],
    templateUrl: './modal.component.html',
    host: {
        'role': 'dialog',
        '[class.fd-modal]': 'true',
        '[class.fd-modal-custom]': 'true',
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-describedby]': 'ariaDescribedBy',
        '[attr.aria-modal]': 'true',
        '[attr.id]': 'id',
        'tabindex': '-1',
        '[@modal-fade]': ''
    },
    animations: [
        modalFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit, OnDestroy {

    /** List of classes that will be added to component, when load from component option is picked. */
    readonly HOST_COMPONENT_CLASS_LIST: string[] = [
        'fd-modal__content--overrides',
        'fd-modal__content',
    ];


    @ViewChild('vc', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    id: string;

    escKeyCloseable: boolean = true;

    focusTrapped: boolean = true;

    ariaLabelledBy: string = null;

    ariaLabel: string = null;

    ariaDescribedBy: string = null;

    childComponentType: TemplateRef<any> | Type<any>;

    backdropClickCloseable: boolean = true;

    hasBackdrop: boolean  = true;

    modalPanelClass: string = '';

    private componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    private focusTrap: any;

    constructor(private elRef: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private cdRef: ChangeDetectorRef,
                @Optional() private modalRef: ModalRef) {
        super(elRef);
    }

    ngOnInit(): void {
        this._setProperties();
    }

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
                this.focusTrap = focusTrap(this.elRef.nativeElement, {
                    clickOutsideDeactivates: this.backdropClickCloseable && this.hasBackdrop,
                    escapeDeactivates: false,
                    initialFocus: this.elRef.nativeElement,
                    allowOutsideClick: (event: MouseEvent) => true
                });
                this.focusTrap.activate();
            } catch (e) {
                console.warn('Attempted to focus trap the modal, but no tabbable elements were found.');
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
        this.addClassesToComponent(this.componentRef.location);
    }

    private loadFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {
            $implicit: this.modalRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    }

    private addClassesToComponent(elementRef: ElementRef): void {
        if (!elementRef) {
            return;
        }
        elementRef.nativeElement.classList.add(...this.HOST_COMPONENT_CLASS_LIST);
    }

    _setProperties(): void {
        if (this.modalPanelClass) {
            this._addClassToElement(this.modalPanelClass);
        }
    }
}
