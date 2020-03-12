import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    HostListener, Inject, Injector,
    OnDestroy,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import focusTrap, { FocusTrap } from 'focus-trap';
import { dialogFadeNgIf } from './dialog-utils/dialog.animations';
import { DialogRef } from './dialog-utils/dialog-ref.class';
import { DIALOG_CONFIG, DialogConfig } from './dialog-utils/dialog-config.class';

@Component({
    selector: 'fd-dialog',
    styleUrls: ['dialog.component.scss'],
    templateUrl: './dialog.component.html',
    host: {
        'role': 'dialog',
        'tabindex': '-1',
        'attr.aria-modal': 'true',
        '[@dialog-fade]': '',
        '[attr.id]': 'dialogConfig.id',
        '[attr.aria-label]': 'dialogConfig.ariaLabel',
        '[attr.aria-labelledby]': 'dialogConfig.ariaLabelledBy',
        '[attr.aria-describedby]': 'dialogConfig.ariaDescribedBy',
        '[class.fd-dialog__content]': '!hasChildComponent',
        '[style.position]': 'hasChildComponent ? "relative" : ""'
    },
    animations: [
        dialogFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements AfterViewInit, OnDestroy {

    /** @hidden */
    @ViewChild('contentContainer', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    /** @hidden */
    childContent: TemplateRef<any> | Type<any> = undefined;

    /** @hidden */
    private _focusTrap: FocusTrap;

    /** @hidden */
    private _componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    constructor(
        @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
        private _injector: Injector,
        private _dialogRef: DialogRef,
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._deactivateFocus();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._loadDialog();
        this._trapFocus();
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    closeDialogEsc(event: KeyboardEvent): void {
        if (this.dialogConfig.escKeyCloseable && event.key === 'Escape') {
            this._dialogRef.dismiss('escape');
        }
    }

    /** @hidden */
    get hasChildComponent(): boolean {
        return this.childContent instanceof Type;
    }

    /** @hidden */
    private _loadDialog(): void {
        if (this.childContent instanceof Type) {
            this._createFromComponent(this.childContent);
        } else if (this.childContent instanceof TemplateRef) {
            this._createFromTemplate(this.childContent);
        }
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    private _createFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this._componentRef = this.containerRef.createComponent(componentFactory);
        this._componentRef.location.nativeElement.classList.add('fd-dialog__content--component');
    }

    /** @hidden */
    private _createFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {$implicit: this._dialogRef};
        this._componentRef = this.containerRef.createEmbeddedView(content, context);
    }

    /** @hidden */
    private _trapFocus(): void {
        if (this.dialogConfig.focusTrapped) {
            try {
                this._focusTrap = focusTrap(this._elementRef.nativeElement, {
                    clickOutsideDeactivates: this.dialogConfig.backdropClickCloseable && this.dialogConfig.hasBackdrop,
                    initialFocus: this._elementRef.nativeElement.querySelector('[fd-dialog-decisive-btn]'),
                    escapeDeactivates: false,
                    allowOutsideClick: (event: MouseEvent) => true
                });
                this._focusTrap.activate();
            } catch (e) {
                console.warn('Attempted to focus trap the dialog, but no tabbable elements were found.', e);
            }
        }
    }

    /** @hidden */
    private _deactivateFocus(): void {
        if (this._focusTrap) {
            this._focusTrap.deactivate();
        }
    }
}
