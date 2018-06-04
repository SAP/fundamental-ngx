import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MegaMenuComponent,
    MegaMenuGroup,
    MegaMenuTitle,
    MegaMenuList,
    MegaMenuItem,
    MegaMenuLink,
    MegaMenuSubList,
    MegaMenuSubItem
} from './mega-menu.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        MegaMenuComponent,
        MegaMenuGroup,
        MegaMenuTitle,
        MegaMenuList,
        MegaMenuItem,
        MegaMenuLink,
        MegaMenuSubList,
        MegaMenuSubItem
    ],
    declarations: [
        MegaMenuComponent,
        MegaMenuGroup,
        MegaMenuTitle,
        MegaMenuList,
        MegaMenuItem,
        MegaMenuLink,
        MegaMenuSubList,
        MegaMenuSubItem
    ]
})
export class MegaMenuModule {}
