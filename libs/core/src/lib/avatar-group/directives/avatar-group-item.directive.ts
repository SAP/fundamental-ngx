import { Directive, ElementRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-item]',
    host: { class: 'fd-avatar-group__item' }
})
export class AvatarGroupItemDirective {
    constructor(public elementRef: ElementRef) {}
}
