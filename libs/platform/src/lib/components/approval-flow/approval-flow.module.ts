import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule, ButtonModule, ToolbarModule } from '@fundamental-ngx/core';

import { ApprovalFlowComponent } from './approval-flow.component';
import { PlatformObjectStatusModule } from '../object-status/public_api';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';


@NgModule({
    declarations: [ApprovalFlowComponent, ApprovalFlowNodeComponent],
    imports: [
        CommonModule,
        AvatarModule,
        ButtonModule,
        ToolbarModule,
        PlatformObjectStatusModule
    ],
    exports: [
        ApprovalFlowComponent
    ]
})
export class PlatformApprovalFlowModule {
}
