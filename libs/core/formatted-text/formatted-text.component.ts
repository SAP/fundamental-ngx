import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { HtmlSanitizer } from './utils/html-sanitizer';

export type LinkTargetType = '' | '_blank' | '_self' | '_top' | '_parent' | '_search';

/**
 * Formatted-text allowed tags, only this tags will render in component, other will skip;
 *
 * ``` selector: fd-formatted-text ```
 *
 * ```html
 * <fd-formatted-text [htmlText]="..."></fd-formatted-text>
 * ```
 */

@Component({
    selector: 'fd-formatted-text',
    exportAs: 'fd-formatted-text',
    template: ``,
    styles: [
        `
            fd-formatted-text {
                display: block;
            }
            fd-formatted-text.fd-formatted-text-with-height {
                overflow-y: auto;
            }
            fd-formatted-text.fd-formatted-text-with-width {
                overflow-x: auto;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FormattedTextComponent implements OnInit, OnChanges {
    /**
     * Text for formatted render.
     */
    @Input()
    htmlText: string;
    /**
     * Target attribute for included links.
     */
    @Input()
    convertedLinksDefaultTarget: LinkTargetType = '_blank';
    /**
     * Height style for component.
     */
    @Input()
    @HostBinding('class.fd-formatted-text-with-height')
    @HostBinding('style.height')
    height?: string;
    /**
     * Width style for component.
     */
    @Input()
    @HostBinding('class.fd-formatted-text-with-width')
    @HostBinding('style.width')
    width?: string;

    /** @ignore */
    @HostBinding('innerHTML')
    formattedText: SafeHtml = '';

    /** @ignore */
    private _htmlSanitizer!: HtmlSanitizer;

    /** @ignore */
    constructor(private readonly domSanitizer: DomSanitizer) {
        this._htmlSanitizer = new HtmlSanitizer();
    }

    /** @ignore */
    ngOnInit(): void {
        this.render();
    }

    /** @ignore */
    ngOnChanges(changes: SimpleChanges): void {
        if ('htmlText' in changes) {
            this.render();
        }
    }

    /** @ignore */
    private render(): void {
        this._htmlSanitizer.extendAttrs({
            target: this.convertedLinksDefaultTarget
        });
        const text = this._htmlSanitizer.sanitizeHtml(this.htmlText ?? '');
        this.formattedText = this.domSanitizer.bypassSecurityTrustHtml(text.trim());
    }
}
