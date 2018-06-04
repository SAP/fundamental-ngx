import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent, TreeChild } from './tree.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
    declarations: [TreeComponent, TreeChild],
    imports: [CommonModule, ButtonModule, IconModule, DropdownModule],
    exports: [TreeComponent, TreeChild]
})
export class TreeModule {}
