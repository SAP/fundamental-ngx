import { Signal } from '@angular/core';
import { FdbNavigationListComponent } from './navigation-list-component.token';

export abstract class FdbNavigationListItemComponent {
    abstract expanded: Signal<boolean>;
    abstract navigationListComponent: Signal<FdbNavigationListComponent | null>;
    abstract expand: () => void;
    abstract collapse: () => void;
    abstract toggle: () => void;
}
