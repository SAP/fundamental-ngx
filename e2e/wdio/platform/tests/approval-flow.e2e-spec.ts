import {
    browserIsFirefox,
    click, doesItExist,
    getElementArrayLength,
    getText,
    getTextArr,
    isElementClickable,
    isElementDisplayed, pause,
    refreshPage,
    selectOptionByValueAttribute,
    sendKeys,
    setValue,
    waitElementToBeClickable,
    waitForElDisappear,
    waitForElDisplayed, waitForNotDisplayed, waitForNotPresent,
    waitForPresent
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
    watchers_block_title
} from '../fixtures/appData/approval-flow-contents';

describe('Approval flow', function() {
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
        approvalFlowNodeCheckboxAlt
    } = approvalFlowPage;

    beforeAll(() => {
        approvalFlowPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(approvalFlowPage.watchers);
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

    // TODO: Can't switch examples programmatically. Needs further investigation.
    xit('should be able to switch example', () => {
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
                // Check each teem member details dialog
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

    it('should be able send remainder to approved and rejected', () => {
        click(remaindersSendToInput);
        sendKeys(approved_node_status);
        waitForElDisplayed(selectItem);
        click(selectItem);
        sendKeys(rejected_node_status);
        click(selectItem);

        const arrLength = getElementArrayLength(approvalFlowNode);
        for (let i = 0; arrLength > i; i++) {
            while (!isElementClickable(approvalFlowNode, i)) {
                click(flowNavigationArrow);
            }
            const approvalNodeText = getText(approvalFlowNodeName, i);
            if (approvalNodeText.includes('members')) {
                continue;
            }
            waitElementToBeClickable(approvalFlowNode, i);
            click(approvalFlowNode, i);
            waitElementToBeClickable(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            waitForElDisappear(detailsDialog);

            expect(isElementDisplayed(toastMessageDialog)).toBe(true);
            expect(getTextArr(toastMessageDialog))
                .toContain(remainder_text + approvalNodeText);
            waitForNotPresent(toastMessageDialog);
        }
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

    describe('Edit mode', function() {
        it('should be able to add watchers', () => {
            const watchersCountBefore = getElementArrayLength(watchersAvatar);
            click(editExampleButton);
            waitForElDisplayed(addWhatchersInput);
            click(addWhatchersInput);
            sendKeys('Alvin');
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
            click(selectItem);
            click(bottomMenuItems);
            const watchersCountAfter = getElementArrayLength(watchersAvatar);

            expect(watchersCountBefore).toBe(watchersCountAfter + 1);
        });

        xit('should be able to add node in parallel', () => {
            const approvalFlowNodeCountBefore = getElementArrayLength(approvalFlowNode);

            click(editExampleButton);
            waitForElDisplayed(addNode);
            click(addNode);
            click(detailsDialogParallelSerialSelect);
            click(detailsDialogParallelSerialSelectOption);
            click(detailsDialogUserTeamButton);
            waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            click(detailsDialogTeamMemberCheckBox, 3);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            click(bottomMenuItems);
            const approvalFlowNodeCountAfter = getElementArrayLength(approvalFlowNode);
            // some thing I need to debug later
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
            waitForElDisplayed(detailsDialogTeamMemberCheckBox);
            click(detailsDialogTeamMemberCheckBox, 4);
            click(detailsDialogSendReminderBtn);
            waitForElDisplayed(detailsDialogSendReminderBtn);
            click(detailsDialogSendReminderBtn);
            const approvalFlowNodeCountAfterAdd = getElementArrayLength(approvalFlowNode);

            expect(approvalFlowNodeCountBefore).toBe(approvalFlowNodeCountAfterAdd - 1);
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
            waitForNotDisplayed(messageStripUndoLink)

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

    describe('should be able send remainder to approving team', function() {
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
                expect(getText(toastMessageDialog, getElementArrayLength(toastMessageDialog) - 1).trim())
                    .toBe(`${remainder_text}${approvalNodeText} of ${approvalNodeDescription}`);
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
                expect(getText(toastMessageDialog, getElementArrayLength(toastMessageDialog) - 1).trim())
                    .toBe(remainder_text + approvalNodeText);
            }
        });

        describe('check example orientation', () => {
            it('should check RTL orientation', () => {
                approvalFlowPage.checkRtlSwitch();
            });
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            approvalFlowPage.saveExampleBaselineScreenshot();
            expect(approvalFlowPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkApproveNodeDetailsDialogContent(): void {
        expect(isElementDisplayed(detailsDialog)).toBe(true);
        expect(isElementDisplayed(detailsDialogAvatar)).toBe(true);
        expect(getText(detailsDialogCancelBtn)).toBe(details_dialog_cancel_btn);
        expect(getText(detailsDialogSendReminderBtn)).toBe(details_dialog_send_reminder_btn);
        expect(getText(detailsDialogHeader)).toBe(details_dialog_header);
    }

    function checkWatchersDetailsDialogContent(): void {
        expect(isElementDisplayed(detailsDialog)).toBe(true);
        expect(isElementDisplayed(detailsDialogAvatar)).toBe(true);
        expect(getText(detailsDialogCancelBtn)).toBe(details_dialog_cancel_btn);
        expect(getText(detailsDialogHeader)).toBe(details_dialog_header);
    }
});

