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

    beforeAll(async () => {
        await buttonPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(buttonPage.root);
        await waitForElDisplayed(buttonPage.title);
    }, 1);

    it('verify clickable buttons types', async () => {
        const typeButtonsLength = await getElementArrayLength(typeButtons);
        for (let i = 0; i < typeButtonsLength; i++) {
            await scrollIntoView(typeButtons, i);
            await expect(await isElementClickable(typeButtons, i)).toBe(
                true,
                `type button with index ${i} not clickable`
            );
        }
    });

    it('verify clickable size buttons', async () => {
        const sizeButtonsLength = await getElementArrayLength(sizeButtons);
        for (let i = 0; i < sizeButtonsLength; i++) {
            await scrollIntoView(sizeButtons, i);
            await expect(await isElementClickable(sizeButtons, i)).toBe(
                true,
                `size button with index ${i} not clickable`
            );
        }
    });

    it('verify buttons with icons', async () => {
        const iconButtonsLength = await getElementArrayLength(iconButtons);
        for (let i = 0; i < iconButtonsLength; i++) {
            await scrollIntoView(iconButtons, i);
            await expect(await isElementClickable(iconButtons, i)).toBe(
                true,
                `icon button with index ${i} not clickable`
            );
        }
    });

    it('verify state buttons', async () => {
        await scrollIntoView(stateButton);
        await expect(await isElementClickable(stateButton)).toBe(true, 'state button not clickable');
    });

    it('verify disable state buttons', async () => {
        await expect(await getElementClass(disableStateButtons)).toContain('is-disabled', 'button is not disabled');
        await expect(await getElementClass(disableStateButtons, 1)).toContain('is-disabled', 'button is not disabled');
    });

    it('should check truncated text button', async () => {
        await expect(await getElementTitle(truncatedButton)).toContain(
            'Looooooooooong Text Button',
            'Text title is not matching'
        );
        await expect(await isElementClickable(truncatedButton)).toBe(true, 'truncated button with index disable');
    });

    it('should compact be smaller than normal', async () => {
        const normalSize = await getElementSize(sizeButtons);
        const compactSize = await getElementSize(sizeButtons, 1);

        await expect(normalSize.height).toBeGreaterThan(compactSize.height);
    });

    describe('Check visual regression basic', () => {
        xit('should check examples visual regression', async () => {
            await buttonPage.saveExampleBaselineScreenshot();
            await expect(await buttonPage.compareWithBaseline()).toBeLessThan(5);
        });

        describe('Check orientation', () => {
            it('Verify RTL and LTR orientation', async () => {
                await buttonPage.checkRtlSwitch();
            });
        });
    });
});
