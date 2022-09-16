import { ButtonPo } from './button.po';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    checkElementScreenshot,
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getText,
    isElementClickable,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { fdTypeOptions, iconOptions, testText } from './button-contents';
import { buttonPlaygroundTag } from './button-tags';

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
        playgroundButtonText,
        playgroundButtonIcon,
        menuOption,
        dropDownOptionByValue
    } = buttonPage;

    beforeAll(() => {
        buttonPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(buttonPage.root);
        waitForElDisplayed(buttonPage.title);
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

        it('verify compact button', () => {
            scrollIntoView(sizeButtons);
            const cozySize = getElementSize(sizeButtons);
            const compactSize = getElementSize(sizeButtons, 1);
            expect(compactSize.height).toBeLessThan(cozySize.height);
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
        expect(getAttributeByName(disableStateButtons, 'ng-reflect-disabled', 1)).toBeDefined();
    });

    describe('Verify playground', () => {
        it('verify changing text in label', () => {
            scrollIntoView(inputLabel);
            setValue(inputLabel, 'test');
            expect(getText(playgroundButtonText).trim()).toEqual(testText);
        });

        it('verify type of dropdown menu', () => {
            scrollIntoView(dropDownMenu);
            click(dropDownMenu);
            for (let i = 1; i < fdTypeOptions.length; i++) {
                click(menuOption, i);
                click(playgroundButton);
                expect(getElementClass(playgroundButton)).toContain(fdTypeOptions[i - 1]);
            }
        });

        it('verify checkbox fdMenu', () => {
            scrollIntoView(checkboxMenu);
            click(checkboxMenu);
            expect(getElementClass(playgroundButton)).toContain('fd-button--menu');
        });

        it('verify checkbox compact', () => {
            scrollIntoView(checkboxCompact);
            click(checkboxCompact);
            expect(getElementClass(playgroundButton)).toContain('fd-button--compact');
        });

        it('verify icon of dropdown menu', () => {
            scrollIntoView(dropDownMenu, 1);
            click(dropDownMenu, 1);
            for (let i = 0; i < iconOptions.length; i++) {
                click(dropDownOptionByValue(iconOptions[i]));
                click(playgroundButton);
                expect(getElementClass(playgroundButtonIcon)).toContain(iconOptions[i]);
                click(dropDownMenu, 1);
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
