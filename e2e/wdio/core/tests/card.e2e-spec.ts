import { CardPo } from '../pages/card.po';
import {
    isElementDisplayed,
    getAttributeByName,
    getText,
    browserIsIE,
    getCSSPropertyByName,
    waitForElDisplayed,
    getElementArrayLength
} from '../../driver/wdio';
import { checkAttributeValueTrue, checkElArrIsClickable, checkElementText, checkElementTextValue } from '../../helper/assertion-helper';
import CardData from '../fixtures/appData/card-content';

describe('Card test suite:', function() {
    const cardPage = new CardPo();

    beforeAll(() => {
        cardPage.open();
    }, 1);

    describe('Standard card examples:', function() {
        it('should check card header', () => {
            checkElArrIsClickable(cardPage.cardHeader);
            checkElementTextValue(cardPage.cardTitle, CardData.cardTitleArr);
            expect(isElementDisplayed(cardPage.cardAvatar)).toBe(true);
            expect(isElementDisplayed(cardPage.cardCounter)).toBe(true);
            expect(isElementDisplayed(cardPage.cardSubtitle)).toBe(true);
            expect(isElementDisplayed(cardPage.cardBadge)).toBe(true);
            expect(getText(cardPage.cardSubtitle)).toBe(CardData.cardSubtitle);
            expect(getText(cardPage.cardBadge)).toBe(CardData.badgeText);
        });

        it('should check card content', () => {
            checkElArrIsClickable(cardPage.cardListItems);
            checkElementText(cardPage.cardListItems);
            expect(getAttributeByName(cardPage.cardAttr, CardData.cardTypeAttr, 2)).toBe('list');
        });
    });

    describe('Compact examples:', function() {
        it('should check its compact and do basic checks', () => {
            checkAttributeValueTrue(cardPage.compactCardAttr, CardData.compactAttr);
            checkElementText(cardPage.compactCardHeader);
            checkElementTextValue(cardPage.compactCardListItems, CardData.cardListItemText);
            checkElArrIsClickable(cardPage.compactCardHeader);
            checkElArrIsClickable(cardPage.compactCardListItems);
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/4310
            if (!browserIsIE()) {
                expect(getCSSPropertyByName(cardPage.compactCardListItems, CardData.fontSizeAttr).value)
                    .toBe(CardData.compactFont);
                return;
            }
            console.log('skip IE due to issue #4310');
        });
    });

    describe('Card loader examples:', function() {
        it('should check loading icon and attributes', () => {
            checkAttributeValueTrue(cardPage.loaderCardAttr, CardData.loaderAttr);
            expect(isElementDisplayed(cardPage.loaderIcon)).toBe(true);
        });
    });

    describe('Card footer examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(cardPage.ftCardHeader);
            checkElArrIsClickable(cardPage.ftCardListItems);
            checkElementTextValue(cardPage.ftCardListItems, CardData.cardListItemText);
            expect(getText(cardPage.ftCardHeader)).toBe(CardData.cardTitleArr[0]);
        });

        it('should check footer', () => {
            expect(isElementDisplayed(cardPage.ftFooter)).toBe(true);
            checkElArrIsClickable(cardPage.ftButtons);
            checkElementTextValue(cardPage.ftButtons, CardData.btnText);
        });
    });

    describe('Analytical card examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPage.kpiAnalyticsHeader);
            checkElementText(cardPage.kpiCardHeader);
            expect(getText(cardPage.kpiCardTitle)).toBe(CardData.analyticsTitle);
            checkElementText(cardPage.kpiAnalyticsHeaderIcons);
            checkElementText(cardPage.kpiHeaderSubtitle);
        });

        it('should check content', () => {
            expect(isElementDisplayed(cardPage.kpiCardContent)).toBe(true);
            expect(waitForElDisplayed(cardPage.kpiCardChart)).toBe(true);
        });
    });

    describe('Table card examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPage.tableCardHeader);
            expect(getText(cardPage.tableCardHeader)).toBe(CardData.tableCardTitle);
        });

        it('should check table content', () => {
            checkElementTextValue(cardPage.tableCardTableHeader, CardData.tableHeaderText);
            checkElementTextValue(cardPage.tableCardItemNames, CardData.tableCardNames);
            checkElementTextValue(cardPage.tableCardItemCountries, CardData.tableCardCountries);
            checkElementTextValue(cardPage.tableCardItemPrices, CardData.tableCardPrices);
            checkElementTextValue(cardPage.tableCardItemStatuses, CardData.tableCardStatuses);
            checkElArrIsClickable(cardPage.tableCardItems);
        });

        it('should check status colors', () => {
            const statusesCount = getElementArrayLength(cardPage.tableCardItemStatuses);
            for (let i = 0; statusesCount > i; i++) {
                expect(getCSSPropertyByName(cardPage.tableCardItemStatuses, CardData.colorAttr, i).value)
                    .toContain(CardData.statusColors[i]);
            }
        });
    });

    describe('Bar chart list examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPage.barChartHeader);
            expect(getText(cardPage.barChartTitle)).toBe(CardData.barChartTitle);
            expect(getText(cardPage.barChartCounter)).toBe(CardData.barChartCounter);
        });

        it('should check chart content', () => {
            checkElementTextValue(cardPage.barChartItems, CardData.barChartItems);
            expect(isElementDisplayed(cardPage.barCharBars)).toBe(true);
        });
    });

    describe('Check orientation:', function() {
        it('should check LTR and RTL', () => {
            cardPage.checkRtlSwitch();
        });
    });
});
