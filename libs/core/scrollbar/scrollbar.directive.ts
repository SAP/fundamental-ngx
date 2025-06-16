import { CdkScrollable } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import {
    CSP_NONCE,
    DOCUMENT,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    PLATFORM_ID,
    Renderer2,
    booleanAttribute,
    inject
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
        class: 'fd-scrollbar'
    },
    hostDirectives: [CdkScrollable],
    standalone: true
})
export class ScrollbarDirective implements OnDestroy, HasElementRef {
    /** Whether overflow horizontal content should be hidden. */
    @Input({ transform: booleanAttribute })
    noHorizontalScroll = false;

    /** Whether overflow vertical content should be hidden. */
    @Input({ transform: booleanAttribute })
    noVerticalScroll = false;

    /** Whether scrollbars should be visible even if content fits. */
    @Input({ transform: booleanAttribute })
    alwaysVisible = false;

    /** @hidden */
    @HostBinding('style.overflow-x')
    get _overflowX(): ScrollbarOverflowOptions {
        if (this.noHorizontalScroll) {
            return 'hidden';
        }

        return this._overflow;
    }

    /** @hidden */
    @HostBinding('style.overflow-y')
    get _overflowY(): ScrollbarOverflowOptions {
        if (this.noVerticalScroll) {
            return 'hidden';
        }

        return this._overflow;
    }

    /** @hidden */
    _inPopover = false;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    private _document: Document = inject(DOCUMENT);

    /** @hidden */
    private readonly _csp_nonce = inject(CSP_NONCE, {
        optional: true
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
    @HostListener('scroll', ['$event'])
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

    /** @hidden */
    private get _overflow(): ScrollbarOverflowOptions {
        if (this.alwaysVisible) {
            return 'scroll';
        }

        return 'auto';
    }
}
