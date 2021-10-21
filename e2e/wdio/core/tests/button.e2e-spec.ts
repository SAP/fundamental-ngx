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
    saveElementScreenshot,
    getText
} from '../../driver/wdio';
import { testText, fdTypeOptions, iconOptions } from '../fixtures/appData/button-contents';
import { buttonPlaygroundTag } from '../fixtures/testData/button-tags';

describe('Button test suite:', () => {
    const buttonPage = new ButtonPo();
    const {
        typeButtons,
        menuButtons,
        sizeButtons,
        iconButtons,
        stateButton,
        disableStateButtons,
        playgroundButton,
        inputLabel,
        checkboxMenu,
        checkboxCompact,
        dropDownMenu,
        playgroundButtonText
    } = buttonPage;

    beforeAll(() => {
        buttonPage.open();
    }, 1);

    describe('Verify all buttons are clickable', () => {
        it('verify clickable buttons types', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                expect(isElementClickable(typeButtons, i)).toBe(true, `type button with index ${i} not clickable`);
            }
        });

        it('verify clickable menu buttons', () => {
            const menuButtonsLength = getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                scrollIntoView(menuButtons, i);
                expect(isElementClickable(menuButtons, i)).toBe(true, `menu button with index ${i} not clickable`);
            }
        });

        it('verify clickable size buttons', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                expect(isElementClickable(sizeButtons, i)).toBe(true, `size button with index ${i} not clickable`);
            }
        });

        it('verify buttons with icons', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                expect(isElementClickable(iconButtons, i)).toBe(true, `icon button with index ${i} not clickable`);
            }
        });

        it('verify state buttons', () => {
            scrollIntoView(stateButton);
            expect(isElementClickable(stateButton)).toBe(true, `state button with index not clickable`);
        });

        it('verify playground button is clickable', () => {
            scrollIntoView(playgroundButton);
            expect(isElementClickable(playgroundButton)).toBe(true, `playground button with index not clickable`);
        });
    });

    it('verify disable state buttons', () => {
        expect(getAttributeByName(disableStateButtons, 'aria-disabled')).toEqual('true');
        expect(getAttributeByName(disableStateButtons, 'disabled', 1)).toEqual('true');
    });

    describe('Verify playground', () => {
        it('verify changing text in label', () => {
            scrollIntoView(inputLabel);
            setValue(inputLabel, 'test');
            expect(getText(playgroundButtonText)).toEqual(testText);
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
                saveElementScreenshot(
                    playgroundButton,
                    buttonPlaygroundTag + `${fdTypeOptions[i]}`,
                    buttonPage.getScreenshotFolder()
                );
                expect(
                    checkElementScreenshot(
                        playgroundButton,
                        buttonPlaygroundTag + `${fdTypeOptions[i]}`,
                        buttonPage.getScreenshotFolder()
                    )
                ).toBeLessThan(5, `Playground button mismatch`);
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
                saveElementScreenshot(
                    playgroundButton,
                    buttonPlaygroundTag + `${iconOptions[i]}`,
                    buttonPage.getScreenshotFolder()
                );
                expect(
                    checkElementScreenshot(
                        playgroundButton,
                        buttonPlaygroundTag + `${iconOptions[i]}`,
                        buttonPage.getScreenshotFolder()
                    )
                ).toBeLessThan(5, `Playground button mismatch`);
            }
        });

        xit('verify menu checkbox visual regression', () => {
            scrollIntoView(checkboxMenu);
            click(checkboxMenu);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-menu')).toEqual('true');
            saveElementScreenshot(playgroundButton, buttonPlaygroundTag + 'menu', buttonPage.getScreenshotFolder());
            expect(
                checkElementScreenshot(playgroundButton, buttonPlaygroundTag + 'menu', buttonPage.getScreenshotFolder())
            ).toBeLessThan(5, `Playground button mismatch`);
            click(checkboxMenu);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-fd-menu')).toEqual('false');
            saveElementScreenshot(playgroundButton, buttonPlaygroundTag + 'not-menu', buttonPage.getScreenshotFolder());
            expect(
                checkElementScreenshot(
                    playgroundButton,
                    buttonPlaygroundTag + 'not-menu',
                    buttonPage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `Playground button mismatch`);
        });

        xit('verify compact checkbox visual regression', () => {
            scrollIntoView(checkboxCompact);
            click(checkboxCompact);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-compact')).toEqual('true');
            saveElementScreenshot(playgroundButton, buttonPlaygroundTag + 'compact', buttonPage.getScreenshotFolder());
            expect(
                checkElementScreenshot(
                    playgroundButton,
                    buttonPlaygroundTag + 'compact',
                    buttonPage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `Playground button mismatch`);
            click(checkboxCompact);
            expect(getAttributeByName(playgroundButton, 'ng-reflect-compact')).toEqual('false');
            saveElementScreenshot(
                playgroundButton,
                buttonPlaygroundTag + 'not-compact',
                buttonPage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    playgroundButton,
                    buttonPlaygroundTag + 'not-compact',
                    buttonPage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `Playground button mismatch`);
        });
    });

    xdescribe('Check visual regression basic', () => {
        it('should check examples visual regression', () => {
            buttonPage.saveExampleBaselineScreenshot();
            expect(buttonPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
