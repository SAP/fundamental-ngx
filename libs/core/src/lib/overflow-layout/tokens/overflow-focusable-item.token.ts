import { InjectionToken } from '@angular/core';
import { OverflowLayoutFocusableItem } from '../interfaces/overflow-focusable-item.interface';

export const FD_OVERFLOW_FOCUSABLE_ITEM = new InjectionToken<OverflowLayoutFocusableItem>(
    'FdOverflowLayoutFocusableItem'
);
