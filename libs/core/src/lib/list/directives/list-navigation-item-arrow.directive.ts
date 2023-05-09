import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[fd-list-navigation-item-arrow], [fdListNavigaitonItemArrow]'
})
export class ListNavigationItemArrowDirective {
    /** @hidden */
    @HostBinding('class.fd-list__navigation-item-arrow')
    navigationItemArrowClass = true;

    /** @hidden */
    @HostBinding('class.sap-icon--navigation-right-arrow')
    rightArrowClass = true;

    /** @hidden */
    @HostBinding('class.sap-icon--navigation-down-arrow')
    downArrowClass = false;

    /** @hidden */
    @HostBinding('class.is-expanded')
    expanded = false;

    /** @hidden */
    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    _setExpanded(expanded: boolean): void {
        if (this.expanded !== expanded) {
            this.rightArrowClass = !this.rightArrowClass;
            this.downArrowClass = !this.downArrowClass;
        }
        this.expanded = expanded;
    }

    /** @hidden */
    _focus(): void {
        this._elRef.nativeElement.focus();
    }
}
