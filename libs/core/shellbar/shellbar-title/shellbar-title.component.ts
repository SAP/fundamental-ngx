import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    Renderer2,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { LineClampDirective } from '@fundamental-ngx/cdk/utils';

/**
 * The component that represents a shellbar title.
 * The title is a required element and displays the current application name.
 * Text will wrap to a maximum of 2 lines, shrinking the font size if needed to fit.
 * ```html
 *   <fd-shellbar-title>
 *      Corporate Portal
 *   </fd-shellbar-title>
 * ```
 */
@Component({
    selector: 'fd-shellbar-title',
    templateUrl: './shellbar-title.component.html',
    styleUrl: './shellbar-title.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LineClampDirective]
})
export class ShellbarTitleComponent {
    protected readonly _fontSize = signal<number | null>(null);

    private readonly _elementRef = inject(ElementRef);
    private readonly _renderer = inject(Renderer2);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _maxLines = 2;
    private readonly _minFontSizeRem = 0.75;
    private readonly _maxFontSizeRem = 1;
    private _resizeObserver: ResizeObserver | null = null;

    constructor() {
        afterNextRender(() => {
            this._adjustFontSize();
            this._setupResizeObserver();
        });
    }

    private _setupResizeObserver(): void {
        const element = this._elementRef.nativeElement.querySelector('.fd-shellbar__title') as HTMLElement;
        if (!element) {
            return;
        }

        this._resizeObserver = new ResizeObserver(() => {
            this._adjustFontSize();
        });

        this._resizeObserver.observe(element);

        // Cleanup on destroy
        this._destroyRef.onDestroy(() => {
            this._resizeObserver?.disconnect();
        });
    }

    private _adjustFontSize(): void {
        const element = this._elementRef.nativeElement.querySelector('.fd-shellbar__title') as HTMLElement;
        if (!element) {
            return;
        }

        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        let fontSizeRem = this._maxFontSizeRem;
        this._fontSize.set(fontSizeRem * rootFontSize);

        // Allow the DOM to update with the new font size
        setTimeout(() => {
            const lineHeight = this._getLineHeight(element);
            const maxHeight = lineHeight * this._maxLines;

            // Shrink font size until content fits within max lines
            while (fontSizeRem > this._minFontSizeRem && element.scrollHeight > maxHeight) {
                fontSizeRem -= 0.0625; // 1/16 = 0.0625rem increments
                this._fontSize.set(fontSizeRem * rootFontSize);
                // Force synchronous style recalc
                element.getBoundingClientRect();
            }
        });
    }

    private _getLineHeight(element: HTMLElement): number {
        const style = window.getComputedStyle(element);
        const lineHeight = style.getPropertyValue('line-height');

        if (lineHeight === 'normal') {
            const fontSize = parseInt(style.getPropertyValue('font-size'), 10);
            return fontSize * 1.2;
        }

        return parseFloat(lineHeight);
    }
}
