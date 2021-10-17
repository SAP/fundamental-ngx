import { BreadcrumbPo } from '../pages/breadcrumb.po';
import {
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';

describe('Breadcrumb test suite:', () => {
    const breadcrumbPage: BreadcrumbPo = new BreadcrumbPo();
    const { links, disabledLinks } = breadcrumbPage;

    beforeAll(() => {
        breadcrumbPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(links);
    }, 1);

    it('should check links', () => {
        const linksLength = getElementArrayLength(links);
        for (let i = 0; i < linksLength; i++) {
            scrollIntoView(links, i);
            expect(isElementClickable(links, i)).toBe(true);
        }
    });

    it('should check disabled links', () => {
        const disabledLinksLength = getElementArrayLength(disabledLinks);
        for (let i = 0; i < disabledLinksLength; i++) {
            scrollIntoView(disabledLinks, i);
            waitForElDisplayed(disabledLinks, i);
        }
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            breadcrumbPage.saveExampleBaselineScreenshot();
            expect(breadcrumbPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
