import { ObjectIdentifierPo } from './object-identifier.po';
import {
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Object identifier test suite', () => {
    const objectIdentifierPage = new ObjectIdentifierPo();
    const { clickableLinks } = objectIdentifierPage;

    beforeAll(async () => {
        await objectIdentifierPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(objectIdentifierPage.root);
        await waitForElDisplayed(objectIdentifierPage.title);
    }, 1);

    it('Verify each identifier is clickable', async () => {
        const linkElementArr = await getElementArrayLength(clickableLinks);
        for (let i = 0; i < linkElementArr; i++) {
            await scrollIntoView(clickableLinks, i);
            await expect(await isElementClickable(clickableLinks, i)).toBe(true, 'link with index ${i} not clickable');
        }
    });

    describe('Check orientation', () => {
        it('Verify RTL and LTR orientation', async () => {
            await objectIdentifierPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await objectIdentifierPage.saveExampleBaselineScreenshot();
            await expect(await objectIdentifierPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
