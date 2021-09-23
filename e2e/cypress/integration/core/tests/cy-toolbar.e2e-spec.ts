import { ToolbarPo } from '../../../support/core/pages/cy-toolbar.po';
import {
    headerTestText,
    testTextArr,
    testDate,
    fruitArr
} from '../../../support/core/fixtures/cy-toolbar.content';
import {
    refreshPage,
    click,
    checkText,
    checkAttributeByName, doubleClick, setValue, checkIsElementDisplayed, getElementArrayLength
} from '../../../cypress-methods/cypress';


describe('Toolbar test suite:', () => {
    const toolbarPage = new ToolbarPo();
    const {
        toolbarTitleHeader, toolbarTypeExampleLabel, overFlowButton, moreButton, okButton, inputField, dropdownMenu, dropdownOption,
        inputFieldText, activeInfoToolbar, checkbox, checkboxValue, overflowPriorityButton, moreBtn, overflowPriorityExample,
        overflowBody, alwaysButton, overflowGroupingButton, overflowGroupingExample
    } = toolbarPage;

    before(() => {
        toolbarPage.navigateTo();
    });

    afterEach(() => {
        refreshPage();
    });

    describe('Check orientation', function() {

        it('should check RTL and LTR orientation', () => {
            toolbarPage.checkRtlSwitch();
        });
    });

    xit('verify  text in Toolbar Types example', () => {
        const textLength = getElementArrayLength(toolbarTypeExampleLabel);
        for (let i = 0; i < textLength; i++) {
            checkText(toolbarTypeExampleLabel, testTextArr[i], i);
        }
    });

    xit('verify header text in Toolbar Title example', () => {
        checkText(toolbarTitleHeader, headerTestText);
    });

    it('verify info active toolbar is clickable', () => {
        click(activeInfoToolbar);
    });

    describe('Check Toolbar Overflow example', () => {

        it('verify is clickable buttons', () => {
            const buttonLength = getElementArrayLength(overFlowButton);
            for (let i = 0; i < buttonLength; i++) {
                if (i === 3) {
                    continue;
                }
                click(overFlowButton, i);
            }
        });

        it('verify checkbox', () => {
            doubleClick(checkbox);
            checkAttributeByName(checkboxValue, 'ng-reflect-model', 'true');
        });

        it('verify input of datetime picker example', () => {
            setValue(inputField, testDate);
            checkAttributeByName(inputField, 'ng-reflect-model', testDate);
        });

        xit('verify input field has placeholder', () => {
            cy.get(moreButton).click();
            cy.get(inputField).eq(1).invoke('attr', 'placeholder').should('contain', 'Field placeholder text');
        });

        it('verify dropdown menu', () => {
            click(dropdownMenu);
            const optionLength = getElementArrayLength(dropdownOption);
            for (let i = 0; i < 4; i++) {
               click(dropdownOption, i);
                checkText(inputFieldText, fruitArr[i]);
                if (i !== 3) {
                    click(dropdownMenu);
                }
            }
        });
    });

    describe('Check Toolbar Overflow Priority', function() {

        it('should check Toolbar Overflow Priority example', () => {
            const buttonLength = getElementArrayLength(overflowPriorityButton);
            for (let i = 0; i < buttonLength; i++) {
                click(overflowPriorityButton, i);
            }

            click(overflowPriorityExample + moreBtn);
            checkIsElementDisplayed(overflowBody);

            click(alwaysButton);
        });
    });

    describe('Check Toolbar Overflow Grouping', function() {

        it('should check Toolbar Overflow Grouping example', () => {
            const buttonLength = getElementArrayLength(overflowGroupingButton);
            for (let i = 0; i < buttonLength; i++) {
                click(overflowGroupingButton, i);
            }

            click(overflowGroupingExample + moreBtn);
            checkIsElementDisplayed(overflowBody);

            click(alwaysButton);
        });
    });
});

