import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import { MobileMode } from '@fundamental-ngx/core';

export const COMBOBOX_COMPONENT = new InjectionToken<string[]>('ComboboxInterface');

/**
 * Combobox Interface to have typing and avoid circular dependency between
 * ComboboxComponent <==> ComboboxMobileComponent
 */
export interface ComboboxInterface extends MobileMode {
    inputText: string;
    openChange: Subject<boolean>;

    dialogApprove(): void;
    dialogDismiss(backup: string): void;
    detectChanges(): void;
}
