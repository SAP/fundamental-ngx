import { FixedCardLayoutPo } from '../pages/fixed-card-layout.po';
import fxdCardLytData from '../fixtures/appData/fixed-card-layout-content';
import { webDriver } from '../../driver/wdio';

describe('Fixed card layout test suite', function() {
    const fxdCardLayoutPg = new FixedCardLayoutPo();

    beforeAll(() => {
        fxdCardLayoutPg.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    describe('main checks', function() {
        // TODO rework
        xit('should check spacing between cards', () => {
            const cardsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);
            const columnsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardColumnArr);

            for (let i = 0; cardsCount > i; i++) {
                const cardsMarginValue = webDriver.getCSSPropertyByName(fxdCardLayoutPg.cardDivArr, fxdCardLytData.cardSpacingValue, i);
                if (cardsMarginValue.value !== null) {
                    const arrL = webDriver.getElementArrayLength(cardsMarginValue.value);
                    expect(arrL).toEqual(cardsCount - columnsCount);
                }
            }
            // kept old protractor version to remember logic for rework:
            // const cardsMarginValue = fxdCardLayoutPg.cardDivArr.map(async element => {
            //     return await element.getCssValue(fxdCardLytData.cardSpacingAttr);
            // });
            // expect(cardsMarginValue.filter(value => value === fxdCardLytData.cardSpacingValue).length)
            //     .toEqual(cardsCount - columnsCount);
        });

        it('should check card minimum width', () => {
            const cardsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);

            for (let i = 0; cardsCount > i; i++) {
                expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.cardDivArr, fxdCardLytData.cardWidthAttr, i).value)
                    .toBe(fxdCardLytData.cardMinWidth);
            }
        });

        it('should check card can be hidden', () => {
            const cardStartCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);

            webDriver.click(fxdCardLayoutPg.hideCardBtnArr);
            const cardEndCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);
            expect(cardEndCount).toEqual(cardStartCount - 1);

            webDriver.click(fxdCardLayoutPg.hideCardBtnArr);
            const newCardEndCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);
            expect(newCardEndCount).toEqual(cardStartCount);
        });

        it('should drag a card from the header', () => {
            // skip Safari for now due to issue where mouse position resets to 0,0
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                const cardHeader = webDriver.elementArray(fxdCardLayoutPg.cardHeaderArr);
                const originalFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr);
                const cardContent = webDriver.elementArray(fxdCardLayoutPg.cardContentArr);

                webDriver.scrollIntoView(fxdCardLayoutPg.cardHeaderArr, 0);
                checkDragAndDrop(cardHeader[0], cardContent[0], cardContent[4]);
                const newText = webDriver.getText(fxdCardLayoutPg.cardDivArr);
                expect(newText).not.toBe(originalFirstCardText);
            }
        });

        it('should drag a card from the content area', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browser.capabilities.browserName === 'internet explorer' || 'firefox') {
                console.log('skip');
            } else {
                const cardContent = webDriver.elementArray(fxdCardLayoutPg.cardContentArr);
                const originalFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr);
                const cardDivArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);

                webDriver.scrollIntoView(fxdCardLayoutPg.cardDivArr, 0);
                checkDragAndDrop(cardContent[0], cardDivArr[0], cardContent[4]);
                const newText = webDriver.getText(fxdCardLayoutPg.cardDivArr);
                expect(newText).not.toBe(originalFirstCardText);
            }
        });

        it('should check drag and drop cards swap locations', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browser.capabilities.browserName === 'internet explorer' || 'firefox') {
                console.log('skip');
            } else {
                const cardContent = webDriver.elementArray(fxdCardLayoutPg.cardContentArr);
                const cards = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
                const originalFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 0);
                const originalSwapCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 4);

                webDriver.scrollIntoView(fxdCardLayoutPg.cardDivArr, 0);
                checkDragAndDrop(cardContent[0], cards[0], cardContent[4]);
                const newFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr);
                const newSwapCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 4);
                expect(newFirstCardText).not.toBe(originalFirstCardText);
                expect(newSwapCardText).not.toBe(originalSwapCardText);
            }
        });

        it('should check placeholder exists on drag', () => {
            // skip IE due to https://github.com/SAP/fundamental-ngx/issues/3882
            if (browser.capabilities.browserName === 'internet explorer') {
                console.log('skip');
            } else {
                const clickElement = webDriver.elementArray(fxdCardLayoutPg.cardContentArr);
                const cards = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
                const startLocation = cards[0];
                const endElementLocation = cards[1];

                // tslint:disable:radix
                const clickXLocation = parseInt(clickElement[0].getLocation('x'));
                const clickYLocation = parseInt(clickElement[0].getLocation('y'));
                const startXLocation = parseInt(startLocation.getLocation('x'));
                const startYLocation = parseInt(startLocation.getLocation('y'));
                const endXLocation = parseInt(endElementLocation.getLocation('x'));
                const endYLocation = parseInt(endElementLocation.getLocation('y'));

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

                expect(webDriver.elementDisplayed(fxdCardLayoutPg.placeholderCard)).toBe(true);
                expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.placeholderCard, fxdCardLytData.placeholderBorderAttr).value)
                    .toEqual(fxdCardLytData.placeholderBorderStyle);
            }
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/3910
        xit('should check columns are reactive', () => {
            const originalCardColumnsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardColumnArr);

            webDriver.click(fxdCardLayoutPg.navigationMenuBtn);
            webDriver.waitForInvisibilityOf(fxdCardLayoutPg.pageSidebar);
            const newCardColumnsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardColumnArr);
            expect(originalCardColumnsCount).not.toEqual(newCardColumnsCount);
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/3910
        xit('should check cards are reactive to columns', () => {
            const originalLastCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 8);

            webDriver.click(fxdCardLayoutPg.navigationMenuBtn, 0);
            webDriver.waitForInvisibilityOf(fxdCardLayoutPg.pageSidebar);
            const newLastCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 8);
            expect(originalLastCardText).not.toEqual(newLastCardText);
        });

        it('should check drag and drop is disabled', () => {
            const originalFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 9);
            const clickElement = webDriver.elementArray(fxdCardLayoutPg.disableDragBtn);
            const cards = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);

            webDriver.scrollIntoView(fxdCardLayoutPg.disableDragBtn);
            webDriver.click(fxdCardLayoutPg.disableDragBtn);
            checkDragAndDrop(clickElement[0], cards[9], cards[13]);
            const newFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 9);
            expect(newFirstCardText).toBe(originalFirstCardText);
        });

        describe('Check orientation', function() {
            it('should check LTR orientation', () => {
                const arrL = webDriver.getElementArrayLength(fxdCardLayoutPg.exampleAreaContainersArr);
                for (let i = 0; arrL > i; i++) {
                    expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value)
                        .toBe('ltr', 'css prop direction ');
                }
            });
        });

        it('should check RTL orientation', () => {
            const arrL = webDriver.getElementArrayLength(fxdCardLayoutPg.exampleAreaContainersArr);
            for (let i = 0; arrL > i; i++) {
                webDriver.scrollIntoView(fxdCardLayoutPg.exampleAreaContainersArr, i);
                expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value)
                    .toBe('ltr', 'css prop direction ' + i);
                const dirValueBefore = webDriver.getAttributeByName(fxdCardLayoutPg.exampleAreaContainersArr, 'dir', i);
                expect([null, '']).toContain(dirValueBefore);
                webDriver.click(fxdCardLayoutPg.rtlSwitcherArr, i);
                expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                expect(webDriver.getAttributeByName(fxdCardLayoutPg.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
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
