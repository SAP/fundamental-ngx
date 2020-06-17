import { DialogConfig } from '../dialog/dialog-utils/dialog-config.class';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { EventEmitter, InjectionToken } from '@angular/core';

export const MULTI_INPUT_COMPONENT = new InjectionToken<string[]>('MultiInputInterface');

/**
 * Multi Input Interface to have typing and avoid circular dependency between
 * MultiInputComponent <==> MultiInputMobileComponent
 */
export interface MultiInputInterface {
    selectAllItems: () => {};
    dialogDismiss: (backup: any[]) => {};
    dialogApprove: () => {};
    multiInputMobileConfig?: MobileModeConfig;
    selected: any[];
    openChange: EventEmitter<boolean>;
    dialogConfig: DialogConfig
}
