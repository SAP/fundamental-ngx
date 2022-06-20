import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import { MobileMode } from '@fundamental-ngx/core/mobile-mode';

export const MULTIINPUT_COMPONENT = new InjectionToken<string[]>('PlatformMultiInputInterface');

export interface PlatformMultiInputInterface extends MobileMode {
    _selectedItems: any[];
    openChange: Subject<boolean>;

    _dialogApprove(): void;
    _dialogDismiss(selectedBackup: any[]): void;
}
