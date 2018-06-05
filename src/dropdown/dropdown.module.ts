import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../utils/utils.module';
import {
    DropdownComponent,
    DropdownItemComponent,
    DropdownGroupComponent,
    DropdownControlDirective,
    DropdownControlNoBorderDirective,
    DropdownGroupHeaderDirective
} from './dropdown.component';

@NgModule({
    declarations: [
        DropdownComponent,
        DropdownItemComponent,
        DropdownGroupComponent,
        DropdownControlDirective,
        DropdownControlNoBorderDirective,
        DropdownGroupHeaderDirective
    ],
    imports: [CommonModule, UtilsModule],
    exports: [
        DropdownComponent,
        DropdownItemComponent,
        DropdownGroupComponent,
        DropdownControlDirective,
        DropdownControlNoBorderDirective,
        DropdownGroupHeaderDirective
    ]
})
export class DropdownModule {}
