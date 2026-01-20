import { NgModule } from '@angular/core';
import { NavigationContentEndComponent } from './components/navigation-end/navigation-content-end.component';
import { NavigationListItemComponent } from './components/navigation-item/navigation-list-item.component';
import {
    NavigationLinkComponent,
    NavigationLinkRefDirective
} from './components/navigation-link/navigation-link.component';
import { NavigationContentStartComponent } from './components/navigation-start/navigation-content-start.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationListDataSourceDirective } from './directives/navigation-list-data-source.directive';
import { NavigationListItemRefDirective } from './directives/navigation-list-item-ref.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        NavigationComponent,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationLinkComponent,
        NavigationLinkRefDirective,
        NavigationListItemComponent,
        NavigationListItemRefDirective,
        NavigationListDataSourceDirective
    ],
    exports: [
        NavigationComponent,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationLinkComponent,
        NavigationLinkRefDirective,
        NavigationListItemComponent,
        NavigationListItemRefDirective,
        NavigationListDataSourceDirective
    ]
})
export class NavigationModule {}
