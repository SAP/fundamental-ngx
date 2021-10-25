import { ActionBarPo } from '../../../support/core/pages/cy-action-bar.po';

import {
    checkText,
    click,
    getElementArrayLength,
    refreshPage,
    scrollIntoView
} from '../../../cypress-methods/cypress';
import {
    descriptionLongText,
    descriptionShortText,
    headerLongText,
    headerShortText
} from '../../../support/core/fixtures/cy-action-bar.content';


describe('Action Bar test suite:', () => {
    const actionBarPage = new ActionBarPo();
    const { arrowButton, cancelButton, saveButton, moreButton, menuItem, header, description } = actionBarPage;

    before(() => {
        actionBarPage.navigateTo();
    });

    afterEach(() => {
        refreshPage();
    });

    it('should check clickable arrow button', () => {
        checkClickableButton(arrowButton);
    });

    it('should check clickable cancel button', () => {
        checkClickableButton(cancelButton);
    });

    it('should check clickable save button', () => {
        checkClickableButton(saveButton);
    });

    it('should check clickable more button and menu item button', () => {
        const moreBtnLength = getElementArrayLength(moreButton);
        for (let i = 0; i < moreBtnLength; i++) {
            click(moreButton, i);
            click(menuItem);
            click(menuItem, 1);
            click(menuItem, 2);
            click(menuItem, 3);
            click(menuItem, 4);
        }
    });

    it('should check header text', () => {
        const headerLength = getElementArrayLength(header);
        for (let i = 0; i < headerLength; i++) {
            if (i === 1) {
                checkText(header, headerLongText, 1);
            } else {
                checkText(header, headerShortText, i);
            }
        }
    });

    it('should check description text', () => {
        const descriptionLength = getElementArrayLength(description);
        for (let i = 0; i < descriptionLength; i++) {
            if (i === 1) {
                checkText(description, descriptionLongText, 1);
            } else {
                checkText(description, descriptionShortText, i);
            }
        }
    });

    it('should check RTL and LTR orientation', () => {
        actionBarPage.checkRtlSwitch();
    });

    it('should check examples visual regression', () => {
        actionBarPage.checkVisualRegression('action-bar');
    });

    function checkClickableButton(selector: string): void {
        const buttonLength = getElementArrayLength(selector);
        for (let i = 0; i < buttonLength; i++) {
            click(selector, i);
        }
    }
});

