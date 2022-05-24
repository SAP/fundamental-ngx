import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    AfterViewInit,
    OnDestroy,
    OnChanges,
    Output,
    Renderer2
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Nullable } from '@fundamental-ngx/core/shared';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-lineclamp-target]',
    exportAs: 'fdLineClampTarget'
})
export class LineClampTargetDirective implements OnChanges, AfterViewInit {
    /**
     * Target text for clamping
     */
    @Input()
    fdLineClampTargetText: string;

    /**
     * Event with target instance for clamping
     */
    @Output() update = new EventEmitter<LineClampTargetDirective>();

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef) {}

    /**
     * Native element of clamping target
     */
    get targetElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @hidden */
    ngOnChanges(): void {
        this.update.emit(this);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.update.emit(this);
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-lineclamp]',
    exportAs: 'fdLineClamp'
})
export class LineClampDirective implements OnChanges, AfterViewInit, OnDestroy {
    /**
     * Count lines for clamping
     */
    @Input()
    set fdLineClampLines(value: Nullable<number>) {
        this._lineCount = coerceNumberProperty(value);
    }

    /**
     * Clamping state
     */
    @Input()
    fdLineclampState = false;

    /**
     * Event return count of lines from the target
     */
    @Output()
    lineCountUpdate = new EventEmitter<number>();

    /** @hidden */
    private _lineClampTarget: HTMLElement;
    /** @hidden */
    private _originalText: string;
    /** @hidden */
    private windowResize$: Subscription;
    private _isNativeSupport = true;
    /** @hidden */
    private _lineCount: number;

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef, private readonly _renderer: Renderer2) {}

    /**
     * Root native element of clamping box
     */
    get rootElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._isNativeSupport = typeof this.rootElement.style.webkitLineClamp !== 'undefined';

        if (this.rootElement) {
            this._checkLineCount();

            this.windowResize$ = fromEvent(window, 'resize')
                .pipe(distinctUntilChanged(), debounceTime(200))
                .subscribe({
                    next: () => this._checkLineCount()
                });
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this.windowResize$) {
            this.windowResize$.unsubscribe();
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this.reset();
        this.refreshClamp();
    }

    reset(): void {
        if (this._lineClampTarget && this._originalText) {
            this._lineClampTarget.textContent = this._originalText;
        }
        if (this._isNativeSupport) {
            this._resetNative();
        }
    }

    refreshTarget(event: LineClampTargetDirective): void {
        this._lineClampTarget = event.targetElement;
        this._originalText = event.fdLineClampTargetText;
        this.reset();
        this.refreshClamp();
    }

    refreshClamp(): void {
        if (this.fdLineclampState && this._lineCount) {
            this.native();
            if (!this._isNativeSupport) {
                this._truncate();
            }
        }
    }

    /** @hidden
     * Truncate text in the target box, if browser not support lineclamp style
     */
    private _truncate(): void {
        if (!this._lineClampTarget) {
            return;
        }
        const lineClampHeight = Math.ceil(this.getLineHeight() * this._lineCount);
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
    private getLineHeight(): number {
        const lineHeight = window.getComputedStyle(this.rootElement, null).getPropertyValue('line-height');
        if (lineHeight === 'normal') {
            return parseInt(window.getComputedStyle(this.rootElement, null).getPropertyValue('font-size'), 10) * 1.25;
        }

        return parseFloat(lineHeight);
    }

    /** @hidden
     * Setup native styles for lineclamp text
     */
    private native(): void {
        if (this._isNativeSupport) {
            this._renderer.setStyle(this.rootElement, 'display', '-webkit-box');
            this._renderer.setStyle(this.rootElement, 'overflow', 'hidden');
            this._renderer.setStyle(this.rootElement, 'text-overflow', 'ellipsis');
            this._renderer.setStyle(this.rootElement, '-webkit-box-orient', 'vertical');
            this._renderer.setStyle(this.rootElement, '-webkit-line-clamp', `${this._lineCount}`);
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
            const padding_top = parseInt(style.getPropertyValue('padding-top'), 10);
            const padding_bottom = parseInt(style.getPropertyValue('padding-bottom'), 10);
            const border_top = parseInt(style.getPropertyValue('border-top-width'), 10);
            const border_bottom = parseInt(style.getPropertyValue('border-bottom-width'), 10);
            height = height - padding_top - padding_bottom - border_top - border_bottom;
        }
        this.refreshClamp();
        this.lineCountUpdate.emit(Math.ceil(height / lineHeight));
    }
}
