import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkScrollable } from '@angular/cdk/overlay';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    CSP_NONCE,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    PLATFORM_ID,
    Renderer2,
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
    @Input()
    set noHorizontalScroll(value: BooleanInput) {
        this._noHorizontalScroll = coerceBooleanProperty(value);
    }

    get noHorizontalScroll(): boolean {
        return this._noHorizontalScroll;
    }

    /** Whether overflow vertical content should be hidden. */
    @Input()
    set noVerticalScroll(value: BooleanInput) {
        this._noVerticalScroll = coerceBooleanProperty(value);
    }

    get noVerticalScroll(): boolean {
        return this._noVerticalScroll;
    }

    /** Whether scrollbars should be visible even if content fits. */
    @Input()
    set alwaysVisible(value: BooleanInput) {
        this._alwaysVisible = coerceBooleanProperty(value);
    }

    get alwaysVisible(): boolean {
        return this._alwaysVisible;
    }

    /** @ignore */
    @HostBinding('style.overflow-x')
    get _overflowX(): ScrollbarOverflowOptions {
        if (this.noHorizontalScroll) {
            return 'hidden';
        }

        return this._overflow;
    }

    /** @ignore */
    @HostBinding('style.overflow-y')
    get _overflowY(): ScrollbarOverflowOptions {
        if (this.noVerticalScroll) {
            return 'hidden';
        }

        return this._overflow;
    }

    /** @ignore */
    _inPopover = false;

    /** @ignore */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @ignore */
    private _document: Document = inject(DOCUMENT);

    /** @ignore */
    private readonly _csp_nonce = inject(CSP_NONCE, {
        optional: true
    });

    /** @ignore */
    private _noHorizontalScroll = false;

    /** @ignore */
    private _noVerticalScroll = false;

    /** @ignore */
    private _alwaysVisible = false;

    /**
     * @ignore
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

    /** @ignore */
    @HostListener('scroll', ['$event'])
    onScroll(event: Event): void {
        if (this._inPopover) {
            event.stopImmediatePropagation();
        }
    }

    /** @ignore */
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

    /** @ignore */
    private get _overflow(): ScrollbarOverflowOptions {
        if (this.alwaysVisible) {
            return 'scroll';
        }

        return 'auto';
    }
}
