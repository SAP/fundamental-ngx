import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FocusableListDirective } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fdb-navigation-menu, ul[fdb-navigation-menu]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['../../../../../node_modules/fundamental-styles/dist/navigation-menu.css'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-navigation-menu'
    },
    hostDirectives: [FocusableListDirective],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent {
    /** @ignore */
    constructor() {
        inject(FocusableListDirective).wrap = true;
    }
}
