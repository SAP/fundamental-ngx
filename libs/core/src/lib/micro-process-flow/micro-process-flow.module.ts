import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroProcessFlowComponent } from './components/micro-process-flow/micro-process-flow.component';
import { MicroProcessFlowItemComponent } from './components/micro-process-flow-item/micro-process-flow-item.component';
import { MicroProcessFlowIconComponent } from './components/micro-process-flow-icon/micro-process-flow-icon.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { MicroProcessFlowIntermediaryItemDirective } from './micro-process-flow-intermediary-item.directive';
import { MicroProcessFlowFocusableItemDirective } from './micro-process-flow-focusable-item.directive';

@NgModule({
    declarations: [
        MicroProcessFlowComponent,
        MicroProcessFlowItemComponent,
        MicroProcessFlowIconComponent,
        MicroProcessFlowIntermediaryItemDirective,
        MicroProcessFlowFocusableItemDirective
    ],
    imports: [CommonModule, IconModule],
    exports: [
        MicroProcessFlowComponent,
        MicroProcessFlowItemComponent,
        MicroProcessFlowIconComponent,
        MicroProcessFlowIntermediaryItemDirective,
        MicroProcessFlowFocusableItemDirective
    ]
})
export class MicroProcessFlowModule {}
