import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../models/navigation-list-item.class';

@Injectable()
export class NavigationService {
    /** Currently active list item. */
    currentItem$ = new Subject<FdbNavigationListItem>();
}
