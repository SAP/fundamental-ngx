import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

/**
 * Applies button feed arrow icon and disabled state
 */
@Directive({
    selector: '[fdFeedInputButton]',
    host: {
        class: 'fd-button fd-feed-input__submit-button is-cozy'
    },
    standalone: true
})
export class FeedInputButtonDirective implements OnInit {
    /** @ignore */
    @HostBinding('attr.aria-disabled')
    @HostBinding('class.is-disabled')
    disabled = true;

    /** @ignore */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this.createArrowIcon();
    }

    /** @ignore */
    get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @ignore create button icon */
    createArrowIcon(): void {
        const icon = this._renderer.createElement('i');
        this._renderer.addClass(icon, 'sap-icon--feeder-arrow');
        this._renderer.setAttribute(icon, 'role', 'presentation');
        this._renderer.appendChild(this.elementRef.nativeElement, icon);
    }
}
