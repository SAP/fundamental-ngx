import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { HtmlSanitizer } from './utils/html-sanitizer';

export type LinkTargetType = '' | '_blank' | '_self' | '_top' | '_parent' | '_search';

/**
 * Formatted-text component renders sanitized HTML content with configurable link behavior.
 *
 * This component accepts HTML text input and renders it after sanitization.
 * Only safe HTML tags are preserved; potentially dangerous content is stripped.
 *
 * @example
 * ```html
 * <fd-formatted-text
 *   [htmlText]="'<p>Hello <a href=\'#\'>World</a></p>'"
 *   [convertedLinksDefaultTarget]="'_blank'"
 *   [height]="'200px'">
 * </fd-formatted-text>
 * ```
 *
 * @selector fd-formatted-text
 * @exportAs fd-formatted-text
 */
@Component({
    selector: 'fd-formatted-text',
    exportAs: 'fd-formatted-text',
    template: ``,
    host: {
        '[class.fd-formatted-text-with-height]': 'height()',
        '[class.fd-formatted-text-with-width]': 'width()',
        '[style.height]': 'height()',
        '[style.width]': 'width()',
        '[innerHTML]': 'formattedText()'
    },
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormattedTextComponent {
    /**
     * HTML text content to be formatted and rendered.
     */
    readonly htmlText = input<string>();

    /**
     * Target attribute for anchor tags in the formatted content.
     * @default '_blank'
     */
    readonly convertedLinksDefaultTarget = input<LinkTargetType>('_blank');

    /**
     * Height style for component.
     */
    readonly height = input<string>();

    /**
     * Width style for component.
     */
    readonly width = input<string>();

    /**
     * Computed formatted and sanitized HTML content.
     * Automatically updates when htmlText or convertedLinksDefaultTarget changes.
     * @hidden
     */
    protected readonly formattedText = computed<SafeHtml>(() => {
        const rawText = this.htmlText();

        // Early return for empty content
        if (!rawText || !rawText.trim()) {
            return '';
        }

        this._htmlSanitizer.extendAttrs({
            target: this.convertedLinksDefaultTarget()
        });
        const text = this._htmlSanitizer.sanitizeHtml(rawText);
        return this._domSanitizer.bypassSecurityTrustHtml(text.trim());
    });

    /** @hidden */
    private readonly _htmlSanitizer = new HtmlSanitizer();

    /** @hidden */
    private readonly _domSanitizer = inject(DomSanitizer);
}
