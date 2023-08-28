import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IconModule } from '@fundamental-ngx/core/icon';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { StatusIndicatorModule } from '@fundamental-ngx/core/status-indicator';
import { MicroProcessFlowCustomWidthExampleComponent } from './examples/micro-process-flow-custom-width-example.component';
import { MicroProcessFlowExampleComponent } from './examples/micro-process-flow-example.component';
import { MicroProcessFlowIndependentItemsExampleComponent } from './examples/micro-process-flow-independent-items-example.component';
import { MicroProcessFlowObjectBetweenNodesExampleComponent } from './examples/micro-process-flow-object-between-nodes-example.component';
import { MicroProcessFlowOtherControlsExampleComponent } from './examples/micro-process-flow-other-controls-example.component';
import { MicroProcessFlowOverflowExampleComponent } from './examples/micro-process-flow-overflow-example.component';
import { MicroProcessFlowPopoverExampleComponent } from './examples/micro-process-flow-popover-example.component';
import { MicroProcessFlowDocsComponent } from './micro-process-flow-docs.component';
import { MicroProcessFlowHeaderComponent } from './micro-process-flow-header/micro-process-flow-header.component';

const routes: Routes = [
    {
        path: '',
        component: MicroProcessFlowHeaderComponent,
        children: [
            { path: '', component: MicroProcessFlowDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.microProcessFlow } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        MicroProcessFlowModule,
        IconModule,
        StatusIndicatorModule,
        PopoverModule,
        ListModule,
        AvatarModule,
        InfoLabelModule,
        MicroProcessFlowDocsComponent,
        MicroProcessFlowHeaderComponent,
        MicroProcessFlowExampleComponent,
        MicroProcessFlowOtherControlsExampleComponent,
        MicroProcessFlowPopoverExampleComponent,
        MicroProcessFlowOverflowExampleComponent,
        MicroProcessFlowIndependentItemsExampleComponent,
        MicroProcessFlowCustomWidthExampleComponent,
        MicroProcessFlowObjectBetweenNodesExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('micro-process-flow')]
})
export class MicroProcessFlowDocsModule {}
