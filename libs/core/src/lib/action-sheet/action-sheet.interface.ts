import { EventEmitter, InjectionToken } from '@angular/core';
import {DialogConfig } from '../dialog/dialog-utils/dialog-config.class';
import { MobileMode } from '../utils/interfaces/mobile-control.interface';


export const ACTION_SHEET_COMPONENT = new InjectionToken<string[]>('ActionSheetComponent');

/**
 Control element, which will be rendered inside dialog.
 **/

export interface ActionSheetInterface extends MobileMode {
    dialogConfig: DialogConfig;
    isOpenChange: EventEmitter<boolean>;

    close(): void;
}
