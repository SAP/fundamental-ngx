import { Signal, WritableSignal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { FdbNavigationListItem } from './navigation-list-item.class';

export abstract class FdbNavigation {
    abstract classList$: Signal<string[]>;
    abstract isSnapped$: Signal<boolean>;
    abstract showMoreButton$: WritableSignal<Nullable<FdbNavigationListItem>>;
    abstract _navigationItemRenderer: Signal<any>;
    abstract closeAllPopups: Subject<void>;
    abstract selectionMode: 'router' | 'click';
    abstract service: NavigationService;
    abstract setActiveItem(value: FdbNavigationListItem | null): void;
    abstract getActiveItem(): FdbNavigationListItem | null;
    abstract closePopups(): void;
}
