import { QueryList } from '@angular/core';
import { FdbNavigationListItem } from './navigation-list-item.class';

export abstract class FdbNavigationContentContainer {
    abstract listItems: QueryList<FdbNavigationListItem>;
    abstract placement: 'start' | 'end';
}
