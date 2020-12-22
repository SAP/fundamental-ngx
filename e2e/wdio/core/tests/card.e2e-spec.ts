import { CardPo } from '../pages/card.po';
import { webDriver } from '../../driver/wdio';
import { checkAttributeValueTrue, checkElArrIsClickable, checkElementText, checkElementTextValue } from '../../helper/assertion-helper';
import CardData from '../fixtures/appData/card-content';

describe('Card test suite:', function() {
    const cardPg = new CardPo();

    beforeAll(() => {
        cardPg.open();
    });

    describe('Standard card examples:', function() {
        it('should check card header', () => {
            checkElArrIsClickable(cardPg.cardHeader);
            checkElementTextValue(cardPg.cardTitle, CardData.cardTitleArr);
            expect(webDriver.isElementDisplayed(cardPg.cardAvatar)).toBe(true);
            expect(webDriver.isElementDisplayed(cardPg.cardCounter)).toBe(true);
            expect(webDriver.isElementDisplayed(cardPg.cardSubtitle)).toBe(true);
            expect(webDriver.isElementDisplayed(cardPg.cardBadge)).toBe(true);
            expect(webDriver.getText(cardPg.cardSubtitle)).toBe(CardData.cardSubtitle);
            expect(webDriver.getText(cardPg.cardBadge)).toBe(CardData.badgeText);
        });

        it('should check card content', () => {
            checkElArrIsClickable(cardPg.cardListItems);
            checkElementText(cardPg.cardListItems);
            expect(webDriver.getAttributeByName(cardPg.cardAttr, CardData.cardTypeAttr, 2)).toBe('list');
        });
    });

    describe('Compact examples:', function() {
        it('should check its compact and do basic checks', () => {
            checkAttributeValueTrue(cardPg.compactCardAttr, CardData.compactAttr);
            checkElementText(cardPg.compactCardHeader);
            checkElementTextValue(cardPg.compactCardListItems, CardData.cardListItemText);
            checkElArrIsClickable(cardPg.compactCardHeader);
            checkElArrIsClickable(cardPg.compactCardListItems);
            if (webDriver.browserIsIE()) {
                console.log('skip');
            } else {
                expect(webDriver.getCSSPropertyByName(cardPg.compactCardListItems, CardData.fontSizeAttr).value)
                    .toBe(CardData.compactFont);
            }
        });
    });

    describe('Card loader examples:', function() {
        it('should check loading icon and attributes', () => {
            checkAttributeValueTrue(cardPg.loaderCardAttr, CardData.loaderAttr);
            expect(webDriver.isElementDisplayed(cardPg.loaderIcon)).toBe(true);
        });
    });

    describe('Card footer examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(cardPg.ftCardHeader);
            checkElArrIsClickable(cardPg.ftCardListItems);
            checkElementTextValue(cardPg.ftCardListItems, CardData.cardListItemText);
            expect(webDriver.getText(cardPg.ftCardHeader)).toBe(CardData.cardTitleArr[0]);
        });

        it('should check footer', () => {
            expect(webDriver.isElementDisplayed(cardPg.ftFooter)).toBe(true);
            checkElArrIsClickable(cardPg.ftButtons);
            checkElementTextValue(cardPg.ftButtons, CardData.btnText);
        });
    });

    describe('Analytical card examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPg.kpiAnalyticsHeader);
            checkElementText(cardPg.kpiCardHeader);
            expect(webDriver.getText(cardPg.kpiCardTitle)).toBe(CardData.analyticsTitle);
            checkElementText(cardPg.kpiAnalyticsHeaderIcons);
            checkElementText(cardPg.kpiHeaderSubtitle);
        });

        it('should check content', () => {
            // TODO fix/skip for IE
            expect(webDriver.isElementDisplayed(cardPg.kpiCardContent)).toBe(true);
            expect(webDriver.waitForElDisplayed(cardPg.kpiCardChart)).toBe(true);
        });
    });

    describe('Table card examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPg.tableCardHeader);
            expect(webDriver.getText(cardPg.tableCardHeader)).toBe(CardData.tableCardTitle);
        });

        it('should check table content', () => {
            checkElementTextValue(cardPg.tableCardTableHeader, CardData.tableHeaderText);
            checkElementTextValue(cardPg.tableCardItemNames, CardData.tableCardNames);
            checkElementTextValue(cardPg.tableCardItemCountries, CardData.tableCardCountries);
            checkElementTextValue(cardPg.tableCardItemPrices, CardData.tableCardPrices);
            checkElementTextValue(cardPg.tableCardItemStatuses, CardData.tableCardStatuses);
            checkElArrIsClickable(cardPg.tableCardItems);
        });

        it('should check status colors', () => {
            const statusesCount = webDriver.getElementArrayLength(cardPg.tableCardItemStatuses);
            for (let i = 0; statusesCount > i; i++) {
                expect(webDriver.getCSSPropertyByName(cardPg.tableCardItemStatuses, CardData.colorAttr, i).value)
                    .toContain(CardData.statusColors[i]);
            }
        });
    });

    describe('Bar chart list examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPg.barChartHeader);
            expect(webDriver.getText(cardPg.barChartTitle)).toBe(CardData.barChartTitle);
            expect(webDriver.getText(cardPg.barChartCounter)).toBe(CardData.barChartCounter);
        });

        it('should check chart content', () => {
            checkElementTextValue(cardPg.barChartItems, CardData.barChartItems);
            expect(webDriver.isElementDisplayed(cardPg.barCharBars)).toBe(true);
        });
    });

    describe('Check orientation:', function() {
        it('should check LTR and RTL', () => {
            cardPg.checkRtlSwitch(cardPg.rtlSwitcherArr, cardPg.exampleAreaContainersArr);
        });
    });
});
