import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdFeedInputButton]',
    host: {
        '[class.fd-feed-input__submit-button]': 'true',
        '[class.fd-button]': 'true'
    }
})
export class FeedInputButtonDirective {
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
