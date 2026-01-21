import { CdkScrollable } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import {
    CSP_NONCE,
    DOCUMENT,
    Directive,
    ElementRef,
    OnDestroy,
    PLATFORM_ID,
    Renderer2,
    booleanAttribute,
    computed,
    inject,
    input
} from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import scrollbarStyles from 'fundamental-styles/dist/js/scrollbar';

export type ScrollbarOverflowOptions = 'auto' | 'scroll' | 'hidden';

let scrollbarElementsQuantity = 0;
let styleSheet: HTMLStyleElement | null = null;

/**
 * The scrollbar directive.
 *
 * Children usage:
 * ```html
 * <div fd-scrollbar>
 * <div fd-scrollbar noVerticalScroll>
 * <div fd-scrollbar [noVerticalScroll]="true">
 * <div fd-scrollbar noHorizontalScroll>
 * <div fd-scrollbar [noHorizontalScroll]="true">
 * ```
 */
@Directive({
    selector: '[fdScrollbar], [fd-scrollbar]',
    host: {
        class: 'fd-scrollbar',
        '[style.overflow-x]': '_overflowX()',
        '[style.overflow-y]': '_overflowY()',
        '(scroll)': 'onScroll($event)'
    },
    hostDirectives: [CdkScrollable],
    standalone: true
})
export class ScrollbarDirective implements OnDestroy, HasElementRef {
    /** Whether overflow horizontal content should be hidden. */
    readonly noHorizontalScroll = input(false, { transform: booleanAttribute });

    /** Whether overflow vertical content should be hidden. */
    readonly noVerticalScroll = input(false, { transform: booleanAttribute });

    /** Whether scrollbars should be visible even if content fits. */
    readonly alwaysVisible = input(false, { transform: booleanAttribute });

    /** @hidden */
    _inPopover = false;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    protected readonly _overflowX = computed<ScrollbarOverflowOptions>(() => {
        if (this.noHorizontalScroll()) {
            return 'hidden';
        }

        return this._overflow();
    });

    /** @hidden */
    protected readonly _overflowY = computed<ScrollbarOverflowOptions>(() => {
        if (this.noVerticalScroll()) {
            return 'hidden';
        }

        return this._overflow();
    });

    /** @hidden */
    private _document: Document = inject(DOCUMENT);

    /** @hidden */
    private readonly _csp_nonce = inject(CSP_NONCE, {
        optional: true
    });

    /** @hidden */
    private readonly _overflow = computed<ScrollbarOverflowOptions>(() => {
        if (this.alwaysVisible()) {
            return 'scroll';
        }

        return 'auto';
    });

    /**
     * @hidden
     */
    constructor(renderer2: Renderer2) {
        scrollbarElementsQuantity++;
        const platform = inject(PLATFORM_ID);
        if (!styleSheet && isPlatformBrowser(platform)) {
            styleSheet = renderer2.createElement('style');
            styleSheet!.innerHTML = scrollbarStyles.cssSource;
            if (this._csp_nonce) {
                styleSheet?.setAttribute('nonce', this._csp_nonce);
            }
            renderer2.appendChild(this._document.head, styleSheet);
        }
    }

    /** @hidden */
    onScroll(event: Event): void {
        if (this._inPopover) {
            event.stopImmediatePropagation();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (--scrollbarElementsQuantity === 0) {
            styleSheet?.remove();
            styleSheet = null;
        }
    }

    /** method to invoke scroll */
    scroll(options: ScrollToOptions): void {
        this.elementRef.nativeElement.scroll(options);
    }
}
