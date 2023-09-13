import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FormModule } from '@fundamental-ngx/core/form';
import { GridListModule } from '@fundamental-ngx/core/grid-list';
import { IconModule } from '@fundamental-ngx/core/icon';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { SelectModule } from '@fundamental-ngx/core/select';

import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { ObjectStatusComponent, PlatformObjectStatusTextDirective } from '@fundamental-ngx/platform/object-status';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';

import { I18nModule } from '@fundamental-ngx/i18n';
import { ApprovalFlowAddNodeComponent } from './approval-flow-add-node/approval-flow-add-node.component';
import { ApprovalFlowApproverDetailsComponent } from './approval-flow-approver-details/approval-flow-approver-details.component';
import { ApprovalFlowMessagesComponent } from './approval-flow-messages/approval-flow-messages.component';
import { ApprovalFlowDropZoneDirective } from './approval-flow-node/approval-flow-drop-zone.directive';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';
import { ApprovalFlowSelectTypeComponent } from './approval-flow-select-type/approval-flow-select-type.component';
import { ApprovalFlowTeamListComponent } from './approval-flow-team-list/approval-flow-team-list.component';
import { ApprovalFlowToolbarActionsComponent } from './approval-flow-toolbar-actions/approval-flow-toolbar-actions.component';
import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details/approval-flow-user-details.component';
import { ApprovalFlowUserListComponent } from './approval-flow-user-list/approval-flow-user-list.component';
import { ApprovalFlowComponent } from './approval-flow.component';
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
        ApprovalFlowTeamListComponent,
        ApprovalFlowSelectTypeComponent,
        ApprovalFlowMessagesComponent,
        ApprovalFlowToolbarActionsComponent
    ],
    providers: [ApprovalFlowAddNodeViewService],
    imports: [
        CommonModule,
        FormsModule,
        AvatarModule,
        BarModule,
        ButtonModule,
        IconModule,
        GridListModule,
        DialogModule,
        ObjectStatusComponent,
        PlatformObjectStatusTextDirective,
        PlatformListModule,
        StandardListItemModule,
        PlatformSearchFieldModule,
        MultiInputModule,
        MessageStripModule,
        CheckboxModule,
        I18nModule,
        MenuModule,
        SelectModule,
        DatePickerModule,
        BusyIndicatorModule,
        FormModule,
        DragDropModule,
        RadioModule,
        IllustratedMessageModule
    ],
    exports: [ApprovalFlowComponent]
})
export class PlatformApprovalFlowModule {}
