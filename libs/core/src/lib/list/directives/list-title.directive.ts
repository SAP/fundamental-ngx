import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[fd-list-title], [fdListTitle]'
})
export class ListTitleDirective implements OnInit {
    /** @hidden */
    @HostBinding('class.fd-list__title')
    fdListTitleClass = true;

    /** Whether or not this should be wrapped, when too much text. */
    @Input()
    @HostBinding('class.fd-list__title--wrap')
    wrap = false;

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
