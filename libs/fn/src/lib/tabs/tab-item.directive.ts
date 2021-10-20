import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fnTabItem], [fn-tab-item]',
    host: {
        class: 'fn-tabs__item',
        role: 'tab',
        '[attr.tabindex]': 'disabled ? -1 : 0'
    }
})
export class TabItemDirective {
    /** Disabled state for tab item */
    @Input()
    @HostBinding('attr.aria-disabled')
    @HostBinding('class.is-disabled')
    disabled = false;

    @Input()
    @HostBinding('class.fn-tabs__item--selected')
    active = false;

    constructor(private _el: ElementRef<HTMLElement>) {}

    focus(): void {
        this._el.nativeElement.focus();
    }
}
