import { Signal } from '@angular/core';

export abstract class FdbNavigationListComponent {
    abstract isParentGroupChild: Signal<boolean>;
    abstract parentListComponent: FdbNavigationListComponent | null;
}
