import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { EventEmitter, InjectionToken } from '@angular/core';
import { MobileMode } from '../utils/interfaces/mobile-control.interface';

export const MULTI_INPUT_COMPONENT = new InjectionToken<string[]>('MultiInputComponent');

/**
 * Multi Input Interface to have typing and avoid circular dependency between
 * MultiInputComponent <==> MultiInputMobileComponent
 */
export interface MultiInputInterface extends MobileMode {
    mobile: boolean;
    selected: any[];
    mobileConfig: MobileModeConfig;
    openChange: EventEmitter<boolean>;

    dialogApprove(): void;

    selectAllItems(): void;

    dialogDismiss(selectedBackup: any[]): void;
}
