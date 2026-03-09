import { booleanAttribute, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * The directive that represents the menu title.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-menu-title]',
    host: {
        class: 'fd-menu__title',
        '[class.fd-menu__title--truncate]': 'truncate()',
        '[attr.title]': 'title'
    }
})
export class MenuTitleDirective {
    /** Whether the title should truncate with ellipsis. */
    readonly truncate = input(false, { transform: booleanAttribute });

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** Returns element title text */
    get title(): string {
        return this._elementRef.nativeElement.textContent;
    }
}
