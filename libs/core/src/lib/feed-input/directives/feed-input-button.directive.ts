import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdFeedInputButton]'
})
export class FeedInputButtonDirective {
    /** @hidden */
    @HostBinding('class.fd-feed-input__submit-button')
    baseClass = true;

    /** @hidden */
    @HostBinding('class.fd-button')
    fdButtonClass = true;

    /** @hidden */
    @HostBinding('disabled')
    @HostBinding('class.is-disabled')
    disabled = true;

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    get elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
