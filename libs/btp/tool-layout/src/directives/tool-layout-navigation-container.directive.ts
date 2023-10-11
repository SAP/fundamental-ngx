import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdbToolLayoutNavigationContainer]',
    standalone: true,
    host: {
        class: 'fd-tool-layout__navigation-container'
    }
})
export class ToolLayoutNavigationContainerDirective {
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
