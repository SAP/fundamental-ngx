import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MegaMenu,
    MegaMenuGroup,
    MegaMenuTitle,
    MegaMenuList,
    MegaMenuItem,
    MegaMenuLink,
    MegaMenuSubList,
    MegaMenuSubItem
} from './mega-menu';

@NgModule({
    imports: [CommonModule],
    exports: [
        MegaMenu,
        MegaMenuGroup,
        MegaMenuTitle,
        MegaMenuList,
        MegaMenuItem,
        MegaMenuLink,
        MegaMenuSubList,
        MegaMenuSubItem
    ],
    declarations: [
        MegaMenu,
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
