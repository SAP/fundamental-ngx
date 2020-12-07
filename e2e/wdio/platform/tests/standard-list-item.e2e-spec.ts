import { StandardListItemPo } from '../pages/standard-list-item.po';
import { webDriver } from '../../driver/wdio';
import StandardLinkData from '../fixtures/appData/standard-link-item-contents';
import { checkElementDisplayed, checkElementText, checkAttributeValueTrue, checkElArrIsClickable } from '../../helper/assertion-helper';

describe('Standard List Item test suite:', function() {
    const standardListPg = new StandardListItemPo();

    beforeAll(() => {
        standardListPg.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    describe('Standard List Item - Border Less examples:', function() {
        it('should check border and interactions', () => {
            expect(webDriver.getAttributeByName(standardListPg.sNoBorderAttr, StandardLinkData.noBorderAttr)).toBe('true');
            expect(webDriver.getCSSPropertyByName(standardListPg.sNoBorderList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.noStyle);
            checkElArrIsClickable(standardListPg.sNoBorderList);
        });
    });

    describe('Standard List Item (ByLine)- Border Less examples:', function() {
        it('should check border and styles', () => {
            expect(webDriver.getAttributeByName(standardListPg.sNoBorderByLineAttr, StandardLinkData.noBorderAttr))
                .toBe('true');
            expect(webDriver.getCSSPropertyByName(standardListPg.sNoBorderByLineList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.noStyle);
            expect(webDriver.getAttributeByName(standardListPg.sNoBorderByLineSection, StandardLinkData.compactAttr, 0))
                .toBe('false');
            expect(webDriver.getAttributeByName(standardListPg.sNoBorderByLineSection, StandardLinkData.compactAttr, 1))
                .toBe('true');
            checkAttributeValueTrue(standardListPg.sNoBorderByLineAttr, StandardLinkData.byLineAltAttr);
        });

        it('should check interaction and content', () => {
            checkElArrIsClickable(standardListPg.sNoBorderByLineList);
            checkElementText(standardListPg.sNoBorderByLineList);
            checkElementDisplayed(standardListPg.sNoBorderAvatar);
        });
    });

    describe('Standard List Item (ByLine)- Footer examples:', function() {
        it('should check border, styles, and footer', () => {
            expect(webDriver.getCSSPropertyByName(standardListPg.sFooterByLineList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
            checkAttributeValueTrue(standardListPg.sFooterAttr, StandardLinkData.byLineAttr);
            checkElementDisplayed(standardListPg.sFooter);
            checkElementText(standardListPg.sFooterList);
        });

        it('should check content and interaction', () => {
            checkElementText(standardListPg.sFooterByLineList);
            checkElementDisplayed(standardListPg.sFooterByLineAvatar);
            checkElArrIsClickable(standardListPg.sFooterByLineList);
        });
    });

    describe('Standard List Item (ByLine)- Group header examples:', function() {
        it('should check border and styles', () => {
            expect(webDriver.getCSSPropertyByName(standardListPg.sGroupHeaderList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
            checkAttributeValueTrue(standardListPg.sGroupHeaderAttr, StandardLinkData.byLineAttr);
        });

        it('should check content and interactions', () => {
            checkElementText(standardListPg.sGroupHeaderList);
            checkElementDisplayed(standardListPg.sGroupHeaderAvatar);
            checkElArrIsClickable(standardListPg.sGroupHeaderList);
        });
    });

    describe('Standard List Item- Interactive state examples:', function() {
        it('should check border and styles', () => {
            expect(webDriver.getCSSPropertyByName(standardListPg.sInteractiveList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
            checkAttributeValueTrue(standardListPg.sInteractiveAttr, StandardLinkData.byLineAltAttr);
            const linkCount = webDriver.getElementArrayLength(standardListPg.sInteractiveLink);
            for (let i = 0; linkCount > i; i++) {
                expect(webDriver.getAttributeByName(standardListPg.sInteractiveLink, StandardLinkData.linkAttr, i))
                    .not.toBe(null, '');
            }
        });

        it('should check content and interactions', () => {
            checkElementDisplayed(standardListPg.sInteractiveList);
            checkElementDisplayed(standardListPg.sInteractiveLink);
            checkElementDisplayed(standardListPg.sInteractiveAvatar);
            checkElArrIsClickable(standardListPg.sInteractiveList);
            checkElArrIsClickable(standardListPg.sInteractiveLink);
            checkElementText(standardListPg.sInteractiveList);
        });
    });

    describe('Standard List Item (ByLine)- Secondary text types examples:', function() {
        it('should check border and styles', () => {
            checkAttributeValueTrue(standardListPg.sSecTypeAttr, StandardLinkData.byLineAltAttr);
            expect(webDriver.getCSSPropertyByName(standardListPg.sSecTypeList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);

        });

        it('should check content and interactions', () => {
            checkElementDisplayed(standardListPg.sSecTypeAvatar);
            checkElementDisplayed(standardListPg.sSecTypeList);
            checkElArrIsClickable(standardListPg.sSecTypeList);
            checkElementText(standardListPg.sSecTypeList);
        });

        it('should check secondary text types', () => {
            const elCount = webDriver.getElementArrayLength(standardListPg.sSecTypeListItem);
            for (let i = 0; elCount > i; i++) {
                expect(webDriver.getAttributeByName(standardListPg.sSecTypeListItem, StandardLinkData.secondaryAttr, i))
                    .not.toBe(null, '');
                expect(webDriver.getAttributeByName(standardListPg.sSecTypeListItem, StandardLinkData.secondaryAttr, i))
                    .toBe(StandardLinkData.secondaryTypes[i]);
            }
        });
    });

    describe('Standard List Item (ByLine)- Multi Selection examples:', function() {
        it('should check border and styles', () => {
            checkAttributeValueTrue(standardListPg.sMultiAttr, StandardLinkData.byLineAltAttr);
            expect(webDriver.getCSSPropertyByName(standardListPg.sMultiList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
        });

        it('should check content and basic interactions', () => {
            checkElementDisplayed(standardListPg.sMultiAvatar);
            checkElementDisplayed(standardListPg.sMultiList);
            checkElementText(standardListPg.sMultiList);
            checkElementDisplayed(standardListPg.sMultiToolbar);
            checkElementText(standardListPg.sMultiToolbar);
            checkElArrIsClickable(standardListPg.sMultiList);
            checkElArrIsClickable(standardListPg.sMultiCheckbox);
        });

        it('should check selected item count is displayed in the toolbar', () => {
            webDriver.scrollIntoView(standardListPg.sMultiCheckbox);
            expect(webDriver.getText(standardListPg.sMultiToolbar)).toContain('0 : Items selected');
            webDriver.click(standardListPg.sMultiCheckbox);
            expect(webDriver.getAttributeByName(standardListPg.sMultiCheckbox, 'aria-checked')).toBe('true');
            expect(webDriver.getText(standardListPg.sMultiToolbar)).toContain('1 : Items selected');
        });
    });

    describe('Standard List Item (ByLine)- Inverted Secondary text types examples:', function() {
        it('should check border and styles', () => {
            checkAttributeValueTrue(standardListPg.sInvtAttr, StandardLinkData.byLineAltAttr);
            expect(webDriver.getCSSPropertyByName(standardListPg.sInvtList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
        });

        it('should check content and interactions', () => {
            checkElementDisplayed(standardListPg.sInvtAvatar);
            checkElementDisplayed(standardListPg.sInvtList);
            checkElArrIsClickable(standardListPg.sInvtList);
            checkElementText(standardListPg.sInvtList);
        });

        it('should check secondary text types', () => {
            const elCount = webDriver.getElementArrayLength(standardListPg.sInvtListItem);
            for (let i = 0; elCount > i; i++) {
                expect(webDriver.getAttributeByName(standardListPg.sInvtListItem, StandardLinkData.secondaryAttr, i))
                    .not.toBe(null, '');
                expect(webDriver.getAttributeByName(standardListPg.sInvtListItem, StandardLinkData.secondaryAttr, i))
                    .toBe(StandardLinkData.secondaryTypes[i]);
            }
        });
    });

    describe('Check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            const areas = webDriver.elementArray(standardListPg.exampleAreaContainersArr);
            const switchers = webDriver.elementArray(standardListPg.rtlSwitcherArr);
            for (let i = 0; i < areas.length; i++) {
                switchers[i].click();
                expect(webDriver.getAttributeByName(standardListPg.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
                expect(webDriver.getCSSPropertyByName(standardListPg.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                switchers[i].click();
                expect(webDriver.getAttributeByName(standardListPg.exampleAreaContainersArr, 'dir', i)).toBe('ltr');
                expect(webDriver.getCSSPropertyByName(standardListPg.exampleAreaContainersArr, 'direction', i).value).toBe('ltr');
            }
        });
    });
});
