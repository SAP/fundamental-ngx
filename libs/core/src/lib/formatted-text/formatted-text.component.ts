import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { HtmlSanitizer } from './utils/html-sanitizer';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';

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
    providers: [DestroyedService]
})
export class FormattedTextComponent {
    /**
     * Target attribute for included links.
     */
    @Input()
    set convertedLinksDefaultTarget(value: LinkTargetType) {
        this.convertedLinksDefaultTarget$.next(value);
    }

    /**
     * Text for formatted render.
     */
    @Input()
    set htmlText(value: string) {
        this.htmlText$.next(value);
    }

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

    /** @hidden */
    @HostBinding('innerHTML')
    formattedText: SafeHtml = '';

    /** @hidden */
    private htmlText$ = new Subject<string>();
    /** @hidden */
    private convertedLinksDefaultTarget$ = new BehaviorSubject<LinkTargetType>('_blank');

    /** @hidden */
    constructor(private readonly domSanitizer: DomSanitizer) {
        const _htmlSanitizer = new HtmlSanitizer();
        const _destroyed$ = inject(DestroyedService);
        combineLatest([this.htmlText$, this.convertedLinksDefaultTarget$])
            .pipe(takeUntil(_destroyed$))
            .subscribe(([htmlText, convertedLinksDefaultTarget]) => {
                _htmlSanitizer.extendAttrs({
                    target: convertedLinksDefaultTarget
                });
                const text = _htmlSanitizer.sanitizeHtml(htmlText);
                this.formattedText = this.domSanitizer.bypassSecurityTrustHtml(text.trim());
            });
    }
}
