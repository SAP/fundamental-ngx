import { BreadcrumbPo } from '../pages/breadcrumb.po';
import {
    getElementArrayLength,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView, waitForPresent
} from '../../driver/wdio';

describe('Breadcrumb test suite:', function() {

    const breadcrumbPage: BreadcrumbPo = new BreadcrumbPo();
    const {links, disableLinks} = breadcrumbPage;

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

    it('should check disable links', () => {
        const disableLinksLength = getElementArrayLength(disableLinks);
        for (let i = 0; i < disableLinksLength; i++) {
            scrollIntoView(disableLinks, i);
            expect(isElementDisplayed(disableLinks, i)).toBe(true);
        }
    });

    describe('Check visual regression', function() {
        beforeAll(() => {
            breadcrumbPage.open();
            waitForPresent(links);
        }, 1);

        it('should check examples visual regression', () => {
            breadcrumbPage.saveExampleBaselineScreenshot('breadcrumb');
            expect(breadcrumbPage.compareWithBaseline('breadcrumb')).toBeLessThan(1);
        });
    });
});
