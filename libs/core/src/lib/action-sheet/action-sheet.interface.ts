import { EventEmitter, InjectionToken } from '@angular/core';

export const ACTION_SHEET_COMPONENT = new InjectionToken<string[]>('ActionSheetComponent');

/**
 Control element, which will be rendered inside dialog.
 **/

export interface ActionSheetInterface {

    openChange: EventEmitter<boolean>;
}
