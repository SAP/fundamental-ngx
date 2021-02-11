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
    const {
        cardTitle, cardHeader, cardListItems, cardAvatar, cardSubtitle, cardCounter, cardBadge, cardAttr,
        compactCardHeader, compactCardListItems, compactCardAttr, loaderCardAttr, loaderIcon, ftCardHeader,
        ftCardListItems, ftFooter, ftButtons, kpiCardHeader, kpiCardTitle, kpiAnalyticsHeaderIcons, kpiAnalyticsHeader,
        kpiHeaderSubtitle, kpiCardContent, kpiCardChart, tableCardHeader, tableCardTableHeader, tableCardItems,
        tableCardItemNames, tableCardItemCountries, tableCardItemPrices, tableCardItemStatuses, barChartHeader,
        barChartTitle, barChartCounter, barChartItems, barCharBars
    } = cardPage;

    beforeAll(() => {
        cardPage.open();
    }, 1);

    describe('Standard card examples:', function() {
        it('should check card header', () => {
            checkElArrIsClickable(cardHeader);
            checkElementTextValue(cardTitle, CardData.cardTitleArr);
            expect(isElementDisplayed(cardAvatar)).toBe(true);
            expect(isElementDisplayed(cardCounter)).toBe(true);
            expect(isElementDisplayed(cardSubtitle)).toBe(true);
            expect(isElementDisplayed(cardBadge)).toBe(true);
            expect(getText(cardSubtitle)).toBe(CardData.cardSubtitle);
            expect(getText(cardBadge)).toBe(CardData.badgeText);
        });

        it('should check card content', () => {
            checkElArrIsClickable(cardListItems);
            checkElementText(cardListItems);
            expect(getAttributeByName(cardAttr, CardData.cardTypeAttr, 2)).toBe('list');
        });
    });

    describe('Compact examples:', function() {
        it('should check its compact and do basic checks', () => {
            checkAttributeValueTrue(compactCardAttr, CardData.compactAttr);
            checkElementText(compactCardHeader);
            checkElementTextValue(compactCardListItems, CardData.cardListItemText);
            checkElArrIsClickable(compactCardHeader);
            checkElArrIsClickable(compactCardListItems);
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/4310
            if (!browserIsIE()) {
                expect(getCSSPropertyByName(compactCardListItems, CardData.fontSizeAttr).value)
                    .toBe(CardData.compactFont);
                return;
            }
            console.log('skip IE due to issue #4310');
        });
    });

    describe('Card loader examples:', function() {
        it('should check loading icon and attributes', () => {
            checkAttributeValueTrue(loaderCardAttr, CardData.loaderAttr);
            expect(isElementDisplayed(loaderIcon)).toBe(true);
        });
    });

    describe('Card footer examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(ftCardHeader);
            checkElArrIsClickable(ftCardListItems);
            checkElementTextValue(ftCardListItems, CardData.cardListItemText);
            expect(getText(ftCardHeader)).toBe(CardData.cardTitleArr[0]);
        });

        it('should check footer', () => {
            expect(isElementDisplayed(ftFooter)).toBe(true);
            checkElArrIsClickable(ftButtons);
            checkElementTextValue(ftButtons, CardData.btnText);
        });
    });

    describe('Analytical card examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(kpiAnalyticsHeader);
            checkElementText(kpiCardHeader);
            expect(getText(kpiCardTitle)).toBe(CardData.analyticsTitle);
            checkElementText(kpiAnalyticsHeaderIcons);
            checkElementText(kpiHeaderSubtitle);
        });

        it('should check content', () => {
            expect(isElementDisplayed(kpiCardContent)).toBe(true);
            expect(waitForElDisplayed(kpiCardChart)).toBe(true);
        });
    });

    describe('Table card examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(tableCardHeader);
            expect(getText(tableCardHeader)).toBe(CardData.tableCardTitle);
        });

        it('should check table content', () => {
            checkElementTextValue(tableCardTableHeader, CardData.tableHeaderText);
            checkElementTextValue(tableCardItemNames, CardData.tableCardNames);
            checkElementTextValue(tableCardItemCountries, CardData.tableCardCountries);
            checkElementTextValue(tableCardItemPrices, CardData.tableCardPrices);
            checkElementTextValue(tableCardItemStatuses, CardData.tableCardStatuses);
            checkElArrIsClickable(tableCardItems);
        });

        it('should check status colors', () => {
            const statusesCount = getElementArrayLength(tableCardItemStatuses);
            for (let i = 0; statusesCount > i; i++) {
                expect(getCSSPropertyByName(tableCardItemStatuses, CardData.colorAttr, i).value)
                    .toContain(CardData.statusColors[i]);
            }
        });
    });

    describe('Bar chart list examples:', function() {
        it('should check header', () => {
            checkElArrIsClickable(barChartHeader);
            expect(getText(barChartTitle)).toBe(CardData.barChartTitle);
            expect(getText(barChartCounter)).toBe(CardData.barChartCounter);
        });

        it('should check chart content', () => {
            checkElementTextValue(barChartItems, CardData.barChartItems);
            expect(isElementDisplayed(barCharBars)).toBe(true);
        });
    });

    describe('Check orientation:', function() {
        it('should check LTR and RTL', () => {
            cardPage.checkRtlSwitch();
        });
    });
});
