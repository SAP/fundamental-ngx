import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-user-actions-menu-header-addon-left]',
    host: {
        class: 'fd-user-menu__header-addon-left'
    }
})
export class UserActionsMenuHeaderAddonLeftDirective {}
