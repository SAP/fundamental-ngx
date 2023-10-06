import { Component } from '@angular/core';

@Component({
    selector: 'fdb-navigation-content-end',
    template: ` <ng-content></ng-content> `,
    standalone: true,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: 'fd-navigation__container fd-navigation__container--bottom'
    }
})
export class NavigationContentEndComponent {}
