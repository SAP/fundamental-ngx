import { InjectionToken, InputSignal, ModelSignal, OutputEmitterRef } from '@angular/core';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MobileMode, MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { MenuItemComponent } from './menu-item/menu-item.component';

export const MENU_COMPONENT = new InjectionToken<string[]>('MenuInterface');

/**
 * Menu Interface to have typing and avoid circular dependency between
 * MenuComponent <==> MenuMobileComponent
 *
 * Note: MenuComponent implements InputSignal properties, which satisfy this interface
 * through structural typing even though the types don't perfectly align with MobileMode base.
 */
export interface MenuInterface extends Omit<MobileMode, 'mobile' | 'mobileConfig'> {
    mobile: InputSignal<boolean>;
    mobileConfig: InputSignal<MobileModeConfig>;
    activePath: OutputEmitterRef<MenuItemComponent[]>;
    dialogConfig: DialogConfig | null;
    isOpen: ModelSignal<boolean>;
    isOpenChange: OutputEmitterRef<boolean>;

    close(): void;
}
