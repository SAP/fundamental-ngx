import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Nullable } from '@fundamental-ngx/core/shared';

export enum DefaultTruncateCharCount {
    MAX = 500,
    MIN = 300
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-truncate]'
})
export class TruncateDirective implements OnChanges, AfterViewInit, OnDestroy {
    /**
     * Target text for clamping
     */
    @Input()
    fdTruncateTargetText: string;

    /**
     * Count chars for truncating
     */
    @Input()
    set fdTruncateChars(value: Nullable<number>) {
        this._customCharCount = coerceNumberProperty(value);
    }

    /**
     * Width in pixel for truncation of an element
     */
    @Input()
    set fdTruncateWidth(value: Nullable<number>) {
        this._customWidthCount = coerceNumberProperty(value);
    }

    /**
     * Truncating state
     */
    @Input()
    fdTruncateState = false;

    /**
     * Event return count of characters from the target
     */
    @Output()
    charCountUpdate = new EventEmitter<boolean>();

    /** @hidden */
    private _truncateTarget: HTMLElement;

    /** @hidden
     * If fdTruncateTargetText is not provided this directive truncates Text Content of an element
     *
     * Text Content of an element
     */
    private _fdTruncateTargetTextContent: string;

    /** @hidden */
    private _originalText: string;

    /** @hidden */
    private _truncatedText: string;

    /** @hidden */
    private _customCharCount: number;

    /** @hidden */
    private _customWidthCount: number;

    /** @hidden */
    private _widthCount: number;

    /** @hidden */
    private _maxChars: number;

    /** @hidden */
    private _hasMore: boolean;

    /** @hidden */
    private _windowResize$: Subscription;

    /** @hidden
     * saves default style of element before truncating
     */
    private _defaultStyle: string;

    /** @hidden
     * truncation style for truncating element
     */
    private _truncationStyle: string;

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef, private readonly _renderer: Renderer2) {}

    /**
     * Root native element
     */
    get rootElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @hidden
     * Sets fdTruncateTargetInnerText
     */
    _setTextContent(): void {
        this._fdTruncateTargetTextContent = this._elementRef.nativeElement.textContent;
    }

    /** @hidden
     * Sets default style
     */
    _setDefaultStyle(): void {
        this._defaultStyle = this._elementRef.nativeElement.style.cssText;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.rootElement) {
            this._setTextContent();
            this._setDefaultStyle();

            this.refreshTarget(this);
            this.reset();

            this._initTruncate();

            this._windowResize$ = fromEvent(window, 'resize')
                .pipe(distinctUntilChanged(), debounceTime(200))
                .subscribe({
                    next: () => this._checkWidth()
                });

            this.refreshTruncate();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._windowResize$) {
            this._windowResize$.unsubscribe();
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this.refreshTarget(this);
        this.reset();
        this._initTruncate();
        this.refreshTruncate();
    }

    reset(): void {
        if (!this._customWidthCount && this._truncateTarget && this._originalText) {
            this._truncateTarget.textContent = this._originalText + ' ';
        }
    }

    refreshTarget(event: TruncateDirective): void {
        this._truncateTarget = event.rootElement;
        this._originalText = event.fdTruncateTargetText
            ? event.fdTruncateTargetText
            : this._fdTruncateTargetTextContent
            ? this._fdTruncateTargetTextContent
            : '';
    }

    refreshTruncate(): void {
        if (this._hasMore) {
            this._toggleTruncate();
        }
    }

    /** @hidden
     *  Initialising truncate properties
     */
    private _initTruncate(): void {
        const style = window.getComputedStyle(this.rootElement, null);
        this._widthCount = parseInt(style.getPropertyValue('font-size'), 10) * 25;

        this._checkWidth();

        if ((this._originalText && this._originalText.length > this._maxChars) || this._customWidthCount) {
            this._hasMore = true;
            this.charCountUpdate.emit(this._hasMore);
            if (this.fdTruncateState) {
                this._truncate();
            }
        }
    }

    /** @hidden
     *  Toggle present text
     */
    private _toggleTruncate(): void {
        if (this._customWidthCount) {
            this._truncateTarget.style.cssText = this.fdTruncateState ? this._truncationStyle : this._defaultStyle;
            if (this.fdTruncateTargetText) {
                this._truncateTarget.textContent = this.fdTruncateTargetText;
            }
        } else {
            this._truncateTarget.textContent = this.fdTruncateState ? this._truncatedText : this._originalText;
        }
    }

    /** @hidden
     * Truncate text in the target box, if the target exceeds the number of characters
     */
    private _truncate(): void {
        if (!this._truncateTarget) {
            return;
        }
        if (this._customWidthCount) {
            this._truncationStyle = this._truncateByWidth();
        } else {
            this._truncatedText = this._truncateText(this._originalText, this._maxChars);
        }
    }

    /** @hidden */
    private _checkWidth(): void {
        const width = this.rootElement.offsetWidth;

        this._maxChars = this._customCharCount
            ? this._customCharCount
            : width >= this._widthCount
            ? DefaultTruncateCharCount.MAX
            : DefaultTruncateCharCount.MIN;

        if (this.fdTruncateState && this._hasMore) {
            this._truncate();
        }
    }

    /** @hidden
     * Truncates element by pixel length
     */
    private _truncateByWidth(): string {
        return `${this._defaultStyle} max-width: ${this._customWidthCount}px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`;
    }

    /** @hidden
     * Truncates text by limit value
     */
    private _truncateText(text: string, limit: number): string {
        return text.substring(0, limit) + ' … ';
    }
}
