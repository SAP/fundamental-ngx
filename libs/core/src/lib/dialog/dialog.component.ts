import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    OnDestroy,
    Optional,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import focusTrap from 'focus-trap';
import { dialogFadeNgIf } from './dialog-utils/dialog.animations';
import { DialogRef } from './dialog-utils/dialog-ref.class';

@Component({
    selector: 'fd-dialog',
    styleUrls: ['dialog.component.scss'],
    templateUrl: './dialog.component.html',
    host: {
        'role': 'dialog',
        'tabindex': '-1',
        'attr.aria-modal': 'true',
        '[@dialog-fade]': '',
        '[attr.id]': 'id',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-describedby]': 'ariaDescribedBy',
        '[class.fd-dialog__content]': '!hasChildComponent',
        '[style.position]': 'hasChildComponent ? "relative" : ""',
    },
    animations: [
        dialogFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements AfterViewInit, OnDestroy {

    @ViewChild('contentContainer', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    id: string;

    escKeyCloseable: boolean = true;

    focusTrapped: boolean = true;

    ariaLabelledBy: string = null;

    ariaLabel: string = null;

    ariaDescribedBy: string = null;

    childComponentType: TemplateRef<any> | Type<any> | any = true;

    backdropClickCloseable: boolean = true;

    hasBackdrop: boolean = true;

    private _componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    private _focusTrap: any;

    constructor(private _modalRef: DialogRef,
                private _elementRef: ElementRef,
                private _changeDetectorRef: ChangeDetectorRef,
                private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnDestroy(): void {
        if (this._focusTrap) {
            this._focusTrap.deactivate();
        }
    }

    ngAfterViewInit(): void {
        // this._loadModal();
        // this._trapFocus();
    }

    @HostListener('keyup', ['$event'])
    closeModalEsc(event: KeyboardEvent): void {
        if (this.escKeyCloseable && event.key === 'Escape') {
            this._modalRef.dismiss('escape');
        }
    }

    get hasChildComponent(): boolean {
        return this.childComponentType instanceof Type;
    }

    private _loadModal(): void {
        if (this.childComponentType instanceof Type) {
            this._createFromComponent(this.childComponentType);
        } else if (this.childComponentType instanceof TemplateRef) {
            this._createFromTemplate(this.childComponentType);
        }
        this._changeDetectorRef.detectChanges();
    }

    private _createFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this._componentRef = this.containerRef.createComponent(componentFactory);
        this._componentRef.location.nativeElement.classList.add('fd-dialog__content--component');
    }

    private _createFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {$implicit: this._modalRef};
        this._componentRef = this.containerRef.createEmbeddedView(content, context);
    }

    private _trapFocus(): void {
        if (this.focusTrapped) {
            try {
                this._focusTrap = focusTrap(this._elementRef.nativeElement, {
                    clickOutsideDeactivates: this.backdropClickCloseable && this.hasBackdrop,
                    escapeDeactivates: false,
                    initialFocus: this._elementRef.nativeElement.querySelector('[fd-dialog-decisive-btn]'),
                    allowOutsideClick: (event: MouseEvent) => true
                });
                this._focusTrap.activate();
            } catch (e) {
                console.warn('Attempted to focus trap the modal, but no tabbable elements were found.', e);
            }
        }
    }
}
