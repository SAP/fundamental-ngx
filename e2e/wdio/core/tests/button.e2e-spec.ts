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
    mouseHoverElement, saveElementScreenshot, addIsActiveClass
} from '../../driver/wdio';
import {
    text, option, option2, button
} from '../fixtures/appData/button-contents';
import {
    disableStateButtonsExample, disableStateButtonsHoverState,
    iconButtonsActiveState,
    iconButtonsExample, iconButtonsFocusState, iconButtonsHoverState,
    menuButtonsActiveState,
    menuButtonsExample,
    menuButtonsFocusState,
    menuButtonsHoverState, playgroundButtonExample,
    sizeButtonsActiveState,
    sizeButtonsExample, sizeButtonsFocusState,
    sizeButtonsHoverState, stateButtonActiveState, stateButtonExample, stateButtonFocusState, stateButtonHoverState,
    typeButtonsActiveState,
    typeButtonsExample,
    typeButtonsFocusState,
    typeButtonsHoverState
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

    it('verify disable state buttons', () => {
        expect(getAttributeByName(disableStateButtons, 'aria-disabled')).toEqual('true');
        expect(getAttributeByName(disableStateButtons, 'disabled', 1)).toEqual('true');
    });

    it('verify playground button is clickable', () => {
        scrollIntoView(playgroundButton);
        expect(isElementClickable(playgroundButton)).toBe(true);
    });

    it('verify changing text in label', () => {
        scrollIntoView(inputLabel);
        setValue(inputLabel, 'test');
        expect(getAttributeByName(playgroundButton, 'ng-reflect-label')).toEqual(text);
    });

    //skipped due to https://github.com/webdriverio/webdriverio/issues/3605
    xit('verify type of dropdown menu', () => {
        scrollIntoView(dropDownMenu);
        click(dropDownMenu);
        for (let i = 0; i < option.length; i++) {
            setValue(dropDownMenu, option[i]);
            sendKeys(['Enter']);
            click(playgroundButton);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-type')).toEqual(option[i]);
            saveElementScreenshot(playgroundButton, playgroundButtonExample + `${option[i]}`, buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, playgroundButtonExample + `${option[i]}`, buttonPage.getScreenshotFolder()))
                .toBeLessThan(2, `Playground button mismatch`);
        }
    });

    //skipped due to https://github.com/webdriverio/webdriverio/issues/3605
    xit('verify icon of dropdown menu', () => {
        scrollIntoView(dropDownMenu, 1);
        click(dropDownMenu, 1);
        for (let i = 0; i < option2.length; i++) {
            setValue(dropDownMenu, option2[i], 1);
            sendKeys(['Enter']);
            click(playgroundButton);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-glyph')).toEqual(option2[i]);
            saveElementScreenshot(playgroundButton, playgroundButtonExample + `${option2[i]}`, buttonPage.getScreenshotFolder());
            expect(checkElementScreenshot(playgroundButton, playgroundButtonExample + `${option2[i]}`, buttonPage.getScreenshotFolder()))
                .toBeLessThan(2, `Playground button mismatch`);
        }
    });

    it('verify menu checkbox ', () => {
        scrollIntoView(checkboxMenu);
        click(checkboxMenu);
        expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-menu')).toEqual('true');
        saveElementScreenshot(playgroundButton, playgroundButtonExample + 'menu', buttonPage.getScreenshotFolder());
        expect(checkElementScreenshot(playgroundButton, playgroundButtonExample + 'menu', buttonPage.getScreenshotFolder()))
            .toBeLessThan(2, `Playground button mismatch`);
        click(checkboxMenu);
        expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-menu')).toEqual('false');
        saveElementScreenshot(playgroundButton, playgroundButtonExample + 'not-menu', buttonPage.getScreenshotFolder());
        expect(checkElementScreenshot(playgroundButton, playgroundButtonExample + 'not-menu', buttonPage.getScreenshotFolder()))
            .toBeLessThan(2, `Playground button mismatch`);
    });

    it('verify compact checkbox', () => {
        scrollIntoView(checkboxCompact);
        click(checkboxCompact);
        expect(getAttributeByName(playgroundButton, 'ng-reflect-compact')).toEqual('true');
        saveElementScreenshot(playgroundButton, playgroundButtonExample + 'compact', buttonPage.getScreenshotFolder());
        expect(checkElementScreenshot(playgroundButton, playgroundButtonExample + 'compact', buttonPage.getScreenshotFolder()))
            .toBeLessThan(2, `Playground button mismatch`);
        click(checkboxCompact);
        expect(getAttributeByName(playgroundButton, 'ng-reflect-compact')).toEqual('false');
        saveElementScreenshot(playgroundButton, playgroundButtonExample + 'not-compact', buttonPage.getScreenshotFolder());
        expect(checkElementScreenshot(playgroundButton, playgroundButtonExample + 'not-compact', buttonPage.getScreenshotFolder()))
            .toBeLessThan(2, `Playground button mismatch`);
    });

    describe('Check visual regression basic', function() {

        it('should check examples visual regression', () => {
            buttonPage.saveExampleBaselineScreenshot();
            expect(buttonPage.compareWithBaseline()).toBeLessThan(1);
        });

        it('should check buttons type hover state', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                checkButtonHoverState(typeButtons, typeButtonsExample + typeButtonsHoverState + '-' + i, button, i);
            }
        });

        it('should check buttons type active state', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                checkButtonActiveState(typeButtons, typeButtonsExample + typeButtonsActiveState + '-' + i, button, i);
            }
        });

        it('should check buttons type focus state', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                checkButtonFocusState(typeButtons, typeButtonsExample + typeButtonsFocusState + '-' + i, button, i);
            }
        });

        it('should check state buttons hover state', () => {
            scrollIntoView(stateButton);
            checkButtonHoverState(stateButton, stateButtonExample + stateButtonHoverState + '-', button);
        });

        it('should check state buttons active state', () => {
            scrollIntoView(stateButton);
            checkButtonActiveState(stateButton, stateButtonExample + stateButtonActiveState + '-', button);
        });

        it('should check state buttons focus state', () => {
            scrollIntoView(stateButton);
            checkButtonFocusState(stateButton, stateButtonExample + stateButtonFocusState + '-', button);
        });

        it('verify disable state buttons hover state', () => {
            const disableStateButtonsLength = getElementArrayLength(disableStateButtons);
            for (let i = 0; i < disableStateButtonsLength; i++) {
                scrollIntoView(disableStateButtons, i);
                checkButtonHoverState(disableStateButtons, disableStateButtonsExample + disableStateButtonsHoverState +
                    '-' + i, button, i);
            }
        });

        it('should check buttons with icons hover state', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                checkButtonHoverState(iconButtons, iconButtonsExample + iconButtonsHoverState + '-' + i, button, i);
            }
        });

        it('should check buttons with icons active state', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                checkButtonActiveState(iconButtons, iconButtonsExample + iconButtonsActiveState + '-' + i, button, i);
            }
        });

        it('should check buttons with icons focus state', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                checkButtonFocusState(iconButtons, iconButtonsExample + iconButtonsFocusState + '-' + i, button, i);
            }
        });

        it('should check size buttons hover state', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                checkButtonHoverState(sizeButtons, sizeButtonsExample + sizeButtonsHoverState + '-' + i, button, i);
            }
        });

        it('should check size buttons active state', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                checkButtonActiveState(sizeButtons, sizeButtonsExample + sizeButtonsActiveState + '-' + i, button, i);
            }
        });

        it('should check size buttons focus state', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                checkButtonFocusState(sizeButtons, sizeButtonsExample + sizeButtonsFocusState + '-' + i, button, i);
            }
        });

        it('should check menu buttons hover state', () => {
            const menuButtonsLength = getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                scrollIntoView(menuButtons, i);
                checkButtonHoverState(menuButtons, menuButtonsExample + menuButtonsHoverState + '-' + i, button, i);
            }
        });

        it('should check menu buttons active state', () => {
            const menuButtonsLength = getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                scrollIntoView(menuButtons, i);
                checkButtonActiveState(menuButtons, menuButtonsExample + menuButtonsActiveState + '-' + i, button, i);
            }
        });

        it('should check menu buttons focus state', () => {
            const menuButtonsLength = getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                scrollIntoView(menuButtons, i);
                checkButtonFocusState(menuButtons, menuButtonsExample + menuButtonsFocusState + '-' + i, button, i);
            }
        });

        it('verify changing text in label', () => {
            scrollIntoView(inputLabel);
            setValue(inputLabel, 'test');
            expect(getAttributeByName(playgroundButton, 'ng-reflect-label')).toEqual(text);
        });
    });

    function checkButtonHoverState(selector: string, tag: string, btnName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag, buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${btnName} button hover state mismatch`);
    }

    function checkButtonFocusState(selector: string, tag: string, btnName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag, buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${btnName} button focus state mismatch`);
    }

    function checkButtonActiveState(selector: string, tag: string, btnName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag, buttonPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, buttonPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${btnName} button item ${index} active state mismatch`);
    }
});
