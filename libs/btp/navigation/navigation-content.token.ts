import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Observable } from 'rxjs';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';

export abstract class NavigationContentComponent {
    abstract showHome: boolean;
    abstract refresh$: Observable<void>;
    abstract getNavigatableItems(): FdbNavigationListItemComponent[];
    abstract showMoreOpened(): boolean;

    /** @hidden */
    showMoreOverflowItem: Nullable<FdbNavigationListItemComponent>;
}
