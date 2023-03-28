import { StandardListItemPo } from './standard-list-item.po';
import {
    checkElArrIsClickable,
    checkElementDisplayed,
    checkElementText,
    checkSelectorExists,
    click,
    getAttributeByName,
    getElementArrayLength,
    getText,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { linkAttr, secondaryAttr, secondaryTypes, toolbarTextValue } from './standard-list-item-contents';

describe('Standard List Item test suite:', () => {
    const standardListPage = new StandardListItemPo();
    const {
        sNoBorderList,
        sNoBorderByLineList,
        sNoBorderByLineAttr,
        sNoBorderAvatar,
        sFooterByLineList,
        sFooterByLineAvatar,
        sFooter,
        sFooterList,
        sGroupHeaderList,
        sGroupHeaderAvatar,
        sInteractiveList,
        sInteractiveLink,
        sInteractiveAvatar,
        sSecTypeList,
        sSecTypeAvatar,
        sSecTypeListItem,
        sMultiList,
        sMultiAvatar,
        sMultiToolbar,
        sMultiCheckbox,
        sInvtList,
        sInvtAvatar,
        sInvtListItem,
        sNavList,
        sNavCheckbox
    } = standardListPage;

    beforeAll(async () => {
        await standardListPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(standardListPage.root);
        await waitForElDisplayed(standardListPage.title);
    }, 1);

    describe('Standard List Item - Border Less examples:', () => {
        it('should check border and interactions', async () => {
            await checkElArrIsClickable(sNoBorderList);
        });
    });

    describe('Standard List Item (ByLine)- Border Less examples:', () => {
        it('should check border and density', async () => {
            await checkSelectorExists(`${sNoBorderByLineAttr}[fdCompact] > .fd-list.is-compact`);
        });

        it('should check interaction and content', async () => {
            await checkElArrIsClickable(sNoBorderByLineList);
            await checkElementText(sNoBorderByLineList);
            await checkElementDisplayed(sNoBorderAvatar);
        });
    });

    describe('Standard List Item (ByLine)- Footer examples:', () => {
        it('should check border and footer', async () => {
            await checkElementDisplayed(sFooter);
            await checkElementText(sFooterList);
        });

        it('should check content and interaction', async () => {
            await checkElementText(sFooterByLineList);
            await checkElementDisplayed(sFooterByLineAvatar);
            await checkElArrIsClickable(sFooterByLineList);
        });
    });

    describe('Standard List Item (ByLine)- Group header examples:', () => {
        it('should check content and interactions', async () => {
            await checkElementText(sGroupHeaderList);
            await checkElementDisplayed(sGroupHeaderAvatar);
            await checkElArrIsClickable(sGroupHeaderList);
        });
    });

    describe('Standard List Item- Interactive state examples:', () => {
        // missed attribute "href"
        // https://github.com/SAP/fundamental-ngx/issues/7343
        xit('should check links', async () => {
            const linkCount = await getElementArrayLength(sInteractiveLink);
            for (let i = 0; linkCount > i; i++) {
                await expect(await getAttributeByName(sInteractiveLink, linkAttr, i)).not.toBe('');
            }
        });

        it('should check content and interactions', async () => {
            await checkElementDisplayed(sInteractiveList);
            await checkElementDisplayed(sInteractiveLink);
            await checkElementDisplayed(sInteractiveAvatar);
            await checkElArrIsClickable(sInteractiveList);
            await checkElArrIsClickable(sInteractiveLink);
            await checkElementText(sInteractiveList);
        });
    });

    describe('Standard List Item (ByLine)- Secondary text types examples:', () => {
        it('should check content and interactions', async () => {
            await checkElementDisplayed(sSecTypeAvatar);
            await checkElementDisplayed(sSecTypeList);
            await checkElArrIsClickable(sSecTypeList);
            await checkElementText(sSecTypeList);
        });

        it('should check secondary text types', async () => {
            const elCount = await getElementArrayLength(sSecTypeListItem);
            for (let i = 0; elCount > i; i++) {
                await expect(await getAttributeByName(sSecTypeListItem, secondaryAttr, i)).toBe(secondaryTypes[i]);
            }
        });
    });

    describe('Standard List Item (ByLine)- Multi Selection examples:', () => {
        it('should check content and basic interactions', async () => {
            await checkElementDisplayed(sMultiAvatar);
            await checkElementDisplayed(sMultiList);
            await checkElementText(sMultiList);
            await checkElementDisplayed(sMultiToolbar);
            await checkElementText(sMultiToolbar);
            await checkElArrIsClickable(sMultiList);
            await checkElArrIsClickable(sMultiCheckbox);
        });

        it('should check selected item count is displayed in the toolbar', async () => {
            await expect(await getText(sMultiToolbar)).toContain('0 : Items selected');
            const checkboxLength = await getElementArrayLength(sMultiCheckbox);
            for (let i = 0; i < checkboxLength; i++) {
                await click(sMultiCheckbox, i);
                await expect(await getAttributeByName(sMultiCheckbox, 'aria-selected', i)).toBe('true');
                await expect(await getText(sMultiToolbar)).toContain(toolbarTextValue[i]);
            }
        });
    });

    describe('Standard List Item (ByLine)- Navigation Indicator with multiselect:', () => {
        it('should check content and basic interactions', async () => {
            await checkElementText(sNavList);
            await checkElArrIsClickable(sNavList);
            await checkElArrIsClickable(sNavCheckbox);
        });

        it('should check selected item ', async () => {
            const checkboxLength = await getElementArrayLength(sNavCheckbox);
            for (let i = 0; i < checkboxLength; i++) {
                await click(sNavCheckbox, i);
                await expect(await getAttributeByName(sNavCheckbox, 'aria-selected', i)).toBe('true');
            }
        });
    });

    describe('Standard List Item (ByLine)- Inverted Secondary text types examples:', () => {
        it('should check content and interactions', async () => {
            await checkElementDisplayed(sInvtAvatar);
            await checkElementDisplayed(sInvtList);
            await checkElArrIsClickable(sInvtList);
            await checkElementText(sInvtList);
        });

        it('should check secondary text types', async () => {
            const elCount = await getElementArrayLength(sInvtListItem);
            for (let i = 0; elCount > i; i++) {
                await expect(await getAttributeByName(sInvtListItem, secondaryAttr, i)).not.toBe('');
                await expect(await getAttributeByName(sInvtListItem, secondaryAttr, i)).toBe(secondaryTypes[i]);
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await standardListPage.checkRtlSwitch();
        });
    });
});
