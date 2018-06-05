import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../utils/utils.module';

import { DropdownComponent } from './dropdown.component';
import { DropdownItemComponent } from './dropdown-item.component';
import { DropdownGroupComponent } from './dropdown-group.component';
import { DropdownControlDirective } from './dropdown-control.directive';
import { DropdownControlNoBorderDirective } from './dropdown-control-no-border.directive';
import { DropdownGroupHeaderDirective } from './dropdown-header.directive';

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
