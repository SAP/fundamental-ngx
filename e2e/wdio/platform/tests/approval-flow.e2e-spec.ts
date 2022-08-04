import {
    browserIsFirefox,
    click,
    doesItExist,
    getElementArrayLength,
    getText,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    selectOptionByValueAttribute,
    sendKeys,
    setValue,
    waitElementToBeClickable,
    waitForElDisappear,
    waitForNotDisplayed,
    waitForElDisplayed,
    waitForNotPresent,
    waitForPresent,
    scrollIntoView,
    browserIsSafari,
    pause
} from '../../driver/wdio';
import { ApprovalFlowPo } from '../pages/approval-flow.po';
import {
    approved_node_status,
    details_dialog_cancel_btn,
    details_dialog_header,
    details_dialog_send_reminder_btn,
    node_statuses,
    rejected_node_status,
    remainder_text,
    watchers_block_title,
    nodeOptionsArr,
    dueDateMessage
} from '../fixtures/appData/approval-flow-contents';
import {
    editModeOption,
    dueDateWarningsOption,
    setStatusOption,
    disableAllNodesOption,
    disableAddingBeforeOption,
    disableAddingAfterOption,
    disableAddingParallelOption,
    disableEditingOption,
    disableRemovingOption
} from '../fixtures/testData/approval-flow';

