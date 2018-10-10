import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MegaMenuComponent } from './mega-menu.component';
import { MegaMenuGroupComponent } from './mega-menu-group.component';
import { MegaMenuTitleComponent } from './mega-menu-title.component';
import { MegaMenuListComponent } from './mega-menu-list.component';
import { MegaMenuItemComponent } from './mega-menu-item.component';
import { MegaMenuLinkComponent } from './mega-menu-link.component';
import { MegaMenuSubListComponent } from './mega-menu-sublist.component';
import { MegaMenuSubItemComponent } from './mega-menu-subitem.component';
import { MegaMenuSubLinkDirective } from './mega-menu-sublink.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        MegaMenuComponent,
        MegaMenuGroupComponent,
        MegaMenuTitleComponent,
        MegaMenuListComponent,
        MegaMenuItemComponent,
        MegaMenuLinkComponent,
        MegaMenuSubListComponent,
        MegaMenuSubItemComponent,
        MegaMenuSubLinkDirective
    ],
    declarations: [
        MegaMenuComponent,
        MegaMenuGroupComponent,
        MegaMenuTitleComponent,
        MegaMenuListComponent,
        MegaMenuItemComponent,
        MegaMenuLinkComponent,
        MegaMenuSubListComponent,
        MegaMenuSubItemComponent,
        MegaMenuSubLinkDirective
    ]
})
export class MegaMenuModule {}
