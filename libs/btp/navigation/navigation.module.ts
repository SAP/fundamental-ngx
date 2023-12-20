import { NgModule } from '@angular/core';
import { NavigationContainerComponent } from './components/navigation-container/navigation-container.component';
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
import { NavigationMoreButtonDirective } from './directives/navigation-more-button.directive';

@NgModule({
    imports: [
        NavigationComponent,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationContainerComponent,
        NavigationLinkComponent,
        NavigationLinkRefDirective,
        NavigationListItemComponent,
        NavigationListItemRefDirective,
        NavigationListDataSourceDirective,
        NavigationMoreButtonDirective
    ],
    exports: [
        NavigationComponent,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationContainerComponent,
        NavigationLinkComponent,
        NavigationLinkRefDirective,
        NavigationListItemComponent,
        NavigationListItemRefDirective,
        NavigationListDataSourceDirective,
        NavigationMoreButtonDirective
    ]
})
export class NavigationModule {}
