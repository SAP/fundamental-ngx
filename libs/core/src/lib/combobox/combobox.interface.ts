import { DialogConfig } from '../dialog/dialog-utils/dialog-config.class';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { EventEmitter, InjectionToken } from '@angular/core';

export const COMBOBOX_COMPONENT = new InjectionToken<string[]>('ComboboxInterface');

/**
 * Combobox Interface to have typing and avoid circular dependency between
 * ComboboxComponent <==> ComboboxMobileComponent
 */
export interface ComboboxInterface {
    dialogDismiss: (backup: string) => void;
    dialogApprove: () => void;
    inputText: string;
    mobileConfig?: MobileModeConfig;
    openChange: EventEmitter<boolean>;
    dialogConfig: DialogConfig
}
