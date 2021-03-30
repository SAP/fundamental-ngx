import { ButtonPo } from '../pages/button.po';
import {
    getAttributeByName,
    getElementArrayLength,
    isElementClickable,
    scrollIntoView,
    setValue,
    click,
    sendKeys,
    checkElementScreenshot,
    mouseHoverElement, saveElementScreenshot, addIsActiveClass, getImageTagBrowserPlatform
} from '../../driver/wdio';
import {
    testText, fdTypeOptions, iconOptions, buttonTag
} from '../fixtures/appData/button-contents';
import {
    stateButtonsDisable,
    buttonsIcon,
    buttonsMenu, buttonPlayground,
    buttonsSize,
    buttonsType, buttonState
} from '../fixtures/testData/button-tags';

describe('Button test suite:', function() {
    const buttonPage = new ButtonPo();
    const {
        typeButtons, menuButtons, sizeButtons, iconButtons, stateButton, disableStateButtons, playgroundButton, inputLabel,
        checkboxMenu, checkboxCompact, dropDownMenu
    } = buttonPage;

    beforeAll(() => {
        buttonPage.open();
    }, 1);

    describe('Verify all buttons are clickable', function() {

        it('verify clickable buttons types', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                expect(isElementClickable(typeButtons, i)).toBe(true);
            }
        });

        it('verify clickable menu buttons', () => {
            const menuButtonsLength = getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                scrollIntoView(menuButtons, i);
                expect(isElementClickable(menuButtons, i)).toBe(true);
            }
        });

        it('verify clickable size buttons', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                expect(isElementClickable(sizeButtons, i)).toBe(true);
            }
        });

        it('verify buttons with icons', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                expect(isElementClickable(iconButtons, i)).toBe(true);
            }
        });

        it('verify state buttons', () => {
            scrollIntoView(stateButton);
            expect(isElementClickable(stateButton)).toBe(true);
        });

        it('verify playground button is clickable', () => {
            scrollIntoView(playgroundButton);
            expect(isElementClickable(playgroundButton)).toBe(true);
        });

    });

    it('verify disable state buttons', () => {
        expect(getAttributeByName(disableStateButtons, 'aria-disabled')).toEqual('true');
        expect(getAttributeByName(disableStateButtons, 'disabled', 1)).toEqual('true');
    });

    describe('Verify playground', function() {

        it('verify changing text in label', () => {
            scrollIntoView(inputLabel);
            setValue(inputLabel, 'test');
            expect(getAttributeByName(playgroundButton, 'ng-reflect-label')).toEqual(testText);
        });

        // skipped due to https://github.com/webdriverio/webdriverio/issues/3605
        xit('verify type of dropdown menu', () => {
            scrollIntoView(dropDownMenu);
            click(dropDownMenu);
            for (let i = 0; i < fdTypeOptions.length; i++) {
                setValue(dropDownMenu, fdTypeOptions[i]);
                sendKeys(['Enter']);
                click(playgroundButton);
                expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-type')).toEqual(fdTypeOptions[i]);
                saveElementScreenshot(playgroundButton, buttonPlayground + `${fdTypeOptions[i]}`, buttonPage.getScreenshotFolder());
                expect(checkElementScreenshot(playgroundButton, buttonPlayground + `${fdTypeOptions[i]}`, buttonPage.getScreenshotFolder()))
                    .toBeLessThan(2, `Playground button mismatch`);
            }
        });

        // skipped due to https://github.com/webdriverio/webdriverio/issues/3605
        xit('verify icon of dropdown menu', () => {
            scrollIntoView(dropDownMenu, 1);
            click(dropDownMenu, 1);
            for (let i = 0; i < iconOptions.length; i++) {
                setValue(dropDownMenu, iconOptions[i], 1);
                sendKeys(['Enter']);
                click(playgroundButton);
                expect(getAttributeByName(playgroundButton, 'ng-reflect-glyph')).toEqual(iconOptions[i]);
                saveElementScreenshot(playgroundButton, buttonPlayground + `${iconOptions[i]}`,
                    buttonPage.getScreenshotFolder());
                expect(checkElementScreenshot(playgroundButton, buttonPlayground + `${iconOptions[i]}`,
                    buttonPage.getScreenshotFolder()))
                    .toBeLessThan(2, `Playground button mismatch`);
            }
        });

        it('verify menu checkbox visual regression', () => {
            scrollIntoView(checkboxMenu);
            click(checkboxMenu);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-menu')).toEqual('true');
            saveElementScreenshot(playgroundButton, buttonPlayground + 'menu', buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, buttonPlayground + 'menu', buttonPage.getScreenshotFolder()))
                .toBeLessThan(2, `Playground button mismatch`);
            click(checkboxMenu);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-menu')).toEqual('false');
            saveElementScreenshot(playgroundButton, buttonPlayground + 'not-menu', buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, buttonPlayground + 'not-menu', buttonPage.getScreenshotFolder()))
                .toBeLessThan(2, `Playground button mismatch`);
        });

        it('verify compact checkbox visual regression', () => {
            scrollIntoView(checkboxCompact);
            click(checkboxCompact);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-compact')).toEqual('true');
            saveElementScreenshot(playgroundButton, buttonPlayground + 'compact', buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, buttonPlayground + 'compact', buttonPage.getScreenshotFolder()))
                .toBeLessThan(2, `Playground button mismatch`);
            click(checkboxCompact);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-compact')).toEqual('false');
            saveElementScreenshot(playgroundButton, buttonPlayground + 'not-compact', buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, buttonPlayground + 'not-compact', buttonPage.getScreenshotFolder()))
                .toBeLessThan(2, `Playground button mismatch`);
    });


    });

    describe('Check visual regression basic', function() {

        it('should check examples visual regression', () => {
            buttonPage.saveExampleBaselineScreenshot();
            expect(buttonPage.compareWithBaseline()).toBeLessThan(1);
        });

        it('should check buttons type states', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                checkElementStates(typeButtons, buttonsType + i + '-', buttonTag, i);
            }
        });

        it('should check state buttons states', () => {
            scrollIntoView(stateButton);
            checkElementStates(stateButton, buttonState, buttonTag);
        });

        it('verify disable state buttons hover state', () => {
            const disableStateButtonsLength = getElementArrayLength(disableStateButtons);
            for (let i = 0; i < disableStateButtonsLength; i++) {
                scrollIntoView(disableStateButtons, i);
                checkDisableButtonHoverState(disableStateButtons, stateButtonsDisable + i + '-', buttonTag, i);
            }
        });

        it('should check buttons with icons states', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                checkElementStates(iconButtons, buttonsIcon + i + '-', buttonTag, i);
            }
        });

        it('should check size buttons states', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                checkElementStates(sizeButtons, buttonsSize + i + '-', buttonTag, i);
            }
        });

        it('should check menu buttons states', () => {
            const menuButtonsLength = getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                scrollIntoView(menuButtons, i);
                checkElementStates(menuButtons, buttonsMenu + i + '-', buttonTag, i);
            }
        });
    });

    function checkDisableButtonHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform() + 'hover-state-',
            buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform() + 'hover-state-',
            buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element item ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }
});
