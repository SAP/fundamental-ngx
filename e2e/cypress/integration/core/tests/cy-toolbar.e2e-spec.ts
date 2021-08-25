import { ToolbarPo } from '../../../support/core/pages/cy-toolbar.po';
import { headerTestText, testTextArr, testDate, fruitArr } from '../../../support/core/fixtures/cy-toolbar.content';


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
        cy.reload();
    });

    xit('verify  text in Toolbar Types example', () => {
        for (let i = 0; i < 5; i++) {
            toolbarPage.getText(toolbarTypeExampleLabel, testTextArr[i], i);
        }
    });

    xit('verify header text in Toolbar Title example', () => {
        toolbarPage.getText(toolbarTitleHeader, headerTestText);
    });

    it('verify info active toolbar is clickable', () => {
        toolbarPage.clickOnElement(activeInfoToolbar);
    });

    describe('Check Toolbar Overflow example', () => {

        it('verify is clickable buttons', () => {
            for (let i = 0; i < 6; i++) {
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
            for (let i = 0; i < 4; i++) {
                toolbarPage.clickOnElement(dropdownOption, i);
                toolbarPage.getText(inputFieldText, fruitArr[i]);
                if (i !== 3) {
                    cy.get(dropdownMenu).click();
                }
            }
        });
    });

    describe('Check Toolbar Overflow Priority', function() {

        it('should check Toolbar Overflow Priority example', () => {
            for (let i = 0; i < 6; i++) {
                toolbarPage.clickOnElement(overflowPriorityButton, i);
            }

            cy.get(overflowPriorityExample + moreBtn).click();
            cy.get(overflowBody).should('be.visible');

            cy.get(alwaysButton).click();
        });
    });

    describe('Check Toolbar Overflow Grouping', function() {

        it('should check Toolbar Overflow Grouping example', () => {
            for (let i = 0; i < 7; i++) {
                toolbarPage.clickOnElement(overflowGroupingButton, i);
            }

            cy.get(overflowGroupingExample + moreBtn).click();
            cy.get(overflowBody).should('be.visible');

            cy.get(alwaysButton).click();
        });
    });
});

