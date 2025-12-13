import { booleanAttribute, Directive, ElementRef, input, OnInit } from '@angular/core';

@Directive({
    selector: '[fd-list-title], [fdListTitle]',
    standalone: true,
    host: {
        class: 'fd-list__title',
        '[class.fd-list__title--truncate]': 'truncate()',
        '[class.fd-list__title--scope]': 'scope()'
    }
})
export class ListTitleDirective implements OnInit {
    /**
     * @deprecated
     * Whether or not this should be wrapped, when too much text.
     */
    wrap = input(false, { transform: booleanAttribute });

    /** Whether the text should truncate with ellipsis. */
    truncate = input(false, { transform: booleanAttribute });

    /** Whether this title is used for scope in the shell search results. */
    scope = input(false);

    /** @hidden */
    constructor(public elRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        const nativeEl = this.elRef.nativeElement;
        if (nativeEl.tagName === 'A') {
            nativeEl.setAttribute('tabIndex', '-1');
        }
    }
}
