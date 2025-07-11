import { PlatformBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class ApprovalFlowPo extends PlatformBaseComponentPo {
    url = '/approval-flow';

    afDefaultExample = 'fdp-platform-approval-flow-example ';

    root = '#page-content';
    watchers = 'fdp-approval-flow .fdp-approval-flow__watchers';
    watchersTitle = this.watchers + ' p';
    watchersAvatar = this.watchers + ' fd-avatar';
    exampleFlow = 'fdp-platform-approval-flow-example ';

    detailsDialog = 'fd-dialog-container .fd-dialog--active';
    detailsDialogSearchInput = this.detailsDialog + ' input';
    detailsDialogTeamMember = this.detailsDialog + ' .fd-list__item';
    detailsDialogTeamMemberName = this.detailsDialog + ' .fd-list__title';
    detailsDialogTeamMemberCheckBox = this.detailsDialogTeamMember + ' fd-checkbox ';
    detailsDialogBackIcon = this.detailsDialog + ' fd-icon';
    detailsDialogHeader = ' fd-dialog-container .fd-dialog__header';
    detailsDialogAvatar = this.detailsDialog + ' fd-avatar';
    detailsDialogCancelBtn = this.detailsDialog + ' button.fd-button--transparent.fd-dialog__decisive-button';
    detailsDialogSendReminderBtn = this.detailsDialog + ' button.fd-button--emphasized';

    detailsDialogUserTeamButton = this.detailsDialog + ' fd-multi-input button';
    detailsDialogParallelSerialSelect = this.detailsDialog + ' fd-select';
    detailsDialogParallelSerialSelectOption = 'li[fd-option]';

    selectExample = 'select';
    approvalFlowNode = 'fdp-approval-flow-node .fd-grid-list__item-body';
    approvalFlowTeamNode = this.approvalFlowNode + '.fdp-approval-flow-node__name--members-count';
    approvalFlowNodeAvatar = this.approvalFlowNode + ' fd-avatar';
    approvalFlowNodeStatus = this.approvalFlowNode + ' fdp-object-status';
    approvalFlowNodeName = this.approvalFlowNode + ' .fdp-approval-flow-node__name';
    approvalFlowNodeDescription = this.approvalFlowNode + ' .fdp-approval-flow-node__description';
    approvalFlowNodeCheckbox = '.fd-toolbar .fd-checkbox';
    approvalFlowNodeCheckboxAlt = '.fd-grid-list__item-input';
    approvalFlowNodeActionMenu = '.fdp-approval-flow-node__menu-button';
    approvalFlowNodeActionMenuItem = '[role="menuitem"]';

    remaindersSendToInput = 'fd-multi-input fd-tokenizer input';
    selectItem = '.fd-popover-custom-list .fd-list .fd-list__item[role="option"]';
    bottomMenuItems = '.fd-bar__element button';

    addNode = '.fdp-approval-flow-node__add';
    editExampleButton = 'fdp-approval-flow-toolbar-actions';
    addWhatchersInput = '.fdp-approval-flow__watchers-input-container input';

    toastMessageDialog = 'fd-message-toast';
    flowNavigationArrow = 'button.fdp-approval-flow-carousel-controls__button--next-slide';

    topActionButtons = 'button.fd-button--standard.is-compact';
    messageStrip = 'fd-message-strip';
    messageStripUndoLink = 'fd-message-strip a';
    messageStripCancelUndoMessage = 'fd-message-strip button';
    toolbarButtons = '.fdp-approval-flow-toolbar-actions .fd-button--standard';

    optionInput = this.exampleFlow + 'input';
    reminderOptionsButton = this.exampleFlow + '.fd-input-group .fd-button';
    reminderOptionsList = '.fd-list.fd-multi-input-menu-overflow';
    selectedOptions = this.reminderOptionsList + ' .fd-list__item.is-selected';
    approvedNode = '//span[contains(@class, "fd-object-status--positive")]/../../..';
    inProgressNode = '//span[contains(@class, "fd-object-status--informative")]/../../..';
    rejectedNode = '//span[contains(@class, "fd-object-status--negative")]/../../..';
    notStartedNode = '//span[@class="fd-object-status fd-object-status--inverted"]/../../..';
    addApproverOptions = this.detailsDialog + ' .fd-select__control';
    approverOptionListItem = '.cdk-overlay-container .fd-list__item';
    radioButton = this.detailsDialog + ' fd-radio-button';
    footerButtons = this.detailsDialog + ' .fd-bar__element .fd-button';
    nodeCardInfo = '.fdp-approval-flow-node__info';
    dialogCheckbox = this.detailsDialog + ' fd-checkbox';
    reminderToaster = '.fd-toast-overlay .fd-message-toast';
    dueDateNode = '.fd-grid-list__item-body .fd-object-status--critical';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'approval-flow'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'approval-flow'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
