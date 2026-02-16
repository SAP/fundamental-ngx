import { ESCAPE } from '@angular/cdk/keycodes';
import {
    afterNextRender,
    computed,
    DestroyRef,
    Directive,
    effect,
    ElementRef,
    inject,
    Injector,
    isDevMode,
    OnDestroy,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { FocusTrapService, HasElementRef, KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';

import { FD_DIALOG_FOCUS_TRAP_ERROR } from '../tokens';
import { DialogSize, dialogWidthToSize } from '../utils/dialog-width-to-size';
import { DialogConfigBase } from './dialog-config-base.class';
import { DialogRefBase, FD_DIALOG_DISMISS_REASON } from './dialog-ref-base.class';

function coerceMetricValue(value: string | number | undefined): string | undefined {
    return typeof value === 'number' ? `${value}px` : value;
}

@Directive({
    host: {
        '[attr.dir]': 'dir()',
        '(keydown)': 'closeDialogEsc($event)',
        '(mousedown)': 'closeDialog($event.target)'
    }
})
export abstract class DialogBase<T = any, D extends DialogRefBase<T> = DialogRefBase<T>>
    implements OnDestroy, HasElementRef
{
    /** @hidden Reference to dialog window element*/
    abstract dialogWindow: ElementRef;

    /** @hidden */
    abstract get _ref(): D;

    /** @hidden */
    abstract get _config(): DialogConfigBase<any>;

    /** @hidden */
    readonly _focusTrapService = inject(FocusTrapService);

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly _router = inject(Router);

    /** @hidden */
    protected readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    protected readonly _injector = inject(Injector);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden RTL direction computed from service */
    protected readonly dir = computed(() => ((this._rtlService?.rtl() ?? false) ? 'rtl' : 'ltr'));

    /** @hidden Dialog padding sizes - signal for reactive updates */
    protected readonly dialogPaddingSize = signal<DialogSize | undefined>(undefined);

    /** @hidden Focus trap ID - used by child classes to pause/unpause */
    protected _focusTrapId: string | undefined;

    /** @hidden Dialog width - tracked via ResizeObserver */
    private readonly _dialogWidth = signal<number>(0);

    /** @hidden ResizeObserver for dialog element */
    private _resizeObserver?: ResizeObserver;

    /**
     * @hidden
     * Used to mute errors of focus trap during unit tests (jsdom incompatibility).
     */
    private readonly _focusTrapError = inject(FD_DIALOG_FOCUS_TRAP_ERROR, {
        optional: true
    });

    /** @hidden */
    constructor() {
        // Setup navigation listener (doesn't require view)
        this._listenAndCloseOnNavigation();

        // Reactive effect: automatically update padding size when dialog width changes
        effect(() => {
            const width = this._dialogWidth();
            if (this._config.responsivePadding && width > 0) {
                this.dialogPaddingSize.set(dialogWidthToSize(width));
            }
        });

        // Setup view-dependent initialization after render
        afterNextRender(
            () => {
                this.setupFocusTrap();
                this.applyStyles();
                this.setupResizeObserver();
                this._ref.loaded();
            },
            { injector: this._injector }
        );
    }

    /** @hidden Listen and close dialog on Escape key */
    closeDialogEsc(event: KeyboardEvent): void {
        if (this._config.escKeyCloseable && KeyUtil.isKeyCode(event, ESCAPE)) {
            this._ref.dismiss(FD_DIALOG_DISMISS_REASON.ESCAPE);
        }
    }

    /** @hidden Listen and close dialog on Backdrop click */
    closeDialog(target: EventTarget | null): void {
        if (this._config.backdropClickCloseable && target === this.elementRef.nativeElement) {
            this._ref.dismiss(FD_DIALOG_DISMISS_REASON.BACKDROP);
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._deactivateFocusTrap();
        this._resizeObserver?.disconnect();
    }

    /**
     * @deprecated Use reactive ResizeObserver instead. This method is kept for backward compatibility
     * but is no longer needed as padding updates happen automatically via signals.
     * @hidden Determine dialog padding size based on dialogs window width
     */
    adjustResponsivePadding(): void {
        if (this._config.responsivePadding && this.dialogWindow) {
            const width = this.dialogWindow.nativeElement.getBoundingClientRect().width;
            this._dialogWidth.set(width); // Let the effect handle the rest
        }
    }

    /** @hidden Setup focus trap - called from constructor via afterNextRender */
    protected setupFocusTrap(): void {
        if (this._config.focusTrapped && this.dialogWindow) {
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

    /**
     * @hidden
     * Apply all style configurations to dialog element (position and dimensions).
     * Combines position and size styling in one method for better organization.
     */
    protected applyStyles(): void {
        const el = this.dialogWindow.nativeElement;
        const { position, width, height, minWidth, minHeight, maxWidth, maxHeight } = this._config;

        // Apply position styles
        if (position) {
            el.style.top = coerceMetricValue(position.top);
            el.style.bottom = coerceMetricValue(position.bottom);
            el.style.left = coerceMetricValue(position.left);
            el.style.right = coerceMetricValue(position.right);
        } else {
            el.style.position = 'relative';
        }

        // Apply dimension styles
        el.style.width = coerceMetricValue(width);
        el.style.height = coerceMetricValue(height);
        el.style.minWidth = coerceMetricValue(minWidth);
        el.style.minHeight = coerceMetricValue(minHeight);
        el.style.maxWidth = coerceMetricValue(maxWidth);
        el.style.maxHeight = coerceMetricValue(maxHeight);
    }

    /**
     * @hidden
     * Sets up ResizeObserver to track dialog element size changes.
     */
    protected setupResizeObserver(): void {
        if (this._config.responsivePadding) {
            this._resizeObserver = new ResizeObserver((entries) => {
                if (entries.length > 0) {
                    const width = entries[0].contentRect.width;
                    this._dialogWidth.set(width);
                }
            });
            this._resizeObserver.observe(this.dialogWindow.nativeElement);
        }
    }

    /** @hidden Listen on NavigationStart event and dismiss the dialog */
    private _listenAndCloseOnNavigation(): void {
        if (this._router) {
            this._router.events
                .pipe(
                    filter((event) => event instanceof NavigationStart && !!this._config.closeOnNavigation),
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(() => this._ref.dismiss(FD_DIALOG_DISMISS_REASON.NAVIGATION_CHANGE));
        }
    }

    /** @hidden Deactivate focus trap on destroy */
    private _deactivateFocusTrap(): void {
        if (this._focusTrapId) {
            this._focusTrapService.deactivateFocusTrap(this._focusTrapId);
        }
    }
}
