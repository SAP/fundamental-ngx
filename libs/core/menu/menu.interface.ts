import { EventEmitter, InjectionToken } from '@angular/core';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MobileMode } from '@fundamental-ngx/core/mobile-mode';
import { MenuItemComponent } from './menu-item/menu-item.component';

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
