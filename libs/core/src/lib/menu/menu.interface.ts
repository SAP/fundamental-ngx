import { EventEmitter, InjectionToken } from '@angular/core';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { DialogConfig } from '../dialog/dialog-utils/dialog-config.class';
import { MenuItemComponent } from './menu-item/menu-item.component';

export const MENU_COMPONENT = new InjectionToken<string[]>('MenuInterface');

/**
 * Menu Interface to have typing and avoid circular dependency between
 * MenuComponent <==> MenuMobileComponent
 */
export interface MenuInterface {
    mobileConfig: MobileModeConfig;
    activePath: EventEmitter<MenuItemComponent[]>;
    close: () => void;
    dialogConfig: DialogConfig;
    isOpenChange: EventEmitter<boolean>;
}
