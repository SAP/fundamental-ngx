import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdShellbarSidenav], [fd-shellbar-side-nav]',
    host: {
        class: 'fd-shellbar__button'
    }
})
export class ShellbarSidenavDirective {
    /** @hidden */
    @HostBinding('class.fd-shellbar-side-nav-control')
    classSideNavUtility: boolean = true;
}
