import {
    click,
    getElementArrayLength,
    getText,
    isElementClickable,
    refreshPage,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { FacetsPo } from './facets.po';

describe('dynamic side content test suite', () => {
    const facetsPage = new FacetsPo();
    const { linkFacestExample, raitingIndicatorExample, groupExample, link, chosenRaitingStars, raitingIndicator } =
        facetsPage;

    beforeAll(async () => {
        await facetsPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await facetsPage.waitForRoot();
        await waitForElDisplayed(facetsPage.title);
    }, 1);

    it('Should check raiting indicator', async () => {
        await CheckRaitingIndicator(raitingIndicatorExample);
        await CheckRaitingIndicator(groupExample);
    });

    it('Should check that links is clickable', async () => {
        const linkLength = await getElementArrayLength(linkFacestExample + link);
        for (let i = 0; i < linkLength; i++) {
            await expect(await isElementClickable(linkFacestExample + link, i)).toBe(
                true,
                `link with index ${i} is not clickable`
            );
        }
    });

    describe('check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await facetsPage.checkRtlSwitch();
        });
    });

    async function CheckRaitingIndicator(section: string): Promise<void> {
        const lengthRI = await getElementArrayLength(section + raitingIndicator);
        for (let i = 1; i < lengthRI; i++) {
            await click(section + raitingIndicator, i);
            await expect(await getText(section + chosenRaitingStars)).toEqual(`(${i} of 5)`);
        }
    }
});
