import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-truncate]'
})
export class TruncationDirective implements AfterViewInit {
    @Input() charLength: number;
    @Input() pixLength: number;

    /** @hidden */
    private defaultTruncationByChar = 30;

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        const rootElement = this._elementRef.nativeElement;
        rootElement.title = rootElement.textContent; // adds title to element to enable mouse over tooltip

        if (this.pixLength) {
            this._truncateByPixel(rootElement);
        } else {
            this._truncateByChar(rootElement);
        }
    }

    /** @hidden
     * Truncates element by width
     */
    private _truncateByPixel(_element): void {
        _element.style.overflow = 'hidden';
        _element.style.textOverflow = 'ellipsis';
        _element.style.whiteSpace = 'nowrap';
        _element.style.width = `${this.pixLength}px`;
    }

    /** @hidden
     * Truncates element's text by characters
     */
    private _truncateByChar(_element): void {
        console.log(this._elementRef);
        _element.textContent = this._truncateText(_element.textContent);
    }

    /** @hidden
     * Truncates given text
     */
    private _truncateText(text: string): string {
        if (text.length > (this.charLength || this.defaultTruncationByChar)) {
            text = text.substring(0, this.charLength || this.defaultTruncationByChar) + '...';
        }
        return text;
    }
}
