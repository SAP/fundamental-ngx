import { FixedCardLayoutPo } from '../pages/fixed-card-layout.po';
import fxdCardLytData from '../fixtures/appData/fixed-card-layout-content';
import { webDriver } from '../../driver/wdio';
import { browser } from 'protractor';


describe('fixed card layout test suite', function () {
    const fxdCardLayoutPg = new FixedCardLayoutPo();


    beforeAll(() => {
        fxdCardLayoutPg.open();
    });

    afterEach(() => {
        browser.refresh();
    });

    describe('main checks', function() {

        it('should check spacing between cards', () => {
            const cardsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);
            const columnsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardColumnArr);

            // TODO
            const cardsMarginValue = fxdCardLayoutPg.cardDivArr.map(async element => {
                return await element.getCssValue(fxdCardLytData.cardSpacingAttr);
            });
            expect(cardsMarginValue.filter(value => value === fxdCardLytData.cardSpacingValue).length)
                .toEqual(cardsCount - columnsCount);
        });

        it('should check card minimum width', () => {
            const cardsDivArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
// TODO
            cardsDivArr.forEach(element => {
                expect(element.getCssValue(fxdCardLytData.cardWidthAttr)).toEqual(fxdCardLytData.cardMinWidth);
            });
        });

        it('should check card can be hidden', () => {
            const hideCardBtnArr = webDriver.elementArray(fxdCardLayoutPg.hideCardBtnArr);
            const cardStartCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);

            hideCardBtnArr[0].click().then(() => {
                const cardEndCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);
                expect(cardEndCount).toEqual(cardStartCount - 1);
            });

            hideCardBtnArr[0].click().then(async () => {
                const cardEndCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardDivArr);
                expect(cardEndCount).toEqual(cardStartCount);
            });
        });

        it('should drag a card from the header', () => {
          //  const cardHeaderArr = webDriver.elementArray(fxdCardLayoutPg.cardHeaderArr);
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const firstCardHeader = fxdCardLayoutPg.cardHeaderArr;
            const originalFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr);
            const firstCard = fxdCardLayoutPg.cardDivArr;
            const fourthCard = cardsArr[3];

            checkDragAndDrop(firstCardHeader, firstCard, fourthCard, originalFirstCardText);
        });

        it('should drag a card from the content area', () => {
        //    const cardContentArr = webDriver.elementArray(fxdCardLayoutPg.cardContentArr);
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const firstCardContent = fxdCardLayoutPg.cardContentArr;
            const originalFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr);
            const firstCard = fxdCardLayoutPg.cardDivArr;
            const fourthCard = cardsArr[3];

            checkDragAndDrop(firstCardContent, firstCard, fourthCard, originalFirstCardText);
        });

        it('should check drag and drop cards swap locations', () => {
            const cardHeaderArr = webDriver.elementArray(fxdCardLayoutPg.cardHeaderArr);
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const firstCardHeader = cardHeaderArr[0];
            const originalFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 5000, 0);
            const originalFourthCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 5000, 3);
            const firstCard = cardsArr[0];
            const fourthCard = cardsArr[3];
