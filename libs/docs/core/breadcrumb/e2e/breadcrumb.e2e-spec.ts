import {
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { BreadcrumbPo } from './breadcrumb.po';

describe('Breadcrumb test suite:', () => {
    const breadcrumbPage: BreadcrumbPo = new BreadcrumbPo();
    const { links, disabledLinks } = breadcrumbPage;

    beforeAll(async () => {
        await breadcrumbPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await breadcrumbPage.waitForRoot();
        await waitForElDisplayed(breadcrumbPage.title);
    }, 1);

    it('should check links', async () => {
        const linksLength = await getElementArrayLength(links);
        for (let i = 0; i < linksLength; i++) {
            await scrollIntoView(links, i);
            await expect(await isElementClickable(links, i)).toBe(true);
        }
    });

    it('should check disabled links', async () => {
        const disabledLinksLength = await getElementArrayLength(disabledLinks);
        for (let i = 0; i < disabledLinksLength; i++) {
            await scrollIntoView(disabledLinks, i);
            await waitForElDisplayed(disabledLinks, i);
        }
    });
});
