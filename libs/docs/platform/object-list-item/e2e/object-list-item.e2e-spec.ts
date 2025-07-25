import {
    checkElArrIsClickable,
    checkElementDisplayed,
    checkElementText,
    click,
    elementDisplayed,
    getAttributeByName,
    getCurrentUrl,
    getElementArrayLength,
    getText,
    refreshPage,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { navUrl } from './object-list-item-contents';
import { ObjectListItemPo } from './object-list-item.po';

describe('Object list item suite:', () => {
    const objListPage = new ObjectListItemPo();
    const {
        allObjsList,
        allObjAvatars,
        allObjNumbers,
        allObjIcons,
        allObjTitles,
        allObjAttrStatusRows,
        obJListIntro,
        objListAttributes,
        objListStatuses,
        objListSelItem,
        obJListSelIntro,
        objListSelAttributes,
        objListSelStatuses,
        objSelToolbar,
        objNavLink,
        objNavList,
        objNavAttributes,
        objNavStatuses,
        objRowNavList,
        objRowNavToolbar,
        objDecIntro,
        objDecAttributes,
        objDecStatuses
    } = objListPage;

    beforeAll(async () => {
        await objListPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await objListPage.waitForRoot();
        await waitForElDisplayed(objListPage.title);
    }, 1);

    describe('Basic checks:', () => {
        it('should check basic interactions and content', async () => {
            await checkElArrIsClickable(allObjsList);
            await checkElementDisplayed(allObjAvatars);
            await checkElementDisplayed(allObjNumbers);
            await checkElementText(allObjNumbers);
            await checkElementDisplayed(allObjIcons);
            await checkElementDisplayed(allObjTitles);
            await checkElementText(allObjTitles);
            await checkElementDisplayed(allObjAttrStatusRows);
        });
    });

    describe('Object List Item examples:', () => {
        it('should check content displayed', async () => {
            await checkElementDisplayed(obJListIntro);
            await checkElementDisplayed(objListAttributes);
            await checkElementDisplayed(objListStatuses);
        });
    });

    describe('Object List Item With Row Selection examples:', () => {
        it('should check content', async () => {
            await checkElementDisplayed(obJListSelIntro);
            await checkElementDisplayed(objSelToolbar);
            await elementDisplayed(objListSelAttributes, 2);
            await elementDisplayed(objListSelStatuses, 2);
        });

        it('should check selection', async () => {
            await expect(await getText(objSelToolbar)).toBe('0 : Items selected');
            await click(objListSelItem, 0);
            await expect(await getText(objSelToolbar)).toBe('1 : Items selected');
        });
    });

    describe('Object List Item With Navigation examples:', () => {
        it('should check content', async () => {
            const linkCount = await getElementArrayLength(objNavLink);
            for (let i = 0; linkCount > i; i++) {
                await expect(await getAttributeByName(objNavLink, 'href')).not.toBe('');
            }
            await elementDisplayed(objNavAttributes, 2);
            await elementDisplayed(objNavStatuses, 2);
        });

        it('should check navigation', async () => {
            await click(objNavList);
            const currentUrl = await getCurrentUrl();
            await expect(currentUrl).toContain(navUrl);
            await objListPage.open();
        });
    });

    describe('Object List Item With Row Selection And Navigation examples:', () => {
        it('should check selection', async () => {
            await expect(await getText(objRowNavToolbar)).toContain(': is selected');
            await click(objRowNavList, 0);
            await expect(await getText(objRowNavToolbar)).toContain('fdp-list-item');
        });
    });

    describe('Object List Item In Declarative examples:', () => {
        it('should check content', async () => {
            await elementDisplayed(objDecAttributes, 0);
            await elementDisplayed(objDecStatuses, 0);
            await checkElementDisplayed(objDecIntro);
        });
    });

    describe('check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await objListPage.checkRtlSwitch();
        });
    });
});
