import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdb-tool-layout-container]',
    standalone: true
})
export class ToolLayoutContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-tool-layout__container')
    _containerClass = true;
}
