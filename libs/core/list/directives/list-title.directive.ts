import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[fd-list-title], [fdListTitle]',
    standalone: true
})
export class ListTitleDirective implements OnInit {
    /** @ignore */
    @HostBinding('class.fd-list__title')
    fdListTitleClass = true;

    /** Whether or not this should be wrapped, when too much text. */
    @Input()
    @HostBinding('class.fd-list__title--wrap')
    wrap = false;

    /** @ignore */
    constructor(public elRef: ElementRef) {}

    /** @ignore */
    ngOnInit(): void {
        const nativeEl = this.elRef.nativeElement;
        if (nativeEl.tagName === 'A') {
            nativeEl.setAttribute('tabIndex', '-1');
        }
    }
}
