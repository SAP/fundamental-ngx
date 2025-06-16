import {
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { ObjectIdentifierPo } from './object-identifier.po';

describe('Object identifier test suite', () => {
    const objectIdentifierPage = new ObjectIdentifierPo();
    const { clickableLinks } = objectIdentifierPage;

    beforeAll(async () => {
        await objectIdentifierPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await objectIdentifierPage.waitForRoot();
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
});
