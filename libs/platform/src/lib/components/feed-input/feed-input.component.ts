import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterViewInit,
    Renderer2,
    ElementRef,
} from '@angular/core';

@Component({
    selector: 'fdp-feed-input',
    templateUrl: './feed-input.component.html',
    styleUrls: ['./feed-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedInputComponent implements AfterViewInit {
    /** The user image source, If is not set, then the user image will display placeholder image.  */
    @Input()
    avatarSrc: string;

    /** Set placeholder textarea text */
    @Input()
    placeholder: string;

    /** Set feed input without user image */
    @Input()
    avatarShow = true;

    /** Set disabled state */
    @Input()
    disabled = false;

    /** The max number of rows to allow textarea grow */
    @Input()
    maxHeight: number;

    /** Set title attribute for accessibility user image */
    @Input()
    userTitle = 'User';

    /** @hidden Event emitted when user click on send button */
    @Output()
    submit = new EventEmitter<string>();

    /** @hidden */
    @ViewChild('textAreaElement', { read: ElementRef })
    textarea: ElementRef;

    /** @hidden Textarea entered value */
    value: string | null;

    /** @hidden */
    constructor(
        private _renderer: Renderer2
    ) {
    }

    /** @hidden */
    ngAfterViewInit(): void {
        const lineHeight = this._getTextareaLineHeight();

        if (this.maxHeight) {
            this.textarea.nativeElement.style.maxHeight = lineHeight * this.maxHeight + 'px';
        }
    }

    /** @hidden */
    onChange(): void {
        this.resize();
    }

    /** @hidden Handle submit feed input value*/
    onSubmit(): void {
        if (this.value) {
            this.submit.emit(this.value);
        }
    }

    /** @hidden Make grow textarea */
    resize(): void {
        this._renderer.setStyle(this.textarea.nativeElement, 'height', 'inherit');

        const totalHeight = this._getTextareaTotalHeight();
        this._renderer.setStyle(this.textarea.nativeElement, 'height', `${ totalHeight }px`);
    }

    /** @hidden get line height of textarea */
    private _getTextareaLineHeight(): number {
        if (this.textarea && this.textarea.nativeElement) {
            const lineHeight = window.getComputedStyle(this.textarea.nativeElement).getPropertyValue('line-height');
            if (lineHeight === 'normal') {
                return parseInt(window.getComputedStyle(this.textarea.nativeElement).getPropertyValue('font-size'), 10) * 1.1;
            }

            return parseInt(lineHeight, 10);
        }
    }

    /** @hidden Get the total height including borders and scroll height */
    private _getTextareaTotalHeight(): number {
        const computed = window.getComputedStyle(this.textarea.nativeElement);

        return parseInt(computed.getPropertyValue('border-top-width'), 10) +
            this.textarea.nativeElement.scrollHeight +
            parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    }
}
