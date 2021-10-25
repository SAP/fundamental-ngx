import { ActionSheetPo } from '../../../support/core/pages/cy-action-sheet.po';

import {
    checkElementClass,
    checkText,
    click,
    getElementArrayLength, pause,
    refreshPage
} from '../../../cypress-methods/cypress';
import { alertMessages } from '../../../support/core/fixtures/cy-action-sheet.content';

describe('Action Bar test suite:', () => {
    const actionSheetPage = new ActionSheetPo();
    const { actionSheetMenuButton, actionSheetListItemButtons, alertMessage, actionSheetListItems } = actionSheetPage;

    before(() => {
        actionSheetPage.navigateTo();
    });

    afterEach(() => {
        refreshPage();
    });

    it('should check compact', () => {
        click(actionSheetMenuButton, 1);
        checkElementClass(actionSheetListItemButtons, 'fd-button--compact');
    });

    it('should check alert appears after selection in Default Action Sheet example', () => {
        click(actionSheetMenuButton);
        for (let i = 0; i < 4; i++) {
            click(actionSheetListItemButtons, i);
            checkText(alertMessage, alertMessages[i], i);
            click(actionSheetMenuButton);
        }
    });

    it('should check alert appears after selection in Compact mode example', () => {
        click(actionSheetMenuButton, 1);
        for (let i = 0; i < 4; i++) {
            click(actionSheetListItemButtons, i);
            checkText(alertMessage, alertMessages[i], i);
            click(actionSheetMenuButton, 1);
        }
    });

    it('should check alert appears after selection in Mobile view example', () => {
        click(actionSheetMenuButton, 2);
        for (let i = 0; i < 4; i++) {
            if (i === 3) {
                continue;
            }
            click(actionSheetListItemButtons, i);
            checkText(alertMessage, alertMessages[i]);
            pause(5000);
            click(actionSheetMenuButton, 2);
        }
    });

    it('should check RTL and LTR orientation', () => {
        actionSheetPage.checkRtlSwitch();
    });

    it('should check examples visual regression', () => {
        actionSheetPage.checkVisualRegression('action-sheet');
    });

    function checkClickableButton(selector: string): void {
        const buttonLength = getElementArrayLength(selector);
        for (let i = 0; i < buttonLength; i++) {
            click(selector, i);
        }
    }
});

