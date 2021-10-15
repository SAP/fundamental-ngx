import { CardPo } from '../pages/card.po';
import {
    isElementDisplayed,
    getAttributeByName,
    getText,
    waitForElDisplayed,
    getElementClass,
    scrollIntoView
} from '../../driver/wdio';
import { checkElArrIsClickable, checkElementText, checkElementTextValue } from '../../helper/assertion-helper';
import {
    cardTitleArr,
    compactAttr,
    analyticsTitle,
    badgeText,
    barChartCounterText,
    barChartItemsText,
    barChartTitleText,
    btnText,
    cardListItemText,
    cardSubtitleText,
    cardTypeAttr,
    loaderAttr,
    tableCardCountries,
    tableCardNames,
    tableCardPrices,
    tableCardStatuses,
    tableCardTitle,
    tableHeaderText
} from '../fixtures/appData/card-content';

describe('Card test suite:', () => {
    const cardPage = new CardPo();
    const {
        cardTitle,
        cardHeader,
        cardListItems,
        cardAvatar,
        cardSubtitle,
        cardCounter,
        cardBadge,
        cardAttr,
        compactCardHeader,
        compactCardListItems,
        compactCardAttr,
        loaderCardAttr,
        loaderIcon,
        ftCardHeader,
        ftCardListItems,
        ftFooter,
        ftButtons,
        kpiCardHeader,
        kpiCardTitle,
        kpiAnalyticsHeaderIcons,
        kpiAnalyticsHeader,
        kpiHeaderSubtitle,
        kpiCardContent,
        kpiCardChart,
        tableCardHeader,
        tableCardTableHeader,
        tableCardItems,
        tableCardItemNames,
        tableCardItemCountries,
        tableCardItemPrices,
        tableCardItemStatuses,
        barChartHeader,
        barChartTitle,
        barChartCounter,
        barChartItems,
        barCharBars
    } = cardPage;

    beforeAll(() => {
        cardPage.open();
    }, 1);

    describe('Standard card examples:', () => {
        it('should check card header', () => {
            checkElArrIsClickable(cardHeader);
            checkElementTextValue(cardTitle, cardTitleArr);
            expect(isElementDisplayed(cardAvatar)).toBe(true);
            expect(isElementDisplayed(cardCounter)).toBe(true);
            expect(isElementDisplayed(cardSubtitle)).toBe(true);
            expect(isElementDisplayed(cardBadge)).toBe(true);
            expect(getText(cardSubtitle)).toBe(cardSubtitleText);
            expect(getText(cardBadge)).toBe(badgeText);
        });

        it('should check card content', () => {
            checkElArrIsClickable(cardListItems);
            checkElementText(cardListItems);
            expect(getAttributeByName(cardAttr, cardTypeAttr, 2)).toBe('list');
        });
    });

    describe('Compact examples:', () => {
        it('should check its compact and do basic checks', () => {
            expect(getElementClass(compactCardAttr)).toBe(compactAttr);
            checkElementText(compactCardHeader);
            checkElementTextValue(compactCardListItems, cardListItemText);
            checkElArrIsClickable(compactCardHeader);
            checkElArrIsClickable(compactCardListItems);
        });
    });

    describe('Card loader examples:', () => {
        it('should check loading icon and attributes', () => {
            expect(getAttributeByName(loaderCardAttr, 'title')).toBe(loaderAttr);
            expect(isElementDisplayed(loaderIcon)).toBe(true);
        });
    });

    describe('Card footer examples:', () => {
        it('should do basic checks', () => {
            checkElArrIsClickable(ftCardHeader);
            checkElArrIsClickable(ftCardListItems);
            checkElementTextValue(ftCardListItems, cardListItemText);
            expect(getText(ftCardHeader)).toBe(cardTitleArr[0]);
        });

        it('should check footer', () => {
            expect(isElementDisplayed(ftFooter)).toBe(true);
            checkElArrIsClickable(ftButtons);
            checkElementTextValue(ftButtons, btnText);
        });
    });

    describe('Analytical card examples:', () => {
        it('should check header', () => {
            scrollIntoView(kpiCardHeader);
            checkElArrIsClickable(kpiAnalyticsHeader);
            checkElementText(kpiCardHeader);
            expect(getText(kpiCardTitle)).toBe(analyticsTitle);
            checkElementText(kpiAnalyticsHeaderIcons);
            checkElementText(kpiHeaderSubtitle);
        });

        it('should check content', () => {
            expect(isElementDisplayed(kpiCardContent)).toBe(true);
            expect(waitForElDisplayed(kpiCardChart)).toBe(true);
        });
    });

    describe('Table card examples:', () => {
        it('should check header', () => {
            checkElArrIsClickable(tableCardHeader);
            expect(getText(tableCardHeader)).toBe(tableCardTitle);
        });

        it('should check table content', () => {
            checkElementTextValue(tableCardTableHeader, tableHeaderText);
            checkElementTextValue(tableCardItemNames, tableCardNames);
            checkElementTextValue(tableCardItemCountries, tableCardCountries);
            checkElementTextValue(tableCardItemPrices, tableCardPrices);
            checkElementTextValue(tableCardItemStatuses, tableCardStatuses);
            checkElArrIsClickable(tableCardItems);
        });
    });

    describe('Bar chart list examples:', () => {
        it('should check header', () => {
            checkElArrIsClickable(barChartHeader);
            expect(getText(barChartTitle)).toBe(barChartTitleText);
            expect(getText(barChartCounter)).toBe(barChartCounterText);
        });

        it('should check chart content', () => {
            checkElementTextValue(barChartItems, barChartItemsText);
            expect(isElementDisplayed(barCharBars)).toBe(true);
        });
    });

    describe('Check orientation:', () => {
        it('should check LTR and RTL', () => {
            cardPage.checkRtlSwitch();
        });
    });
});
