import {
    browserIsFirefox,
    browserIsSafari,
    click,
    doesItExist,
    getElementArrayLength,
    getText,
    isElementClickable,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    selectOptionByValueAttribute,
    sendKeys,
    setValue,
    waitElementToBeClickable,
    waitForElDisappear,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForNotPresent,
    waitForPresent
} from '../../../../../e2e';
import { ApprovalFlowPo } from './approval-flow.po';
import {
    approved_node_status,
    details_dialog_cancel_btn,
    details_dialog_header,
    details_dialog_send_reminder_btn,
    dueDateMessage,
    node_statuses,
    nodeOptionsArr,
    rejected_node_status,
    remainder_text,
    watchers_block_title
} from './approval-flow-contents';
import {
    disableAddingAfterOption,
    disableAddingBeforeOption,
    disableAddingParallelOption,
    disableAllNodesOption,
    disableEditingOption,
    disableRemovingOption,
    dueDateWarningsOption,
    editModeOption,
    setStatusOption
} from './approval-flow';

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

    beforeAll(async () => {
        await approvalFlowPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(approvalFlowPage.root);
        await waitForElDisplayed(approvalFlowPage.title);
    }, 1);

    it('should have watchers section with watchers details displayed', async () => {
        await expect(await isElementDisplayed(watchersAvatar)).toBe(true);
        await expect(await getElementArrayLength(watchersAvatar)).toBe(4);
    });

    it('should have watchers section has correct title', async () => {
        await expect(await getText(watchersTitle)).toBe(watchers_block_title);
    });

    it('should have watchers section user details appear on click', async () => {
        await click(watchersAvatar);
        await waitForElDisplayed(detailsDialog);
        await checkWatchersDetailsDialogContent();
    });

    it('should have watchers section user details disappeared on click', async () => {
        await click(watchersAvatar);
        await waitForElDisplayed(detailsDialog);
        await click(detailsDialogCancelBtn);
        await waitForElDisappear(detailsDialog);
        await expect(await doesItExist(detailsDialog)).toBe(false);
    });

    it('should be able to switch example', async () => {
        await selectOptionByValueAttribute(selectExample, 'empty');
        await expect(await getElementArrayLength(approvalFlowNode)).toEqual(0);

        await selectOptionByValueAttribute(selectExample, 'simple');
        await expect(await getElementArrayLength(approvalFlowNode)).toEqual(3);

        await selectOptionByValueAttribute(selectExample, 'medium');
        await expect(await getElementArrayLength(approvalFlowNode)).toEqual(6);

        await selectOptionByValueAttribute(selectExample, 'complex');
        await expect(await getElementArrayLength(approvalFlowNode)).toEqual(8);
    });

    it('verify approval item content', async () => {
        const arrLength = await getElementArrayLength(approvalFlowNode);
        for (let i = 0; arrLength > i; i++) {
            await expect(await isElementDisplayed(approvalFlowNodeAvatar, i)).toBe(true);
            await expect(await isElementDisplayed(approvalFlowNodeName, i)).toBe(true);
            await expect(['', 'undefined']).not.toContain(await getText(approvalFlowNodeName, i));
            await expect(await isElementDisplayed(approvalFlowNodeDescription, i)).toBe(true);
            await expect(['', 'undefined']).not.toContain(await getText(approvalFlowNodeName, i));
            await expect(await isElementDisplayed(approvalFlowNodeStatus, i)).toBe(true);
            await expect(node_statuses).not.toContain(await getText(approvalFlowNodeName, i));
        }
    });

    it('verify approver/approving team details item content', async () => {
        const arrLength = await getElementArrayLength(approvalFlowNode);
        for (let i = 0; arrLength > i; i++) {
            while (!(await isElementClickable(approvalFlowNode, i))) {
                await click(flowNavigationArrow);
            }
            await waitElementToBeClickable(approvalFlowNode, i);
            await click(approvalFlowNode, i);
            await waitForElDisplayed(detailsDialog);

            if (await doesItExist(detailsDialogSearchInput)) {
                // Check each team member details dialog
                const teamMemberCount = await getElementArrayLength(detailsDialogTeamMember);
                for (let j = 0; teamMemberCount > j; j++) {
                    await click(detailsDialogTeamMember, j);
                    await checkWatchersDetailsDialogContent();
                    await click(detailsDialogBackIcon);
                }
            } else {
                await checkApproveNodeDetailsDialogContent();
            }

            await click(detailsDialogCancelBtn);
            await waitForElDisappear(detailsDialog);
        }
    });

    it('should be able send remainder to all statuses', async () => {
        await scrollIntoView(remaindersSendToInput);
        await click(remaindersSendToInput);
        await sendKeys(approved_node_status);
        await waitForElDisplayed(selectItem);
        await click(selectItem);
        await sendKeys(rejected_node_status);
        await waitForElDisplayed(selectItem);
        await click(selectItem);

        await enterEditMode();

        await checkSendReminder(inProgressNode);
        await checkSendReminder(notStartedNode);
    });

    it('should be able to search users', async () => {
        await waitForElDisplayed(editExampleButton);
        await click(editExampleButton);
        await waitForElDisplayed(approvalFlowNode, 1);
        (await browserIsFirefox()) ? await click(approvalFlowNode, 3) : await click(approvalFlowNode, 1);
        await waitForElDisplayed(detailsDialogSearchInput);
        const usersCountBeforeSearch = await getElementArrayLength(detailsDialogTeamMemberName);
        await setValue(detailsDialogSearchInput, 'Caleb');
        const usersCountAfterSearch = await getElementArrayLength(detailsDialogTeamMemberName);

        await expect(usersCountAfterSearch).toBeLessThan(usersCountBeforeSearch);
        await expect(usersCountAfterSearch).toEqual(1);
    });

    describe('Edit mode', () => {
        it('should be able to add watchers', async () => {
            const watchersCountBefore = await getElementArrayLength(watchersAvatar);
            await click(editExampleButton);
            await waitForElDisplayed(addWhatchersInput);
            await click(addWhatchersInput);
            await sendKeys('Alvin');
            await pause(500);
            await click(selectItem);
            await click(bottomMenuItems);
            const watchersCountAfter = await getElementArrayLength(watchersAvatar);

            await expect(watchersCountBefore).toBe(watchersCountAfter - 1);
        });

        it('should be able to remove watchers', async () => {
            const watchersCountBefore = await getElementArrayLength(watchersAvatar);
            await click(editExampleButton);
            await waitForElDisplayed(addWhatchersInput);
            await click(addWhatchersInput);
            await sendKeys('Julie');

            await pause(1000);
            // re triggering e2e
            await click(selectItem);
            await click(bottomMenuItems);
            const watchersCountAfter = await getElementArrayLength(watchersAvatar);

            await expect(watchersCountBefore).toBe(watchersCountAfter + 1);
        });

        it('should be able to add node in parallel', async () => {
            const approvalFlowNodeCountBefore = await getElementArrayLength(approvalFlowNode);

            await click(editExampleButton);
            await waitForElDisplayed(addNode);
            await click(addNode, 1);
            await click(detailsDialogParallelSerialSelect);
            await click(detailsDialogParallelSerialSelectOption);
            await click(detailsDialogUserTeamButton);
            await pause(500);
            await waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            await click(detailsDialogTeamMemberCheckBox, 3);
            await click(detailsDialogSendReminderBtn);
            await waitForElDisplayed(detailsDialogSendReminderBtn);
            await click(detailsDialogSendReminderBtn);
            await click(bottomMenuItems);
            const approvalFlowNodeCountAfter = await getElementArrayLength(approvalFlowNode);
            await expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfter - 1);
        });

        it('should be able to add node in serial by "+" icon', async () => {
            const approvalFlowNodeCountBefore = await getElementArrayLength(approvalFlowNode);

            await click(editExampleButton);
            await waitForElDisplayed(addNode, 1);
            (await browserIsFirefox()) ? await click(addNode, 2) : await click(addNode, 1);
            await click(detailsDialogParallelSerialSelect);
            await click(detailsDialogParallelSerialSelectOption, 1);
            await click(detailsDialogUserTeamButton);
            await pause(500);
            await waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            await click(detailsDialogTeamMemberCheckBox, 4);
            await click(detailsDialogSendReminderBtn);
            await waitForElDisplayed(detailsDialogSendReminderBtn);
            await click(detailsDialogSendReminderBtn);
            await click(bottomMenuItems);
            const approvalFlowNodeCountAfter = await getElementArrayLength(approvalFlowNode);

            await expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfter - 1);
        });

        it('should be able to add node in serial using top bar action menu', async () => {
            const approvalFlowNodeCountBefore = await getElementArrayLength(approvalFlowNode);
            await click(editExampleButton);
            await waitForElDisplayed(addNode);
            await waitForElDisplayed(approvalFlowNodeCheckbox);
            await click(approvalFlowNodeCheckbox, 3);
            await waitForElDisplayed(topActionButtons);
            await click(topActionButtons);
            await click(detailsDialogUserTeamButton);
            await pause(500);
            await waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            await click(detailsDialogTeamMemberCheckBox, 4);
            await click(detailsDialogSendReminderBtn);
            await waitForElDisplayed(detailsDialogSendReminderBtn);
            await click(detailsDialogSendReminderBtn);
            const approvalFlowNodeCountAfterAdding = await getElementArrayLength(approvalFlowNode);

            await expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterAdding - 1);
        });

        it('should be able to add node in serial using node action menu', async () => {
            const approvalFlowNodeCountBefore = await getElementArrayLength(approvalFlowNode);
            await click(editExampleButton);
            await waitForElDisplayed(approvalFlowNodeActionMenu);
            await click(approvalFlowNodeActionMenu, 3);
            await waitForElDisplayed(approvalFlowNodeActionMenuItem);
            await click(approvalFlowNodeActionMenuItem);
            await click(detailsDialogUserTeamButton);
            await pause(500);
            await waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            await click(detailsDialogTeamMemberCheckBox, 4);
            await click(detailsDialogSendReminderBtn);
            await waitForElDisplayed(detailsDialogSendReminderBtn);
            await click(detailsDialogSendReminderBtn);
            const approvalFlowNodeCountAfterAdd = await getElementArrayLength(approvalFlowNode);

            await expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterAdd - 1);
        });

        it('should add the whole team as reviewer', async () => {
            await enterEditMode();
            (await browserIsFirefox()) ? await click(addNode, 2) : await click(addNode, 1);
            await waitForElDisplayed(detailsDialog);
            await click(addApproverOptions, 1);
            await pause(500);
            await waitForElDisplayed(approverOptionListItem);
            await click(approverOptionListItem, 2);
            await click(detailsDialogUserTeamButton);
            await pause(500);
            await click(radioButton);
            await click(footerButtons);
            await click(footerButtons);

            if (await browserIsFirefox()) {
                await expect(await getText(nodeCardInfo, 5)).toContain('4 members\n' + 'Accounting team');
            }
            if (await browserIsSafari()) {
                await expect(await getText(nodeCardInfo, 4)).toContain('4 members  Accounting team');
            }
            if (!(await browserIsFirefox()) && !(await browserIsSafari())) {
                await expect(await getText(nodeCardInfo, 4)).toContain('4 members\n' + 'Accounting team');
            }
        });

        it('should add anyone from team as reviewer', async () => {
            await enterEditMode();
            (await browserIsFirefox()) ? await click(addNode, 2) : await click(addNode, 1);
            await waitForElDisplayed(detailsDialog);
            await click(addApproverOptions, 1);
            await pause(500);
            await waitForElDisplayed(approverOptionListItem);
            await click(approverOptionListItem, 1);
            await click(detailsDialogUserTeamButton);
            await pause(500);
            await click(radioButton);
            await click(footerButtons);
            await click(footerButtons);

            if (await browserIsFirefox()) {
                await expect(await getText(nodeCardInfo, 5)).toContain('4 members\n' + 'Accounting team');
            }
            if (await browserIsSafari()) {
                await expect(await getText(nodeCardInfo, 4)).toContain('4 members  Accounting team');
            }
            if (!(await browserIsFirefox()) && !(await browserIsSafari())) {
                await expect(await getText(nodeCardInfo, 4)).toContain('4 members\n' + 'Accounting team');
            }
        });

        it('should be able to remove node by button', async () => {
            await waitForElDisplayed(approvalFlowNode);
            const approvalFlowNodeCountBefore = await getElementArrayLength(approvalFlowNode);

            await waitForElDisplayed(editExampleButton);
            await click(editExampleButton);
            await waitForElDisplayed(approvalFlowNodeCheckbox);
            (await browserIsFirefox())
                ? await click(approvalFlowNodeCheckboxAlt, 3)
                : await click(approvalFlowNodeCheckbox, 1);
            await waitForElDisplayed(topActionButtons, 2);
            await click(topActionButtons, 2);
            const approvalFlowNodeCountAfterRemove = await getElementArrayLength(approvalFlowNode);

            await expect(approvalFlowNodeCountBefore).toEqual(approvalFlowNodeCountAfterRemove + 1);
        });

        it('should be able to remove node by node action menu', async () => {
            await waitForElDisplayed(approvalFlowNode);
            const approvalFlowNodeCountBefore = await getElementArrayLength(approvalFlowNode);

            await waitForElDisplayed(editExampleButton);
            await click(editExampleButton);
            await waitForElDisplayed(approvalFlowNodeActionMenu);
            await click(approvalFlowNodeActionMenu, 3);
            await waitForElDisplayed(approvalFlowNodeActionMenuItem, 2);
            await click(approvalFlowNodeActionMenuItem, 2);

            await waitForElDisplayed(messageStrip);
            const approvalFlowNodeCountAfterRemove = await getElementArrayLength(approvalFlowNode);

            await expect(approvalFlowNodeCountBefore).toEqual(approvalFlowNodeCountAfterRemove + 1);
        });

        it('should add node before', async () => {
            const startingNodeCount = await getElementArrayLength(nodeCardInfo);
            await enterEditMode();
            (await browserIsFirefox())
                ? await click(approvalFlowNodeActionMenu, 5)
                : await click(approvalFlowNodeActionMenu, 4);
            await waitForElDisplayed(approvalFlowNodeActionMenuItem);
            await click(approvalFlowNodeActionMenuItem);
            await waitForElDisplayed(detailsDialog);
            await click(detailsDialogUserTeamButton);
            await pause(500);
            await waitForElDisplayed(dialogCheckbox);
            await click(dialogCheckbox);
            await click(footerButtons);
            await click(footerButtons);

            await expect(await getElementArrayLength(nodeCardInfo)).toEqual(startingNodeCount + 1);
        });

        it('should add node after', async () => {
            const startingNodeCount = await getElementArrayLength(nodeCardInfo);
            await enterEditMode();
            (await browserIsFirefox())
                ? await click(approvalFlowNodeActionMenu, 5)
                : await click(approvalFlowNodeActionMenu, 4);
            await waitForElDisplayed(approvalFlowNodeActionMenuItem);
            await click(approvalFlowNodeActionMenuItem, 1);
            await waitForElDisplayed(detailsDialog);
            await click(detailsDialogUserTeamButton);
            await pause(500);
            await waitForElDisplayed(dialogCheckbox);
            await click(dialogCheckbox);
            await click(footerButtons);
            await click(footerButtons);

            await expect(await getElementArrayLength(nodeCardInfo)).toEqual(startingNodeCount + 1);
        });

        // skip due to found issue https://github.com/SAP/fundamental-ngx/issues/6903
        xit('should be able to undo added approval node', async () => {
            const approvalFlowNodeCountBefore = await getElementArrayLength(approvalFlowNode);

            await click(editExampleButton);
            await waitForElDisplayed(addNode);
            await click(addNode);
            await click(detailsDialogUserTeamButton);
            await waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            await click(detailsDialogTeamMemberCheckBox, 4);
            await click(detailsDialogSendReminderBtn);
            await waitForElDisplayed(detailsDialogSendReminderBtn);
            await click(detailsDialogSendReminderBtn);
            const approvalFlowNodeCountAfterAdding = await getElementArrayLength(approvalFlowNode);
            await waitForElDisplayed(messageStripUndoLink);
            await click(messageStripUndoLink);
            await waitForNotDisplayed(messageStripUndoLink);

            const approvalFlowNodeCountAfterUndo = await getElementArrayLength(approvalFlowNode);

            await expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterAdding - 1);
            await expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterUndo);
        });

        // skip due to https://github.com/SAP/fundamental-ngx/issues/6903
        xit('should be able to cancel undo', async () => {
            await click(editExampleButton);
            await waitForElDisplayed(addNode);
            await click(addNode);
            await click(detailsDialogUserTeamButton);
            await waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            await click(detailsDialogTeamMemberCheckBox, 4);
            await click(detailsDialogSendReminderBtn);
            await waitForElDisplayed(detailsDialogSendReminderBtn);
            await click(detailsDialogSendReminderBtn);
            await waitForElDisplayed(messageStripCancelUndoMessage);
            await click(messageStripCancelUndoMessage);

            await expect(await doesItExist(messageStrip)).toBe(false);
        });
    });

    describe('should be able send remainder to approving team', () => {
        it('should be able send remainder to approving team (full)', async () => {
            const arrLength = await getElementArrayLength(approvalFlowTeamNode);
            for (let i = 0; arrLength > i; i++) {
                const approvalNodeText = await getText(approvalFlowTeamNode, i);
                const approvalNodeDescription = await getText(approvalFlowNodeDescription, i);
                await click(approvalFlowTeamNode, i);
                const teamSize = await getElementArrayLength(detailsDialogTeamMember);
                for (let k = 0; teamSize > k; k++) {
                    await click(detailsDialogTeamMemberCheckBox, k);
                }
                await click(detailsDialogSendReminderBtn);
                await waitForElDisappear(detailsDialog);
                await waitForPresent(toastMessageDialog);
                await expect(await isElementDisplayed(toastMessageDialog)).toBe(true);
                await expect(
                    (await getText(toastMessageDialog, (await getElementArrayLength(toastMessageDialog)) - 1)).trim()
                ).toBe(`${remainder_text}${approvalNodeText} of ${approvalNodeDescription}`);
            }
        });

        it('should be able send remainder to approving team', async () => {
            const arrLength = await getElementArrayLength(approvalFlowTeamNode);
            for (let i = 0; arrLength > i; i++) {
                while (await isElementDisplayed(approvalFlowTeamNode, i)) {
                    await click(flowNavigationArrow);
                }
                let approvalNodeText = await getText(approvalFlowTeamNode, i);
                await click(approvalFlowTeamNode, i);
                approvalNodeText = await getText(detailsDialogTeamMemberName);
                await click(detailsDialogTeamMemberCheckBox);
                await click(detailsDialogSendReminderBtn);
                await waitForElDisappear(detailsDialog);
                await waitForPresent(toastMessageDialog);
                await expect(await isElementDisplayed(toastMessageDialog)).toBe(true);
                await expect(
                    (await getText(toastMessageDialog, (await getElementArrayLength(toastMessageDialog)) - 1)).trim()
                ).toBe(remainder_text + approvalNodeText);
            }
        });
    });

    describe('custom options', () => {
        it('should check all statuses changed to not started', async () => {
            await markOption(setStatusOption);
            const nodeCardCount = await getElementArrayLength(nodeCardInfo);

            for (let i = 0; i < nodeCardCount; i++) {
                await scrollIntoView(nodeCardInfo, i);
                await expect(await getText(nodeCardInfo, i)).toContain('not started', `index ${i} failed`);
            }
        });

        it('check all node actions disabled', async () => {
            await markOption(disableAllNodesOption);
            await enterEditMode();

            await expect(await doesItExist(approvalFlowNodeActionMenu)).toBe(
                false,
                'menu button displayed when no options/actions available'
            );
            // skip due to issue https://github.com/SAP/fundamental-ngx/issues/6995
            // expect(doesItExist(approvalFlowNodeCheckbox)).toBe(false, 'checkbox displayed when no options/actions available');
        });

        it('check disable adding before', async () => {
            await markOption(disableAddingBeforeOption);
            await enterEditMode();

            (await browserIsFirefox())
                ? await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[0], 5)
                : await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[0], 4);

            (await browserIsFirefox())
                ? await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[0], 5)
                : await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[0], 4);
        });

        it('check disable adding after', async () => {
            await markOption(disableAddingAfterOption);
            await enterEditMode();
            (await browserIsFirefox())
                ? await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[1], 5)
                : await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[1], 4);
            (await browserIsFirefox())
                ? await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[1], 5)
                : await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[1], 4);
        });

        it('check disable adding parallel', async () => {
            await markOption(disableAddingParallelOption);
            await enterEditMode();

            (await browserIsFirefox())
                ? await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[2], 5)
                : await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[2], 4);

            (await browserIsFirefox())
                ? await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[2], 4)
                : await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[2], 4);
        });

        it('check disable editing', async () => {
            await markOption(disableEditingOption);
            await enterEditMode();

            (await browserIsFirefox())
                ? await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[3], 5)
                : await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[3], 4);

            (await browserIsFirefox())
                ? await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[3], 5)
                : await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[3], 4);
        });

        it('check disable remove', async () => {
            await markOption(disableRemovingOption);
            await enterEditMode();

            (await browserIsFirefox())
                ? await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[4], 5)
                : await checkMenuForDisabledOption(approvalFlowNodeActionMenu, nodeOptionsArr[4], 4);

            (await browserIsFirefox())
                ? await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[4], 5)
                : await checkToolbarForDisabledOption(approvalFlowNodeCheckbox, nodeOptionsArr[4], 4);
        });

        it('check disabling edit mode', async () => {
            await markOption(editModeOption);

            await expect(await doesItExist(editExampleButton)).toBe(false, 'edit button still present');
        });

        it('should check send reminders disabled', async () => {
            await scrollIntoView(reminderOptionsButton);
            await click(reminderOptionsButton);
            await waitForElDisplayed(reminderOptionsList);
            const listItemCount = await getElementArrayLength(selectedOptions);

            // deselects all send reminder options
            for (let i = 0; i < listItemCount; i++) {
                await scrollIntoView(reminderOptionsList);
                await click(selectedOptions);
                await click(reminderOptionsButton);
                await waitForElDisplayed(reminderOptionsList);
            }

            await enterEditMode();

            await checkReminderDisabled(approvedNode);
            await checkReminderDisabled(rejectedNode);
            await checkReminderDisabled(notStartedNode);
            await checkReminderDisabled(inProgressNode);
        });

        it('should check due date node', async () => {
            await markOption(dueDateWarningsOption);

            await expect(await waitForPresent(dueDateNode)).toBe(true, 'due date not shown');
            await expect(await getText(dueDateNode)).toContain(dueDateMessage);
        });
    });

    describe('check example orientation', () => {
        it('should check RTL orientation', async () => {
            await approvalFlowPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await approvalFlowPage.saveExampleBaselineScreenshot();
            await expect(await approvalFlowPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function checkApproveNodeDetailsDialogContent(): Promise<void> {
        await expect(await isElementDisplayed(detailsDialog)).toBe(true);
        await expect(await isElementDisplayed(detailsDialogAvatar)).toBe(true);
        await expect(await getText(detailsDialogCancelBtn)).toContain(details_dialog_cancel_btn);
        await expect((await getText(detailsDialogSendReminderBtn)).trim()).toBe(details_dialog_send_reminder_btn);
        await expect(await getText(detailsDialogHeader)).toBe(details_dialog_header);
    }

    async function checkWatchersDetailsDialogContent(): Promise<void> {
        await expect(await isElementDisplayed(detailsDialog)).toBe(true);
        await expect(await isElementDisplayed(detailsDialogAvatar)).toBe(true);
        await expect(await getText(detailsDialogCancelBtn)).toContain(details_dialog_cancel_btn);
        await expect((await getText(detailsDialogHeader)).trim()).toBe(details_dialog_header);
    }

    async function markOption(option: number): Promise<void> {
        await scrollIntoView(optionInput, option);
        await click(optionInput, option);
    }

    async function enterEditMode(): Promise<void> {
        await scrollIntoView(editExampleButton);
        await click(editExampleButton);
        await waitForNotDisplayed(editExampleButton);
    }

    async function checkMenuForDisabledOption(
        selector: string,
        disabledOption: any,
        selectorIndex: number
    ): Promise<void> {
        await click(selector, selectorIndex);
        const menuItemLength = await getElementArrayLength(approvalFlowNodeActionMenuItem);

        for (let i = 0; i < menuItemLength; i++) {
            await expect(await getText(approvalFlowNodeActionMenuItem, i)).not.toBe(disabledOption);
        }
    }

    async function checkToolbarForDisabledOption(
        selector: string,
        disabledOption: any,
        selectorIndex: number
    ): Promise<void> {
        await click(selector, selectorIndex);
        const menuItemLength = await getElementArrayLength(toolbarButtons);

        for (let i = 0; i < menuItemLength; i++) {
            await expect(await getText(toolbarButtons, i)).not.toBe(disabledOption);
        }
    }

    async function checkReminderDisabled(nodeSelection: string): Promise<void> {
        await click(nodeSelection);
        await waitForElDisplayed(detailsDialog);
        await expect(await isElementClickable(detailsDialogSendReminderBtn)).toBe(false, 'reminder button is enabled');
        await click(detailsDialogCancelBtn);
    }

    async function checkSendReminder(nodeSelection: string): Promise<void> {
        await click(nodeSelection);
        await waitForElDisplayed(detailsDialog);
        if (await doesItExist(dialogCheckbox)) {
            await click(dialogCheckbox);
        }
        await click(detailsDialogSendReminderBtn);
        await expect(await waitForElDisplayed(reminderToaster)).toBe(true, 'toast message not displayed');
        await expect(await getText(reminderToaster)).toContain(remainder_text);
        await waitForNotPresent(reminderToaster);
    }
});
