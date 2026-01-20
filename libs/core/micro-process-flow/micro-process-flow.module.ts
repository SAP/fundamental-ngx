import { NgModule } from '@angular/core';
import { MicroProcessFlowIconComponent } from './components/micro-process-flow-icon/micro-process-flow-icon.component';
import { MicroProcessFlowItemComponent } from './components/micro-process-flow-item/micro-process-flow-item.component';
import { MicroProcessFlowComponent } from './components/micro-process-flow/micro-process-flow.component';
import { MicroProcessFlowFocusableItemDirective } from './micro-process-flow-focusable-item.directive';
import { MicroProcessFlowIntermediaryItemDirective } from './micro-process-flow-intermediary-item.directive';

const components = [
    MicroProcessFlowComponent,
    MicroProcessFlowItemComponent,
    MicroProcessFlowIconComponent,
    MicroProcessFlowIntermediaryItemDirective,
    MicroProcessFlowFocusableItemDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class MicroProcessFlowModule {}
