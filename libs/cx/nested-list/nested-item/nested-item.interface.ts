import { EventEmitter } from '@angular/core';
import { DefaultMenuItem } from '@fundamental-ngx/core/menu';
import { NestedLinkComponent } from '../nested-link/nested-link.component';

/** Interface, to reduce amount of circular dependency warnings */
export interface NestedItemInterface extends DefaultMenuItem {
    expanded: boolean;
    keyboardTriggered: EventEmitter<KeyboardEvent>;
    triggerOpen: () => void;
    triggerClose: () => void;
    linkItem: NestedLinkComponent;
    allChildrenItems: NestedItemInterface[];
    hasChildren: boolean;
    containsId: (id: string) => boolean;
    click: () => void;
    focus: () => void;
}
