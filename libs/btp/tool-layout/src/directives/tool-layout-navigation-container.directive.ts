import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdb-tool-layout-navigation-container]',
    standalone: true
})
export class ToolLayoutNavigationContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-tool-layout__navigation-container')
    _navContainerClass = true;

    /**
     * whether the navigation is a popup
     */
    @HostBinding('class.fd-tool-layout__navigation-container--popup')
    @Input()
    popup = false;

    /**
     * whether the navigation is horizontal
     */
    @HostBinding('class.fd-tool-layout__navigation-container--horizontal')
    @Input()
    horizontal = false;
}
