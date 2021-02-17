import { ActionBarPo } from '../pages/action-bar.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click,
    getElementArrayLength,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed
} from '../../driver/wdio';
import {
    backButtonExample,
    backButtonFocusState,
    backButtonHoverState,
    cancelButtonFocusState,
    cancelButtonHoverState,
    contextualMenuExample,
    longTitleExample,
    menuButtonFocusState,
    menuButtonHoverState,
    menuItemActiveState,
    menuItemFocusState,
    menuItemHoverState,
    mobileViewExample,
    noBackButtonExample,
    saveButtonFocusState,
    saveButtonHoverState
} from '../fixtures/testData/action-bar-tags';
import { saveButton, backButton, cancelButton, menuButton, menuItem } from '../fixtures/appData/action-bar-contents';

describe('Action Bar Test Suite', function() {
    const actionBarPage = new ActionBarPo();
    const {
        actionBarBackButtonBackButton,
        actionBarBackButtonCancelButton,
        actionBarBackButtonSaveButton,
        actionBarLongPageTitle,
        actionBarLongPageTitleBackButton,
        actionBarLongPageTitleCancelButton,
        actionBarLongPageTitleSaveButton,
        actionBarNoBackButton,
        actionBarNoBackButtonCancelButton,
        actionBarNoBackButtonSaveButton,
        actionBarMobileViewBackButton,
        actionBarMobileViewMenuButton,
        actionBarMobileViewOptionList,
        actionBarMobileViewOptionListItem,
        actionBarContextualMenuButton,
        actionBarContextualMenuOptionList,
        actionBarContextualMenuOptionListItem
    } = actionBarPage;

    beforeAll(() => {
        actionBarPage.open();
        waitForElDisplayed(actionBarBackButtonBackButton);
    }, 1);

    describe('verify Back button example', function() {
        it('should check back button hover state', () => {
            checkButtonHoverState(actionBarBackButtonBackButton, backButtonExample + backButtonHoverState, backButton);
        });

        it('should check Back button focus state', () => {
            checkButtonFocusState(actionBarBackButtonBackButton, backButtonExample + backButtonFocusState, backButton);
        });

        it('should check Cancel hover state', () => {
            checkButtonHoverState(actionBarBackButtonCancelButton, backButtonExample + cancelButtonHoverState, cancelButton);
        });

        it('should check Cancel button focus state', () => {
            checkButtonFocusState(actionBarBackButtonCancelButton, backButtonExample + cancelButtonFocusState, cancelButton);
        });

        it('should check Save hover state', () => {
            checkButtonHoverState(actionBarBackButtonSaveButton, backButtonExample + saveButtonHoverState, saveButton);
        });

        it('should check Save button focus state', () => {
            checkButtonFocusState(actionBarBackButtonSaveButton, backButtonExample + saveButtonFocusState, saveButton);
        });
    });

    describe('verify long page title example', function() {
        beforeAll(() => {
            scrollIntoView(actionBarLongPageTitle);
        }, 1);
        it('should check Back button hover state', () => {
            checkButtonHoverState(actionBarLongPageTitleBackButton, longTitleExample + backButtonHoverState, backButton);
        });

        it('should check Back button focus state', () => {
            checkButtonFocusState(actionBarLongPageTitleBackButton, longTitleExample + backButtonFocusState, backButton);
        });

        it('should check Cancel hover state', () => {
            checkButtonHoverState(actionBarLongPageTitleCancelButton, longTitleExample + cancelButtonHoverState, cancelButton);
        });

        it('should check Cancel button focus state', () => {
            checkButtonFocusState(actionBarLongPageTitleCancelButton, longTitleExample + cancelButtonFocusState, cancelButton);
        });

        it('should check Save button hover state', () => {
            checkButtonHoverState(actionBarLongPageTitleSaveButton, longTitleExample + saveButtonHoverState, saveButton);
        });

        it('should check Save button focus state', () => {
            checkButtonFocusState(actionBarLongPageTitleSaveButton, longTitleExample + saveButtonFocusState, saveButton);
        });
    });

    describe('verify no back button example', function() {
        beforeAll(() => {
            scrollIntoView(actionBarNoBackButton);
        }, 1);

        it('should check Cancel hover state', () => {
            checkButtonHoverState(actionBarNoBackButtonCancelButton, noBackButtonExample + cancelButtonHoverState, cancelButton);
        });

        it('should check Cancel button focus state', () => {
            checkButtonFocusState(actionBarNoBackButtonCancelButton, noBackButtonExample + cancelButtonFocusState, cancelButton);
        });

        it('should check Save button hover state', () => {
            checkButtonHoverState(actionBarNoBackButtonSaveButton, noBackButtonExample + saveButtonHoverState, saveButton);
        });

        it('should check Save button focus state', () => {
            checkButtonFocusState(actionBarNoBackButtonSaveButton, noBackButtonExample + saveButtonFocusState, saveButton);
        });
    });

    describe('verify contextual menu example', function() {
        beforeEach(() => {
            refreshPage();
            waitForElDisplayed(actionBarContextualMenuButton);
            scrollIntoView(actionBarContextualMenuButton);
        }, 1);

        it('should check Menu button hover state', () => {
            checkButtonHoverState(actionBarContextualMenuButton, contextualMenuExample + menuButtonHoverState, menuButton);
        });

        it('should check Menu button focus state', () => {
            checkButtonFocusState(actionBarContextualMenuButton, contextualMenuExample + menuButtonFocusState, menuButton);
        });

        it('should check Menu items hover state', () => {
            click(actionBarContextualMenuButton);
            waitForElDisplayed(actionBarContextualMenuOptionList);

            const menuItemsArrLength = getElementArrayLength(actionBarContextualMenuOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonHoverState(actionBarContextualMenuOptionListItem,
                    contextualMenuExample + menuItemHoverState + '-' + i, menuItem, i);
            }
        });

        it('should check Menu items focus state', () => {
            click(actionBarContextualMenuButton);
            waitForElDisplayed(actionBarContextualMenuOptionList);

            const menuItemsArrLength = getElementArrayLength(actionBarContextualMenuOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonFocusState(actionBarContextualMenuOptionListItem,
                    contextualMenuExample + menuItemFocusState + '-' + i, menuItem, i);
            }
        });

        it('should check Menu items active state', () => {
            click(actionBarContextualMenuButton);
            waitForElDisplayed(actionBarContextualMenuOptionList);

            const menuItemsArrLength = getElementArrayLength(actionBarContextualMenuOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonActiveState(actionBarContextualMenuOptionListItem,
                    contextualMenuExample + menuItemActiveState + '-' + i, menuItem, i);
            }
        });
    });

    describe('verify Mobile View example', function() {
        beforeEach(() => {
            refreshPage();
            waitForElDisplayed(actionBarMobileViewBackButton);
            scrollIntoView(actionBarMobileViewBackButton);
        }, 1);

        it('should check Back button hover state', () => {
            checkButtonHoverState(actionBarMobileViewBackButton, mobileViewExample + backButtonHoverState, backButton);
        });

        it('should check Back button focus state', () => {
            checkButtonFocusState(actionBarMobileViewBackButton, mobileViewExample + backButtonFocusState, backButton);
        });

        it('should check first Menu button hover state', () => {
            checkButtonHoverState(actionBarMobileViewMenuButton, mobileViewExample + menuButtonHoverState, menuButton);
        });

        it('should check first Menu button focus state', () => {
            checkButtonFocusState(actionBarMobileViewMenuButton, mobileViewExample + menuButtonFocusState, menuButton);
        });

        it('should check first Menu items hover state', () => {
            click(actionBarMobileViewMenuButton);
            waitForElDisplayed(actionBarMobileViewOptionList);

            const menuItemsArrLength = getElementArrayLength(actionBarMobileViewOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonHoverState(actionBarMobileViewOptionListItem, mobileViewExample + menuItemHoverState + '-' + i, menuItem, i);
            }
        });

        it('should check first Menu items focus state', () => {
            click(actionBarMobileViewMenuButton);
            waitForElDisplayed(actionBarMobileViewMenuButton);

            const menuItemsArrLength = getElementArrayLength(actionBarMobileViewOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonFocusState(actionBarMobileViewOptionListItem, mobileViewExample + menuItemFocusState + '-' + i, menuItem, i);
            }
        });

        it('should check first Menu items active state', () => {
            click(actionBarMobileViewMenuButton);
            waitForElDisplayed(actionBarMobileViewMenuButton);

            const menuItemsArrLength = getElementArrayLength(actionBarMobileViewOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonActiveState(actionBarMobileViewOptionListItem,
                    mobileViewExample + menuItemActiveState + '-' + i, 'First ' + menuItem, i);
            }
        });

        it('should check second Menu items hover state', () => {
            click(actionBarMobileViewMenuButton, 1);
            waitForElDisplayed(actionBarMobileViewOptionList);

            const menuItemsArrLength = getElementArrayLength(actionBarMobileViewOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonHoverState(actionBarMobileViewOptionListItem,
                    mobileViewExample + 'second-' + menuItemHoverState + '-' + i, 'Second ' + menuItem, i);
            }
        });

        it('should check second Menu items focus state', () => {
            click(actionBarMobileViewMenuButton, 1);
            waitForElDisplayed(actionBarMobileViewOptionList);

            const menuItemsArrLength = getElementArrayLength(actionBarMobileViewOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonFocusState(actionBarMobileViewOptionListItem,
                    mobileViewExample + 'second-' + menuItemFocusState + '-' + i,
                    'Second ' + menuItem, i);
            }
        });

        it('should check second Menu items active state', () => {
            click(actionBarMobileViewMenuButton, 1);
            waitForElDisplayed(actionBarMobileViewOptionListItem);

            const menuItemsArrLength = getElementArrayLength(actionBarMobileViewOptionListItem);
            for (let i = 0; menuItemsArrLength > i; i++) {
                checkButtonActiveState(actionBarMobileViewOptionListItem,
                    mobileViewExample + 'second-' + menuItemActiveState + '-' + i, 'Second ' + menuItem, i);
            }
        });
    });

    describe('Check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            actionBarPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression basic', function() {
        it('should check examples visual regression', () => {
            actionBarPage.saveExampleBaselineScreenshot('action-bar');
            expect(actionBarPage.compareWithBaseline('action-bar')).toBeLessThan(1);
        });
    });
});

function checkButtonHoverState(selector: string, tag: string, btnName: string, index: number = 0): void {
    mouseHoverElement(selector, index);
    saveElementScreenshot(selector, tag);
    expect(checkElementScreenshot(selector, tag, {}, index))
        .toBeLessThan(2, `${btnName} button hover state mismatch`);
}

function checkButtonFocusState(selector: string, tag: string, btnName: string, index: number = 0): void {
    click(selector, index);
    saveElementScreenshot(selector, tag, {}, index);
    expect(checkElementScreenshot(selector, tag))
        .toBeLessThan(2, `${btnName} button focus state mismatch`);
}

function checkButtonActiveState(selector: string, tag: string, btnName: string, index: number = 0): void {
    addIsActiveClass(selector, index);
    saveElementScreenshot(selector, tag, {}, index);
    expect(checkElementScreenshot(selector, tag))
        .toBeLessThan(2, `${btnName} button item ${index} active state mismatch`);
}
