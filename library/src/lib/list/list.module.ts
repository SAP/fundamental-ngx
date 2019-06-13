import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDirective } from './list.directive';
import { ListItemDirective } from './list-item.directive';
import { ListCheckboxComponent } from './list-checkbox.component';
import { ListActionDirective } from './list-action.directive';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [ListDirective, ListItemDirective, ListActionDirective, ListCheckboxComponent],
    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
    exports: [ListDirective, ListItemDirective, ListActionDirective, ListCheckboxComponent]
})
export class ListModule {}
