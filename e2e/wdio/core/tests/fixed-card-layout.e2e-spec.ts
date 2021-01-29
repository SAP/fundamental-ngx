import { FixedCardLayoutPo } from '../pages/fixed-card-layout.po';
import fxdCardLytData from '../fixtures/appData/fixed-card-layout-content';
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

describe('Fixed card layout test suite', function() {
    const fxdCardLayoutPg = new FixedCardLayoutPo();

    beforeAll(() => {
        fxdCardLayoutPg.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(fxdCardLayoutPg.pageHeader);
    }, 1);

    describe('main checks', function() {
        it('should check spacing between cards', () => {

            expect(getCSSPropertyByName(fxdCardLayoutPg.cardDivArr, fxdCardLytData.cardSpacingAttr).value)
                .toBe(fxdCardLytData.cardSpacingValue);
        });

        it('should check card minimum width', () => {
            const cardsCount = getElementArrayLength(fxdCardLayoutPg.cardDivArr);

            for (let i = 0; cardsCount > i; i++) {
                expect(getCSSPropertyByName(fxdCardLayoutPg.cardDivArr, fxdCardLytData.cardWidthAttr, i).value)
                    .toBe(fxdCardLytData.cardMinWidth);
            }
        });

        it('should check card can be hidden', () => {
            const cardStartCount = getElementArrayLength(fxdCardLayoutPg.cardDivArr);

            click(fxdCardLayoutPg.hideCardBtnArr);
            const cardEndCount = getElementArrayLength(fxdCardLayoutPg.cardDivArr);
            expect(cardEndCount).toEqual(cardStartCount - 1);

            click(fxdCardLayoutPg.hideCardBtnArr);
            const newCardEndCount = getElementArrayLength(fxdCardLayoutPg.cardDivArr);
            expect(newCardEndCount).toEqual(cardStartCount);
        });

        it('should drag a card from the header', () => {
            // skip Safari for now due to issue where mouse position resets to 0,0
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            const originalFirstCardText = getText(fxdCardLayoutPg.cardDivArr);

            scrollIntoView(fxdCardLayoutPg.cardHeaderArr);
            checkDragAndDrop(fxdCardLayoutPg.cardHeaderArr, fxdCardLayoutPg.cardContentArr, fxdCardLayoutPg.cardContentArr, 4);
            const newText = getText(fxdCardLayoutPg.cardDivArr);
            expect(newText).not.toBe(originalFirstCardText);
        });

        it('should drag a card from the content area', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browserIsIE()) {
                console.log('Skip IE because of #3882');
                return;
            }
            const originalFirstCardText = getText(fxdCardLayoutPg.cardDivArr);

            scrollIntoView(fxdCardLayoutPg.cardDivArr);
            checkDragAndDrop(fxdCardLayoutPg.cardContentArr, fxdCardLayoutPg.cardDivArr, fxdCardLayoutPg.cardContentArr, 4);
            const newText = getText(fxdCardLayoutPg.cardDivArr);
            expect(newText).not.toBe(originalFirstCardText);
        });

        it('should check drag and drop cards swap locations', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browserIsIE()) {
                console.log('skip IE because of #3882');
                return;
            }
            const originalFirstCardText = getText(fxdCardLayoutPg.cardDivArr);
            const originalSwapCardText = getText(fxdCardLayoutPg.cardDivArr, 4);

            scrollIntoView(fxdCardLayoutPg.cardDivArr);
            checkDragAndDrop(fxdCardLayoutPg.cardContentArr, fxdCardLayoutPg.cardDivArr, fxdCardLayoutPg.cardContentArr, 4);
            const newFirstCardText = getText(fxdCardLayoutPg.cardDivArr);
            const newSwapCardText = getText(fxdCardLayoutPg.cardDivArr, 4);
            expect(newFirstCardText).not.toBe(originalFirstCardText);
            expect(newSwapCardText).not.toBe(originalSwapCardText);
        });

        it('should check placeholder exists on drag', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browserIsIE()) {
                console.log('Skip for IE because of #3882');
                return;
            }
            scrollIntoView(fxdCardLayoutPg.cardDivArr);
            const clickElement = fxdCardLayoutPg.cardContentArr;
            const locationElement = fxdCardLayoutPg.cardDivArr;

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

            expect(elementDisplayed(fxdCardLayoutPg.placeholderCard)).toBe(true);
            expect(getCSSPropertyByName(fxdCardLayoutPg.placeholderCard, fxdCardLytData.placeholderBorderAttr).value)
                .toEqual(fxdCardLytData.placeholderBorderStyle);
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/3910
        xit('should check columns are reactive', () => {
            const originalCardColumnsCount = getElementArrayLength(fxdCardLayoutPg.cardColumnArr);

            click(fxdCardLayoutPg.navigationMenuBtn);
            waitForInvisibilityOf(fxdCardLayoutPg.pageSidebar);
            const newCardColumnsCount = getElementArrayLength(fxdCardLayoutPg.cardColumnArr);
            expect(originalCardColumnsCount).not.toEqual(newCardColumnsCount);
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/3910
        xit('should check cards are reactive to columns', () => {
            const originalLastCardText = getText(fxdCardLayoutPg.cardDivArr, 8);

            click(fxdCardLayoutPg.navigationMenuBtn, 0);
            waitForInvisibilityOf(fxdCardLayoutPg.pageSidebar);
            const newLastCardText = getText(fxdCardLayoutPg.cardDivArr, 8);
            expect(originalLastCardText).not.toEqual(newLastCardText);
        });

        it('should check drag and drop is disabled', () => {
            const originalFirstCardText = getText(fxdCardLayoutPg.disabledCardDiv);

            scrollIntoView(fxdCardLayoutPg.disableDragBtn);
            click(fxdCardLayoutPg.disableDragBtn);
            checkDragAndDrop(fxdCardLayoutPg.disabledCardContent, fxdCardLayoutPg.disabledCardDiv, fxdCardLayoutPg.disabledCardContent, 4);
            const newFirstCardText = getText(fxdCardLayoutPg.cardDivArr);
            expect(newFirstCardText).toBe(originalFirstCardText);
        });

        describe('Check orientation', function() {
            it('should check LTR and RTL orientation', () => {
                fxdCardLayoutPg.checkRtlSwitch();
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
