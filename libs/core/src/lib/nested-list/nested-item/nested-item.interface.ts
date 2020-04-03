import { EventEmitter } from '@angular/core';
import { DefaultMenuItem } from '../../menu/default-menu-item.class';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';

/** Interface, to reduce amount of circular dependency warnings */
export interface NestedItemInterface extends DefaultMenuItem {
    expanded: boolean;
    keyboardTriggered: EventEmitter<KeyboardEvent>;
    triggerOpen: () => void;
    triggerClose: () => void;
    linkItem: NestedLinkDirective;
    allChildrenItems: NestedItemInterface[];
    hasChildren: boolean;
}
