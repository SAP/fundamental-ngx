import { Directive, ElementRef, HostBinding, inject, Input, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import scrollbarStyles from 'fundamental-styles/dist/js/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';

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
export class ScrollbarDirective implements OnDestroy {
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

    /** Whether to force apply tabindex attribute. */
    @Input()
    overrideTabindex = true;

    /** @hidden */
    @HostBinding('attr.tabindex')
    get _tabindex(): number | null {
        return this.overrideTabindex ? 0 : null;
    }

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
    private _document: Document = inject(DOCUMENT);
    /** @hidden */
    private _noHorizontalScroll = false;

    /** @hidden */
    private _noVerticalScroll = false;

    /** @hidden */
    private _alwaysVisible = false;

    /**
     * @hidden
     */
    constructor(private _elementRef: ElementRef<HTMLElement>, renderer2: Renderer2) {
        scrollbarElementsQuantity++;
        const platform = inject(PLATFORM_ID);
        if (!styleSheet && isPlatformBrowser(platform)) {
            styleSheet = renderer2.createElement('style');
            styleSheet!.innerHTML = scrollbarStyles.cssSource;
            renderer2.appendChild(this._document.head, styleSheet);
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
        this._elementRef.nativeElement.scroll(options);
    }

    /** @hidden */
    private get _overflow(): ScrollbarOverflowOptions {
        if (this.alwaysVisible) {
            return 'scroll';
        }

        return 'auto';
    }
}
