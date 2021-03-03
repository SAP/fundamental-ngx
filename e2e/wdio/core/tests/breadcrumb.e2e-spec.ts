import { BreadcrumbPo } from '../pages/breadcrumb.po';
import {
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView, waitForElDisplayed, waitForPresent
} from '../../driver/wdio';

import {
    disabledLinksState,
    linksActiveState,
    linksExample, linksHoverState
} from '../fixtures/testData/breadcrumb.tags';
import { checkElementActiveState, checkElementHoverState } from '../../helper/assertion-helper';
import { breadcrumbDisabledLinks, breadcrumbLinks } from '../fixtures/appData/breadcrumb-contents';


describe('Breadcrumb test suite:', function() {

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

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            breadcrumbPage.saveExampleBaselineScreenshot('breadcrumb');
            expect(breadcrumbPage.compareWithBaseline('breadcrumb')).toBeLessThan(1);
        });

        it('should check hover state for links', () => {
            const linksLength = getElementArrayLength(links);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(links, i);
                checkElementHoverState(links, linksExample + linksHoverState + '-' + i, breadcrumbLinks, i);
            }
        });

        it('should check hover state for disabled links', () => {
            const disabledLinksLength = getElementArrayLength(disabledLinks);
            for (let i = 0; i < disabledLinksLength; i++) {
                scrollIntoView(disabledLinks, i);
                checkElementHoverState(disabledLinks, linksExample + disabledLinksState + '-' + i, breadcrumbDisabledLinks, i);
            }
        });

        it('should check active state for links', () => {
            const linksLength = getElementArrayLength(links);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(links, i);
                checkElementActiveState(links, linksExample + linksActiveState + '-' + i, breadcrumbLinks, i);
            }
        });
    });
});


