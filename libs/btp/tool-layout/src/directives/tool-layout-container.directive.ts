import { Directive } from '@angular/core';

@Directive({
    selector: '[fdbToolLayoutContainer]',
    standalone: true,
    host: {
        class: 'fd-tool-layout__container'
    }
})
export class ToolLayoutContainerDirective {}
