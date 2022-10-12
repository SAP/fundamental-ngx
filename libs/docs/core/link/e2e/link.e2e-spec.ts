import { LinkPo } from './link.po';
import {
    getElementAriaLabel,
    getElementArrayLength,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Link test suite', () => {
    const linkPage = new LinkPo();
    const { links, leftArrowIcon, rightArrowIcon } = linkPage;

    beforeAll(async () => {
        await linkPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(linkPage.root);
        await waitForElDisplayed(linkPage.title);
    }, 1);

    describe('check links', () => {
        it('should check links clickable', async () => {
            const linkCount = await getElementArrayLength(links);
            const disabledLinkIndex = 2;

            for (let i = 0; i < linkCount; i++) {
                if (i === disabledLinkIndex) {
                    await expect(await isElementClickable(links, i)).toBe(false);
                    continue;
                }
                await expect(await isElementClickable(links, i)).toBe(true);
            }
        });

        it('should check that first link is standard type', async () => {
            await expect(await getElementAriaLabel(links)).toBe('Standard');
        });

        it('should check that second link is emphasized type', async () => {
            await expect(await getElementAriaLabel(links, 1)).toBe('Emphasized');
        });

        it('should check that the last link is inverted type', async () => {
            await expect(await getElementAriaLabel(links, 5)).toBe('Inverted');
        });

        it('should check link with right arrow', async () => {
            await expect(await getElementAriaLabel(links, 3)).toBe('Icon right');
            await expect(await isElementDisplayed(rightArrowIcon)).toBe(true);
        });

        it('should check link with left arrow', async () => {
            await expect(await getElementAriaLabel(links, 4)).toBe('Icon left');
            await expect(await isElementDisplayed(leftArrowIcon)).toBe(true);
        });

        it('should check orientation', async () => {
            await linkPage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', () => {
        it('should check examples visual regression', async () => {
            await linkPage.saveExampleBaselineScreenshot();
            await expect(await linkPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
