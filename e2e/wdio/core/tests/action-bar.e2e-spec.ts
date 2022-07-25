import { ActionBarPo } from '../pages/action-bar.po';
import { click, doesItExist, isElementDisplayed, refreshPage, waitForElDisplayed } from '../../driver/wdio';
import { checkElArrIsClickable } from '../../helper/assertion-helper';
import { backButton } from '../fixtures/appData/action-bar-contents';

describe('Action Bar Test Suite', () => {
    const actionBarPage = new ActionBarPo();
    const {
        actionBarBackButtonBackButton,
        button,
        actionBarBackButton,
        actionBarLongPageTitle,
        actionBarNoBackButton,
        actionBarContextualMenu,
        actionBarMobileView,
        actionBarContextualMenuButton,
        actionBarContextualMenuOptionList,
        actionBarContextualMenuOptionListItem,
        actionBarMobileViewOptionList,
        actionBarMobileViewOptionListItem,
        actionBarMobileViewMenuButton
    } = actionBarPage;

    beforeAll(() => {
        actionBarPage.open();
        waitForElDisplayed(actionBarBackButtonBackButton);
    }, 1);

    describe('Action bar back example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarBackButton + button);
        });
    });

    describe('Action bar long page title example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarLongPageTitle + button);
        });
    });

    describe('Action bar no back button example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarContextualMenu + button);
        });

        it('should check that no back button in example', () => {
            expect(doesItExist(actionBarNoBackButton + backButton)).toBe(false);
        });
    });

    describe('Action bar contextual menu example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarNoBackButton + button);
        });

        it('should check expanding menu', () => {
            click(actionBarContextualMenuButton);
            expect(isElementDisplayed(actionBarContextualMenuOptionList)).toBe(true);
        });

        xit('should check closing expanded menu', () => {
            refreshPage();
            waitForElDisplayed(actionBarPage.title);
            click(actionBarContextualMenuButton);
            // click second time to close menu
            click(actionBarContextualMenuButton);
            expect(doesItExist(actionBarContextualMenuOptionList)).toBe(false);
        });

        it('should check that list items are clickable', () => {
            click(actionBarContextualMenuButton);
            checkElArrIsClickable(actionBarContextualMenuOptionListItem);
        });
    });

    xdescribe('Action bar mobile view example', () => {
        it('should check that all buttons are clickable', () => {
            checkElArrIsClickable(actionBarMobileView + button);
        });

        it('should check expanding menu', () => {
            refreshPage();
            waitForElDisplayed(actionBarPage.title);
            click(actionBarMobileViewMenuButton);
            expect(isElementDisplayed(actionBarMobileViewOptionList)).toBe(true);
        });

        it('should check closing expanded menu', () => {
            refreshPage();
            waitForElDisplayed(actionBarPage.title);
            click(actionBarMobileViewMenuButton);
            // click second time to close menu
            click(actionBarMobileViewMenuButton);
            expect(doesItExist(actionBarMobileViewOptionList)).toBe(false);
        });

        it('should check that list items are clickable', () => {
            click(actionBarMobileViewMenuButton);
            checkElArrIsClickable(actionBarMobileViewOptionListItem);
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
