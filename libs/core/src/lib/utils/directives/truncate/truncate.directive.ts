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

export enum DefaultTruncateCharCount {
    MAX = 500,
    MIN = 300
}

@Directive({
    // tslint:disable-next-line:directive-selector
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
    set fdTruncateChars(value: number) {
        this._customCharCount = coerceNumberProperty(value);
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

    /** @hidden */
    private _originalText: string;

    /** @hidden */
    private _truncatedText: string;

    /** @hidden */
    private _customCharCount: number;

    /** @hidden */
    private _widthCount: number;

    /** @hidden */
    private _maxChars: number;

    /** @hidden */
    private _hasMore: boolean;

    /** @hidden */
    private windowResize$: Subscription;

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef, private readonly _renderer: Renderer2) {}

    /**
     * Root native element
     */
    get rootElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.rootElement) {
            this._initTruncate();

            this.windowResize$ = fromEvent(window, 'resize')
                .pipe(distinctUntilChanged(), debounceTime(200))
                .subscribe({
                    next: () => this._checkWidth()
                });

            this.refreshTruncate();
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
        this.refreshTarget(this);
        this.reset();
        this.refreshTruncate();
    }

    reset(): void {
        if (this._truncateTarget && this._originalText) {
            this._truncateTarget.textContent = this._originalText + ' ';
        }
    }

    refreshTarget(event: TruncateDirective): void {
        this._truncateTarget = event.rootElement;
        this._originalText = event.fdTruncateTargetText;
        this.reset();
        this.refreshTruncate();
    }

    refreshTruncate(): void {
        if (this.fdTruncateState && this._hasMore) {
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

        if (this._originalText && this._originalText.length > this._maxChars) {
            this._hasMore = true;
            this.charCountUpdate.emit(this._hasMore);
            this._truncate();
        }
    }

    /** @hidden
     *  Toggle present text
     */
    private _toggleTruncate(): void {
        this._truncateTarget.textContent = this.fdTruncateState ? this._truncatedText : this._originalText;
    }

    /** @hidden
     * Truncate text in the target box, if the target exceeds the number of characters
     */
    private _truncate(): void {
        if (!this._truncateTarget) {
            return;
        }

        const ellipsisTextArray = this._originalText.split('');
        while (ellipsisTextArray.length >= this._maxChars) {
            ellipsisTextArray.pop();
        }

        this._truncatedText = this._truncateTarget.textContent = ellipsisTextArray.join('') + ' … ';
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
}
