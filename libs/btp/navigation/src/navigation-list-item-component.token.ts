import { Signal } from '@angular/core';
import { FdbNavigationListComponent } from './navigation-list-component.token';

export abstract class FdbNavigationListItemComponent {
    abstract expanded: Signal<boolean>;
    abstract childNavigationListComponent: Signal<FdbNavigationListComponent | null>;
    abstract isGroup: Signal<boolean>;
    abstract level: Signal<number>;
    abstract expand: () => void;
    abstract collapse: () => void;
    abstract toggle: () => void;
}
