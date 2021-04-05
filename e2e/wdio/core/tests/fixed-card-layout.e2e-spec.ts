import { FixedCardLayoutPo } from '../pages/fixed-card-layout.po';
import {
    browserIsIE,
    browserIsIEorSafari,
    click,
    elementDisplayed,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    refreshPage,
    scrollIntoView,
    waitForInvisibilityOf,
    getElementLocation, waitForPresent
} from '../../driver/wdio';

import {cardSpacingAttr, cardMinWidth, cardSpacingValue, cardWidthAttr, placeholderBorderAttr, placeholderBorderStyle} from '../fixtures/appData/fixed-card-layout-content';

describe('Fixed card layout test suite', function() {
    const fxdCardLayoutPage = new FixedCardLayoutPo();
    const {
        hideCardBtnArr,
        cardDivArr,
        cardHeaderArr,
        cardContentArr,
        cardColumnArr,
        disableDragBtn,
        placeholderCard,
        navigationMenuBtn,
        pageSidebar,
        disabledCardContent,
        disabledCardDiv,
        pageHeader
    } = fxdCardLayoutPage;

    beforeAll(() => {
        fxdCardLayoutPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(pageHeader);
    }, 1);

    describe('main checks', function() {
        it('should check spacing between cards', () => {

            expect(getCSSPropertyByName(cardDivArr, cardSpacingAttr).value)
                .toBe(cardSpacingValue);
        });

        it('should check card minimum width', () => {
            const cardsCount = getElementArrayLength(cardDivArr);

            for (let i = 0; cardsCount > i; i++) {
                expect(getCSSPropertyByName(cardDivArr, cardWidthAttr, i).value)
                    .toBe(cardMinWidth);
            }
        });

        it('should check card can be hidden', () => {
            const cardStartCount = getElementArrayLength(cardDivArr);

            click(hideCardBtnArr);
            const cardEndCount = getElementArrayLength(cardDivArr);
            expect(cardEndCount).toEqual(cardStartCount - 1);

            click(hideCardBtnArr);
            const newCardEndCount = getElementArrayLength(cardDivArr);
            expect(newCardEndCount).toEqual(cardStartCount);
        });

        it('should drag a card from the header', () => {
            // skip Safari for now due to issue where mouse position resets to 0,0
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            const originalFirstCardText = getText(cardDivArr);

            scrollIntoView(cardHeaderArr);
            checkDragAndDrop(cardHeaderArr, cardContentArr, cardContentArr, 4);
            const newText = getText(cardDivArr);
            expect(newText).not.toBe(originalFirstCardText);
        });

        it('should drag a card from the content area', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browserIsIE()) {
                console.log('Skip IE because of #3882');
                return;
            }
            const originalFirstCardText = getText(cardDivArr);

            scrollIntoView(cardDivArr);
            checkDragAndDrop(cardContentArr, cardDivArr, cardContentArr, 4);
            const newText = getText(cardDivArr);
            expect(newText).not.toBe(originalFirstCardText);
        });

        it('should check drag and drop cards swap locations', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browserIsIE()) {
                console.log('skip IE because of #3882');
                return;
            }
            const originalFirstCardText = getText(cardDivArr);
            const originalSwapCardText = getText(cardDivArr, 4);

            scrollIntoView(cardDivArr);
            checkDragAndDrop(cardContentArr, cardDivArr, cardContentArr, 4);
            const newFirstCardText = getText(cardDivArr);
            const newSwapCardText = getText(cardDivArr, 4);
            expect(newFirstCardText).not.toBe(originalFirstCardText);
            expect(newSwapCardText).not.toBe(originalSwapCardText);
        });

        it('should check placeholder exists on drag', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browserIsIE()) {
                console.log('Skip for IE because of #3882');
                return;
            }
            scrollIntoView(cardDivArr);
            const clickElement = cardContentArr;
            const locationElement = cardDivArr;

            // tslint:disable:radix
            const clickXLocation = Math.floor(getElementLocation(clickElement, 0, 'x'));
            const clickYLocation = Math.floor(getElementLocation(clickElement, 0, 'y'));
            const startXLocation = Math.floor(getElementLocation(locationElement, 0, 'x'));
            const startYLocation = Math.floor(getElementLocation(locationElement, 0, 'y'));
            const endXLocation = Math.floor(getElementLocation(locationElement, 4, 'x'));
            const endYLocation = Math.floor(getElementLocation(locationElement, 4, 'y'));

            browser.performActions([{
                'type': 'pointer',
                'id': 'pointer1',
                'parameters': { 'pointerType': 'mouse' },
                'actions': [
                    { 'type': 'pointerMove', 'duration': 0, 'x': clickXLocation, 'y': clickYLocation },
                    { 'type': 'pointerDown', 'button': 0 },
                    { 'type': 'pause', 'duration': 600 },
                    { 'type': 'pointerMove', 'duration': 600, 'x': startXLocation, 'y': startYLocation },
                    { 'type': 'pointerMove', 'duration': 1000, 'x': endXLocation + 30, 'y': endYLocation + 30 }
                ]
            }]);

            expect(elementDisplayed(placeholderCard)).toBe(true);
            expect(getCSSPropertyByName(placeholderCard, placeholderBorderAttr).value)
                .toEqual(placeholderBorderStyle);
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/3910
        xit('should check columns are reactive', () => {
            const originalCardColumnsCount = getElementArrayLength(cardColumnArr);

            click(navigationMenuBtn);
            waitForInvisibilityOf(pageSidebar);
            const newCardColumnsCount = getElementArrayLength(cardColumnArr);
            expect(originalCardColumnsCount).not.toEqual(newCardColumnsCount);
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/3910
        xit('should check cards are reactive to columns', () => {
            const originalLastCardText = getText(cardDivArr, 8);

            click(navigationMenuBtn, 0);
            waitForInvisibilityOf(pageSidebar);
            const newLastCardText = getText(cardDivArr, 8);
            expect(originalLastCardText).not.toEqual(newLastCardText);
        });

        it('should check drag and drop is disabled', () => {
            const originalFirstCardText = getText(disabledCardDiv);

            scrollIntoView(disableDragBtn);
            click(disableDragBtn);
            checkDragAndDrop(disabledCardContent, disabledCardDiv, disabledCardContent, 4);
            const newFirstCardText = getText(cardDivArr);
            expect(newFirstCardText).toBe(originalFirstCardText);
        });

        describe('Check orientation', function() {
            it('should check LTR and RTL orientation', () => {
                fxdCardLayoutPage.checkRtlSwitch();
            });
        });

        describe('Check visual regression', function() {
            it('should check examples visual regression', () => {
                fxdCardLayoutPage.saveExampleBaselineScreenshot();
                expect(fxdCardLayoutPage.compareWithBaseline()).toBeLessThan(3);
            });
        });
    });

    function checkDragAndDrop(clickElement, startLocation, endLocation, endLocationIndex): void {
        // tslint:disable:radix
        const clickXLocation = Math.floor(getElementLocation(clickElement, 0, 'x'));
        const clickYLocation = Math.floor(getElementLocation(clickElement, 0, 'y'));
        const startXLocation = Math.floor(getElementLocation(startLocation, 0, 'x'));
        const startYLocation = Math.floor(getElementLocation(startLocation, 0, 'y'));
        const endXLocation = Math.floor(getElementLocation(endLocation, endLocationIndex, 'x'));
        const endYLocation = Math.floor(getElementLocation(endLocation, endLocationIndex, 'y'));

        browser.performActions([{
            'type': 'pointer',
            'id': 'pointer1',
            'parameters': { 'pointerType': 'mouse' },
            'actions': [
                { 'type': 'pointerMove', 'duration': 200, 'x': clickXLocation, 'y': clickYLocation },
                { 'type': 'pointerDown', 'button': 0 },
                { 'type': 'pause', 'duration': 600 },
                { 'type': 'pointerMove', 'duration': 600, 'x': startXLocation, 'y': startYLocation },
                { 'type': 'pointerMove', 'duration': 1000, 'x': endXLocation + 40, 'y': endYLocation + 40 },
                { 'type': 'pointerUp', 'button': 0 }
            ]
        }]);
    }
});
