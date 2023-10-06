import { Directive } from '@angular/core';

@Directive({
    selector: '[fdbToolHeaderElement]',
    host: {
        class: 'fd-tool-header__element'
    },
    standalone: true
})
export class ToolHeaderElementDirective {}
