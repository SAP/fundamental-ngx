import { QueryList, Signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';

export abstract class FdbNavigationListComponent {
    abstract isParentGroupChild: Signal<boolean>;
    abstract parentListComponent: FdbNavigationListComponent | null;
    abstract homeListItem: Nullable<FdbNavigationListItemComponent>;
    abstract listItems: QueryList<FdbNavigationListItemComponent>;
    abstract focused: boolean;
    abstract getHomeElementSize(): { width: number; height: number };
}
