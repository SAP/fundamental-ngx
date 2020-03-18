import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChild,
    ElementRef,
    HostListener,
    Inject,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import focusTrap, { FocusTrap } from 'focus-trap';
import { dialogFadeNgIf } from './dialog-utils/dialog.animations';
import { DIALOG_CONFIG, DialogConfig } from './dialog-utils/dialog-config.class';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DIALOG_REF, DialogRef } from './dialog-utils/dialog-ref.class';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fd-dialog',
    styleUrls: ['dialog.component.scss'],
    templateUrl: './dialog.component.html',
    host: {
        'tabindex': '-1',
        '[@dialog-fade]': '',
        '[class]': 'dialogConfig.backdropClass',
        '[class.fd-dialog]': 'dialogConfig.hasBackdrop',
        '[class.fd-dialog--active]': 'showDialogWindow'
    },
    animations: [
        dialogFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

    @Input('dialogRef')
    set embeddedDialogRef(value: DialogRef) {
        this._dialogRef = value;
    };

    @Input('dialogConfig')
    set embeddedDialogConfig(value: DialogConfig) {
        this.dialogConfig = value;
    };

    /** @hidden */
    @ViewChild('dialogWindow')
    dialogWindow: ElementRef;

    /** @hidden */
    @ContentChild(DialogHeaderComponent) dialogHeaderRef: DialogHeaderComponent;

    /** @hidden */
    @ContentChild(DialogBodyComponent) dialogBodyRef: DialogBodyComponent;

    /** @hidden */
    @ContentChild(DialogFooterComponent) dialogFooterRef: DialogFooterComponent;

    /** @hidden Whenever dialog should be visible */
    showDialogWindow: boolean;

    /** @hidden */
    childContent: TemplateRef<any> | Type<any> = undefined;

    /** @hidden */
    isDragged: boolean;

    /** @hidden */
    dialogPaddingSize: 's' | 'm' | 'l' | 'xl';

    /** @hidden */
    private _focusTrap: FocusTrap;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        @Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
        @Optional() @Inject(DIALOG_REF) private _dialogRef: DialogRef,
        private _injector: Injector,
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnHidden();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._passConfigToSubComponents();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._trapFocus();
        this._setStyles();
        this.adjustResponsivePadding();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._deactivateFocus();
        this._subscriptions.unsubscribe();
    }

    /** @hidden Listen and close dialog on Escape key */
    @HostListener('keyup', ['$event'])
    closeDialogEsc(event: KeyboardEvent): void {
        if (this.dialogConfig.escKeyCloseable && event.key === 'Escape') {
            this._dialogRef.dismiss('escape');
        }
    }

    /** @hidden */
    @HostListener('mousedown', ['$event.target'])
    closeDialog(target: ElementRef): void {
        if (this.dialogConfig.backdropClickCloseable && target === this._elementRef.nativeElement) {
            this._dialogRef.dismiss('backdrop');
        }
    }

    adjustResponsivePadding(): void {
        if (this.dialogConfig.responsivePadding) {
            const dialogWidth = this.dialogWindow.nativeElement.getBoundingClientRect().width;
            if (dialogWidth < 599) {
                this.dialogPaddingSize = 's';
            } else if (dialogWidth < 1023) {
                this.dialogPaddingSize = 'm';
            } else if (dialogWidth < 1439) {
                this.dialogPaddingSize = 'l';
            } else {
                this.dialogPaddingSize = 'xl';
            }
        }
    }

    /** @hidden */
    private _trapFocus(): void {
        if (this.dialogConfig.focusTrapped) {
            try {
                this._focusTrap = focusTrap(this._elementRef.nativeElement, {
                    clickOutsideDeactivates: this.dialogConfig.backdropClickCloseable && this.dialogConfig.hasBackdrop,
                    initialFocus: this._elementRef.nativeElement.querySelector('[fd-dialog-decisive-button]'),
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

    /** @hidden If dialog subcomponents didn't receive DialogConfig from Injector, DialogConfig is passed from parent.
     * This is necessary when dialog has been passed as TemplateRef and created as EmbeddedView.
     * In such case parent injector of DialogComponent is the component that DECLARED the TemplateRef.
     **/
    private _passConfigToSubComponents(): void {
        if (this.dialogHeaderRef) {
            this.dialogHeaderRef.dialogConfig = this.dialogHeaderRef.dialogConfig || this.dialogConfig;
        }
        if (this.dialogBodyRef) {
            this.dialogBodyRef.dialogConfig = this.dialogBodyRef.dialogConfig || this.dialogConfig;
        }
        if (this.dialogFooterRef) {
            this.dialogFooterRef.dialogConfig = this.dialogFooterRef.dialogConfig || this.dialogConfig;
        }
    }

    /** @hidden Listen on dialog visibility */
    private _listenOnHidden(): void {
        this._subscriptions.add(
            this._dialogRef.onHide.subscribe(isHidden => this.showDialogWindow = !isHidden)
        );
    }

    private _setStyles(): void {
        const position = this.dialogConfig.position || {};
        this.dialogWindow.nativeElement.style.width = this.dialogConfig.width;
        this.dialogWindow.nativeElement.style.height = this.dialogConfig.height;
        this.dialogWindow.nativeElement.style.minWidth = this.dialogConfig.minWidth;
        this.dialogWindow.nativeElement.style.minHeight = this.dialogConfig.minHeight;
        this.dialogWindow.nativeElement.style.maxWidth = this.dialogConfig.maxWidth;
        this.dialogWindow.nativeElement.style.maxHeight = this.dialogConfig.maxHeight;
        this.dialogWindow.nativeElement.style.top = position.top;
        this.dialogWindow.nativeElement.style.bottom = position.bottom;
        this.dialogWindow.nativeElement.style.left = position.left;
        this.dialogWindow.nativeElement.style.right = position.right;
    }
}
