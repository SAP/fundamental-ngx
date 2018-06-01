import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tree, TreeChild } from './tree';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
    declarations: [Tree, TreeChild],
    imports: [CommonModule, ButtonModule, IconModule, DropdownModule],
    exports: [Tree, TreeChild]
})
export class TreeModule {}
