import {
    afterNextRender,
    DestroyRef,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    numberAttribute,
    output,
    Renderer2
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ViewportSizeObservable } from '../../tokens/viewport-size.observable';

@Directive({
    selector: '[fdkLineClampTarget], [fdLineClampTarget], [fd-lineclamp-target]',
    exportAs: 'fdLineClampTarget'
})
export class LineClampTargetDirective {
    /**
     * Target text for clamping
     */
    readonly fdLineClampTargetText = input<string>('');

    /**
     * Event with target instance for clamping
     */
    readonly update = output<LineClampTargetDirective>();

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /**
     * @hidden
     * Tracks whether the directive has completed its initial render.
     * Used to prevent a double emission on startup: afterNextRender handles
     * the first emit, so the effect must skip its own initial execution.
     */
    private _initialized = false;

    /**
     * Native element of clamping target
     */
    get targetElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @hidden */
    constructor() {
        // Skip the initial run — afterNextRender will emit once the view is ready.
        // Only emit on subsequent text changes.
        effect(() => {
            this.fdLineClampTargetText(); // track signal
            if (this._initialized) {
                this.update.emit(this);
            }
        });

        // Perform the initial emit after the first render and mark as initialized.
        afterNextRender(() => {
            this._initialized = true;
            this.update.emit(this);
        });
    }
}

@Directive({
    selector: '[fdkLineClamp]',
    exportAs: 'fdLineClamp'
})
export class LineClampDirective {
    /**
     * Count lines for clamping
     */
    readonly fdLineClampLines = input(0, { transform: numberAttribute });

    /**
     * Clamping state
     */
    readonly fdLineclampState = input(false);

    /**
     * Event return count of lines from the target
     */
    readonly lineCountUpdate = output<number>();

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _viewportSize$ = inject(ViewportSizeObservable);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _lineClampTarget: HTMLElement;

    /** @hidden */
    private _originalText: string;

    /**
     * @hidden
     * Determined once in the constructor — before effect() runs — so that
     * the very first effect execution already has the correct value.
     */
    private _isNativeSupport = true;

    /**
     * Root native element of clamping box
     */
    get rootElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @hidden */
    constructor() {
        // Detect native support immediately so effect() reads the correct value
        // on its first (synchronous) execution, before afterNextRender fires.
        this._isNativeSupport = typeof this.rootElement.style.webkitLineClamp !== 'undefined';

        // React to input changes
        effect(() => {
            const state = this.fdLineclampState();
            const lines = this.fdLineClampLines();

            // Only process if we have the required values
            if (Number.isFinite(lines) && lines > 0) {
                this.reset();
                this.refreshClamp(state, lines);
            }
        });

        // Initialize after view is ready.
        // _isNativeSupport is already set in the constructor; this only triggers
        // the initial line-count check once the element has been laid out.
        // setTimeout forces a recheck after parent elements have also rendered.
        afterNextRender(() => {
            setTimeout(() => {
                this._checkLineCount();
            });
        });

        // Subscribe to viewport changes
        this._viewportSize$
            .pipe(distinctUntilChanged(), debounceTime(200), takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => this._checkLineCount()
            });
    }

    /** @hidden */
    reset(): void {
        if (this._lineClampTarget) {
            this._lineClampTarget.textContent = this._originalText;
        }
        if (this._isNativeSupport) {
            this._resetNative();
        }
    }

    /** @hidden */
    refreshTarget(event: LineClampTargetDirective): void {
        this._lineClampTarget = event.targetElement;
        this._originalText = event.fdLineClampTargetText();
        this._checkLineCount();
    }

    /** @hidden
     * Refresh clamp styles based on state and line count
     */
    refreshClamp(state: boolean, lineCount: number): void {
        if (state && lineCount) {
            this._applyNative(lineCount);
            if (!this._isNativeSupport) {
                this._truncate(lineCount);
            }
        }
    }

    /** @hidden
     * Truncate text in the target box, if browser not support lineclamp style
     */
    private _truncate(lineCount: number): void {
        if (!this._lineClampTarget || !this._originalText) {
            return;
        }
        const lineClampHeight = Math.ceil(this._getLineHeight() * lineCount);
        const ellipsisTextArray = this._originalText.split(' ');
        const ellipsisText = (): void => {
            if (this.rootElement.scrollHeight > lineClampHeight) {
                ellipsisTextArray.pop();
                this._lineClampTarget.textContent = ellipsisTextArray.join(' ') + '...';
                ellipsisText.call(this);
            }
        };
        ellipsisText();
    }

    /** @hidden
     * Get lineheight for rootelement, if browser not support lineclamp style
     */
    private _getLineHeight(): number {
        const lineHeight = window.getComputedStyle(this.rootElement, null).getPropertyValue('line-height');
        if (lineHeight === 'normal') {
            return parseInt(window.getComputedStyle(this.rootElement, null).getPropertyValue('font-size'), 10) * 1.25;
        }

        return parseFloat(lineHeight);
    }

    /** @hidden
     * Setup native styles for lineclamp text
     */
    private _applyNative(lineCount: number): void {
        if (this._isNativeSupport) {
            this._renderer.setStyle(this.rootElement, 'display', '-webkit-box');
            this._renderer.setStyle(this.rootElement, 'overflow', 'hidden');
            this._renderer.setStyle(this.rootElement, 'text-overflow', 'ellipsis');
            this._renderer.setStyle(this.rootElement, '-webkit-box-orient', 'vertical');
            this._renderer.setStyle(this.rootElement, '-webkit-line-clamp', `${lineCount}`);
        }
    }

    /** @hidden
     * Reset native styles for lineclamp text
     */
    private _resetNative(): void {
        if (this._isNativeSupport) {
            this._renderer.setStyle(this.rootElement, 'display', '');
            this._renderer.setStyle(this.rootElement, 'overflow', '');
            this._renderer.setStyle(this.rootElement, 'text-overflow', '');
            this._renderer.setStyle(this.rootElement, '-webkit-box-orient', '');
            this._renderer.setStyle(this.rootElement, '-webkit-line-clamp', '');
        }
    }

    /** @hidden */
    private _checkLineCount(): void {
        if (!this.rootElement) {
            return;
        }
        const style = window.getComputedStyle(this.rootElement, null);

        this.reset();

        const fontSize = parseInt(style.getPropertyValue('font-size'), 10);
        const boxSizing = style.getPropertyValue('box-sizing');
        let height = parseInt(style.getPropertyValue('height'), 10);
        let lineHeight = parseFloat(style.getPropertyValue('line-height'));
        if (isNaN(lineHeight)) {
            lineHeight = fontSize * 1.2;
        }
        if (boxSizing === 'border-box') {
            const paddingTop = parseInt(style.getPropertyValue('padding-top'), 10);
            const paddingBottom = parseInt(style.getPropertyValue('padding-bottom'), 10);
            const borderTop = parseInt(style.getPropertyValue('border-top-width'), 10);
            const borderBottom = parseInt(style.getPropertyValue('border-bottom-width'), 10);
            height = height - paddingTop - paddingBottom - borderTop - borderBottom;
        }
        this.refreshClamp(this.fdLineclampState(), this.fdLineClampLines());
        this.lineCountUpdate.emit(Math.ceil(height / lineHeight));
    }
}
