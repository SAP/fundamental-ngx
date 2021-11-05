import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export enum TruncateCharCount {
    DEFAULT = 500,
    LESS = 300
}

@Directive({
    // tslint:disable-next-line:directive-selector
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
    ngOnChanges(changes: SimpleChanges): void {
        this.update.emit(this);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.update.emit(this);
    }
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-lineclamp]',
    exportAs: 'fdLineClamp'
})
export class LineClampDirective implements OnChanges, AfterViewInit, OnDestroy {
    /**
     * Count lines for clamping
     */
    @Input()
    set fdLineClampLines(value: number) {
        this._lineCount = coerceNumberProperty(value);
    }

    /**
     * Count chars for clamping
     * @param value
     */
    @Input()
    set fdLineClampChars(value: number) {
        this._charCount = coerceNumberProperty(value);
    }

    /**
     * Clamping state
     */
    @Input()
    fdLineClampState = false;

    /**
     * Event return count of characters from the target
     */
    @Output()
    charCountUpdate = new EventEmitter<boolean>();

    /** @hidden */
    private _lineClampTarget: HTMLElement;

    /** @hidden */
    private _originalText: string;

    /** @hidden */
    private _truncatedText: string;

    /** @hidden */
    private windowResize$: Subscription;

    /** @hidden */
    private _lineCount: number; // deprecated

    /** @hidden */
    private _charCount: number;

    /** @hidden */
    private _widthCount: number;

    /** @hidden */
    private _maxChars: number;

    /** @hidden */
    private _hasMore: boolean;

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
        if (this.rootElement) {
            this._initLineClamp();

            this.windowResize$ = fromEvent(window, 'resize')
                .pipe(distinctUntilChanged(), debounceTime(200))
                .subscribe({
                    next: () => this._checkWidth()
                });

            this.refreshClamp();
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
            this._lineClampTarget.textContent = this._originalText + ' ';
        }
    }

    refreshTarget(event: LineClampTargetDirective): void {
        this._lineClampTarget = event.targetElement;
        this._originalText = event.fdLineClampTargetText;
        this.reset();
        this.refreshClamp();
    }

    refreshClamp(): void {
        if (this.fdLineClampState && this._hasMore) {
            this._toggleTruncate();
        }
    }

    /** @hidden
     *  Initialising lineclamp properties
     */
    private _initLineClamp(): void {
        const style = window.getComputedStyle(this.rootElement, null);
        this._widthCount = parseInt(style.getPropertyValue('font-size'), 10) * 25;

        this._checkWidth();

        if (this._originalText && this._originalText.length > this._maxChars) {
            this._hasMore = true;
            this.charCountUpdate.emit(this._hasMore);
            this._truncate();
        }
    }

    /** @hidden
     *  Toggle present text depends on lineclamp state
     */
    private _toggleTruncate(): void {
        this._lineClampTarget.textContent = this.fdLineClampState ? this._truncatedText : this._originalText;
    }

    /** @hidden
     * Truncate text in the target box, if the target exceeds the number of characters
     */
    private _truncate(): void {
        if (!this._lineClampTarget) {
            return;
        }

        const ellipsisTextArray = this._originalText.split('');

        while (ellipsisTextArray.length >= this._maxChars) {
            ellipsisTextArray.pop();
        }

        this._truncatedText = this._lineClampTarget.textContent = ellipsisTextArray.join('') + ' ... ';
    }

    /** @hidden */
    private _checkWidth(): void {
        const width = this.rootElement.offsetWidth;

        this._maxChars = this._charCount
            ? this._charCount
            : width >= this._widthCount
            ? TruncateCharCount.DEFAULT
            : TruncateCharCount.LESS;

        if (this.fdLineClampState && this._hasMore) {
            this._truncate();
        }
    }
}
