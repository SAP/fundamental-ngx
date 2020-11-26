import { FixedCardLayoutPo } from '../pages/fixed-card-layout.po';
import fxdCardLytData from '../fixtures/appData/fixed-card-layout-content';
import { waitForInvisible } from '../../helper/helper';
import { webDriver } from '../../driver/wdio';


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
            // TODO
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
            const cardHeaderArr = webDriver.elementArray(fxdCardLayoutPg.cardHeaderArr);
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const firstCardHeader = cardHeaderArr[0];
            const originalFirstCardText = cardsArr[0].getText();
            const firstCard = cardsArr[0];
            const fourthCard = cardsArr[3];
// TODO
            checkDragAndDrop(firstCardHeader, firstCard, fourthCard, originalFirstCardText);
        });

        it('should drag a card from the content area', () => {
            const cardContentArr = webDriver.elementArray(fxdCardLayoutPg.cardContentArr);
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const firstCardContent = cardContentArr[0];
            const originalFirstCardText = cardsArr[0].getText();
            const firstCard = cardsArr[0];
            const fourthCard = cardsArr[3];
// TODO
            checkDragAndDrop(firstCardContent, firstCard, fourthCard, originalFirstCardText);
        });

        it('should check drag and drop cards swap locations', () => {
            const cardHeaderArr = webDriver.elementArray(fxdCardLayoutPg.cardHeaderArr);
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const firstCardHeader = cardHeaderArr[0];
            const originalFirstCardText = cardsArr[0].getText();
            const originalFourthCardText = cardsArr[3].getText();
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
// TODO
            driver.actions().mouseDown(await firstCardHeader).perform().then(async () => {
                driver.sleep(300);
                driver.actions().mouseMove(firstCardHeader)
                    .mouseMove(secondCardHeader).perform();
            });
            expect(webDriver.elementDisplayed(fxdCardLayoutPg.placeholderCard)).toBe(true);
            expect(webDriver.getCSSPropertyByName(fxdCardLayoutPg.placeholderCard, fxdCardLytData.placeholderBorderAttr))
                .toEqual(fxdCardLytData.placeholderBorderStyle);
        });

        it('should check columns are reactive',  () => {
            const originalCardColumnsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardColumnArr);

            await fxdCardLayoutPg.navigationMenuBtn.click().then( () => {
                await waitForInvisible(fxdCardLayoutPg.pageSidebar);
                const newCardColumnsCount = webDriver.getElementArrayLength(fxdCardLayoutPg.cardColumnArr);

                expect(originalCardColumnsCount).not.toEqual(newCardColumnsCount);
            });
        });

        it('should check cards are reactive to columns', () => {
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const originalLastCardText = cardsArr[8].getText();

            fxdCardLayoutPg.navigationMenuBtn.click().then( () => {
                await waitForInvisible(fxdCardLayoutPg.pageSidebar);
                const newCardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
                const newLastCardText = newCardsArr[8].getText();

                await expect(originalLastCardText).not.toEqual(newLastCardText);
            });
        });

        it('should check drag and drop is disabled', () => {
            const cardHeaderArr = webDriver.elementArray(fxdCardLayoutPg.cardHeaderArr);
            const cardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
            const originalFirstCardText = cardsArr[9].getText();
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
            const areaContainersArray = webDriver.elementArray(fxdCardLayoutPg.exampleAreaContainersArr);

            const arrL = webDriver.getElementArrayLength(fxdCardLayoutPg.exampleAreaContainersArr);
            for (let i = 0; arrL > i; i++) {
                expect(webDriver.getCSSPropertyByName(areaContainersArray[i], 'direction', 0).value).toBe('ltr', 'css prop direction ');
            }
        });

        it('should check RTL orientation', () => {
            const containerArr = webDriver.elementArray(fxdCardLayoutPg.exampleAreaContainersArr);
            const switcherArr = webDriver.elementArray(fxdCardLayoutPg.rtlSwitcherArr);

            const arrL = webDriver.getElementArrayLength(fxdCardLayoutPg.exampleAreaContainersArr);
            for (let i = 0; arrL > i; i++) {
                expect(webDriver.getCSSPropertyByName(containerArr[i], 'direction', 0).value).toBe('ltr', '1css prop direction ' + 0);
                expect(webDriver.getAttributeByName(containerArr[i], 'dir', 0)).toBe('', '1 dir');
                webDriver.click(switcherArr[i], 0);
                expect(webDriver.getCSSPropertyByName(containerArr[i], 'direction', 0).value).toBe('rtl', '2 rtl ');
                expect(webDriver.getAttributeByName(containerArr[i], 'dir', 0)).toBe('rtl', '2 dir ');
            }
        });
    });

    // TODO
    checkDragAndDrop(clickElement, startElementLocation, endElementLocation, originalText) {
            driver.actions().mouseDown(clickElement).perform().then(async () => {
                driver.sleep(300);
                driver.actions().mouseMove(startElementLocation)
                    .mouseMove(endElementLocation).perform().then(() => {
                        driver.actions().mouseUp().perform().then(() => {
                            const newCardsArr = webDriver.elementArray(fxdCardLayoutPg.cardDivArr);
                            const newFirstCardText = newCardsArr[0].getText();

                            expect(newFirstCardText).not.toEqual(originalText);
                        });
                    });
            });
    }
});
