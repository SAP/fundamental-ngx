import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuComponent } from './mega-menu.component';
import { MegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';
import { MegaMenuSubitemComponent } from './mega-menu-subitem/mega-menu-subitem.component';
import { MegaMenuSublinkComponent } from './mega-menu-sublink/mega-menu-sublink.component';
import { MegaMenuLinkComponent } from './mega-menu-link/mega-menu-link.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MegaMenuComponent, MegaMenuItemComponent, MegaMenuSubitemComponent, MegaMenuSublinkComponent, MegaMenuLinkComponent],
})
export class MegaMenuModule {}
