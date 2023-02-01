import { EventEmitter, InjectionToken } from '@angular/core';
import { MobileMode } from '@fundamental-ngx/core/mobile-mode';

export const COMBOBOX_COMPONENT = new InjectionToken<string[]>('ComboboxInterface');

/**
 * Combobox Interface to have typing and avoid circular dependency between
 * ComboboxComponent <==> ComboboxMobileComponent
 */
export interface ComboboxInterface extends MobileMode {
    inputText: string;
    openChange: EventEmitter<boolean>;
    inShellbar: boolean;

    getValue(): any;
    dialogApprove(): void;
    dialogDismiss(backup: string): void;
}
