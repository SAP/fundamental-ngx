import { ActionBarPo } from './action-bar.po';
import { backButton } from './action-bar-contents';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    checkElArrIsClickable,
    click,
    doesItExist,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed
} from '../../../../../e2e';

describe('Action Bar Test Suite', () => {
    const actionBarPage = new ActionBarPo();

    beforeAll(() => {
        actionBarPage.open();
        waitForElDisplayed(actionBarPage.actionBarBackButtonBackButton);
    }, 1);

    describe('Action bar back example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarPage.actionBarBackButton + actionBarPage.button);
        });
    });

    describe('Action bar long page title example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarPage.actionBarLongPageTitle + actionBarPage.button);
        });
    });

    describe('Action bar no back button example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarPage.actionBarContextualMenu + actionBarPage.button);
        });

        it('should check that no back button in example', () => {
            expect(doesItExist(actionBarPage.actionBarNoBackButton + backButton)).toBe(false);
        });
    });

    describe('Action bar contextual menu example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarPage.actionBarNoBackButton + actionBarPage.button);
        });

        it('should check expanding menu', () => {
            click(actionBarPage.actionBarContextualMenuButton);
            expect(isElementDisplayed(actionBarPage.actionBarContextualMenuOptionList)).toBe(true);
        });

        xit('should check closing expanded menu', () => {
            refreshPage();
            waitForElDisplayed(actionBarPage.title);
            click(actionBarPage.actionBarContextualMenuButton);
            // click second time to close menu
            click(actionBarPage.actionBarContextualMenuButton);
            expect(doesItExist(actionBarPage.actionBarContextualMenuOptionList)).toBe(false);
        });

        it('should check that list items are clickable', () => {
            click(actionBarPage.actionBarContextualMenuButton);
            checkElArrIsClickable(actionBarPage.actionBarContextualMenuOptionListItem);
        });
    });

    xdescribe('Action bar mobile view example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarPage.actionBarMobileView + actionBarPage.button);
        });

        it('should check expanding menu', () => {
            refreshPage();
            waitForElDisplayed(actionBarPage.title);
            click(actionBarPage.actionBarMobileViewMenuButton);
            expect(isElementDisplayed(actionBarPage.actionBarMobileViewOptionList)).toBe(true);
        });

        it('should check closing expanded menu', () => {
            refreshPage();
            waitForElDisplayed(actionBarPage.title);
            click(actionBarPage.actionBarMobileViewMenuButton);
            // click second time to close menu
            click(actionBarPage.actionBarMobileViewMenuButton);
            expect(doesItExist(actionBarPage.actionBarMobileViewOptionList)).toBe(false);
        });

        it('should check that list items are clickable', () => {
            click(actionBarPage.actionBarMobileViewMenuButton);
            checkElArrIsClickable(actionBarPage.actionBarMobileViewOptionListItem);
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            actionBarPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression basic', () => {
        it('should check examples visual regression', () => {
            actionBarPage.saveExampleBaselineScreenshot();
            expect(actionBarPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
