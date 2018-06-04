import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent, ListItemComponent, ListActionDirective, ListCheckboxComponent } from './list.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
@NgModule({
    declarations: [ListComponent, ListItemComponent, ListActionDirective, ListCheckboxComponent],
    imports: [CommonModule, ButtonModule, IconModule],
    exports: [ListComponent, ListItemComponent, ListActionDirective, ListCheckboxComponent]
})
export class ListModule {}
