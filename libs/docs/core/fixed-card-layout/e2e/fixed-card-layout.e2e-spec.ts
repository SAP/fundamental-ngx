import { FixedCardLayoutPo } from './fixed-card-layout.po';
import {
    browserIsSafari,
    click,
    elementDisplayed,
    getElementArrayLength,
    getElementLocation,
    getText,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForInvisibilityOf,
    waitForPresent
} from '../../../../../e2e';

describe('Fixed card layout test suite', () => {
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
        disabledCardDiv
    } = fxdCardLayoutPage;

    beforeAll(async () => {
        await fxdCardLayoutPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(fxdCardLayoutPage.root);
        await waitForElDisplayed(fxdCardLayoutPage.title);
    }, 1);

    describe('main checks', () => {
        it('should check card can be hidden', async () => {
            const cardStartCount = await getElementArrayLength(cardDivArr);

            await click(hideCardBtnArr);
            const cardEndCount = await getElementArrayLength(cardDivArr);
            await expect(cardEndCount).toEqual(cardStartCount - 1);

            await click(hideCardBtnArr);
            const newCardEndCount = await getElementArrayLength(cardDivArr);
            await expect(newCardEndCount).toEqual(cardStartCount);
        });

        it('should drag a card from the header', async () => {
            if (await browserIsSafari()) {
                // test runner drag and drop methods not working properly on safari
                return;
            }

            const originalFirstCardText = await getText(cardDivArr);

            await scrollIntoView(cardHeaderArr);
            await checkDragAndDrop(cardHeaderArr, cardContentArr, 4);
            const newText = await getText(cardDivArr);
            await expect(newText).not.toBe(originalFirstCardText);
        });

        it('should drag a card from the content area', async () => {
            const originalFirstCardText = await getText(cardDivArr);

            await scrollIntoView(cardDivArr);
            await checkDragAndDrop(cardContentArr, cardContentArr, 2);
            const newText = await getText(cardDivArr);
            await expect(newText).not.toBe(originalFirstCardText);
        });

        it('should check drag and drop cards swap locations', async () => {
            const originalFirstCardText = await getText(cardDivArr);
            const originalSwapCardText = await getText(cardDivArr, 1);

            await scrollIntoView(cardDivArr);
            await checkDragAndDrop(cardContentArr, cardContentArr, 1);

            const newFirstCardText = await getText(cardDivArr);
            const newSwapCardText = await getText(cardDivArr, 1);

            await expect(newFirstCardText).not.toBe(originalFirstCardText);
            await expect(newSwapCardText).not.toBe(originalSwapCardText);
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/7342
        xit('should check placeholder exists on drag', async () => {
            await scrollIntoView(cardDivArr);
            const clickElement = cardContentArr;
            const locationElement = cardDivArr;

            const clickXLocation = Math.floor(await getElementLocation(clickElement, 0, 'x'));
            const clickYLocation = Math.floor(await getElementLocation(clickElement, 0, 'y'));
            const startXLocation = Math.floor(await getElementLocation(locationElement, 0, 'x'));
            const startYLocation = Math.floor(await getElementLocation(locationElement, 0, 'y'));
            const endXLocation = Math.floor(await getElementLocation(locationElement, 4, 'x'));
            const endYLocation = Math.floor(await getElementLocation(locationElement, 4, 'y'));

            await browser.performActions([
                {
                    type: 'pointer',
                    id: 'pointer1',
                    parameters: { pointerType: 'mouse' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: clickXLocation, y: clickYLocation },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pause', duration: 1000 },
                        { type: 'pointerMove', duration: 600, x: startXLocation, y: startYLocation },
                        { type: 'pointerMove', duration: 1000, x: endXLocation + 30, y: endYLocation + 30 }
                    ]
                }
            ]);

            await expect(await elementDisplayed(placeholderCard)).toBe(true);
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/3910
        xit('should check columns are reactive', async () => {
            const originalCardColumnsCount = await getElementArrayLength(cardColumnArr);

            await click(navigationMenuBtn);
            await waitForInvisibilityOf(pageSidebar);
            const newCardColumnsCount = await getElementArrayLength(cardColumnArr);
            await expect(originalCardColumnsCount).not.toEqual(newCardColumnsCount);
        });

        // skipped until issue fixed https://github.com/SAP/fundamental-ngx/issues/3910
        xit('should check cards are reactive to columns', async () => {
            const originalLastCardText = await getText(cardDivArr, 8);

            await click(navigationMenuBtn, 0);
            await waitForInvisibilityOf(pageSidebar);
            const newLastCardText = await getText(cardDivArr, 8);
            await expect(originalLastCardText).not.toEqual(newLastCardText);
        });

        it('should check drag and drop is disabled', async () => {
            const originalFirstCardText = await getText(disabledCardDiv);

            await scrollIntoView(disableDragBtn);
            await click(disableDragBtn);
            await checkDragAndDrop(disabledCardContent, disabledCardContent, 4);

            const newFirstCardText = await getText(disabledCardDiv);

            await expect(newFirstCardText).toBe(originalFirstCardText);
        });

        describe('Check orientation', () => {
            it('should check LTR and RTL orientation', async () => {
                await fxdCardLayoutPage.checkRtlSwitch();
            });
        });

        xdescribe('Check visual regression', () => {
            it('should check examples visual regression', async () => {
                await fxdCardLayoutPage.saveExampleBaselineScreenshot();
                await expect(await fxdCardLayoutPage.compareWithBaseline()).toBeLessThan(5);
            });
        });
    });

    async function checkDragAndDrop(clickElement, endLocation, endLocationIndex): Promise<void> {
        const clickXLocation = Math.floor(await getElementLocation(clickElement, 0, 'x'));
        const clickYLocation = Math.floor(await getElementLocation(clickElement, 0, 'y'));
        const endXLocation = Math.floor(await getElementLocation(endLocation, endLocationIndex, 'x'));
        const endYLocation = Math.floor(await getElementLocation(endLocation, endLocationIndex, 'y'));

        await browser.performActions([
            {
                type: 'pointer',
                id: 'pointer1',
                parameters: { pointerType: 'mouse' },
                actions: [
                    { type: 'pointerMove', duration: 200, x: clickXLocation + 2, y: clickYLocation + 2 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 1000 },
                    { type: 'pointerMove', duration: 1000, x: endXLocation + 40, y: endYLocation - 40 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }
});
