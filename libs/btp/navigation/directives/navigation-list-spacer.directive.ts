import { Directive, inject } from '@angular/core';
import { NavigationComponent } from '../navigation.component';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'li[fdb-navigation-list-spacer]',
    standalone: true,
    host: {
        class: 'fd-navigation__list-item fd-navigation__list-item--spacer',
        '[class.fd-navigation__list-item--spacer--hidden]': '_navigationComponent.isSnapped()'
    }
})
export class NavigationItemSpacerDirective {
    /** @ignore */
    readonly _navigationComponent = inject(NavigationComponent);
}
