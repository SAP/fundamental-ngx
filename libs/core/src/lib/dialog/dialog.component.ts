import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import focusTrap, { FocusTrap } from 'focus-trap';
import { dialogFadeNgIf } from './dialog-utils/dialog.animations';
import { DIALOG_CONFIG, DialogConfig } from './dialog-utils/dialog-config.class';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DIALOG_REF, DialogRef } from './dialog-utils/dialog-ref.class';
import { fromEvent, Subscription } from 'rxjs';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';
import { debounceTime } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'fd-dialog',
    styleUrls: ['dialog.component.scss'],
    templateUrl: './dialog.component.html',
    host: {
        tabindex: '-1',
        '[@dialog-fade]': ''
    },
    animations: [dialogFadeNgIf],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy, CssClassBuilder {
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** DialogRef - should be used for Template based Dialog implementation  */
    @Input('dialogRef')
    set embeddedDialogRef(value: DialogRef) {
        this._dialogRef = value;
    }

    /** DialogConfig - should be used for Template based Dialog implementation  */
    @Input('dialogConfig')
    set embeddedDialogConfig(value: DialogConfig) {
        this.dialogConfig = value;
    }

    /** @hidden */
    @ViewChild('dialogWindow')
    dialogWindow: ElementRef;

    /** @hidden If dialog subcomponents didn't receive DialogConfig from Injector, DialogConfig is passed from parent.
     * This is necessary when dialog has been passed as TemplateRef and created as EmbeddedView.
     * In such case parent injector of DialogComponent is the component that DECLARED the TemplateRef.
     **/
    @ContentChild(DialogHeaderComponent)
    set dialogHeaderConfig(component: DialogHeaderComponent) {
        if (component) {
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden */
    @ContentChild(DialogBodyComponent)
    set dialogBodyConfig(component: DialogBodyComponent) {
        if (component) {
            component.dialogRef = this._dialogRef;
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden */
    @ContentChild(DialogFooterComponent)
    set dialogFooterConfig(component: DialogFooterComponent) {
        if (component) {
            component.dialogConfig = this.dialogConfig;
        }
    }

    /** @hidden Whenever dialog should be visible */
    showDialogWindow: boolean;

    /** @hidden Whenever dialog is dragged */
    isDragged: boolean;

    /** @hidden Dialog padding sizes */
    dialogPaddingSize: 's' | 'm' | 'l' | 'xl';

    /** @hidden */
    private _focusTrap: FocusTrap;

    /** @hidden */
    private _class = '';

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        @Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
        @Optional() @Inject(DIALOG_REF) private _dialogRef: DialogRef,
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _router?: Router
    ) { }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnHidden();
        this._subscribeToNavigation();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._trapFocus();
        this._setStyles();
        this._listenOnWindowResize();
        this.adjustResponsivePadding();
        this._dialogRef.loaded();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._deactivateFocusTrap();
        this._subscriptions.unsubscribe();
    }

    /** @hidden Listen and close dialog on Escape key */
    @HostListener('keyup', ['$event'])
    closeDialogEsc(event: KeyboardEvent): void {
        if (this.dialogConfig.escKeyCloseable && (event.key === 'Escape' || event.key === 'Esc')) {
            this._dialogRef.dismiss('escape');
        }
    }

    /** @hidden Listen and close dialog on Backdrop click */
    @HostListener('mousedown', ['$event.target'])
    closeDialog(target: ElementRef): void {
        if (this.dialogConfig.backdropClickCloseable && target === this._elementRef.nativeElement) {
            this._dialogRef.dismiss('backdrop');
        }
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.dialogConfig.hasBackdrop ? 'fd-dialog' : '',
            this.showDialogWindow ? 'fd-dialog--active' : '',
            this._class,
            this.dialogConfig.backdropClass ? this.dialogConfig.backdropClass : ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden Determine Dialog padding size based on Dialogs window width */
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
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden Trap focus inside Dialog window */
    private _trapFocus(): void {
        if (this.dialogConfig.focusTrapped) {
            try {
                this._focusTrap = focusTrap(this._elementRef.nativeElement, {
                    clickOutsideDeactivates: this.dialogConfig.backdropClickCloseable && this.dialogConfig.hasBackdrop,
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
    private _deactivateFocusTrap(): void {
        if (this._focusTrap) {
            this._focusTrap.deactivate();
        }
    }

    /** @hidden Listen on Dialog visibility */
    private _listenOnHidden(): void {
        this._subscriptions.add(
            this._dialogRef.onHide.subscribe((isHidden) => {
                this.showDialogWindow = !isHidden;
                this.buildComponentCssClass();
            })
        );
    }

    /** @hidden Set Dialog styles from DialogConfig */
    private _setStyles(): void {
        this.dialogWindow.nativeElement.style.width = this.dialogConfig.width;
        this.dialogWindow.nativeElement.style.height = this.dialogConfig.height;
        this.dialogWindow.nativeElement.style.minWidth = this.dialogConfig.minWidth;
        this.dialogWindow.nativeElement.style.minHeight = this.dialogConfig.minHeight;
        this.dialogWindow.nativeElement.style.maxWidth = this.dialogConfig.maxWidth;
        this.dialogWindow.nativeElement.style.maxHeight = this.dialogConfig.maxHeight;

        if (this.dialogConfig.position) {
            this.dialogWindow.nativeElement.style.top = this.dialogConfig.position.top;
            this.dialogWindow.nativeElement.style.bottom = this.dialogConfig.position.bottom;
            this.dialogWindow.nativeElement.style.left = this.dialogConfig.position.left;
            this.dialogWindow.nativeElement.style.right = this.dialogConfig.position.right;
        } else {
            this.dialogWindow.nativeElement.style.position = 'relative';
        }
    }

    /** @hidden Listen on window resize and adjust padding */
    private _listenOnWindowResize(): void {
        if (this.dialogConfig.responsivePadding) {
            this._subscriptions.add(
                fromEvent(window, 'resize')
                    .pipe(debounceTime(100))
                    .subscribe(() => this.adjustResponsivePadding())
            );
        }
    }

    /** @hidden Subscribes to router navigation for the closing of dialog on navigation start. */
    private _subscribeToNavigation(): void {
        if (this._router) {
            this._subscriptions.add(
                this._router.events.subscribe(event => {
                    if (event instanceof NavigationStart && this.dialogConfig.closeOnNavigation) {
                        this._dialogRef.dismiss();
                    }
                })
            );
        }
    }
}
