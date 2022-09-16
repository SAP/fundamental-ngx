import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    DeprecatedMicroProcessFlowContentDensityDirective,
    MicroProcessFlowModule
} from '@fundamental-ngx/core/micro-process-flow';
import { IconModule } from '@fundamental-ngx/core/icon';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { MicroProcessFlowDocsComponent } from './micro-process-flow-docs.component';
import { MicroProcessFlowHeaderComponent } from './micro-process-flow-header/micro-process-flow-header.component';
import { MicroProcessFlowExampleComponent } from './examples/micro-process-flow-example.component';
import { MicroProcessFlowOtherControlsExampleComponent } from './examples/micro-process-flow-other-controls-example.component';
import { StatusIndicatorModule } from '@fundamental-ngx/core/status-indicator';
import { MicroProcessFlowPopoverExampleComponent } from './examples/micro-process-flow-popover-example.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ListModule } from '@fundamental-ngx/core/list';
import { MicroProcessFlowOverflowExampleComponent } from './examples/micro-process-flow-overflow-example.component';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { MicroProcessFlowIndependentItemsExampleComponent } from './examples/micro-process-flow-independent-items-example.component';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { MicroProcessFlowCustomWidthExampleComponent } from './examples/micro-process-flow-custom-width-example.component';
import { MicroProcessFlowObjectBetweenNodesExampleComponent } from './examples/micro-process-flow-object-between-nodes-example.component';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
    declarations: [
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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        MicroProcessFlowModule,
        IconModule,
        StatusIndicatorModule,
        PopoverModule,
        ListModule,
        AvatarModule,
        InfoLabelModule
    ],
    exports: [RouterModule],
    providers: [
        moduleDeprecationsProvider(DeprecatedMicroProcessFlowContentDensityDirective),
        currentComponentProvider('micro-process-flow')
    ]
})
export class MicroProcessFlowDocsModule {}
