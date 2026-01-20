import { booleanAttribute, Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
    selector: '[fd-list-title], [fdListTitle]',
    host: {
        class: 'fd-list__title',
        '[class.fd-list__title--truncate]': 'truncate()',
        '[class.fd-list__title--scope]': 'scope()',
        '[class.fd-list__title--wrap]': 'wrap()'
    }
})
export class ListTitleDirective implements OnInit {
    /** Whether or not this should be wrapped, when too much text. */
    readonly wrap = input(false, { transform: booleanAttribute });

    /** Whether the text should truncate with ellipsis. */
    readonly truncate = input(false, { transform: booleanAttribute });

    /** Whether this title is used for scope in the shell search results. */
    scope = input(false);

    /** @hidden */
    readonly elRef = inject(ElementRef);

    /** @hidden */
    ngOnInit(): void {
        const nativeEl = this.elRef.nativeElement;
        if (nativeEl.tagName === 'A') {
            nativeEl.setAttribute('tabIndex', '-1');
        }
    }
}
