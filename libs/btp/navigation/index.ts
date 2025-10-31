import { NavigationContentEndComponent } from './components/navigation-end/navigation-content-end.component';
import { NavigationListItemComponent } from './components/navigation-item/navigation-list-item.component';
import {
    NavigationLinkComponent,
    NavigationLinkRefDirective
} from './components/navigation-link/navigation-link.component';
import { NavigationContentStartComponent } from './components/navigation-start/navigation-content-start.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationListItemRefDirective } from './directives/navigation-list-item-ref.directive';

export * from './components/navigation-end/navigation-content-end.component';
export * from './components/navigation-item/navigation-list-item.component';
export * from './components/navigation-link/navigation-link.component';
export * from './components/navigation-start/navigation-content-start.component';
export * from './components/navigation/navigation.component';
export * from './directives/navigation-list-item-ref.directive';
export * from './models/navigation-content-container.class';
export * from './models/navigation-list-item.class';
export * from './models/navigation.types';

export * from './components/navigation-list/navigation-list.component';

export * from './components/navigation-more-button/navigation-more-button.component';

export const FDB_NAVIGATION = [
    NavigationComponent,
    NavigationContentStartComponent,
    NavigationContentEndComponent,
    NavigationLinkComponent,
    NavigationLinkRefDirective,
    NavigationListItemComponent,
    NavigationListItemRefDirective
] as const;
