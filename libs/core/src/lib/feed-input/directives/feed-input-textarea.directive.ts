import {
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    Renderer2
} from '@angular/core';

@Directive({
    selector: '[fdFeedInputTextarea]',
    host: {
        '[class.fd-feed-input__textarea]': 'true',
        '[class.fd-textarea]': 'true'
    }
})
export class FeedInputTextareaDirective implements OnInit {
    /** rows are allowed to grow */
    @Input()
    fdFeedInputTextareaMaxRows: number;

    @HostBinding('disabled')
    @HostBinding('attr.aria-disabled')
    disabled: boolean;

    /** Event emitted when the textarea value changed */
    @Output()
    valueChange = new EventEmitter<boolean>();

    /** @hidden */
    @HostListener('keyup', ['$event'])
    onKeyup(event): void {
        this.resize();
        this.valueChange.emit(event.target.value);
    }

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2
    ) {}

    /** @hidden */
    get elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    ngOnInit(): void {
        if (this.fdFeedInputTextareaMaxRows) {
            const lineHeight = this._getTextareaLineHeight();
            this._elementRef.nativeElement.style.maxHeight = lineHeight * this.fdFeedInputTextareaMaxRows + 'px';
        }
    }

    /** @hidden make to grow textarea */
    resize(): void {
        this._renderer.setStyle(this.elementRef.nativeElement, 'height', 'inherit');

        const totalHeight = this._getTextareaTotalHeight();
        this._renderer.setStyle(this.elementRef.nativeElement, 'height', `${ totalHeight }px`);
    }

    /** @hidden get line height of textarea */
    private _getTextareaLineHeight(): number {
        const lineHeight = window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('line-height');

        if (lineHeight === 'normal') {
            return parseInt(window.getComputedStyle(this.elementRef.nativeElement).getPropertyValue('font-size'), 10) * 1.1;
        }

        return parseInt(lineHeight, 10);
    }

    /** @hidden get the total height including borders and scroll height */
    private _getTextareaTotalHeight(): number {
        const computed = window.getComputedStyle(this._elementRef.nativeElement);

        return parseInt(computed.getPropertyValue('border-top-width'), 10) +
            this.elementRef.nativeElement.scrollHeight +
            parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    }
}
