import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import {
    AvatarModule,
    ButtonModule,
    CheckboxModule,
    ComboboxModule,
    DatePickerModule,
    DialogModule,
    FormModule,
    IconModule,
    IllustratedMessageModule,
    MenuModule,
    MessageStripModule,
    MessageToastModule,
    MultiInputModule,
    RadioModule,
    SelectModule,
    ToolbarModule
} from '@fundamental-ngx/core';
import { PlatformObjectStatusModule } from '../object-status/object-status.module';
import { PlatformSearchFieldModule } from '../search-field/search-field.module';
import { PlatformListModule } from '../list/list.module';
import { StandardListItemModule } from '../list/standard-list-item/standard-list-item.module';

import { ApprovalFlowComponent } from './approval-flow.component';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';
import { ApprovalFlowApproverDetailsComponent } from './approval-flow-approver-details/approval-flow-approver-details.component';
import { ApprovalFlowAddNodeComponent } from './approval-flow-add-node/approval-flow-add-node.component';
import { ApprovalFlowUserListComponent } from './approval-flow-user-list/approval-flow-user-list.component';
import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details/approval-flow-user-details.component';
import { ApprovalFlowDropZoneDirective } from './approval-flow-node/approval-flow-drop-zone.directive';
import { ApprovalFlowTeamListComponent } from './approval-flow-team-list/approval-flow-team-list.component';
import { ApprovalFlowAddNodeViewService } from './services/approval-flow-add-node-view.service';


@NgModule({
    declarations: [
        ApprovalFlowComponent,
        ApprovalFlowNodeComponent,
        ApprovalFlowApproverDetailsComponent,
        ApprovalFlowAddNodeComponent,
        ApprovalFlowUserListComponent,
        ApprovalFlowUserDetailsComponent,
        ApprovalFlowDropZoneDirective,
        ApprovalFlowTeamListComponent
    ],
    providers: [
        ApprovalFlowAddNodeViewService
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
        FormModule,
        DragDropModule,
        RadioModule,
        IllustratedMessageModule
    ],
    exports: [
        ApprovalFlowComponent
    ]
})
export class PlatformApprovalFlowModule {
}
