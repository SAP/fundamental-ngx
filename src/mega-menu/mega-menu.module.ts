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
        MegaMenuSubItemComponent
    ],
    declarations: [
        MegaMenuComponent,
        MegaMenuGroupComponent,
        MegaMenuTitleComponent,
        MegaMenuListComponent,
        MegaMenuItemComponent,
        MegaMenuLinkComponent,
        MegaMenuSubListComponent,
        MegaMenuSubItemComponent
    ]
})
export class MegaMenuModule {}
