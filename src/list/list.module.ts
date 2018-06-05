import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item.component';
import { ListCheckboxComponent } from './list-checkbox.component';
import { ListActionDirective } from './list-action.directive';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
@NgModule({
    declarations: [ListComponent, ListItemComponent, ListActionDirective, ListCheckboxComponent],
    imports: [CommonModule, ButtonModule, IconModule],
    exports: [ListComponent, ListItemComponent, ListActionDirective, ListCheckboxComponent]
})
export class ListModule {}
