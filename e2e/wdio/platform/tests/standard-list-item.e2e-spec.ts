import { StandardListItemPo } from '../pages/standard-list-item.po';
import {
    checkSelectorExists,
    click,
    getAttributeByName,
    getElementArrayLength,
    getText,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import {
    linkAttr,
    secondaryAttr,
    secondaryTypes,
    toolbarTextValue
} from '../fixtures/appData/standard-list-item-contents';
import { checkElArrIsClickable, checkElementDisplayed, checkElementText } from '../../helper/assertion-helper';

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

    beforeAll(() => {
        standardListPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(standardListPage.root);
        waitForElDisplayed(standardListPage.title);
    }, 1);

    describe('Standard List Item - Border Less examples:', () => {
        it('should check border and interactions', () => {
            checkElArrIsClickable(sNoBorderList);
        });
    });

    describe('Standard List Item (ByLine)- Border Less examples:', () => {
        it('should check border and density', () => {
            checkSelectorExists(`${sNoBorderByLineAttr}[fdCompact] > .fd-list--compact`);
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
        // missed attribute "href"
        // https://github.com/SAP/fundamental-ngx/issues/7343
        xit('should check links', () => {
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
            const checkboxLength = getElementArrayLength(sMultiCheckbox);
            for (let i = 0; i < checkboxLength; i++) {
                click(sMultiCheckbox, i);
                expect(getAttributeByName(sMultiCheckbox, 'aria-selected', i)).toBe('true');
                expect(getText(sMultiToolbar)).toContain(toolbarTextValue[i]);
            }
        });
    });

    describe('Standard List Item (ByLine)- Navigation Indicator with multiselect:', () => {
        it('should check content and basic interactions', () => {
            checkElementText(sNavList);
            checkElArrIsClickable(sNavList);
            checkElArrIsClickable(sNavCheckbox);
        });

        it('should check selected item ', () => {
            const checkboxLength = getElementArrayLength(sNavCheckbox);
            for (let i = 0; i < checkboxLength; i++) {
                click(sNavCheckbox, i);
                expect(getAttributeByName(sNavCheckbox, 'aria-selected', i)).toBe('true');
            }
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
