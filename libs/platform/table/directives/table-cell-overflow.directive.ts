import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

/**
 * Directive that sets the title attribute on an element when its text content overflows.
 * Checks for overflow on mouse enter and focus events to avoid unnecessary DOM measurements.
 */
@Directive({
    selector: '[fdpTableCellOverflow]',
    host: {
        '(mouseenter)': 'updateTitle()',
        '(focusin)': 'updateTitle()'
    }
})
export class TableCellOverflowDirective {
    /** @hidden */
    private readonly _elementRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    protected updateTitle(): void {
        const element = this._elementRef.nativeElement;
        const isOverflowing = element.offsetWidth < element.scrollWidth;

        if (isOverflowing) {
            this._renderer.setAttribute(element, 'title', element.textContent?.trim() || '');
        } else {
            this._renderer.removeAttribute(element, 'title');
        }
    }
}
