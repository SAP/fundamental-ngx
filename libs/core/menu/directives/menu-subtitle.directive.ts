import { booleanAttribute, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * The directive that represents the menu title.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-menu-subtitle]',
    host: {
        class: 'fd-menu__subtitle',
        '[class.fd-menu__subtitle--truncate]': 'truncate()'
    }
})
export class MenuSubtitleDirective {
    /** Whether the title should truncate with ellipsis. */
    readonly truncate = input(false, { transform: booleanAttribute });

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** Returns element title text */
    get subtitle(): string {
        return this._elementRef.nativeElement.textContent;
    }
}
