import { ESCAPE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    inject,
    isDevMode,
    OnDestroy,
    OnInit
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { FocusTrapService, KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';

import { FD_DIALOG_FOCUS_TRAP_ERROR } from '../tokens';
import { DialogSize, dialogWidthToSize } from '../utils/dialog-width-to-size';
import { DialogConfigBase } from './dialog-config-base.class';
import { DialogRefBase } from './dialog-ref-base.class';

function coerceMetricValue(value: string | number | undefined): string | undefined {
    return typeof value === 'number' ? `${value}px` : value;
}

@Directive()
export abstract class DialogBase<T = any, D extends DialogRefBase<T> = DialogRefBase<T>>
    implements OnInit, AfterViewInit, OnDestroy
{
    /**
     * @hidden
     */
    @HostBinding('attr.dir')
    _dir: string;

    /** @hidden Reference to dialog window element*/
    abstract dialogWindow: ElementRef;

    /** @hidden Dialog padding sizes */
    dialogPaddingSize: DialogSize;

    /** @hidden */
    protected _focusTrapId: string;

    /** @hidden */
    protected _subscriptions = new Subscription();

    /** @hidden */
    abstract get _ref(): D;

    /** @hidden */
    abstract get _config(): DialogConfigBase<any>;

    /**
     * @hidden
     * Used to mute errors of focus trap during unit tests (jsdom incompatibility).
     */
    private readonly _focusTrapError = inject(FD_DIALOG_FOCUS_TRAP_ERROR, {
        optional: true
    });

    /** @hidden Listen and close dialog on Escape key */
    @HostListener('keydown', ['$event'])
    closeDialogEsc(event: KeyboardEvent): void {
        if (this._config.escKeyCloseable && KeyUtil.isKeyCode(event, ESCAPE)) {
            this._ref.dismiss('escape');
        }
    }

    /** @hidden Listen and close dialog on Backdrop click */
    @HostListener('mousedown', ['$event.target'])
    closeDialog(target: ElementRef): void {
        if (this._config.backdropClickCloseable && target === this.elementRef.nativeElement) {
            this._ref.dismiss('backdrop');
        }
    }

    /** @hidden */
    constructor(
        protected _router: Router,
        public readonly elementRef: ElementRef,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _rtlService: RtlService,
        protected _focusTrapService: FocusTrapService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._listenAndCloseOnNavigation();
        this._subscriptions.add(
            this._rtlService?.rtl.subscribe((isRtl) => {
                this._dir = isRtl ? 'rtl' : 'ltr';
                this._changeDetectorRef.detectChanges();
            })
        );
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
                this._router.events
                    .pipe(filter((event) => event instanceof NavigationStart && !!this._config.closeOnNavigation))
                    .subscribe(() => this._ref.dismiss())
            );
        }
    }

    /** @hidden Trap focus inside dialog window */
    private _trapFocus(): void {
        if (this._config.focusTrapped) {
            try {
                this._focusTrapId = this._focusTrapService.createFocusTrap(this.dialogWindow.nativeElement, {
                    clickOutsideDeactivates: this._config.backdropClickCloseable && this._config.hasBackdrop,
                    escapeDeactivates: false,
                    fallbackFocus: this.dialogWindow.nativeElement,
                    allowOutsideClick: () => true
                });
            } catch (e) {
                isDevMode() && this._focusTrapError !== true && console.error(e);
            }
        }
    }

    /** @hidden */
    private _deactivateFocusTrap(): void {
        this._focusTrapService.deactivateFocusTrap(this._focusTrapId);
    }

    /** @hidden Set dialog window position */
    private _setPosition(): void {
        if (this._config.position) {
            this.dialogWindow.nativeElement.style.top = coerceMetricValue(this._config.position.top);
            this.dialogWindow.nativeElement.style.bottom = coerceMetricValue(this._config.position.bottom);
            this.dialogWindow.nativeElement.style.left = coerceMetricValue(this._config.position.left);
            this.dialogWindow.nativeElement.style.right = coerceMetricValue(this._config.position.right);
        } else {
            this.dialogWindow.nativeElement.style.position = 'relative';
        }
    }

    /** @hidden Set dialog window width and height */
    private _setWidthHeight(): void {
        this.dialogWindow.nativeElement.style.width = coerceMetricValue(this._config.width);
        this.dialogWindow.nativeElement.style.height = coerceMetricValue(this._config.height);
        this.dialogWindow.nativeElement.style.minWidth = coerceMetricValue(this._config.minWidth);
        this.dialogWindow.nativeElement.style.minHeight = coerceMetricValue(this._config.minHeight);
        this.dialogWindow.nativeElement.style.maxWidth = coerceMetricValue(this._config.maxWidth);
        this.dialogWindow.nativeElement.style.maxHeight = coerceMetricValue(this._config.maxHeight);
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
