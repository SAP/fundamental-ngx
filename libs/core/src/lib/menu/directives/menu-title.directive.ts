import { Directive, ElementRef, HostBinding } from '@angular/core';

/**
 * The directive that represents the menu title.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-menu-title]'
})
export class MenuTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-menu__title')
    fdMenuTitleClass = true;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** Returns element title text */
    get title(): string {
        return this._elementRef.nativeElement.textContent;
    }
}
