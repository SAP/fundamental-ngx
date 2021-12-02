import { StandardListItemPo } from '../pages/standard-list-item.po';
import { click, getAttributeByName, getElementArrayLength, getText } from '../../driver/wdio';
import { linkAttr, noBorderAttr, secondaryAttr, secondaryTypes } from '../fixtures/appData/standard-list-item-contents';
import { checkElArrIsClickable, checkElementDisplayed, checkElementText } from '../../helper/assertion-helper';

describe('Standard List Item test suite:', () => {
    const standardListPage = new StandardListItemPo();
    const {
        sNoBorderList,
        sNoBorderAttr,
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
        sInvtListItem
    } = standardListPage;

    beforeAll(() => {
        standardListPage.open();
    }, 1);

    describe('Standard List Item - Border Less examples:', () => {
        it('should check border and interactions', () => {
            expect(getAttributeByName(sNoBorderAttr, noBorderAttr)).toBe('true');
            checkElArrIsClickable(sNoBorderList);
        });
    });

    describe('Standard List Item (ByLine)- Border Less examples:', () => {
        it('should check border and density', () => {
            expect(getAttributeByName(sNoBorderByLineAttr, noBorderAttr)).toBe('true');
            expect(getAttributeByName(sNoBorderByLineAttr, 'contentdensity', 1)).toBe('compact');
        });

        it('should check interaction and content', () => {
            checkElArrIsClickable(sNoBorderByLineList);
            checkElementText(sNoBorderByLineList);
            checkElementDisplayed(sNoBorderAvatar);
        });
    });

    describe('Standard List Item (ByLine)- Footer examples:', () => {
        it('should check border and footer', () => {
            checkElementDisplayed(sFooter);
            checkElementText(sFooterList);
        });

        it('should check content and interaction', () => {
            checkElementText(sFooterByLineList);
            checkElementDisplayed(sFooterByLineAvatar);
            checkElArrIsClickable(sFooterByLineList);
        });
    });

    describe('Standard List Item (ByLine)- Group header examples:', () => {
        it('should check content and interactions', () => {
            checkElementText(sGroupHeaderList);
            checkElementDisplayed(sGroupHeaderAvatar);
            checkElArrIsClickable(sGroupHeaderList);
        });
    });

    describe('Standard List Item- Interactive state examples:', () => {
        it('should check links', () => {
            const linkCount = getElementArrayLength(sInteractiveLink);
            for (let i = 0; linkCount > i; i++) {
                expect(getAttributeByName(sInteractiveLink, linkAttr, i)).not.toBe(null, '');
            }
        });

        it('should check content and interactions', () => {
            checkElementDisplayed(sInteractiveList);
            checkElementDisplayed(sInteractiveLink);
            checkElementDisplayed(sInteractiveAvatar);
            checkElArrIsClickable(sInteractiveList);
            checkElArrIsClickable(sInteractiveLink);
            checkElementText(sInteractiveList);
        });
    });

    describe('Standard List Item (ByLine)- Secondary text types examples:', () => {
        it('should check content and interactions', () => {
            checkElementDisplayed(sSecTypeAvatar);
            checkElementDisplayed(sSecTypeList);
            checkElArrIsClickable(sSecTypeList);
            checkElementText(sSecTypeList);
        });

        it('should check secondary text types', () => {
            const elCount = getElementArrayLength(sSecTypeListItem);
            for (let i = 0; elCount > i; i++) {
                expect(getAttributeByName(sSecTypeListItem, secondaryAttr, i)).toBe(secondaryTypes[i]);
            }
        });
    });

    describe('Standard List Item (ByLine)- Multi Selection examples:', () => {
        it('should check content and basic interactions', () => {
            checkElementDisplayed(sMultiAvatar);
            checkElementDisplayed(sMultiList);
            checkElementText(sMultiList);
            checkElementDisplayed(sMultiToolbar);
            checkElementText(sMultiToolbar);
            checkElArrIsClickable(sMultiList);
            checkElArrIsClickable(sMultiCheckbox);
        });

        it('should check selected item count is displayed in the toolbar', () => {
            expect(getText(sMultiToolbar)).toContain('0 : Items selected');
            click(sMultiCheckbox, 0);
            expect(getAttributeByName(sMultiCheckbox, 'aria-selected')).toBe('true');
            expect(getText(sMultiToolbar)).toContain('1 : Items selected');
        });
    });

    describe('Standard List Item (ByLine)- Inverted Secondary text types examples:', () => {
        it('should check content and interactions', () => {
            checkElementDisplayed(sInvtAvatar);
            checkElementDisplayed(sInvtList);
            checkElArrIsClickable(sInvtList);
            checkElementText(sInvtList);
        });

        it('should check secondary text types', () => {
            const elCount = getElementArrayLength(sInvtListItem);
            for (let i = 0; elCount > i; i++) {
                expect(getAttributeByName(sInvtListItem, secondaryAttr, i)).not.toBe(null, '');
                expect(getAttributeByName(sInvtListItem, secondaryAttr, i)).toBe(secondaryTypes[i]);
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            standardListPage.checkRtlSwitch();
        });
    });
});
