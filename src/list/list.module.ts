import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent, ListItem, ListAction, ListCheckbox } from './list.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
@NgModule({
    declarations: [ListComponent, ListItem, ListAction, ListCheckbox],
    imports: [CommonModule, ButtonModule, IconModule],
    exports: [ListComponent, ListItem, ListAction, ListCheckbox]
})
export class ListModule {}
