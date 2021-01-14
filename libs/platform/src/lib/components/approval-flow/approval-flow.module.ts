import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    AvatarModule,
    ButtonModule,
    CheckboxModule,
    ComboboxModule, DatePickerModule,
    DialogModule,
    FormModule,
    IconModule,
    MenuModule,
    MessageStripModule,
    MessageToastModule,
    MultiInputModule, SelectModule,
    ToolbarModule
} from '@fundamental-ngx/core';

import { ApprovalFlowComponent } from './approval-flow.component';
import { PlatformObjectStatusModule } from '../object-status/public_api';
import { PlatformSearchFieldModule } from '../search-field/public_api';
import { PlatformListModule, StandardListItemModule } from '../list/public_api';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';
import { ApprovalFlowApproverDetailsComponent } from './approval-flow-approver-details/approval-flow-approver-details.component';
import { ApprovalFlowAddNodeComponent } from './approval-flow-add-node/approval-flow-add-node.component';
import { ApprovalFlowUserListComponent } from './approval-flow-user-list/approval-flow-user-list.component';
import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details/approval-flow-user-details.component';


@NgModule({
    declarations: [
        ApprovalFlowComponent,
        ApprovalFlowNodeComponent,
        ApprovalFlowApproverDetailsComponent,
        ApprovalFlowAddNodeComponent,
        ApprovalFlowUserListComponent,
        ApprovalFlowUserDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AvatarModule,
        ButtonModule,
        IconModule,
        ToolbarModule,
        DialogModule,
        MessageToastModule,
        PlatformObjectStatusModule,
        PlatformListModule,
        StandardListItemModule,
        PlatformSearchFieldModule,
        MultiInputModule,
        MessageStripModule,
        CheckboxModule,
        MenuModule,
        ComboboxModule,
        SelectModule,
        DatePickerModule,
        FormModule
    ],
    exports: [
        ApprovalFlowComponent
    ]
})
export class PlatformApprovalFlowModule {
}
