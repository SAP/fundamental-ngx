import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output
} from '@angular/core';

@Directive({
    selector: '[fdFeedInputTextarea]',
    host: {
        '[class.fd-feed-input__textarea]': 'true'
    }
})
export class FeedInputTextareaDirective {
    /** rows are allowed to grow */
    @Input()
    fdFeedInputTextareaMaxRows: number;

    /** Event emitted when the textarea value changed */
    @Output()
    valueChange = new EventEmitter<boolean>();

    /** @hidden */
    @HostListener('keyup', ['$event'])
    onKeyup(event): void {
        this.resize();
        this.valueChange.emit(event.target.value);
    }

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    get elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden make to grow textarea */
    resize(): void {
        this._elementRef.nativeElement.style.height = 'inherit';
        const totalHeight = this._getTextareaTotalHeight();

        if (this.fdFeedInputTextareaMaxRows) {
            this._elementRef.nativeElement.style.maxHeight = this._getTextareaLineHeight() * this.fdFeedInputTextareaMaxRows + 'px';
        }

        this._elementRef.nativeElement.style.height = totalHeight + 'px';
    }

    /** @hidden get line height of textarea */
    private _getTextareaLineHeight(): number {
        if (this._elementRef && this._elementRef.nativeElement) {
            const computed = window.getComputedStyle(this._elementRef.nativeElement);

            return parseInt(computed.getPropertyValue('line-height'), 10);
        }
        return 20;
    }

    /** @hidden get the total height including borders and scroll height */
    private _getTextareaTotalHeight(): number {
        const computed = window.getComputedStyle(this._elementRef.nativeElement);

        return parseInt(computed.getPropertyValue('border-top-width'), 10) +
            this.elementRef.nativeElement.scrollHeight +
            parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    }
}
