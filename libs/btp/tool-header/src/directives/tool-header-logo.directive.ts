import { Directive } from '@angular/core';

@Directive({
    selector: '[fdbToolHeaderLogo]',
    host: {
        '[attr.role]': '"button"',
        '[attr.tabindex]': '0',
        class: 'fd-tool-header__logo'
    },
    standalone: true
})
export class ToolHeaderLogoDirective {}
