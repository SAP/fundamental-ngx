import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-avatar-group-item]'
})
export class AvatarGroupItemDirective {
    constructor(public elementRef: ElementRef) {}

    /** @hidden */
    @HostBinding('class.fd-avatar-group__item')
    private _groupItemClass = true;
}
