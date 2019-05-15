import { Component, Input } from '@angular/core';

/**
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
@Component({
    selector: 'fd-side-nav',
    templateUrl: './side-navigation.component.html'
})
export class SideNavigationComponent {

    /** Whether the side navigation is collapsed. */
    @Input() collapsed: boolean = false;
}
