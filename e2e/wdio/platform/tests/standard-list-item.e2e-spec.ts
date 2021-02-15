import { StandardListItemPo } from '../pages/standard-list-item.po';
import { click, getAttributeByName, getCSSPropertyByName, getElementArrayLength, getText } from '../../driver/wdio';
import StandardLinkData from '../fixtures/appData/standard-link-item-contents';
import {
    checkAttributeValueTrue,
    checkElArrIsClickable,
    checkElementDisplayed,
    checkElementText
} from '../../helper/assertion-helper';

describe('Standard List Item test suite:', function() {
    const standardListPage = new StandardListItemPo();
    const {
        sNoBorderList, sNoBorderAttr, sNoBorderByLineList, sNoBorderByLineAttr, sNoBorderAvatar, sNoBorderByLineSection,
        sFooterByLineList, sFooterByLineAvatar, sFooter, sFooterList, sFooterAttr, sGroupHeaderList, sGroupHeaderAttr,
        sGroupHeaderAvatar, sInteractiveAttr, sInteractiveList, sInteractiveLink, sInteractiveAvatar, sSecTypeAttr,
        sSecTypeList, sSecTypeAvatar, sSecTypeListItem, sMultiAttr, sMultiList, sMultiAvatar, sMultiToolbar,
        sMultiCheckbox, sInvtAttr, sInvtList, sInvtAvatar, sInvtListItem
    } = standardListPage;

    beforeAll(() => {
        standardListPage.open();
    }, 1);

    describe('Standard List Item - Border Less examples:', function() {
        it('should check border and interactions', () => {
            expect(getAttributeByName(sNoBorderAttr, StandardLinkData.noBorderAttr)).toBe('true');
            expect(getCSSPropertyByName(sNoBorderList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.noStyle);
            checkElArrIsClickable(sNoBorderList);
        });
    });

    describe('Standard List Item (ByLine)- Border Less examples:', function() {
        it('should check border and styles', () => {
            expect(getAttributeByName(sNoBorderByLineAttr, StandardLinkData.noBorderAttr))
                .toBe('true');
            expect(getCSSPropertyByName(sNoBorderByLineList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.noStyle);
            expect(getAttributeByName(sNoBorderByLineSection, StandardLinkData.compactAttr, 0))
                .toBe('false');
            expect(getAttributeByName(sNoBorderByLineSection, StandardLinkData.compactAttr, 1))
                .toBe('true');
            checkAttributeValueTrue(sNoBorderByLineAttr, StandardLinkData.byLineAltAttr);
        });

        it('should check interaction and content', () => {
            checkElArrIsClickable(sNoBorderByLineList);
            checkElementText(sNoBorderByLineList);
            checkElementDisplayed(sNoBorderAvatar);
        });
    });

    describe('Standard List Item (ByLine)- Footer examples:', function() {
        it('should check border, styles, and footer', () => {
            expect(getCSSPropertyByName(sFooterByLineList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
            checkAttributeValueTrue(sFooterAttr, StandardLinkData.byLineAttr);
            checkElementDisplayed(sFooter);
            checkElementText(sFooterList);
        });

        it('should check content and interaction', () => {
            checkElementText(sFooterByLineList);
            checkElementDisplayed(sFooterByLineAvatar);
            checkElArrIsClickable(sFooterByLineList);
        });
    });

    describe('Standard List Item (ByLine)- Group header examples:', function() {
        it('should check border and styles', () => {
            expect(getCSSPropertyByName(sGroupHeaderList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
            checkAttributeValueTrue(sGroupHeaderAttr, StandardLinkData.byLineAttr);
        });

        it('should check content and interactions', () => {
            checkElementText(sGroupHeaderList);
            checkElementDisplayed(sGroupHeaderAvatar);
            checkElArrIsClickable(sGroupHeaderList);
        });
    });

    describe('Standard List Item- Interactive state examples:', function() {
        it('should check border and styles', () => {
            expect(getCSSPropertyByName(sInteractiveList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
            checkAttributeValueTrue(sInteractiveAttr, StandardLinkData.byLineAltAttr);
            const linkCount = getElementArrayLength(sInteractiveLink);
            for (let i = 0; linkCount > i; i++) {
                expect(getAttributeByName(sInteractiveLink, StandardLinkData.linkAttr, i))
                    .not.toBe(null, '');
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

    describe('Standard List Item (ByLine)- Secondary text types examples:', function() {
        it('should check border and styles', () => {
            checkAttributeValueTrue(sSecTypeAttr, StandardLinkData.byLineAltAttr);
            expect(getCSSPropertyByName(sSecTypeList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);

        });

        it('should check content and interactions', () => {
            checkElementDisplayed(sSecTypeAvatar);
            checkElementDisplayed(sSecTypeList);
            checkElArrIsClickable(sSecTypeList);
            checkElementText(sSecTypeList);
        });

        it('should check secondary text types', () => {
            const elCount = getElementArrayLength(sSecTypeListItem);
            for (let i = 0; elCount > i; i++) {
                expect(getAttributeByName(sSecTypeListItem, StandardLinkData.secondaryAttr, i))
                    .toBe(StandardLinkData.secondaryTypes[i]);
            }
        });
    });

    describe('Standard List Item (ByLine)- Multi Selection examples:', function() {
        it('should check border and styles', () => {
            checkAttributeValueTrue(sMultiAttr, StandardLinkData.byLineAltAttr);
            expect(getCSSPropertyByName(sMultiList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
        });

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

    describe('Standard List Item (ByLine)- Inverted Secondary text types examples:', function() {
        it('should check border and styles', () => {
            if (browser.capabilities.browserName === 'internet explorer') {
                console.log('skip');
            } else {
                checkAttributeValueTrue(sInvtAttr, StandardLinkData.byLineAltAttr);
                expect(getCSSPropertyByName(sInvtList, StandardLinkData.borderAttr).value)
                    .toBe(StandardLinkData.solidStyle);
            }
        });

        it('should check content and interactions', () => {
            checkElementDisplayed(sInvtAvatar);
            checkElementDisplayed(sInvtList);
            checkElArrIsClickable(sInvtList);
            checkElementText(sInvtList);
        });

        it('should check secondary text types', () => {
            const elCount = getElementArrayLength(sInvtListItem);
            for (let i = 0; elCount > i; i++) {
                expect(getAttributeByName(sInvtListItem, StandardLinkData.secondaryAttr, i))
                    .not.toBe(null, '');
                expect(getAttributeByName(sInvtListItem, StandardLinkData.secondaryAttr, i))
                    .toBe(StandardLinkData.secondaryTypes[i]);
            }
        });
    });

    describe('Check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            standardListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            standardListPage.saveExampleBaselineScreenshot('standard-list-item', {removeElements: $(standardListPage.sFooterByLineAvatar)});
            expect(standardListPage.compareWithBaseline('standard-list-item', {removeElements: $(standardListPage.sFooterByLineAvatar)})).toEqual(0);
        });
    });
});
