import { InjectionToken } from '@angular/core';

export const LIST_ITEM_COMPONENT = new InjectionToken<string[]>('ListItemComponent');

export interface ListItemInterface {
    selected: boolean;

    link: boolean;

    focus(): void;
}
