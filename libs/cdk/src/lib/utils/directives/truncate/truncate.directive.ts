import { AfterViewInit, Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Nullable } from '../../models/nullable';

@Directive({
    selector: '[fdkTruncate], [fdTruncate], [fd-truncate]',
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

    /** @hidden */
    private _customWidthCount = 200;

    /** @hidden */
    private _truncateTarget: HTMLElement;

    /** @hidden
     * saves default style of element before truncating
     */
    private _defaultStyle: string;

    /** @hidden */
    private takeDefaultStyleOnce = true;

    /** @hidden
     * truncation style for truncating element
     */
    private _truncationStyle: string;

    /** @hidden */
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
    /** @hidden */
    ngAfterViewInit(): void {
        if (this.rootElement) {
            this._truncate();
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this._truncate();
    }

    /** @hidden */
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
