import { Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'fdp-feed-input',
  templateUrl: './feed-input.component.html',
  styleUrls: ['./feed-input.component.scss']
})
export class FeedInputComponent {
    /** The user image source, If is not set, then the user image will display placeholder image.  */
    @Input()
    avatarSrc: string;

    /** Set placeholder textarea text */
    @Input()
    placeholder: string;

    /** Set feed input without user image */
    @Input()
    avatarShow = true;

    /** Feed Input disabled state */
    @Input()
    disabled = false;

    /** The max height allows textarea grow */
    @Input()
    maxHeight: number;

    /** @hidden */
    @ViewChild('textAreaElement', { read: ElementRef })
    textarea: ElementRef;

    value: string | null;

    constructor(private _ngZone: NgZone) {
    }

    onChange(): void {
        this.resize();
    }

    onSubmit(): void {

    }

    /** @hidden make to grow textarea */
    resize(): void {
        this.textarea.nativeElement.style.height = 'inherit';
        const totalHeight = this._getTextareaTotalHeight();

        if (this.maxHeight) {
            this.textarea.nativeElement.style.maxHeight = this._getTextareaLineHeight() * this.maxHeight + 'px';
        }

        this.textarea.nativeElement.style.height = totalHeight + 'px';
    }

    /** @hidden get line height of textarea */
    private _getTextareaLineHeight(): number {
        if (this.textarea && this.textarea.nativeElement) {
            const computed = window.getComputedStyle(this.textarea.nativeElement);

            return parseInt(computed.getPropertyValue('line-height'), 10);
        }
        return 20;
    }

    /** @hidden get the total height including borders and scroll height */
    private _getTextareaTotalHeight(): number {
        const computed = window.getComputedStyle(this.textarea.nativeElement);

        return parseInt(computed.getPropertyValue('border-top-width'), 10) +
            this.textarea.nativeElement.scrollHeight +
            parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    }
}
