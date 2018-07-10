import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-side-nav-icons]',
    host: {
        '[class]': "'fd-side-nav--icons'"
    }
})
export class SideNavigationIconsDirective { }
