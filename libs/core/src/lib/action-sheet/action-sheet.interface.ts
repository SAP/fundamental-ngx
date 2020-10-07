import { EventEmitter, InjectionToken } from '@angular/core';

export const ACTION_SHEET_COMPONENT = new InjectionToken<string[]>('ActionSheetComponent');

/**
 * TODO
 */
export interface ActionSheetInterface  {
    isOpenChange: EventEmitter<boolean>;
}
