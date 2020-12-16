import { FixedCardLayoutPo } from '../pages/fixed-card-layout.po';
import { browser } from 'protractor';
import fxdCardLytData from '../fixtures/appData/fixed-card-layout-content';
import { waitForInvisible, waitForVisible } from '../../helper/helper';
// import { config } from '../../../protractor-ci.conf';

describe('fixed card layout test suite', function () {
    const fxdCardLayoutPg = new FixedCardLayoutPo();
    const driver = browser.driver;


    beforeAll(async () => {
        await fxdCardLayoutPg.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    describe('main checks', function() {

        it('should check spacing between cards', async () => {
            const cardsCount = await fxdCardLayoutPg.cardDivArr.count();
            const columnsCount = await fxdCardLayoutPg.cardColumnArr.count();
            const cardsMarginValue = await fxdCardLayoutPg.cardDivArr.map(async element => {
                return await element.getCssValue(fxdCardLytData.cardSpacingAttr);
            });

            await expect(cardsMarginValue.filter(value => value === fxdCardLytData.cardSpacingValue).length)
                .toEqual(cardsCount - columnsCount);
        });

        it('should check card minimum width', async () => {
            const cardsDivArr = await fxdCardLayoutPg.cardDivArr;

            cardsDivArr.forEach(async element => {
                await expect(await element.getCssValue(fxdCardLytData.cardWidthAttr)).toEqual(fxdCardLytData.cardMinWidth);
            });
        });

        it('should check card can be hidden', async () => {
            const hideCardBtnArr = await fxdCardLayoutPg.hideCardBtnArr;
            const cardStartCount = await fxdCardLayoutPg.cardDivArr.count();

            await hideCardBtnArr[0].click().then(async () => {
                const cardEndCount = await fxdCardLayoutPg.cardDivArr.count();
                await expect(cardEndCount).toEqual(cardStartCount - 1);
            });

            await hideCardBtnArr[0].click().then(async () => {
                const cardEndCount = await fxdCardLayoutPg.cardDivArr.count();
                await expect(cardEndCount).toEqual(cardStartCount);
            });
        });

        it('should drag a card from the header', async () => {
            const cardHeaderArr = await fxdCardLayoutPg.cardHeaderArr;
            const cardsArr = await fxdCardLayoutPg.cardDivArr;
            const firstCardHeader = cardHeaderArr[0];
            const originalFirstCardText = cardsArr[0].getText();
            const firstCard = cardsArr[0];
            const fourthCard = cardsArr[3];

            await checkDragAndDrop(firstCardHeader, firstCard, fourthCard, originalFirstCardText);
        });

        it('should drag a card from the content area', async () => {
            const cardContentArr = await fxdCardLayoutPg.cardContentArr;
            const cardsArr = await fxdCardLayoutPg.cardDivArr;
            const firstCardContent = await cardContentArr[0];
            const originalFirstCardText = await cardsArr[0].getText();
            const firstCard = await cardsArr[0];
            const fourthCard = await cardsArr[3];

            await checkDragAndDrop(firstCardContent, firstCard, fourthCard, originalFirstCardText);
        });

        it('should check drag and drop cards swap locations', async () => {
            const cardHeaderArr = await fxdCardLayoutPg.cardHeaderArr;
            const cardsArr = await fxdCardLayoutPg.cardDivArr;
            const firstCardHeader = await cardHeaderArr[0];
            const originalFirstCardText = await cardsArr[0].getText();
            const originalFourthCardText = await cardsArr[3].getText();
            const firstCard = await cardsArr[0];
            const fourthCard = await cardsArr[3];

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

        it('should check placeholder exists on drag', async () => {
            const cardHeaderArr = await fxdCardLayoutPg.cardHeaderArr;
            const firstCardHeader = cardHeaderArr[0];
            const secondCardHeader = cardHeaderArr[1];

            await driver.actions().mouseDown(await firstCardHeader).perform().then(async () => {
                await driver.sleep(300);
                await driver.actions().mouseMove(firstCardHeader)
                    .mouseMove(secondCardHeader).perform();
            });
            await expect(fxdCardLayoutPg.placeholderCard.isDisplayed()).toBe(true);
            await expect(fxdCardLayoutPg.placeholderCard.getCssValue(fxdCardLytData.placeholderBorderAttr))
                .toEqual(fxdCardLytData.placeholderBorderStyle);
        });

        it('should check columns are reactive', async () => {
            const originalCardColumnsCount = await fxdCardLayoutPg.cardColumnArr.count();

            await fxdCardLayoutPg.navigationMenuBtn.click().then( async () => {
                await waitForInvisible(fxdCardLayoutPg.pageSidebar);
                const newCardColumnsCount = await fxdCardLayoutPg.cardColumnArr.count();

                await expect(originalCardColumnsCount).not.toEqual(newCardColumnsCount);
            });
        });

        it('should check cards are reactive to columns', async () => {
            const cardsArr = await fxdCardLayoutPg.cardDivArr;
            const originalLastCardText = cardsArr[8].getText();

            await fxdCardLayoutPg.navigationMenuBtn.click().then( async () => {
                await waitForInvisible(fxdCardLayoutPg.pageSidebar);
                const newCardsArr = await fxdCardLayoutPg.cardDivArr;
                const newLastCardText = newCardsArr[8].getText();

                await expect(originalLastCardText).not.toEqual(newLastCardText);
            });
        });

        it('should check drag and drop is disabled', async () => {
            const cardHeaderArr = await fxdCardLayoutPg.cardHeaderArr;
            const cardsArr = await fxdCardLayoutPg.cardDivArr;
            const originalFirstCardText = await cardsArr[9].getText();
            const firstCardHeader = await cardHeaderArr[9];
            const firstCard = await cardsArr[9];
            const fourthCard = await cardsArr[12];
            const disableBtn = await fxdCardLayoutPg.disableDragBtn;

            await disableBtn.click();
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
        it('should check LTR orientation', async () => {
            const areaContainersArray = await fxdCardLayoutPg.exampleAreaContainersArr;

            areaContainersArray.forEach(element => {
                expect(element.getCssValue('direction')).toBe('ltr', 'css prop direction ');
            });
        });

        it('should check RTL orientation', async () => {
            await fxdCardLayoutPg.exampleAreaContainersArr.each(async (area, index) => {
                expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
                expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
                await fxdCardLayoutPg.rtlSwitcherArr.get(index).click();
                expect(await area.getCssValue('direction')).toBe('rtl');
                expect(await area.getAttribute('dir')).toBe('rtl');
            });
        });
    });

    async function checkDragAndDrop(clickElement, startElementLocation, endElementLocation, originalText): Promise<any> {

        // if (config.browserName === 'firefox' || 'safari' ) {
        //     const ffClickElement = clickElement.getLocation();
        //     const ffStartElementLocation = startElementLocation.getLocation();
        //     const ffEndElementLocation = endElementLocation.getLocation();
        //
        //     await driver.actions().mouseDown(clickElement).perform().then( async () => {
        //         await driver.sleep(300).then( async () => {
        //             await driver.actions().mouseMove(endElementLocation).perform();
        //         });
        //     });


            // await driver.actions().mouseDown(clickElement);
            // await browser.actions().mouseDown(clickElement);
            // await driver.actions().mouseDown(ffClickElement);

            // await driver.actions().mouseMove(clickElement.location).mouseDown(clickElement).perform().then( async () => {
            //     await waitForVisible(fxdCardLayoutPg.placeholderCard);
            //         await driver.actions().mouseMove(ffStartElementLocation, {x: 100, y: 100})
            //             .mouseMove(ffEndElementLocation, {x: 300, y: 300}).perform().then(async () => {
            //                 await driver.actions().mouseUp().perform().then(async () => {
            //                     const newCardsArr = await fxdCardLayoutPg.cardDivArr;
            //                     const newFirstCardText = await newCardsArr[0].getText();
            //
            //                     await expect(newFirstCardText).not.toEqual(originalText);
            //                 });
            //             });
            //
            // });

            // await driver.actions().mouseMove(ffClickElement).mouseDown().perform().then(async () => {
            //     await driver.sleep(300);
            //     await driver.actions().mouseMove(ffStartElementLocation)
            //         .mouseMove(ffEndElementLocation).mouseUp().perform().then( async () => {
            //         await driver.actions().mouseUp().perform().then(async () => {
            //             const newCardsArr = await fxdCardLayoutPg.cardDivArr;
            //             const newFirstCardText = await newCardsArr[0].getText();
            //
            //             await expect(newFirstCardText).not.toEqual(originalText);
            //         });
            //     })
            // })

            // await driver.actions().mouseDown(clickElement).perform().then( async () => {
            //     await driver.sleep(1000);
            //     await driver.actions().mouseMove(ffStartElementLocation)  // issue: not dragging the card
            //         .mouseMove(ffEndElementLocation).perform().then(async () => {
            //         await driver.actions().mouseUp().perform().then(async () => {
            //             const newCardsArr = await fxdCardLayoutPg.cardDivArr;
            //             const newFirstCardText = await newCardsArr[0].getText();
            //
            //             await expect(newFirstCardText).not.toEqual(originalText);
            //         });
            //     });
            // });

       // } else {
            await driver.actions().mouseDown(clickElement).perform().then(async () => {
                await driver.sleep(300);
                await driver.actions().mouseMove(startElementLocation)
                    .mouseMove(endElementLocation).perform().then(async () => {
                        await driver.actions().mouseUp().perform().then(async () => {
                            const newCardsArr = await fxdCardLayoutPg.cardDivArr;
                            const newFirstCardText = await newCardsArr[0].getText();

                            await expect(newFirstCardText).not.toEqual(originalText);
                        });
                    });
            });
     //   }
    }
});
