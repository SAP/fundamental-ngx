import { Signal, WritableSignal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdbNavigationListItem } from './navigation-list-item.class';

export abstract class FdbNavigation {
    abstract classList$: Signal<string[]>;
    abstract isSnapped$: Signal<boolean>;
    abstract showMoreButton$: WritableSignal<Nullable<FdbNavigationListItem>>;
    abstract _navigationItemRenderer: Signal<any>;
    abstract setActiveItem(value: FdbNavigationListItem | null): void;
    abstract getActiveItem(): FdbNavigationListItem | null;
}
