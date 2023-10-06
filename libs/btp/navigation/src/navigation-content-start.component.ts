import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FdbNavigationComponent } from './navigation-component.token';
import { NavigationListItemComponent } from './navigation-list/navigation-list-item.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';

@Component({
    selector: 'fdb-navigation-content-start',
    template: `
        <ul fdb-navigation-list>
            <li
                fd-navigation-list-item
                *ngIf="linkTemplate() as tmp"
                [linkTemplate]="tmp"
                class="fd-navigation__list-item--home"
            ></li>
            <li class="fd-navigation__list-item fd-navigation__list-item--separator"></li>
        </ul>
        <ng-content select="ul[fdb-navigation-list]"></ng-content>
    `,
    standalone: true,
    imports: [NavigationListComponent, NavigationListItemComponent, NgIf],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: 'fd-navigation__container fd-navigation__container--top',
        '[style.flex-grow]': '1'
    }
})
export class NavigationContentStartComponent {
    /** @hidden */
    linkTemplate = inject(FdbNavigationComponent).homeLinkTemplate;
}
