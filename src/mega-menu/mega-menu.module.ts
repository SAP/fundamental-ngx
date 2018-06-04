import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MegaMenuComponent,
    MegaMenuGroupComponent,
    MegaMenuTitleComponent,
    MegaMenuListComponent,
    MegaMenuItemComponent,
    MegaMenuLinkComponent,
    MegaMenuSubListComponent,
    MegaMenuSubItemComponent
} from './mega-menu.component';

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
