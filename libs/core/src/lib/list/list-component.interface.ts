import { QueryList } from '@angular/core';
import { ListItemInterface } from '@fundamental-ngx/cdk/utils';

export interface ListComponentInterface {
    _navItems: QueryList<{
        indicated: boolean;
        _innerText: string;
        expanded: boolean;
        _isItemVisible: boolean;
        focus(): void;
    }>;

    setItemActive(index: number): void;

    items: QueryList<ListItemInterface>;
}
