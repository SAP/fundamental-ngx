import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ApprovalFlowPo extends BaseComponentPo {
    url = '/approval-flow';
    root = '#page-content';
    watchers = 'fdp-approval-flow .fdp-approval-flow__watchers';
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
    approvalFlowNode = '.fdp-approval-flow-node__inner';
    approvalFlowTeamNode = this.approvalFlowNode + '.fdp-approval-flow-node__name--members-count';
    approvalFlowNodeAvatar = this.approvalFlowNode + ' fd-avatar';
    approvalFlowNodeStatus = this.approvalFlowNode + ' fdp-object-status';
    approvalFlowNodeName = this.approvalFlowNode + ' .fdp-approval-flow-node__name';
    approvalFlowNodeDescription = this.approvalFlowNode + ' .fdp-approval-flow-node__description';
    approvalFlowNodeCheckbox = '.fd-checkbox__label';
    approvalFlowNodeCheckboxAlt = '.fd-grid-list__item-input';
    approvalFlowNodeActionMenu = '.fdp-approval-flow-node__menu-button';
    approvalFlowNodeActionMenuItem = '[role="menuitem"]';

    remaindersSendToInput = 'fd-multi-input fd-tokenizer input';
    selectItem = '[role="listitem"]';
    bottomMenuItems = '.fd-bar__element button';

    addNode = '.fdp-approval-flow-node__add';
    editExampleButton = 'fdp-approval-flow-toolbar-actions';
    addWhatchersInput = '.fdp-approval-flow__watchers-input-container input';

    toastMessageDialog = 'fd-message-toast';
    flowNavigationArrow = 'button.fdp-approval-flow-carousel-controls__button--next-slide';

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
