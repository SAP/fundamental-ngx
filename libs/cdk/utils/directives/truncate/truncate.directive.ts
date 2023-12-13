import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Nullable } from '../../models/nullable';

@Directive({
    selector: '[fdkTruncate]',
    standalone: true
})
export class TruncateDirective implements OnChanges, AfterViewInit {
    /**
     * Width in pixel for truncation of an element , by default
     */
    @Input()
    set fdkTruncateWidth(value: Nullable<number>) {
        this._customWidthCount = coerceNumberProperty(value);
    }

    /**
     * Truncating state
     */
    @Input()
    fdkTruncateState = false;

    /** @ignore */
    private _customWidthCount = 200;

    /** @ignore */
    private _truncateTarget: HTMLElement;

    /** @ignore
     * saves default style of element before truncating
     */
    private _defaultStyle: string;

    /** @ignore */
    private takeDefaultStyleOnce = true;

    /** @ignore
     * truncation style for truncating element
     */
    private _truncationStyle: string;

    /** @ignore */
    constructor(private readonly _elementRef: ElementRef) {}

    /**
     * Root native element
     */
    get rootElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /**
     * Method saves default style of target element before first truncate.
     */
    setDefaultStyle(): void {
        if (this.takeDefaultStyleOnce) {
            this._defaultStyle = this._truncateTarget.style.cssText;
            this.takeDefaultStyleOnce = false;
        }
    }
    /** @ignore */
    ngAfterViewInit(): void {
        if (this.rootElement) {
            this._truncate();
        }
    }

    /** @ignore */
    ngOnChanges(): void {
        this._truncate();
    }

    /** @ignore */
    private _truncate(): void {
        this._truncateTarget = this.rootElement;

        if (!this._truncateTarget) {
            return;
        }
        this.setDefaultStyle();
        this._truncationStyle = `${this._defaultStyle} max-width: ${this._customWidthCount}px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`;
        this._truncateTarget.style.cssText = this.fdkTruncateState ? this._truncationStyle : this._defaultStyle;
    }
}