// TODO
            await driver.actions().mouseDown(firstCardHeader).perform().then(async () => {
                await driver.sleep(300).then(async () => {
                    await driver.actions().mouseMove(firstCard)
                        .mouseMove(fourthCard).perform().then(async () => {
                            await driver.actions().mouseUp().perform().then(async () => {
                                const newCardsArr = await fxdCardLayoutPg.cardDivArr;
                                const newFirstCardText = await newCardsArr[0].getText();
                                const newFourthCardText = await newCardsArr[3].getText();

                                await expect(newFirstCardText).toEqual(originalFourthCardText);
                                await expect(newFourthCardText).toEqual(originalFirstCardText);
                            });
                        });
                });
            });
        });

        it('should check placeholder exists on drag', () => {
            const cardHeaderArr = webDriver.elementArray(fxdCardLayoutPg.cardHeaderArr);
            const firstCardHeader = cardHeaderArr[0];
            const secondCardHeader = cardHeaderArr[1];

            webDriver.mouseHoverElement(firstCardHeader);
            webDriver.mouseButtonDown(firstCardHeader);
            browser.pause(300);
            webDriver.mouseHoverElement(firstCardHeader);
            webDriver.mouseHoverElement(secondCardHeader);
            expect(webDriver.elementDisplayed(fxdCardLayoutPg.placeholderCard)).toBe(true);
            expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.placeholderCard, fxdCardLytData.placeholderBorderAttr).value)
                .toEqual(fxdCardLytData.placeholderBorderStyle);
        });

        it('should check columns are reactive', () => {
            const originalCardColumnsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardColumnArr);

            webDriver.click(fxdCardLayoutPg.navigationMenuBtn);
            webDriver.waitForInvisibilityOf(fxdCardLayoutPg.pageSidebar);
            const newCardColumnsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardColumnArr);
            expect(originalCardColumnsCount).not.toEqual(newCardColumnsCount);
        });

        it('should check cards are reactive to columns', () => {
            const originalLastCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 5000, 8);

            webDriver.click(fxdCardLayoutPg.navigationMenuBtn);
            webDriver.waitForInvisibilityOf(fxdCardLayoutPg.pageSidebar);
            const newLastCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 5000, 8);
            expect(originalLastCardText).not.toEqual(newLastCardText);
        });

        it('should check drag and drop is disabled', () => {
            const cardHeaderArr = webDriver.elementArray(fxdCardLayoutPg.cardHeaderArr);
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const originalFirstCardText = webDriver.getText(fxdCardLayoutPg.cardDivArr, 5000, 9);
            const firstCardHeader = cardHeaderArr[9];
            const firstCard = cardsArr[9];
            const fourthCard = cardsArr[12];

// TODO

            await webDriver.click(fxdCardLayoutPg.disableDragBtn);
            await driver.actions().mouseDown(firstCardHeader).perform().then(async () => {
                await driver.sleep(300);
                await driver.actions().mouseMove(firstCard)
                    .mouseMove(fourthCard).perform().then(async () => {
                        await driver.actions().mouseUp().perform().then(async () => {
                            const newCardsArr = await fxdCardLayoutPg.cardDivArr;
                            const newFirstCardText = await newCardsArr[9].getText();

                            await expect(newFirstCardText).toEqual(originalFirstCardText);
                        });
                    });
            });
        });
    });

    describe('Check orientation', function() {
        it('should check LTR orientation', () => {
            const arrL = webDriver.getElementArrayLength(fxdCardLayoutPg.exampleAreaContainersArr);
            for (let i = 0; arrL > i; i++) {
                expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ');
            }
        });

        it('should check RTL orientation', () => {
            const arrL = webDriver.getElementArrayLength(fxdCardLayoutPg.exampleAreaContainersArr);
            for (let i = 0; arrL > i; i++) {
                webDriver.scrollIntoView(fxdCardLayoutPg.exampleAreaContainersArr, 5000, i);
                expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
                const dirValueBefore = webDriver.getAttributeByName(fxdCardLayoutPg.exampleAreaContainersArr, 'dir', i);
                expect([null, '']).toContain(dirValueBefore);
                webDriver.click(fxdCardLayoutPg.rtlSwitcherArr, 5000, i);
                expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                expect(webDriver.getAttributeByName(fxdCardLayoutPg.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
            }
        });
    });


    // TODO
    // checkDragAndDrop(clickElement, startElementLocation, endElementLocation, originalText) {
    //         driver.actions().mouseDown(clickElement).perform().then(async () => {
    //             driver.sleep(300);
    //             driver.actions().mouseMove(startElementLocation)
    //                 .mouseMove(endElementLocation).perform().then(() => {
    //                     driver.actions().mouseUp().perform().then(() => {
    //                         const newCardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
    //                         const newFirstCardText = newCardsArr[0].getText();
    //
    //                         expect(newFirstCardText).not.toEqual(originalText);
    //                     });
    //                 });
    //         });
    // }

    function checkDragAndDrop(clickElement, startElementLocation, endElementLocation, originalText): any {
        webDriver.mouseHoverElement(clickElement);
        webDriver.mouseButtonDown(clickElement);
        browser.pause(300);
        // first mouseHoverElement is to show start location. Did like this because that's how it worked on Protractor
        webDriver.mouseHoverElement(startElementLocation);
        webDriver.mouseHoverElement(endElementLocation);
        webDriver.mouseButtonUp();
        const newText = webDriver.getText(fxdCardLayoutPg.cardDivArr);
        expect(newText).not.toBe(originalText);
    }
});
