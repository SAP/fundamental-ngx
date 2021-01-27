import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ApprovalFlowPo extends BaseComponentPo {
    url = '/approval-flow';
    root = '#page-content';
    watchers = 'fdp-approval-flow .approval-flow__watchers';
    watchersTitle = this.watchers + ' p';
    watchersAvatar = this.watchers + ' fd-avatar';

    detailsDialog = '[role="dialog"]';
    detailsDialogSearchInput = this.detailsDialog + ' input';
    detailsDialogTeamMember = this.detailsDialog + ' li';
    detailsDialogTeamMemberName = this.detailsDialog + ' .fd-list__title';
    detailsDialogTeamMemberCheckBox = this.detailsDialogTeamMember + ' input ';
    detailsDialogBackIcon = this.detailsDialog + ' fd-icon';
    detailsDialogHeader = this.detailsDialog + ' header';
    detailsDialogAvatar = this.detailsDialog + ' fd-avatar';
    detailsDialogCancelBtn = this.detailsDialog + ' button.fd-button--transparent.fd-dialog__decisive-button';
    detailsDialogSearchlBtn = this.detailsDialog + ' button.fdp-search-field__submit';
    detailsDialogSendReminderBtn = this.detailsDialog + ' button.fd-button--emphasized';

    approvalFlow = 'fdp-approval-flow .approval-flow__container';
    selectExample = 'select';
    approvalFlowNode = '.approval-flow-node__inner';
    approvalFlowTeamNode = '.approval-flow-node__inner.approval-flow-node__name--members-count';
    approvalFlowNodeAvatar = this.approvalFlowNode + ' fd-avatar';
    approvalFlowNodeStatus = this.approvalFlowNode + ' fdp-object-status';
    approvalFlowNodeName = this.approvalFlowNode + ' .approval-flow-node__name';
    approvalFlowNodeDescription = this.approvalFlowNode + ' .approval-flow-node__description';

    toastMessageDialog = 'fd-message-toast';
    flowNavigationArrow = 'button.approval-flow__control--next-slide fd-icon[role="presentation"]';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.watchers);
    }
}
