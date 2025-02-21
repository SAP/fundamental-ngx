import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-user-menu-header-container]',
    host: {
        class: 'fd-user-menu__header-container'
    },
    standalone: true
})
export class UserMenuHeaderContainerDirective {}
