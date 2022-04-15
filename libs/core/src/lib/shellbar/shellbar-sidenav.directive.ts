import { Directive } from '@angular/core';

@Directive({
    selector: '[fdShellbarSidenav], [fd-shellbar-side-nav]',
    host: {
        class: 'fd-shellbar__button'
    }
})
export class ShellbarSidenavDirective {}
