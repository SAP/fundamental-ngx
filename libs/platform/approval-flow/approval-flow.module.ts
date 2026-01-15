import { NgModule } from '@angular/core';

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

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
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
    exports: [ApprovalFlowComponent]
})
export class PlatformApprovalFlowModule {}
