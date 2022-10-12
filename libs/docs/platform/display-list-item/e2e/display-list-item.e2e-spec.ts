import { DisplayListItemPo } from './display-list-item.po';
import {
    checkElArrIsClickable,
    checkElementText,
    checkElementTextValue,
    click,
    getCurrentUrl,
    getElementClass,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { navTitlesArr, navUrl } from './display-list-item-contents';

describe('Display List Item test suite:', () => {
    const displayListPage = new DisplayListItemPo();
    const {
        displayLinks,
        cozyDisplayTitles,
        comfyDisplayTitles,
        sections,
        declarativeDisplayLinks,
        declarativeDisplayTitles,
        declarativeSection
    } = displayListPage;

    beforeAll(async () => {
        await displayListPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(displayListPage.root);
        await waitForElDisplayed(displayListPage.title);
    }, 1);

    describe('Display List Item - cozy and comfy examples:', () => {
        it('should do basic checks', async () => {
            await checkElArrIsClickable(displayLinks);
            await checkElementText(cozyDisplayTitles);
            await checkElementText(comfyDisplayTitles);
            await expect(await getElementClass(sections, 0)).not.toContain('compact');
            await expect(await getElementClass(sections, 1)).toContain('compact');
            await expect(await getElementClass(sections, 0)).toContain('no-border');
        });

        it('should check navigation', async () => {
            await click(displayLinks, 0);
            const newUrl = await getCurrentUrl();
            await expect(newUrl).toContain(navUrl);
            await displayListPage.open();
        });
    });

    describe('Display List Item - declarative examples:', () => {
        it('should do basic checks', async () => {
            await checkElArrIsClickable(declarativeDisplayLinks);
            await checkElementTextValue(declarativeDisplayTitles, navTitlesArr);
            await expect(await getElementClass(declarativeSection)).not.toContain('no-border');
            await expect(await getElementClass(declarativeSection)).not.toContain('compact');
        });
    });

    describe('Orientation check:', () => {
        it('should check RTL and LTR orientation', async () => {
            await displayListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await displayListPage.saveExampleBaselineScreenshot();
            await expect(await displayListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
