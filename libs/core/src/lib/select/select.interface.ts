import { EventEmitter, InjectionToken } from '@angular/core';

import { OptionComponent } from './option/option.component';
import { FdSelectChange } from './select.component';
import { DialogConfig } from '../dialog/utils/dialog-config.class';
import { MobileMode } from '../utils/interfaces/mobile-control.interface';
import { MobileModeConfig } from '../utils/public_api';

export const SELECT_COMPONENT = new InjectionToken<string[]>('SelectInterface');

/**
 * Select Interface to have typing and avoid circular dependency between
 * SelectComponent <==> SelectMobileComponent
 */
export interface SelectInterface extends MobileMode {
    selected: OptionComponent;
    dialogConfig: DialogConfig;
    mobileConfig: MobileModeConfig;

    isOpenChange: EventEmitter<boolean>;
    valueChange: EventEmitter<FdSelectChange>;

    close(forceClose?: boolean): void;
    open(): void;
}




