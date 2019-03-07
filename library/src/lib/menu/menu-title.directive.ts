import { Directive, HostBinding } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-title]'
})
export class MenuTitleDirective {
    @HostBinding('class')
    elementClass = 'fd-menu__title';
}
