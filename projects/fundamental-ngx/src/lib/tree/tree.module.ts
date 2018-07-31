import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { TreeChildComponent } from './tree-child.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { PopoverModule } from '../popover/popover.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    declarations: [TreeComponent, TreeChildComponent],
    imports: [CommonModule, ButtonModule, IconModule, PopoverModule, MenuModule],
    exports: [TreeComponent, TreeChildComponent]
})
export class TreeModule {}
