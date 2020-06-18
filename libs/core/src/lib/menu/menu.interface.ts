import { EventEmitter, InjectionToken } from '@angular/core';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { DialogConfig } from '../dialog/dialog-utils/dialog-config.class';
import { MenuItemComponent } from './menu-item/menu-item.component';

export const MENU_COMPONENT = new InjectionToken<string[]>('MenuInterface');

/**
 * Select Interface to have typing and avoid circular dependency between
 * SelectComponent <==> SelectMobileComponent
 */
export interface MenuInterface {
    mobileConfig: MobileModeConfig;
    activePath: EventEmitter<MenuItemComponent[]>;
    close: () => void;
    dialogConfig: DialogConfig;
    isOpenChange: EventEmitter<boolean>;
}
