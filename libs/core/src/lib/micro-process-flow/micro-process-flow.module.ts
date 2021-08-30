import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroProcessFlowComponent } from './components/micro-process-flow/micro-process-flow.component';
import { MicroProcessFlowItemComponent } from './components/micro-process-flow-item/micro-process-flow-item.component';
import { MicroProcessFlowIconComponent } from './components/micro-process-flow-icon/micro-process-flow-icon.component';
import { IconModule } from '@fundamental-ngx/core/icon';

@NgModule({
    declarations: [
        MicroProcessFlowComponent,
        MicroProcessFlowItemComponent,
        MicroProcessFlowIconComponent
    ],
    imports: [
        CommonModule,
        IconModule
    ],
    exports: [
        MicroProcessFlowComponent,
        MicroProcessFlowItemComponent,
        MicroProcessFlowIconComponent
    ]
})
export class MicroProcessFlowModule {}
