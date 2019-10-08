import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemDirective } from './list-item.directive';
import { ListActionDirective } from './list-action.directive';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
@NgModule({
    declarations: [ListComponent, ListItemDirective, ListActionDirective],
    imports: [CommonModule, ButtonModule, IconModule, FormsModule, FormModule],
    exports: [ListComponent, ListItemDirective, ListActionDirective]
})
export class ListModule {}
