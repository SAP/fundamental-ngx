import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ESCAPE } from '@angular/cdk/keycodes';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { createFocusTrap, FocusTrap } from 'focus-trap';

import { DialogConfigBase } from './dialog-config-base.class';
import { DialogRefBase } from './dialog-ref-base.class';
import { DialogSize, dialogWidthToSize } from '../utils/dialog-width-to-size';
import { KeyUtil } from '../../utils/functions/key-util';

@Directive()
export abstract class DialogBase implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden Reference to dialog window element*/
    abstract dialogWindow: ElementRef;

    /** @hidden Dialog padding sizes */
    dialogPaddingSize: DialogSize;

    /** @hidden */
    protected _focusTrap: FocusTrap;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    abstract get _ref(): DialogRefBase<any>;

    /** @hidden */
    abstract get _config(): DialogConfigBase<any>;

    /** @hidden Listen and close dialog on Escape key */
    @HostListener('keyup', ['$event'])
    closeDialogEsc(event: KeyboardEvent): void {
        if (this._config.escKeyCloseable && KeyUtil.isKeyCode(event, ESCAPE)) {
            this._ref.dismiss('escape');
        }
    }

    /** @hidden Listen and close dialog on Backdrop click */
    @HostListener('mousedown', ['$event.target'])
    closeDialog(target: ElementRef): void {
        if (this._config.backdropClickCloseable && target === this._elementRef.nativeElement) {
            this._ref.dismiss('backdrop');
        }
    }

    /** @hidden */
    constructor(
        protected _router: Router,
        protected _elementRef: ElementRef,
        protected _changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._listenAndCloseOnNavigation();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._trapFocus();
        this._setPosition();
        this._setWidthHeight();
        this._listenOnWindowResize();
        this.adjustResponsivePadding();
        this._ref.loaded();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._deactivateFocusTrap();
        this._subscriptions.unsubscribe();
    }


    /** @hidden Determine dialog padding size based on dialogs window width */
    adjustResponsivePadding(): void {
        if (this._config.responsivePadding) {
            const dialogWidth = this.dialogWindow.nativeElement.getBoundingClientRect().width;
            this.dialogPaddingSize = dialogWidthToSize(dialogWidth);
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden Listen on NavigationStart event and dismiss the dialog */
    private _listenAndCloseOnNavigation(): void {
        if (this._router) {
            this._subscriptions.add(
                this._router.events.pipe(
                    filter(event => event instanceof NavigationStart && this._config.closeOnNavigation)
                ).subscribe(event => this._ref.dismiss())
            );
        }
    }

    /** @hidden Trap focus inside dialog window */
    private _trapFocus(): void {
        if (this._config.focusTrapped) {
            try {
                this._focusTrap = createFocusTrap(this.dialogWindow.nativeElement, {
                    clickOutsideDeactivates: this._config.backdropClickCloseable && this._config.hasBackdrop,
                    escapeDeactivates: false,
                    allowOutsideClick: (event: MouseEvent) => true
                });
                this._focusTrap.activate();
            } catch (e) {}
        }
    }

    /** @hidden */
    private _deactivateFocusTrap(): void {
        if (this._focusTrap) {
            this._focusTrap.deactivate();
        }
    }

    /** @hidden Set dialog window position */
    private _setPosition(): void {
        if (this._config.position) {
            this.dialogWindow.nativeElement.style.top = this._config.position.top;
            this.dialogWindow.nativeElement.style.bottom = this._config.position.bottom;
            this.dialogWindow.nativeElement.style.left = this._config.position.left;
            this.dialogWindow.nativeElement.style.right = this._config.position.right;
        } else {
            this.dialogWindow.nativeElement.style.position = 'relative';
        }
    }

    /** @hidden Set dialog window width and height */
    private _setWidthHeight(): void {
        this.dialogWindow.nativeElement.style.width = this._config.width;
        this.dialogWindow.nativeElement.style.height = this._config.height;
        this.dialogWindow.nativeElement.style.minWidth = this._config.minWidth;
        this.dialogWindow.nativeElement.style.minHeight = this._config.minHeight;
        this.dialogWindow.nativeElement.style.maxWidth = this._config.maxWidth;
        this.dialogWindow.nativeElement.style.maxHeight = this._config.maxHeight;
    }

    /** @hidden Listen on window resize and adjust padding */
    private _listenOnWindowResize(): void {
        if (this._config.responsivePadding) {
            this._subscriptions.add(
                fromEvent(window, 'resize')
                    .pipe(debounceTime(100))
                    .subscribe(() => this.adjustResponsivePadding())
            );
        }
    }
}
