import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdb-navigation-menu, ul[fdb-navigation-menu]',
    template: ` <ng-content></ng-content> `,
    styleUrls: ['../../../../../node_modules/fundamental-styles/dist/navigation-menu.css'],
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-navigation-menu'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent {}
