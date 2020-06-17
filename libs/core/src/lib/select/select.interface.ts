import { EventEmitter, InjectionToken } from '@angular/core';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { OptionComponent } from './option/option.component';
import { OptionStatusChange } from './select.component';
import { DialogConfig } from '../dialog/dialog-utils/dialog-config.class';

export const SELECT_COMPONENT = new InjectionToken<string[]>('SelectInterface');
/**
 * Select Interface to have typing and avoid circular dependency between
 * SelectComponent <==> SelectMobileComponent
 */
export interface SelectInterface {
    mobileConfig: MobileModeConfig;
    setSelectedOption: ({option, controlChange}: OptionStatusChange, forceMobileSelect?: boolean) => {};
    close: () => {};
    selected: OptionComponent;
    dialogConfig: DialogConfig;
    isOpenChange: EventEmitter<boolean>;
}
