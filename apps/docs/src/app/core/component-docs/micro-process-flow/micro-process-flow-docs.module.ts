import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';
import { IconModule } from '@fundamental-ngx/core/icon';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { MicroProcessFlowDocsComponent } from './micro-process-flow-docs.component';
import { MicroProcessFlowHeaderComponent } from './micro-process-flow-header/micro-process-flow-header.component';
import { MicroProcessFlowExampleComponent } from './examples/micro-process-flow-example.component';
import { MicroProcessFlowOtherControlsComponent } from './examples/micro-process-flow-other-controls.component';
import { StatusIndicatorModule } from '@fundamental-ngx/core/status-indicator';
import { MicroProcessFlowPopoverComponent } from './examples/micro-process-flow-popover.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ListModule } from '@fundamental-ngx/core/list';
import { MicroProcessFlowOverflowComponent } from './examples/micro-process-flow-overflow.component';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { MicroProcessFlowIndependentComponent } from './examples/micro-process-flow-independent.component';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';

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
        MicroProcessFlowOtherControlsComponent,
        MicroProcessFlowPopoverComponent,
        MicroProcessFlowOverflowComponent,
        MicroProcessFlowIndependentComponent
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
})
export class MicroProcessFlowDocsModule { }
