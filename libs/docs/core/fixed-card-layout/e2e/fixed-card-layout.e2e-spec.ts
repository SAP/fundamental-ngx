import {
    browserIsSafari,
    click,
    getElementArrayLength,
    getElementLocation,
    getText,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import { FixedCardLayoutPo } from './fixed-card-layout.po';

describe('Fixed card layout test suite', () => {
    const fxdCardLayoutPage = new FixedCardLayoutPo();
    const {
        hideCardBtnArr,
        cardDivArr,
        cardHeaderArr,
        cardContentArr,
        disableDragBtn,
        disabledCardContent,
        disabledCardDiv
    } = fxdCardLayoutPage;

    beforeAll(async () => {
        await fxdCardLayoutPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await fxdCardLayoutPage.waitForRoot();
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
