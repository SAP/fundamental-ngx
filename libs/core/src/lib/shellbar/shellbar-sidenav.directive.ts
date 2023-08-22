import { Directive } from '@angular/core';

@Directive({
    selector: '[fdShellbarSidenav], [fd-shellbar-side-nav]',
    host: {
        class: 'fd-shellbar__button'
    },
    standalone: true
})
export class ShellbarSidenavDirective {}
