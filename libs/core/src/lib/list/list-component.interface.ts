import { QueryList } from '@angular/core';
import { ListItemInterface, Nullable } from '@fundamental-ngx/cdk/utils';

export interface ListComponentInterface {
    _navItems: QueryList<{
        indicated: boolean;
        _innerText: string;
        expanded: boolean;
        _isItemVisible: boolean;
        focus(): void;
    }>;

    byline: boolean;

    items: QueryList<ListItemInterface>;

    role: Nullable<string>;

    setItemActive(index: number): void;
}
