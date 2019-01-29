import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item.component';
import { ListCheckboxComponent } from './list-checkbox.component';
import { ListActionDirective } from './list-action.directive';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [ListComponent, ListItemComponent, ListActionDirective, ListCheckboxComponent],
    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
    exports: [ListComponent, ListItemComponent, ListActionDirective, ListCheckboxComponent]
})
export class ListModule {}
