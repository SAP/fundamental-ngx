import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import { MobileMode } from '@fundamental-ngx/core';

export const MULTIINPUT_COMPONENT = new InjectionToken<string[]>('PlatformMultiInputInterface');

export interface PlatformMultiInputInterface extends MobileMode {
    inputText: string;
    openChange: Subject<boolean>;

    dialogApprove(): void;
    dialogDismiss(backup: string): void;
}
