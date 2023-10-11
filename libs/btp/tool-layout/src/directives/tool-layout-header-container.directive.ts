import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdb-tool-layout-header-container]',
    standalone: true
})
export class ToolLayoutHeaderContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-tool-layout__header-container')
    _headerContainerClass = true;
}
