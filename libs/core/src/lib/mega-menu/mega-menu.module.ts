import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuComponent } from './mega-menu.component';
import { MegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';
import { MegaMenuSubitemDirective } from './mega-menu-subitem.directive';
import { MegaMenuSublinkDirective } from './mega-menu-sublink.directive';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { MegaMenuListDirective } from './mega-menu-list/mega-menu-list.directive';
import { MegaMenuLinkDirective } from './mega-menu-link/mega-menu-link.directive';
import { MegaMenuGroupComponent } from './mega-menu-group/mega-menu-group.component';
import { MegaMenuTitleDirective } from './mega-menu-title/mega-menu-title.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        MegaMenuComponent,
        MegaMenuListDirective,
        MegaMenuItemComponent,
        MegaMenuSubitemDirective,
        MegaMenuSublinkDirective,
        MegaMenuLinkDirective,
        MegaMenuGroupComponent,
        MegaMenuTitleDirective
    ],
    exports: [
        MegaMenuComponent,
        MegaMenuLinkDirective,
        MegaMenuItemComponent,
        MegaMenuSubitemDirective,
        MegaMenuListDirective,
        MegaMenuSublinkDirective,
        MegaMenuGroupComponent,
        MegaMenuTitleDirective
    ],
    providers: [MenuKeyboardService]
})
export class MegaMenuModule {}
