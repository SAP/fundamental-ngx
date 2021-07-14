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

    detailsDialogUserTeamButton = this.detailsDialog + ' fd-multi-input button';
    detailsDialogParallelSerialSelect = this.detailsDialog + ' fd-select';
    detailsDialogParallelSerialSelectOption = 'fd-option';

    approvalFlow = 'fdp-approval-flow .approval-flow__container';
    selectExample = 'select';
    approvalFlowNode = '.approval-flow-node__inner';
    approvalFlowTeamNode = '.approval-flow-node__inner.approval-flow-node__name--members-count';
    approvalFlowNodeAvatar = this.approvalFlowNode + ' fd-avatar';
    approvalFlowNodeStatus = this.approvalFlowNode + ' fdp-object-status';
    approvalFlowNodeName = this.approvalFlowNode + ' .approval-flow-node__name';
    approvalFlowNodeDescription = this.approvalFlowNode + ' .approval-flow-node__description';
    approvalFlowNodeCheckbox = 'fd-checkbox';
    approvalFlowNodeCheckboxAlt = '//*[contains(@class, "fd-checkbox") and contains(@aria-disabled, "false")]/ancestor::fd-checkbox/label';
    approvalFlowNodeActionMenu = '.approval-flow-node__edit-controls button';
    approvalFlowNodeActionMenuItem = '[role="menuitem"]';

    remaindersSendToInput = 'fd-multi-input fd-tokenizer input';
    selectItem = '[role="listitem"]';
    bottomMenuItems = '.approval-flow__edit-mode-footer button';

    addNode = '.approval-flow-node__add';
    editExampleButton = '.approval-flow__toolbar-controls';
    addWhatchersInput = '.approval-flow__watchers-input-container input';

    toastMessageDialog = 'fd-message-toast';
    flowNavigationArrow = 'button.approval-flow__control--next-slide fd-icon[role="presentation"]';

    topActionButtons = 'button.fd-button--standard.fd-button--compact';
    messageStrip = 'fd-message-strip';
    messageStripUndoLink = 'fd-message-strip a';
    messageStripCancelUndoMessage = 'fd-message-strip button';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.watchers);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'approval-flow'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'approval-flow'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
