import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { TreeChildComponent } from './tree-child.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
    declarations: [TreeComponent, TreeChildComponent],
    imports: [CommonModule, ButtonModule, IconModule, DropdownModule],
    exports: [TreeComponent, TreeChildComponent]
})
export class TreeModule {}
