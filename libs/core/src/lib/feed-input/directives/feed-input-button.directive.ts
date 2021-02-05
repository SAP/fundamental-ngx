import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

/**
 * Applies button feed arrow icon and disabled state
 */
@Directive({
    selector: '[fdFeedInputButton]',
    host: {
        '[class.fd-feed-input__submit-button]': 'true',
        '[class.fd-button]': 'true'
    }
})
export class FeedInputButtonDirective implements OnInit {
    /** @hidden */
    @HostBinding('attr.aria-disabled')
    @HostBinding('class.is-disabled')
    disabled = true;

    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2
    ) {
    }

    /** @hidden */
    ngOnInit(): void {
        this.createArrowIcon();
    }

    /** @hidden */
    get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @hidden create button icon */
    createArrowIcon(): void {
        const icon = this._renderer.createElement('i');
        this._renderer.addClass(icon, 'sap-icon--feeder-arrow');
        this._renderer.setAttribute(icon, 'role', 'presentation');
        this._renderer.appendChild(this.elementRef.nativeElement, icon);
    }
}
