import { DestroyRef, Directive, ElementRef, Renderer2, afterNextRender, effect, inject, input } from '@angular/core';

/**
 * Directive that sets the title attribute on an element when its text content overflows.
 * Uses ResizeObserver to detect overflow without forcing layout reflows during change detection.
 * Uses MutationObserver to detect text content changes and update the title accordingly.
 */
@Directive({
    selector: '[fdpTableCellOverflow]'
})
export class TableCellOverflowDirective {
    /** Whether the directive is enabled. */
    readonly fdpTableCellOverflow = input(false);

    private readonly _elementRef = inject(ElementRef<HTMLElement>);
    private readonly _renderer = inject(Renderer2);
    private readonly _destroyRef = inject(DestroyRef);
    private _resizeObserver?: ResizeObserver;
    private _mutationObserver?: MutationObserver;

    /** @hidden */
    constructor() {
        effect(() => {
            const enabled = this.fdpTableCellOverflow();
            if (!enabled) {
                this._resizeObserver?.disconnect();
                this._mutationObserver?.disconnect();
                this._renderer.removeAttribute(this._elementRef.nativeElement, 'title');
            }
        });

        afterNextRender(() => {
            if (this.fdpTableCellOverflow()) {
                this._setupObservers();
            }
        });

        this._destroyRef.onDestroy(() => {
            this._resizeObserver?.disconnect();
            this._mutationObserver?.disconnect();
        });
    }

    /** @hidden */
    private _setupObservers(): void {
        const element = this._elementRef.nativeElement;

        // Setup ResizeObserver for size changes
        this._resizeObserver = new ResizeObserver(() => {
            this._updateTitle();
        });
        this._resizeObserver.observe(element);

        // Setup MutationObserver for text content changes
        this._mutationObserver = new MutationObserver(() => {
            this._updateTitle();
        });
        this._mutationObserver.observe(element, {
            characterData: true,
            subtree: true,
            childList: true
        });

        // Initial check
        this._updateTitle();
    }

    /** @hidden */
    private _updateTitle(): void {
        const element = this._elementRef.nativeElement;
        const isOverflowing = element.offsetWidth < element.scrollWidth;

        if (isOverflowing) {
            this._renderer.setAttribute(element, 'title', element.textContent?.trim() || '');
        } else {
            this._renderer.removeAttribute(element, 'title');
        }
    }
}
