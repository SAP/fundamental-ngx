import { NgModule } from '@angular/core';
import { NavigationContentEndComponent } from './components/navigation-end/navigation-content-end.component';
import { NavigationListItemComponent } from './components/navigation-item/navigation-list-item.component';
import {
    NavigationLinkComponent,
    NavigationLinkRefDirective
} from './components/navigation-link/navigation-link.component';
import { NavigationContentStartComponent } from './components/navigation-start/navigation-content-start.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationListItemRefDirective } from './directives/navigation-list-item-ref.directive';

@NgModule({
    imports: [
        NavigationComponent,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationLinkComponent,
        NavigationLinkRefDirective,
        NavigationListItemComponent,
        NavigationListItemRefDirective
    ],
    exports: [
        NavigationComponent,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationLinkComponent,
        NavigationLinkRefDirective,
        NavigationListItemComponent,
        NavigationListItemRefDirective
    ]
})
export class NavigationModule {}
