import { EventEmitter, InjectionToken } from '@angular/core';
import { DialogConfig } from '../dialog/utils/dialog-config.class';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MobileMode } from '../utils/interfaces/mobile-control.interface';

export const MENU_COMPONENT = new InjectionToken<string[]>('MenuInterface');

/**
 * Menu Interface to have typing and avoid circular dependency between
 * MenuComponent <==> MenuMobileComponent
 */
export interface MenuInterface extends MobileMode {
    activePath: EventEmitter<MenuItemComponent[]>;
    dialogConfig: DialogConfig;
    isOpenChange: EventEmitter<boolean>;

    close(): void;
}
