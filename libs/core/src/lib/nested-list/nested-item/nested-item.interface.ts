import { EventEmitter } from '@angular/core';
import { DefaultMenuItem } from '@fundamental-ngx/core/menu';

/** Interface, to reduce amount of circular dependency warnings */
export interface NestedItemInterface extends DefaultMenuItem {
    expanded: boolean;
    keyboardTriggered: EventEmitter<KeyboardEvent>;
    triggerOpen: () => void;
    triggerClose: () => void;
    linkItem: NestedItemLink;
    allChildrenItems: NestedItemInterface[];
    hasChildren: boolean;
    containsId: (id: string) => boolean;
}

export interface NestedItemLink {
    changeSelected(selected: boolean): void;
    focus(): void;
    click(): void;
    getTitle(): string;
}
