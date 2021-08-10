import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FormModule } from '@fundamental-ngx/core/form';
import { GridListModule } from '@fundamental-ngx/core/grid-list';
import { IconModule } from '@fundamental-ngx/core/icon';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

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
import { ApprovalFlowSelectTypeComponent } from './approval-flow-select-type/approval-flow-select-type.component';
import { ApprovalFlowMessagesComponent } from './approval-flow-messages/approval-flow-messages.component';
import { ApprovalFlowToolbarActionsComponent } from './approval-flow-toolbar-actions/approval-flow-toolbar-actions.component';


@NgModule({
    declarations: [
        ApprovalFlowComponent,
        ApprovalFlowNodeComponent,
        ApprovalFlowApproverDetailsComponent,
        ApprovalFlowAddNodeComponent,
        ApprovalFlowUserListComponent,
        ApprovalFlowUserDetailsComponent,
        ApprovalFlowDropZoneDirective,
        ApprovalFlowTeamListComponent,
        ApprovalFlowSelectTypeComponent,
        ApprovalFlowMessagesComponent,
        ApprovalFlowToolbarActionsComponent
    ],
    entryComponents: [
        ApprovalFlowAddNodeComponent,
        ApprovalFlowApproverDetailsComponent,
        ApprovalFlowSelectTypeComponent
    ],
    providers: [
        ApprovalFlowAddNodeViewService
    ],
    imports: [
        CommonModule,
        FormsModule,
        AvatarModule,
        BarModule,
        ButtonModule,
        IconModule,
        ToolbarModule,
        GridListModule,
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
