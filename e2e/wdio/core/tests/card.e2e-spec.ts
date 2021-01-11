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
    const cardPg = new CardPo();

    beforeAll(() => {
        cardPg.open();
    });

    describe('Standard card examples:', function() {
        it('should check card header', () => {
            checkElArrIsClickable(cardPg.cardHeader);
            checkElementTextValue(cardPg.cardTitle, CardData.cardTitleArr);
            expect(isElementDisplayed(cardPg.cardAvatar)).toBe(true);
            expect(isElementDisplayed(cardPg.cardCounter)).toBe(true);
            expect(isElementDisplayed(cardPg.cardSubtitle)).toBe(true);
            expect(isElementDisplayed(cardPg.cardBadge)).toBe(true);
            expect(getText(cardPg.cardSubtitle)).toBe(CardData.cardSubtitle);
            expect(getText(cardPg.cardBadge)).toBe(CardData.badgeText);
        });

        it('should check card content', () => {
            checkElArrIsClickable(cardPg.cardListItems);
            checkElementText(cardPg.cardListItems);
            expect(getAttributeByName(cardPg.cardAttr, CardData.cardTypeAttr, 2)).toBe('list');
        });
    });

    describe('Compact examples:', function() {
        it('should check its compact and do basic checks', () => {
            checkAttributeValueTrue(cardPg.compactCardAttr, CardData.compactAttr);
            checkElementText(cardPg.compactCardHeader);
            checkElementTextValue(cardPg.compactCardListItems, CardData.cardListItemText);
            checkElArrIsClickable(cardPg.compactCardHeader);
            checkElArrIsClickable(cardPg.compactCardListItems);
            if (!browserIsIE()) {
                expect(getCSSPropertyByName(cardPg.compactCardListItems, CardData.fontSizeAttr).value)
                    .toBe(CardData.compactFont);
            }
        });
    });

    describe('Card loader examples:', function() {
        it('should check loading icon and attributes', () => {
            checkAttributeValueTrue(cardPg.loaderCardAttr, CardData.loaderAttr);
            expect(isElementDisplayed(cardPg.loaderIcon)).toBe(true);
        });
    });

    describe('Card footer examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(cardPg.ftCardHeader);
            checkElArrIsClickable(cardPg.ftCardListItems);
            checkElementTextValue(cardPg.ftCardListItems, CardData.cardListItemText);
            expect(getText(cardPg.ftCardHeader)).toBe(CardData.cardTitleArr[0]);
        });

        it('should check footer', () => {
            expect(isElementDisplayed(cardPg.ftFooter)).toBe(true);
            checkElArrIsClickable(cardPg.ftButtons);
            checkElementTextValue(cardPg.ftButtons, CardData.btnText);
        });
    });

    describe('Analytical card examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPg.kpiAnalyticsHeader);
            checkElementText(cardPg.kpiCardHeader);
            expect(getText(cardPg.kpiCardTitle)).toBe(CardData.analyticsTitle);
            checkElementText(cardPg.kpiAnalyticsHeaderIcons);
            checkElementText(cardPg.kpiHeaderSubtitle);
        });

        it('should check content', () => {
            expect(isElementDisplayed(cardPg.kpiCardContent)).toBe(true);
            expect(waitForElDisplayed(cardPg.kpiCardChart)).toBe(true);
        });
    });

    describe('Table card examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPg.tableCardHeader);
            expect(getText(cardPg.tableCardHeader)).toBe(CardData.tableCardTitle);
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
            const statusesCount = getElementArrayLength(cardPg.tableCardItemStatuses);
            for (let i = 0; statusesCount > i; i++) {
                expect(getCSSPropertyByName(cardPg.tableCardItemStatuses, CardData.colorAttr, i).value)
                    .toContain(CardData.statusColors[i]);
            }
        });
    });

    describe('Bar chart list examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(cardPg.barChartHeader);
            expect(getText(cardPg.barChartTitle)).toBe(CardData.barChartTitle);
            expect(getText(cardPg.barChartCounter)).toBe(CardData.barChartCounter);
        });

        it('should check chart content', () => {
            checkElementTextValue(cardPg.barChartItems, CardData.barChartItems);
            expect(isElementDisplayed(cardPg.barCharBars)).toBe(true);
        });
    });

    describe('Check orientation:', function() {
        it('should check LTR and RTL', () => {
            cardPg.checkRtlSwitch(cardPg.rtlSwitcherArr, cardPg.exampleAreaContainersArr);
        });
    });
});
