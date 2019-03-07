import { Directive, HostBinding } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-list]'
})
export class MenuListDirective {
    @HostBinding('class')
    elementClass = 'fd-menu__list';
}
