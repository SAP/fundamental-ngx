import { EventEmitter, InjectionToken, ModelSignal } from '@angular/core';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MobileMode } from '@fundamental-ngx/core/mobile-mode';

export const POPOVER_COMPONENT = new InjectionToken<PopoverInterface>('PopoverInterface');

/**
 * Popover Interface to have typing and avoid circular dependency between
 * PopoverComponent <==> PopoverMobileComponent
 */
export interface PopoverInterface extends MobileMode {
    dialogConfig: DialogConfig;
    isOpen: ModelSignal<boolean>;
    isOpenChange: EventEmitter<boolean>;

    close(): void;
}
