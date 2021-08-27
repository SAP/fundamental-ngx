import { ToolbarPo } from '../../../support/core/pages/cy-toolbar.po';
import {
    headerTestText,
    testTextArr,
    testDate,
    fruitArr,
} from '../../../support/core/fixtures/cy-toolbar.content';


describe('Toolbar test suite:', () => {
    const toolbarPage = new ToolbarPo();
    const {
        toolbarTitleHeader, toolbarTypeExampleLabel, overFlowButton, moreButton, okButton, inputField, dropdownMenu, dropdownOption,
        inputFieldText, activeInfoToolbar, checkbox, checkboxValue, overflowPriorityButton, moreBtn, overflowPriorityExample,
        overflowBody, alwaysButton, overflowGroupingButton, overflowGroupingExample,
    } = toolbarPage;

    before(() => {
        toolbarPage.navigateTo();
    });

    afterEach(() => {
        cy.reload();
    });

    describe('Check orientation', function() {

        it('should check RTL and LTR orientation', () => {
            toolbarPage.checkRtlSwitch();
        });
    });

    xit('verify  text in Toolbar Types example', () => {
        const textLength = toolbarPage.getElementArrayLength(toolbarTypeExampleLabel);
        for (let i = 0; i < textLength; i++) {
            toolbarPage.getTexts(toolbarTypeExampleLabel, testTextArr[i], i);
        }
    });

    xit('verify header text in Toolbar Title example', () => {
        toolbarPage.getTexts(toolbarTitleHeader, headerTestText);
    });

    it('verify info active toolbar is clickable', () => {
        toolbarPage.clickOnElement(activeInfoToolbar);
    });

    describe('Check Toolbar Overflow example', () => {

        it('verify is clickable buttons', () => {
            const buttonLength = toolbarPage.getElementArrayLength(overFlowButton);
            for (let i = 0; i < buttonLength; i++) {
                if (i === 3) {
                    continue;
                }
                toolbarPage.clickOnElement(overFlowButton, i);
            }
        });

        it('verify checkbox', () => {
            cy.get(checkbox).click();
            cy.get(checkbox).click();
            cy.get(checkboxValue).invoke('attr', 'ng-reflect-model').should('contain', 'true');
        });

        it('verify input of datetime picker example', () => {
            cy.get(inputField).eq(0).type(testDate);
            cy.get(inputField).eq(0).invoke('attr', 'ng-reflect-model').should('contain', testDate);
        });

        xit('verify input field has placeholder', () => {
            cy.get(moreButton).click();
            cy.get(inputField).eq(1).invoke('attr', 'placeholder').should('contain', 'Field placeholder text');
        });

        it('verify dropdown menu', () => {
            cy.get(moreButton).click();
            cy.get(dropdownMenu).click();
            const optionLength = toolbarPage.getElementArrayLength(dropdownOption);
            for (let i = 0; i < optionLength; i++) {
                toolbarPage.clickOnElement(dropdownOption, i);
                toolbarPage.getTexts(inputFieldText, fruitArr[i]);
                if (i !== 3) {
                    cy.get(dropdownMenu).click();
                }
            }
        });
    });

    describe('Check Toolbar Overflow Priority', function() {

        it('should check Toolbar Overflow Priority example', () => {
            const buttonLength = toolbarPage.getElementArrayLength(overflowPriorityButton);
            for (let i = 0; i < buttonLength; i++) {
                toolbarPage.clickOnElement(overflowPriorityButton, i);
            }

            cy.get(overflowPriorityExample + moreBtn).click();
            cy.get(overflowBody).should('be.visible');

            cy.get(alwaysButton).click();
        });
    });

    describe('Check Toolbar Overflow Grouping', function() {

        it('should check Toolbar Overflow Grouping example', () => {
            const buttonLength = toolbarPage.getElementArrayLength(overflowGroupingButton);
            for (let i = 0; i < buttonLength; i++) {
                toolbarPage.clickOnElement(overflowGroupingButton, i);
            }

            cy.get(overflowGroupingExample + moreBtn).click();
            cy.get(overflowBody).should('be.visible');

            cy.get(alwaysButton).click();
        });
    });
});

