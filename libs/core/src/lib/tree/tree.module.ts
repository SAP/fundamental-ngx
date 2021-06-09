import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { TreeChildComponent } from './tree-child.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';

@NgModule({
    declarations: [TreeComponent, TreeChildComponent],
    imports: [CommonModule, ButtonModule, IconModule, PopoverModule, MenuModule],
    exports: [TreeComponent, TreeChildComponent]
})
export class TreeModule {}
