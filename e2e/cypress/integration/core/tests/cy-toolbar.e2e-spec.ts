import {ToolbarPo} from '../../../support/core/pages/cy-toolbar.po';
import {headerTestText, testTextArr, testDate, fruitArr} from '../../../support/core/fixtures/cy-toolbar.content';


describe('Toolbar test suite:', () => {
    const toolbarPage = new ToolbarPo();
    const {
        toolbarTitleHeader, toolbarTypeExampleLabel, overFlowButton, moreButton, okButton, inputField, dropdownMenu, dropdownOption,
        inputFieldText
    } = toolbarPage;

    beforeEach(() => toolbarPage.navigateTo());

    it('verify  text in Toolbar Types example', () => {
        for (let i = 0; i < 5; i++) {
            toolbarPage.getText(toolbarTypeExampleLabel, testTextArr[i], i);
        }
    });

    it('verify header text in Toolbar Title example', () => {
        toolbarPage.getText(toolbarTitleHeader, headerTestText);
    });

    describe('Check Toolbar Overflow example', () => {

        it('verify is clickable buttons', () => {
            for (let i = 0; i < 3; i++) {
                toolbarPage.clickOnElement(overFlowButton, i);
            }
        });

        it('verify input of datetime picker example', () => {
            cy.get(inputField).eq(0).type(testDate);
            cy.get(inputField).eq(0).invoke('attr', 'ng-reflect-model').should('contain', testDate);
        });

        it('verify input field has placeholder', () => {
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
});

