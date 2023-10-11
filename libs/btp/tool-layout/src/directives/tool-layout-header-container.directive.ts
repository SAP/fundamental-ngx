import { Directive } from '@angular/core';

@Directive({
    selector: '[fdbToolLayoutHeaderContainer]',
    standalone: true,
    host: {
        class: 'fd-tool-layout__header-container'
    }
})
export class ToolLayoutHeaderContainerDirective {}
