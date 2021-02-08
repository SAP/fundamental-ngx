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
    const standardListPg = new StandardListItemPo();

    beforeAll(() => {
        standardListPg.open();
    }, 1);

    describe('Standard List Item - Border Less examples:', function() {
        it('should check border and interactions', () => {
            expect(getAttributeByName(standardListPg.sNoBorderAttr, StandardLinkData.noBorderAttr)).toBe('true');
            expect(getCSSPropertyByName(standardListPg.sNoBorderList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.noStyle);
            checkElArrIsClickable(standardListPg.sNoBorderList);
        });
    });

    describe('Standard List Item (ByLine)- Border Less examples:', function() {
        it('should check border and styles', () => {
            expect(getAttributeByName(standardListPg.sNoBorderByLineAttr, StandardLinkData.noBorderAttr))
                .toBe('true');
            expect(getCSSPropertyByName(standardListPg.sNoBorderByLineList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.noStyle);
            expect(getAttributeByName(standardListPg.sNoBorderByLineSection, StandardLinkData.compactAttr, 0))
                .toBe('false');
            expect(getAttributeByName(standardListPg.sNoBorderByLineSection, StandardLinkData.compactAttr, 1))
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
            expect(getCSSPropertyByName(standardListPg.sFooterByLineList, StandardLinkData.borderAttr).value)
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
            expect(getCSSPropertyByName(standardListPg.sGroupHeaderList, StandardLinkData.borderAttr).value)
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
            expect(getCSSPropertyByName(standardListPg.sInteractiveList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);
            checkAttributeValueTrue(standardListPg.sInteractiveAttr, StandardLinkData.byLineAltAttr);
            const linkCount = getElementArrayLength(standardListPg.sInteractiveLink);
            for (let i = 0; linkCount > i; i++) {
                expect(getAttributeByName(standardListPg.sInteractiveLink, StandardLinkData.linkAttr, i))
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
            expect(getCSSPropertyByName(standardListPg.sSecTypeList, StandardLinkData.borderAttr).value)
                .toBe(StandardLinkData.solidStyle);

        });

        it('should check content and interactions', () => {
            checkElementDisplayed(standardListPg.sSecTypeAvatar);
            checkElementDisplayed(standardListPg.sSecTypeList);
            checkElArrIsClickable(standardListPg.sSecTypeList);
            checkElementText(standardListPg.sSecTypeList);
        });

        it('should check secondary text types', () => {
            const elCount = getElementArrayLength(standardListPg.sSecTypeListItem);
            for (let i = 0; elCount > i; i++) {
                expect(getAttributeByName(standardListPg.sSecTypeListItem, StandardLinkData.secondaryAttr, i))
                    .toBe(StandardLinkData.secondaryTypes[i]);
            }
        });
    });

    describe('Standard List Item (ByLine)- Multi Selection examples:', function() {
        it('should check border and styles', () => {
            checkAttributeValueTrue(standardListPg.sMultiAttr, StandardLinkData.byLineAltAttr);
            expect(getCSSPropertyByName(standardListPg.sMultiList, StandardLinkData.borderAttr).value)
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
            expect(getText(standardListPg.sMultiToolbar)).toContain('0 : Items selected');
            click(standardListPg.sMultiCheckbox, 0);
            expect(getAttributeByName(standardListPg.sMultiCheckbox, 'aria-selected')).toBe('true');
            expect(getText(standardListPg.sMultiToolbar)).toContain('1 : Items selected');
        });
    });

    describe('Standard List Item (ByLine)- Inverted Secondary text types examples:', function() {
        it('should check border and styles', () => {
            if (browser.capabilities.browserName === 'internet explorer') {
                console.log('skip');
            } else {
                checkAttributeValueTrue(standardListPg.sInvtAttr, StandardLinkData.byLineAltAttr);
                expect(getCSSPropertyByName(standardListPg.sInvtList, StandardLinkData.borderAttr).value)
                    .toBe(StandardLinkData.solidStyle);
            }
        });

        it('should check content and interactions', () => {
            checkElementDisplayed(standardListPg.sInvtAvatar);
            checkElementDisplayed(standardListPg.sInvtList);
            checkElArrIsClickable(standardListPg.sInvtList);
            checkElementText(standardListPg.sInvtList);
        });

        it('should check secondary text types', () => {
            const elCount = getElementArrayLength(standardListPg.sInvtListItem);
            for (let i = 0; elCount > i; i++) {
                expect(getAttributeByName(standardListPg.sInvtListItem, StandardLinkData.secondaryAttr, i))
                    .not.toBe(null, '');
                expect(getAttributeByName(standardListPg.sInvtListItem, StandardLinkData.secondaryAttr, i))
                    .toBe(StandardLinkData.secondaryTypes[i]);
            }
        });
    });

    describe('Check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            standardListPg.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            standardListPg.saveExampleBaselineScreenshot('standard-list-item', {removeElements: $(standardListPg.sFooterByLineAvatar)});
            expect(standardListPg.compareWithBaseline('standard-list-item', {removeElements: $(standardListPg.sFooterByLineAvatar)})).toEqual(0);
        });
    });
});
