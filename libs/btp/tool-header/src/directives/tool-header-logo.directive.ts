import { Directive } from '@angular/core';

@Directive({
    selector: 'img[fdbToolHeaderLogo]',
    host: {
        '[attr.role]': '"button"',
        '[attr.tabindex]': '0'
    },
    standalone: true
})
export class ToolHeaderLogoDirective {}
