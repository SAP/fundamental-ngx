import { ButtonPo } from './button.po';
import {
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getElementTitle,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Button test suite:', () => {
    const buttonPage = new ButtonPo();
    const { typeButtons, sizeButtons, iconButtons, stateButton, disableStateButtons, truncatedButton } = buttonPage;

    beforeAll(() => {
        buttonPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(buttonPage.root);
        waitForElDisplayed(buttonPage.title);
    }, 1);

    it('verify clickable buttons types', () => {
        const typeButtonsLength = getElementArrayLength(typeButtons);
        for (let i = 0; i < typeButtonsLength; i++) {
            scrollIntoView(typeButtons, i);
            expect(isElementClickable(typeButtons, i)).toBe(true, `type button with index ${i} not clickable`);
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
        expect(isElementClickable(stateButton)).toBe(true, 'state button not clickable');
    });

    it('verify disable state buttons', () => {
        expect(getElementClass(disableStateButtons)).toContain('is-disabled', 'button is not disabled');
        expect(getElementClass(disableStateButtons, 1)).toContain('is-disabled', 'button is not disabled');
    });

    it('should check truncated text button', () => {
        expect(getElementTitle(truncatedButton)).toContain('Looooooooooong Text Button', 'Text title is not matching');
        expect(isElementClickable(truncatedButton)).toBe(true, 'truncated button with index disable');
    });

    it('should compact be smaller than normal', () => {
        const normalSize = getElementSize(sizeButtons);
        const compactSize = getElementSize(sizeButtons, 1);

        expect(normalSize.height).toBeGreaterThan(compactSize.height);
    });

    describe('Check visual regression basic', () => {
        xit('should check examples visual regression', () => {
            buttonPage.saveExampleBaselineScreenshot();
            expect(buttonPage.compareWithBaseline()).toBeLessThan(5);
        });

        describe('Check orientation', () => {
            it('Verify RTL and LTR orientation', () => {
                buttonPage.checkRtlSwitch();
            });
        });
    });
});
