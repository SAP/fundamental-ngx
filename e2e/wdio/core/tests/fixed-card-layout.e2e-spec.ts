import { FixedCardLayoutPo } from '../pages/fixed-card-layout.po';
import fxdCardLytData from '../fixtures/appData/fixed-card-layout-content';
import {
    browserIsIE,
    browserIsIEorSafari,
    click,
    elementArray,
    elementDisplayed,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    refreshPage,
    scrollIntoView,
    waitForInvisibilityOf
} from '../../driver/wdio';

describe('Fixed card layout test suite', function() {
    const fxdCardLayoutPg = new FixedCardLayoutPo();

    beforeAll(() => {
        fxdCardLayoutPg.open();
    });

    afterEach(() => {
        refreshPage();
    });

    describe('main checks', function() {
        // TODO rework
        xit('should check spacing between cards', () => {
            // const cardsCount = getElementArrayLength(fxdCardLayoutPg.cardDivArr);
            // const columnsCount = getElementArrayLength(fxdCardLayoutPg.cardColumnArr);
            //
            // for (let i = 0; cardsCount > i; i++) {
            //     const cardsMarginValue = getCSSPropertyByName(fxdCardLayoutPg.cardDivArr, fxdCardLytData.cardSpacingValue, i);
            //     if (cardsMarginValue.value !== null) {
            //         const arrL = getElementArrayLength(cardsMarginValue.value);
            //         expect(arrL).toEqual(cardsCount - columnsCount);
            //     }
            // }
            // kept old protractor version to remember logic for rework:
            // const cardsMarginValue = fxdCardLayoutPg.cardDivArr.map(async element => {
            //     return await element.getCssValue(fxdCardLytData.cardSpacingAttr);
            // });
            // expect(cardsMarginValue.filter(value => value === fxdCardLytData.cardSpacingValue).length)
            //     .toEqual(cardsCount - columnsCount);
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
            if (!browserIsIEorSafari()) {
                const cardHeader = elementArray(fxdCardLayoutPg.cardHeaderArr);
                const originalFirstCardText = getText(fxdCardLayoutPg.cardDivArr);
                const cardContent = elementArray(fxdCardLayoutPg.cardContentArr);

                scrollIntoView(fxdCardLayoutPg.cardHeaderArr, 0);
                checkDragAndDrop(cardHeader[0], cardContent[0], cardContent[4]);
                const newText = getText(fxdCardLayoutPg.cardDivArr);
                expect(newText).not.toBe(originalFirstCardText);
                return;
            }
            console.log('Skip for Safari and IE');
        });
        // TODO: Need to be fixed for FF
        xit('should drag a card from the content area', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (!browserIsIEorSafari()) {
                const cardContent = elementArray(fxdCardLayoutPg.cardContentArr);
                const originalFirstCardText = getText(fxdCardLayoutPg.cardDivArr);
                const cardDivArr = elementArray(fxdCardLayoutPg.cardDivArr);

                scrollIntoView(fxdCardLayoutPg.cardDivArr, 0);
                checkDragAndDrop(cardContent[0], cardDivArr[0], cardContent[4]);
                const newText = getText(fxdCardLayoutPg.cardDivArr);
                expect(newText).not.toBe(originalFirstCardText);
                return;
            }
            console.log('Skip for Safari and IE');
        });
        // TODO: Unskip after fix
        xit('should check drag and drop cards swap locations', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (!browserIsIEorSafari()) {
                const cardContent = elementArray(fxdCardLayoutPg.cardContentArr);
                const cards = elementArray(fxdCardLayoutPg.cardDivArr);
                const originalFirstCardText = getText(fxdCardLayoutPg.cardDivArr, 0);
                const originalSwapCardText = getText(fxdCardLayoutPg.cardDivArr, 4);

                scrollIntoView(fxdCardLayoutPg.cardDivArr, 0);
                checkDragAndDrop(cardContent[0], cards[0], cardContent[4]);
                const newFirstCardText = getText(fxdCardLayoutPg.cardDivArr);
                const newSwapCardText = getText(fxdCardLayoutPg.cardDivArr, 4);
                expect(newFirstCardText).not.toBe(originalFirstCardText);
                expect(newSwapCardText).not.toBe(originalSwapCardText);
                return;
            }
            console.log('Firefox for Safari and IE');
        });

        it('should check placeholder exists on drag', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (!browserIsIE()) {
                const clickElement = elementArray(fxdCardLayoutPg.cardContentArr);
                const cards = elementArray(fxdCardLayoutPg.cardDivArr);
                const startLocation = cards[0];
                const endElementLocation = cards[1];

                // tslint:disable:radix
                const clickXLocation = clickElement[0].getLocation('x');
                const clickYLocation = clickElement[0].getLocation('y');
                const startXLocation = startLocation.getLocation('x');
                const startYLocation = startLocation.getLocation('y');
                const endXLocation = endElementLocation.getLocation('x');
                const endYLocation = endElementLocation.getLocation('y');

                browser.performActions([{
                    'type': 'pointer',
                    'id': 'pointer1',
                    'parameters': { 'pointerType': 'mouse' },
                    'actions': [
                        { 'type': 'pointerMove', 'duration': 0, 'x': clickXLocation, 'y': clickYLocation },
                        { 'type': 'pointerDown', 'button': 0 },
                        { 'type': 'pause', 'duration': 600 },
                        { 'type': 'pointerMove', 'duration': 600, 'x': startXLocation, 'y': startYLocation },
                        { 'type': 'pointerMove', 'duration': 1000, 'x': endXLocation, 'y': endYLocation }
                    ]
                }]);

                expect(elementDisplayed(fxdCardLayoutPg.placeholderCard)).toBe(true);
                expect(getCSSPropertyByName(fxdCardLayoutPg.placeholderCard, fxdCardLytData.placeholderBorderAttr).value)
                    .toEqual(fxdCardLytData.placeholderBorderStyle);
                return;
            }
            console.log('Skip for IE');
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
            const originalFirstCardText = getText(fxdCardLayoutPg.cardDivArr, 9);
            const clickElement = elementArray(fxdCardLayoutPg.disableDragBtn);
            const cards = elementArray(fxdCardLayoutPg.cardDivArr);

            scrollIntoView(fxdCardLayoutPg.disableDragBtn);
            click(fxdCardLayoutPg.disableDragBtn);
            checkDragAndDrop(clickElement[0], cards[9], cards[13]);
            const newFirstCardText = getText(fxdCardLayoutPg.cardDivArr, 9);
            expect(newFirstCardText).toBe(originalFirstCardText);
        });

        describe('Check orientation', function() {
            it('should check LTR orientation', () => {
                const arrL = getElementArrayLength(fxdCardLayoutPg.exampleAreaContainersArr);
                for (let i = 0; arrL > i; i++) {
                    expect(getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value)
                        .toBe('ltr', 'css prop direction ');
                }
            });
        });

        it('should check RTL orientation', () => {
            const arrL = getElementArrayLength(fxdCardLayoutPg.exampleAreaContainersArr);
            for (let i = 0; arrL > i; i++) {
                scrollIntoView(fxdCardLayoutPg.exampleAreaContainersArr, i);
                expect(getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value)
                    .toBe('ltr', 'css prop direction ' + i);
                const dirValueBefore = getAttributeByName(fxdCardLayoutPg.exampleAreaContainersArr, 'dir', i);
                expect([null, '']).toContain(dirValueBefore);
                click(fxdCardLayoutPg.rtlSwitcherArr, i);
                expect(getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                expect(getAttributeByName(fxdCardLayoutPg.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
            }
        });
    });

    function checkDragAndDrop(clickElement, startLocation, endElementLocation): any {
        // tslint:disable:radix
        const clickXLocation = parseInt(clickElement.getLocation('x'));
        const clickYLocation = parseInt(clickElement.getLocation('y'));
        const startXLocation = parseInt(startLocation.getLocation('x'));
        const startYLocation = parseInt(startLocation.getLocation('y'));
        const endXLocation = parseInt(endElementLocation.getLocation('x'));
        const endYLocation = parseInt(endElementLocation.getLocation('y'));

        browser.performActions([{
            'type': 'pointer',
            'id': 'pointer1',
            'parameters': { 'pointerType': 'mouse' },
            'actions': [
                { 'type': 'pointerMove', 'duration': 200, 'x': clickXLocation, 'y': clickYLocation },
                { 'type': 'pointerDown', 'button': 0 },
                { 'type': 'pause', 'duration': 600 },
                { 'type': 'pointerMove', 'duration': 600, 'x': startXLocation, 'y': startYLocation },
                { 'type': 'pointerMove', 'duration': 1000, 'x': endXLocation + 5, 'y': endYLocation + 5 },
                { 'type': 'pointerUp', 'button': 0 }
            ]
        }]);
    }
});
