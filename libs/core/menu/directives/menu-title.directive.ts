import { Directive, ElementRef, HostBinding } from '@angular/core';

/**
 * The directive that represents the menu title.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-menu-title]',
    standalone: true
})
export class MenuTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-menu__title')
    fdMenuTitleClass = true;

    /** Returns element title text */
    @HostBinding('attr.title')
    get title(): string {
        return this._elementRef.nativeElement.textContent;
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}
}