describe('Approval flow', () => {
    const approvalFlowPage = new ApprovalFlowPo();
    const {
        selectExample,
        flowNavigationArrow,
        approvalFlowNode,
        watchersTitle,
        watchersAvatar,
        detailsDialog,
        detailsDialogSearchInput,
        detailsDialogTeamMember,
        detailsDialogBackIcon,
        detailsDialogHeader,
        detailsDialogAvatar,
        detailsDialogCancelBtn,
        detailsDialogSendReminderBtn,
        approvalFlowNodeAvatar,
        approvalFlowNodeName,
        approvalFlowNodeDescription,
        approvalFlowNodeStatus,
        toastMessageDialog,
        detailsDialogTeamMemberCheckBox,
        detailsDialogTeamMemberName,
        approvalFlowTeamNode,
        remaindersSendToInput,
        selectItem,
        editExampleButton,
        addWhatchersInput,
        bottomMenuItems,
        addNode,
        approvalFlowNodeCheckbox,
        detailsDialogParallelSerialSelect,
        detailsDialogUserTeamButton,
        detailsDialogParallelSerialSelectOption,
        messageStrip,
        messageStripUndoLink,
        messageStripCancelUndoMessage,
        topActionButtons,
        approvalFlowNodeActionMenu,
        approvalFlowNodeActionMenuItem,
        approvalFlowNodeCheckboxAlt,
        optionInput,
        toolbarButtons,
        reminderOptionsButton,
        reminderOptionsList,
        selectedOptions,
        approvedNode,
        inProgressNode,
        rejectedNode,
        notStartedNode,
        addApproverOptions,
        approverOptionListItem,
        radioButton,
        footerButtons,
        nodeCardInfo,
        dialogCheckbox,
        reminderToaster,
        dueDateNode
    } = approvalFlowPage;

    beforeAll(() => {
        approvalFlowPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(approvalFlowPage.root);
        waitForElDisplayed(approvalFlowPage.title);
    }, 1);

    it('should have watchers section with watchers details displayed', () => {
        expect(isElementDisplayed(watchersAvatar)).toBe(true);
        expect(getElementArrayLength(watchersAvatar)).toBe(4);
    });

    it('should have watchers section has correct title', () => {
        expect(getText(watchersTitle)).toBe(watchers_block_title);
    });

    it('should have watchers section user details appear on click', () => {
        click(watchersAvatar);
        waitForElDisplayed(detailsDialog);
        checkWatchersDetailsDialogContent();
    });

    it('should have watchers section user details disappeared on click', () => {
        click(watchersAvatar);
        waitForElDisplayed(detailsDialog);
        click(detailsDialogCancelBtn);
        waitForElDisappear(detailsDialog);
        expect(doesItExist(detailsDialog)).toBe(false);
    });

    it('should be able to switch example', () => {
        selectOptionByValueAttribute(selectExample, 'empty');
        expect(getElementArrayLength(approvalFlowNode)).toEqual(0);

        selectOptionByValueAttribute(selectExample, 'simple');
        expect(getElementArrayLength(approvalFlowNode)).toEqual(3);

        selectOptionByValueAttribute(selectExample, 'medium');
        expect(getElementArrayLength(approvalFlowNode)).toEqual(6);

        selectOptionByValueAttribute(selectExample, 'complex');
        expect(getElementArrayLength(approvalFlowNode)).toEqual(8);
    });

    it('verify approval item content', () => {
        const arrLength = getElementArrayLength(approvalFlowNode);
        for (let i = 0; arrLength > i; i++) {
            expect(isElementDisplayed(approvalFlowNodeAvatar, i)).toBe(true);
            expect(isElementDisplayed(approvalFlowNodeName, i)).toBe(true);
            expect(['', 'undefined']).not.toContain(getText(approvalFlowNodeName, i));
            expect(isElementDisplayed(approvalFlowNodeDescription, i)).toBe(true);
            expect(['', 'undefined']).not.toContain(getText(approvalFlowNodeName, i));
            expect(isElementDisplayed(approvalFlowNodeStatus, i)).toBe(true);
            expect(node_statuses).not.toContain(getText(approvalFlowNodeName, i));
        }
    });

    it('verify approver/approving team details item content', () => {
        const arrLength = getElementArrayLength(approvalFlowNode);
        for (let i = 0; arrLength > i; i++) {
            while (!isElementClickable(approvalFlowNode, i)) {
                click(flowNavigationArrow);
            }
            waitElementToBeClickable(approvalFlowNode, i);
            click(approvalFlowNode, i);
            waitForElDisplayed(detailsDialog);

            if (doesItExist(detailsDialogSearchInput)) {
                // Check each team member details dialog
                const teamMemberCount = getElementArrayLength(detailsDialogTeamMember);
                for (let j = 0; teamMemberCount > j; j++) {
                    click(detailsDialogTeamMember, j);
                    checkWatchersDetailsDialogContent();
                    click(detailsDialogBackIcon);
                }
            } else {
                checkApproveNodeDetailsDialogContent();
            }

            click(detailsDialogCancelBtn);
            waitForElDisappear(detailsDialog);
        }
    });

    it('should be able send remainder to all statuses', () => {
        scrollIntoView(remaindersSendToInput);
        click(remaindersSendToInput);
        sendKeys(approved_node_status);
        waitForElDisplayed(selectItem);
        click(selectItem);
        sendKeys(rejected_node_status);
        waitForElDisplayed(selectItem);
        click(selectItem);

        enterEditMode();

        checkSendReminder(approvedNode);
        checkSendReminder(rejectedNode);
        checkSendReminder(inProgressNode);
        checkSendReminder(notStartedNode);
    });

    it('should be able to search users', () => {
        waitForElDisplayed(editExampleButton);
        click(editExampleButton);
        waitForElDisplayed(approvalFlowNode, 1);
        browserIsFirefox() ? click(approvalFlowNode, 3) : click(approvalFlowNode, 1);
        waitForElDisplayed(detailsDialogSearchInput);
        const usersCountBeforeSearch = getElementArrayLength(detailsDialogTeamMemberName);
        setValue(detailsDialogSearchInput, 'Caleb');
        const usersCountAfterSearch = getElementArrayLength(detailsDialogTeamMemberName);

        expect(usersCountAfterSearch).toBeLessThan(usersCountBeforeSearch);
        expect(usersCountAfterSearch).toEqual(1);
    });

    describe('Edit mode', () => {
        it('should be able to add watchers', () => {
            const watchersCountBefore = getElementArrayLength(watchersAvatar);
            click(editExampleButton);
            waitForElDisplayed(addWhatchersInput);
            click(addWhatchersInput);
            sendKeys('Alvin');
            pause(500);
            click(selectItem);
            click(bottomMenuItems);
            const watchersCountAfter = getElementArrayLength(watchersAvatar);

            expect(watchersCountBefore).toBe(watchersCountAfter - 1);
        });

        it('should be able to remove watchers', () => {
            const watchersCountBefore = getElementArrayLength(watchersAvatar);
            click(editExampleButton);
            waitForElDisplayed(addWhatchersInput);
            click(addWhatchersInput);
            sendKeys('Julie');

            pause(1000);

            click(selectItem);
            click(bottomMenuItems);
            const watchersCountAfter = getElementArrayLength(watchersAvatar);

            expect(watchersCountBefore).toBe(watchersCountAfter + 1);
        });

        it('should be able to add node in parallel', () => {
            const approvalFlowNodeCountBefore = getElementArrayLength(approvalFlowNode);

            click(editExampleButton);
            waitForElDisplayed(addNode);
            click(addNode, 1);
            click(detailsDialogParallelSerialSelect);
            click(detailsDialogParallelSerialSelectOption);
            click(detailsDialogUserTeamButton);
            pause(500);
            waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            click(detailsDialogTeamMemberCheckBox, 3);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            click(bottomMenuItems);
            const approvalFlowNodeCountAfter = getElementArrayLength(approvalFlowNode);
            expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfter - 1);
        });

        it('should be able to add node in serial by "+" icon', () => {
            const approvalFlowNodeCountBefore = getElementArrayLength(approvalFlowNode);

            click(editExampleButton);
            waitForElDisplayed(addNode, 1);
            browserIsFirefox() ? click(addNode, 2) : click(addNode, 1);
            click(detailsDialogParallelSerialSelect);
            click(detailsDialogParallelSerialSelectOption, 1);
            click(detailsDialogUserTeamButton);
            pause(500);
            waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            click(detailsDialogTeamMemberCheckBox, 4);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            click(bottomMenuItems);
            const approvalFlowNodeCountAfter = getElementArrayLength(approvalFlowNode);

            expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfter - 1);
        });

        it('should be able to add node in serial using top bar action menu', () => {
            const approvalFlowNodeCountBefore = getElementArrayLength(approvalFlowNode);
            click(editExampleButton);
            waitForElDisplayed(addNode);
            waitForElDisplayed(approvalFlowNodeCheckbox);
            click(approvalFlowNodeCheckbox, 3);
            waitForElDisplayed(topActionButtons);
            click(topActionButtons);
            click(detailsDialogUserTeamButton);
            pause(500);
            waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            click(detailsDialogTeamMemberCheckBox, 4);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            const approvalFlowNodeCountAfterAdding = getElementArrayLength(approvalFlowNode);

            expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterAdding - 1);
        });

        it('should be able to add node in serial using node action menu', () => {
            const approvalFlowNodeCountBefore = getElementArrayLength(approvalFlowNode);
            click(editExampleButton);
            waitForElDisplayed(approvalFlowNodeActionMenu);
            click(approvalFlowNodeActionMenu, 3);
            waitForElDisplayed(approvalFlowNodeActionMenuItem);
            click(approvalFlowNodeActionMenuItem);
            click(detailsDialogUserTeamButton);
            pause(500);
            waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            click(detailsDialogTeamMemberCheckBox, 4);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            const approvalFlowNodeCountAfterAdd = getElementArrayLength(approvalFlowNode);

            expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterAdd - 1);
        });

        it('should add the whole team as reviewer', () => {
            enterEditMode();
            browserIsFirefox() ? click(addNode, 2) : click(addNode, 1);
            waitForElDisplayed(detailsDialog);
            click(addApproverOptions, 1);
            pause(500);
            waitForElDisplayed(approverOptionListItem);
            click(approverOptionListItem, 2);
            click(detailsDialogUserTeamButton);
            pause(500);
            click(radioButton);
            click(footerButtons);
            click(footerButtons);

            if (browserIsFirefox()) {
                expect(getText(nodeCardInfo, 5)).toContain('4 members\n' + 'Accounting team');
            }
            if (browserIsSafari()) {
                expect(getText(nodeCardInfo, 4)).toContain('4 members  Accounting team');
            }
            if (!browserIsFirefox() && !browserIsSafari()) {
                expect(getText(nodeCardInfo, 4)).toContain('4 members\n' + 'Accounting team');
            }
        });

        it('should add anyone from team as reviewer', () => {
            enterEditMode();
            browserIsFirefox() ? click(addNode, 2) : click(addNode, 1);
            waitForElDisplayed(detailsDialog);
            click(addApproverOptions, 1);
            pause(500);
            waitForElDisplayed(approverOptionListItem);
            click(approverOptionListItem, 1);
            click(detailsDialogUserTeamButton);
            pause(500);
            click(radioButton);
            click(footerButtons);
            click(footerButtons);

            if (browserIsFirefox()) {
                expect(getText(nodeCardInfo, 5)).toContain('4 members\n' + 'Accounting team');
            }
            if (browserIsSafari()) {
                expect(getText(nodeCardInfo, 4)).toContain('4 members  Accounting team');
            }
            if (!browserIsFirefox() && !browserIsSafari()) {
                expect(getText(nodeCardInfo, 4)).toContain('4 members\n' + 'Accounting team');
            }
        });

        it('should be able to remove node by button', () => {
            waitForElDisplayed(approvalFlowNode);
            const approvalFlowNodeCountBefore = getElementArrayLength(approvalFlowNode);

            waitForElDisplayed(editExampleButton);
            click(editExampleButton);
            waitForElDisplayed(approvalFlowNodeCheckbox);
            browserIsFirefox() ? click(approvalFlowNodeCheckboxAlt, 3) : click(approvalFlowNodeCheckbox, 1);
            waitForElDisplayed(topActionButtons, 2);
            click(topActionButtons, 2);
            const approvalFlowNodeCountAfterRemove = getElementArrayLength(approvalFlowNode);

            expect(approvalFlowNodeCountBefore).toEqual(approvalFlowNodeCountAfterRemove + 1);
        });

        it('should be able to remove node by node action menu', () => {
            waitForElDisplayed(approvalFlowNode);
            const approvalFlowNodeCountBefore = getElementArrayLength(approvalFlowNode);

            waitForElDisplayed(editExampleButton);
            click(editExampleButton);
            waitForElDisplayed(approvalFlowNodeActionMenu);
            click(approvalFlowNodeActionMenu, 3);
            waitForElDisplayed(approvalFlowNodeActionMenuItem, 2);
            click(approvalFlowNodeActionMenuItem, 2);

            waitForElDisplayed(messageStrip);
            const approvalFlowNodeCountAfterRemove = getElementArrayLength(approvalFlowNode);

            expect(approvalFlowNodeCountBefore).toEqual(approvalFlowNodeCountAfterRemove + 1);
        });

        it('should add node before', () => {
            const startingNodeCount = getElementArrayLength(nodeCardInfo);
            enterEditMode();
            browserIsFirefox() ? click(approvalFlowNodeActionMenu, 5) : click(approvalFlowNodeActionMenu, 4);
            waitForElDisplayed(approvalFlowNodeActionMenuItem);
            click(approvalFlowNodeActionMenuItem);
            waitForElDisplayed(detailsDialog);
            click(detailsDialogUserTeamButton);
            pause(500);
            waitForElDisplayed(dialogCheckbox);
            click(dialogCheckbox);
            click(footerButtons);
            click(footerButtons);

            expect(getElementArrayLength(nodeCardInfo)).toEqual(startingNodeCount + 1);
        });

        it('should add node after', () => {
            const startingNodeCount = getElementArrayLength(nodeCardInfo);
            enterEditMode();
            browserIsFirefox() ? click(approvalFlowNodeActionMenu, 5) : click(approvalFlowNodeActionMenu, 4);
            waitForElDisplayed(approvalFlowNodeActionMenuItem);
            click(approvalFlowNodeActionMenuItem, 1);
            waitForElDisplayed(detailsDialog);
            click(detailsDialogUserTeamButton);
            pause(500);
            waitForElDisplayed(dialogCheckbox);
            click(dialogCheckbox);
            click(footerButtons);
            click(footerButtons);

            expect(getElementArrayLength(nodeCardInfo)).toEqual(startingNodeCount + 1);
        });

        // skip due to found issue https://github.com/SAP/fundamental-ngx/issues/6903
        xit('should be able to undo added approval node', () => {
            const approvalFlowNodeCountBefore = getElementArrayLength(approvalFlowNode);

            click(editExampleButton);
            waitForElDisplayed(addNode);
            click(addNode);
            click(detailsDialogUserTeamButton);
            waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            click(detailsDialogTeamMemberCheckBox, 4);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            const approvalFlowNodeCountAfterAdding = getElementArrayLength(approvalFlowNode);
            waitForElDisplayed(messageStripUndoLink);
            click(messageStripUndoLink);
            waitForNotDisplayed(messageStripUndoLink);

            const approvalFlowNodeCountAfterUndo = getElementArrayLength(approvalFlowNode);

            expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterAdding - 1);
            expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterUndo);
        });

        // skip due to https://github.com/SAP/fundamental-ngx/issues/6903
        xit('should be able to cancel undo', () => {
            click(editExampleButton);
            waitForElDisplayed(addNode);
            click(addNode);
            click(detailsDialogUserTeamButton);
            waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            click(detailsDialogTeamMemberCheckBox, 4);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(messageStripCancelUndoMessage);
            click(messageStripCancelUndoMessage);

            expect(doesItExist(messageStrip)).toBe(false);
        });
    });

    describe('should be able send remainder to approving team', () => {
        it('should be able send remainder to approving team (full)', () => {
            const arrLength = getElementArrayLength(approvalFlowTeamNode);
            for (let i = 0; arrLength > i; i++) {
                const approvalNodeText = getText(approvalFlowTeamNode, i);
                const approvalNodeDescription = getText(approvalFlowNodeDescription, i);
                click(approvalFlowTeamNode, i);
                const teamSize = getElementArrayLength(detailsDialogTeamMember);
                for (let k = 0; teamSize > k; k++) {
                    click(detailsDialogTeamMemberCheckBox, k);
                }
                click(detailsDialogSendReminderBtn);
                waitForElDisappear(detailsDialog);
                waitForPresent(toastMessageDialog);
                expect(isElementDisplayed(toastMessageDialog)).toBe(true);
                expect(getText(toastMessageDialog, getElementArrayLength(toastMessageDialog) - 1).trim()).toBe(
                    `${remainder_text}${approvalNodeText} of ${approvalNodeDescription}`
                );
            }
        });

        it('should be able send remainder to approving team', () => {
            const arrLength = getElementArrayLength(approvalFlowTeamNode);
            for (let i = 0; arrLength > i; i++) {
                while (isElementDisplayed(approvalFlowTeamNode, i)) {
                    click(flowNavigationArrow);
                }
                let approvalNodeText = getText(approvalFlowTeamNode, i);
                click(approvalFlowTeamNode, i);
                approvalNodeText = getText(detailsDialogTeamMemberName);
                click(detailsDialogTeamMemberCheckBox);
                click(detailsDialogSendReminderBtn);
                waitForElDisappear(detailsDialog);
                waitForPresent(toastMessageDialog);
                expect(isElementDisplayed(toastMessageDialog)).toBe(true);
                expect(getText(toastMessageDialog, getElementArrayLength(toastMessageDialog) - 1).trim()).toBe(
                    remainder_text + approvalNodeText
                );
            }
        });
    });

    describe('custom options', () => {
        it('should check all statuses changed to not started', () => {
            markOption(setStatusOption);
            const nodeCardCount = getElementArrayLength(nodeCardInfo);

            for (let i = 0; i < nodeCardCount; i++) {
                scrollIntoView(nodeCardInfo, i);
                expect(getText(nodeCardInfo, i)).toContain('not started', `index ${i} failed`);
            }
        });

        it('check all node actions disabled', () => {
            markOption(disableAllNodesOption);
            enterEditMode();

            expect(doesItExist(approvalFlowNodeActionMenu)).toBe(
                false,
                'menu button displayed when no options/actions available'
            );
            // skip due to issue https://github.com/SAP/fundamental-ngx/issues/6995
            // expect(doesItExist(approvalFlowNodeCheckbox)).toBe(false, 'checkbox displayed when no options/actions available');
        });

        it('check disable adding before', () => {
            markOption(disableAddingBeforeOption);
            enterEditMode();

            browserIsFirefox()
                ? checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[0], 5)
                : checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[0], 4);

            browserIsFirefox()
                ? checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[0], 5)
                : checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[0], 4);
        });

        it('check disable adding after', () => {
            markOption(disableAddingAfterOption);
            enterEditMode();
            browserIsFirefox()
                ? checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[1], 5)
                : checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[1], 4);
            browserIsFirefox()
                ? checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[1], 5)
                : checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[1], 4);
        });

        it('check disable adding parallel', () => {
            markOption(disableAddingParallelOption);
            enterEditMode();

            browserIsFirefox()
                ? checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[2], 5)
                : checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[2], 4);

            browserIsFirefox()
                ? checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[2], 4)
                : checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[2], 4);
        });

        it('check disable editing', () => {
            markOption(disableEditingOption);
            enterEditMode();

            browserIsFirefox()
                ? checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[3], 5)
                : checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[3], 4);

            browserIsFirefox()
                ? checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[3], 5)
                : checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[3], 4);
        });

        it('check disable remove', () => {
            markOption(disableRemovingOption);
            enterEditMode();

            browserIsFirefox()
                ? checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[4], 5)
                : checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[4], 4);

            browserIsFirefox()
                ? checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[4], 5)
                : checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[4], 4);
        });

        it('check disabling edit mode', () => {
            markOption(editModeOption);

            expect(doesItExist(editExampleButton)).toBe(false, 'edit button still present');
        });

        it('should check send reminders disabled', () => {
            scrollIntoView(reminderOptionsButton);
            click(reminderOptionsButton);
            waitForElDisplayed(reminderOptionsList);
            const listItemCount = getElementArrayLength(selectedOptions);

            // deselects all send reminder options
            for (let i = 0; i < listItemCount; i++) {
                scrollIntoView(reminderOptionsList);
                click(selectedOptions);
                click(reminderOptionsButton);
                waitForElDisplayed(reminderOptionsList);
            }

            enterEditMode();

            checkReminderDisabled(approvedNode);
            checkReminderDisabled(rejectedNode);
            checkReminderDisabled(notStartedNode);
            checkReminderDisabled(inProgressNode);
        });

        it('should check due date node', () => {
            markOption(dueDateWarningsOption);

            expect(waitForPresent(dueDateNode)).toBe(true, 'due date not shown');
            expect(getText(dueDateNode)).toContain(dueDateMessage);
        });
    });

    describe('check example orientation', () => {
        it('should check RTL orientation', () => {
            approvalFlowPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            approvalFlowPage.saveExampleBaselineScreenshot();
            expect(approvalFlowPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkApproveNodeDetailsDialogContent(): void {
        expect(isElementDisplayed(detailsDialog)).toBe(true);
        expect(isElementDisplayed(detailsDialogAvatar)).toBe(true);
        expect(getText(detailsDialogCancelBtn)).toContain(details_dialog_cancel_btn);
        expect(getText(detailsDialogSendReminderBtn).trim()).toBe(details_dialog_send_reminder_btn);
        expect(getText(detailsDialogHeader)).toBe(details_dialog_header);
    }

    function checkWatchersDetailsDialogContent(): void {
        expect(isElementDisplayed(detailsDialog)).toBe(true);
        expect(isElementDisplayed(detailsDialogAvatar)).toBe(true);
        expect(getText(detailsDialogCancelBtn)).toContain(details_dialog_cancel_btn);
        expect(getText(detailsDialogHeader).trim()).toBe(details_dialog_header);
    }

    function markOption(option: number): void {
        scrollIntoView(optionInput, option);
        click(optionInput, option);
    }

    function enterEditMode(): void {
        scrollIntoView(editExampleButton);
        click(editExampleButton);
        waitForNotDisplayed(editExampleButton);
    }

    function checkMenuForDisabledOption(selector: string, disabledOption: any, selectorIndex: number): void {
        click(selector, selectorIndex);
        const menuItemLength = getElementArrayLength(approvalFlowNodeActionMenuItem);

        for (let i = 0; i < menuItemLength; i++) {
            expect(getText(approvalFlowNodeActionMenuItem, i)).not.toBe(disabledOption);
        }
    }

    function checkToolbarForDisabledOption(selector: string, disabledOption: any, selectorIndex: number): void {
        click(selector, selectorIndex);
        const menuItemLength = getElementArrayLength(toolbarButtons);

        for (let i = 0; i < menuItemLength; i++) {
            expect(getText(toolbarButtons, i)).not.toBe(disabledOption);
        }
    }

    function checkReminderDisabled(nodeSelection: string): void {
        click(nodeSelection);
        waitForElDisplayed(detailsDialog);
        expect(isElementClickable(detailsDialogSendReminderBtn)).toBe(false, 'reminder button is enabled');
        click(detailsDialogCancelBtn);
    }

    function checkSendReminder(nodeSelection: string): void {
        click(nodeSelection);
        waitForElDisplayed(detailsDialog);
        if (doesItExist(dialogCheckbox)) {
            click(dialogCheckbox);
        }
        click(detailsDialogSendReminderBtn);
        expect(waitForElDisplayed(reminderToaster)).toBe(true, 'toast message not displayed');
        expect(getText(reminderToaster)).toContain(remainder_text);
        waitForNotPresent(reminderToaster);
    }
});
