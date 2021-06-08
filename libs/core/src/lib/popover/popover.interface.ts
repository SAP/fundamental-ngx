import { EventEmitter, InjectionToken } from '@angular/core';
import { DialogConfig } from '@fundamental-ngx/core';
import { MobileMode } from '../utils/public_api';

export const POPOVER_COMPONENT = new InjectionToken<PopoverInterface>('PopoverInterface');

export interface PopoverInterface extends MobileMode {
    dialogConfig: DialogConfig;
    isOpenChange: EventEmitter<boolean>;

    close(): void;
}
