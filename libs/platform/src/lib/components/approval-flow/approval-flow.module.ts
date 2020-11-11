import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule, ButtonModule, DialogModule, MessageToastModule, ToolbarModule } from '@fundamental-ngx/core';

import { ApprovalFlowComponent } from './approval-flow.component';
import { PlatformObjectStatusModule } from '../object-status/public_api';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';
import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details/approval-flow-user-details.component';
import { PlatformListModule, StandardListItemModule } from '../list/public_api';


@NgModule({
    declarations: [ApprovalFlowComponent, ApprovalFlowNodeComponent, ApprovalFlowUserDetailsComponent],
    imports: [
        CommonModule,
        AvatarModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        MessageToastModule,
        PlatformObjectStatusModule,
        PlatformListModule,
        StandardListItemModule
    ],
    exports: [
        ApprovalFlowComponent
    ]
})
export class PlatformApprovalFlowModule {
}
