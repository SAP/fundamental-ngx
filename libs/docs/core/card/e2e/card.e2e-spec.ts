import { CardPo } from './card.po';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
    checkElArrIsClickable,
    checkElementText,
    checkElementTextValue,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementDisplayed,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import {
    analyticsTitle,
    badgeText,
    barChartCounterText,
    barChartItemsText,
    barChartTitleText,
    cardListItemText,
    cardSubtitleText,
    cardTitleArr,
    cardTypeAttr,
    compactAttr,
    loaderAttr,
    tableCardCountries,
    tableCardNames,
    tableCardPrices,
    tableCardStatuses,
    tableCardTitle,
    tableHeaderText
} from './card-content';

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
        ftCardFooterActionItems,
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
        barCharBars,
        calendar,
        calendarExampleContent,
        calendarExampleHeader,
        quickView,
        quickViewExampleContent,
        quickViewExampleHeader,
        list,
        listExampleContent,
        listExampleHeader,
        link,
        linkListExampleContent,
        linkListExampleHeader
    } = cardPage;

    beforeAll(async () => {
        await cardPage.open();
    }, 1);

    describe('Standard card examples:', () => {
        it('should check card header', async () => {
            await checkElArrIsClickable(cardHeader);
            await checkElementTextValue(cardTitle, cardTitleArr);
            await expect(await isElementDisplayed(cardAvatar)).toBe(true);
            await expect(await isElementDisplayed(cardCounter)).toBe(true);
            await expect(await isElementDisplayed(cardSubtitle)).toBe(true);
            await expect(await isElementDisplayed(cardBadge)).toBe(true);
            await expect(await getText(cardSubtitle)).toBe(cardSubtitleText);
            await expect(await getText(cardBadge)).toBe(badgeText);
        });

        it('should check card content', async () => {
            await checkElArrIsClickable(cardListItems);
            await checkElementText(cardListItems);
            await expect(await getAttributeByName(cardAttr, cardTypeAttr, 2)).toBe('list');
        });
    });

    describe('Compact examples:', () => {
        it('should check its compact and do basic checks', async () => {
            await expect(await getElementClass(compactCardAttr)).toBe(compactAttr);
            await checkElementText(compactCardHeader);
            await checkElementTextValue(compactCardListItems, cardListItemText);
            await checkElArrIsClickable(compactCardHeader);
            await checkElArrIsClickable(compactCardListItems);
        });
    });

    describe('Card loader examples:', () => {
        it('should check loading icon and attributes', async () => {
            await expect(await getAttributeByName(loaderCardAttr, 'title')).toBe(loaderAttr);
            await expect(await isElementDisplayed(loaderIcon)).toBe(true);
        });
    });

    describe('Card footer examples:', () => {
        it('should do basic checks', async () => {
            await checkElArrIsClickable(ftCardHeader);
            await checkElArrIsClickable(ftCardListItems);
            await checkElementTextValue(ftCardListItems, cardListItemText);
            await expect(await getText(ftCardHeader)).toBe(cardTitleArr[0]);
        });

        it('should check footer', async () => {
            await expect(await isElementDisplayed(ftFooter)).toBe(true);
            await expect(await getElementArrayLength(ftCardFooterActionItems)).toBe(3);
        });
    });

    describe('Analytical card examples:', () => {
        it('should check header', async () => {
            await scrollIntoView(kpiCardHeader);
            await checkElArrIsClickable(kpiAnalyticsHeader);
            await checkElementText(kpiCardHeader);
            await expect(await getText(kpiCardTitle)).toBe(analyticsTitle);
            await checkElementText(kpiAnalyticsHeaderIcons);
            await checkElementText(kpiHeaderSubtitle);
        });

        it('should check content', async () => {
            await expect(await isElementDisplayed(kpiCardContent)).toBe(true);
            await expect(await waitForElDisplayed(kpiCardChart)).toBe(true);
        });
    });

    describe('Table card examples:', () => {
        it('should check header', async () => {
            await checkElArrIsClickable(tableCardHeader);
            await expect(await getText(tableCardHeader)).toBe(tableCardTitle);
        });

        it('should check table content', async () => {
            await checkElementTextValue(tableCardTableHeader, tableHeaderText);
            await checkElementTextValue(tableCardItemNames, tableCardNames);
            await checkElementTextValue(tableCardItemCountries, tableCardCountries);
            await checkElementTextValue(tableCardItemPrices, tableCardPrices);
            await checkElementTextValue(tableCardItemStatuses, tableCardStatuses);
            await checkElArrIsClickable(tableCardItems);
        });
    });

    describe('Bar chart list examples:', () => {
        it('should check header', async () => {
            await checkElArrIsClickable(barChartHeader);
            await expect(await getText(barChartTitle)).toBe(barChartTitleText);
            await expect(await getText(barChartCounter)).toBe(barChartCounterText);
        });

        it('should check chart content', async () => {
            await checkElementTextValue(barChartItems, barChartItemsText);
            await expect(await isElementDisplayed(barCharBars)).toBe(true);
        });
    });

    describe('Calendar example', () => {
        it('should check that card header is displayed', async () => {
            await expect(await isElementDisplayed(calendarExampleHeader)).toBe(true);
        });

        it('should check that calendar displayed in card content', async () => {
            await expect(await isElementDisplayed(calendarExampleContent + calendar)).toBe(true);
        });

        it('should check that headers are clickable', async () => {
            await checkElArrIsClickable(calendarExampleHeader);
        });
    });

    describe('Calendar example', () => {
        it('should check that card header is displayed', async () => {
            await expect(await isElementDisplayed(quickViewExampleHeader)).toBe(true);
        });

        it('should check that calendar displayed in card content', async () => {
            await expect(await isElementDisplayed(quickViewExampleContent + quickView)).toBe(true);
        });

        it('should check that headers are clickable', async () => {
            await checkElArrIsClickable(quickViewExampleHeader);
        });
    });

    describe('List example', () => {
        it('should check that card header is displayed', async () => {
            await expect(await isElementDisplayed(listExampleHeader)).toBe(true);
        });

        it('should check that calendar displayed in card content', async () => {
            await expect(await isElementDisplayed(listExampleContent + list)).toBe(true);
        });

        it('should check that headers are clickable', async () => {
            await checkElArrIsClickable(listExampleHeader);
        });
    });

    describe('Link list example', () => {
        it('should check that card header is displayed', async () => {
            await expect(await isElementDisplayed(linkListExampleHeader)).toBe(true);
        });

        it('should check that calendar displayed in card content', async () => {
            await expect(await isElementDisplayed(linkListExampleContent + list + link)).toBe(true);
        });

        it('should check that headers are clickable', async () => {
            await checkElArrIsClickable(linkListExampleHeader);
        });
    });

    describe('Check orientation:', () => {
        it('should check LTR and RTL', async () => {
            await cardPage.checkRtlSwitch();
        });
    });
});
