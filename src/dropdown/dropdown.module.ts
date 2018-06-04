import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../utils/utils.module';
import {
    DropdownComponent,
    DropdownItem,
    DropdownGroup,
    DropdownControl,
    DropdownControlNoBorder,
    DropdownGroupHeader
} from './dropdown.component';

@NgModule({
    declarations: [
        DropdownComponent,
        DropdownItem,
        DropdownGroup,
        DropdownControl,
        DropdownControlNoBorder,
        DropdownGroupHeader
    ],
    imports: [CommonModule, UtilsModule],
    exports: [
        DropdownComponent,
        DropdownItem,
        DropdownGroup,
        DropdownControl,
        DropdownControlNoBorder,
        DropdownGroupHeader
    ]
})
export class DropdownModule {}
