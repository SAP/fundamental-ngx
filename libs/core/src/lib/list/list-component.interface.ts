import { QueryList } from '@angular/core';

export interface ListComponentInterface {
    _navItems: QueryList<{
        indicated: boolean;
        _innerText: string;
        expanded: boolean;
        _isItemVisible: boolean;
        focus(): void;
    }>;
}
