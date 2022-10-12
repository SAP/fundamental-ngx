import { ResizableCardLayoutPo } from './resizable-card-layout.po';
import {
    browserIsFirefox,
    click,
    clickAndMoveElement,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import { blockExamples } from './resizable-card-layout.contents';

describe('Resizable card layout component:', () => {
    const resizableCardLayoutPage = new ResizableCardLayoutPo();
    const {
        defaultExample,
        configExample,
        itemExample,
        button,
        resizableCard,
        verticalResize,
        horizontalResize,
        dynamicHeader,
        pinButton,
        closeButton,
        acceptButton,
        rejectButton,
        resizeButton,
        collapseButton,
        exitScreen,
        listItem,
        collapsibleArea,
        card
    } = resizableCardLayoutPage;

    beforeAll(async () => {
        await resizableCardLayoutPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(resizableCardLayoutPage.root);
        await waitForElDisplayed(resizableCardLayoutPage.title);
    }, 2);

    it('should check resizing card in examples', async () => {
        if (!(await browserIsFirefox())) {
            await checkChaningSizeOfCard(defaultExample, 'bigger');
            await checkChaningSizeOfCard(defaultExample, 'smaller', 1);
            await checkChaningSizeOfCard(configExample, 'bigger');
            await checkChaningSizeOfCard(configExample, 'smaller', 2);
            await checkChaningSizeOfCard(itemExample, 'bigger');
            await checkChaningSizeOfCard(itemExample, 'smaller');
        }
    });

    it('should check open-closing examples', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            await checkOpenClose(blockExamples[i]);
        }
    });

    it('should check quantity of items in the card after changin size', async () => {
        if (!(await browserIsFirefox())) {
            for (let i = 0; i < blockExamples.length; i++) {
                await checkItemQuantity(blockExamples[i]);
            }
        }
    });

    it('should check collapsible area', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            await checkCollapsibleArea(blockExamples[i], 'collapseButton');
            await checkCollapsibleArea(blockExamples[i], 'resizeButton');
        }
    });

    it('should check pin button working', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            await checkPinButtonWorking(blockExamples[i]);
        }
    });

    it('should check changing position of card above/below', async () => {
        for (let i = 0; i < blockExamples.length; i++) {
            await checkChanginPositionOfCardAround(blockExamples[i]);
        }
    });

    it('should check orientation', async () => {
        await resizableCardLayoutPage.checkRtlSwitch();
    });

    xit('should check visual regression for all examples', async () => {
        await resizableCardLayoutPage.saveExampleBaselineScreenshot();
        await expect(await resizableCardLayoutPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkChanginPositionOfCardAround(section: string): Promise<void> {
        await click(section + button);
        const defaultPosition = await getAttributeByName(card, 'style', 1);
        await clickAndMoveElement(verticalResize, 500, 0);
        await pause(1500);
        await expect(await getAttributeByName(card, 'style', 1)).not.toEqual(defaultPosition);
        await click(closeButton);
    }

    async function checkPinButtonWorking(section: string): Promise<void> {
        await click(section + button);
        await click(pinButton);
        await expect(await getAttributeByName(pinButton, 'aria-selected')).toBe('true');
        await click(closeButton);
    }

    async function checkCollapsibleArea(
        section: string,
        clickbutton: 'collapseButton' | 'resizeButton'
    ): Promise<void> {
        await click(section + button);
        clickbutton === 'collapseButton' ? await click(collapseButton) : await click(resizeButton);
        await expect(await isElementDisplayed(collapsibleArea)).toBe(false);
        clickbutton === 'collapseButton' ? await click(collapseButton) : await click(resizeButton);
        await expect(await isElementDisplayed(collapsibleArea)).toBe(true);
        await click(closeButton);
    }

    async function checkItemQuantity(section: string): Promise<void> {
        await click(section + button);
        const defaultItemsQuantity = await getElementArrayLength(listItem);
        await scrollIntoView(horizontalResize);
        await clickAndMoveElement(horizontalResize, 0, -100);
        await pause(1000);
        const itemsQuantityAfterChangingSize = await getElementArrayLength(listItem);
        await expect(await getElementArrayLength(listItem)).toBeLessThan(defaultItemsQuantity);
        await scrollIntoView(horizontalResize);
        await clickAndMoveElement(horizontalResize, 0, 200);
        await pause(1000);
        await expect(await getElementArrayLength(listItem)).toBeGreaterThan(itemsQuantityAfterChangingSize);
        await click(closeButton);
    }

    async function checkChaningSizeOfCard(
        section: string,
        size: 'smaller' | 'bigger',
        resizeIndex: number = 0,
        cardIndex: number = 0
    ): Promise<void> {
        if (section === defaultExample && size === 'smaller') {
            cardIndex = resizeIndex + 1;
        }
        if (section === configExample && size === 'smaller') {
            cardIndex = resizeIndex;
        }
        await click(section + button);
        const defaultSize = await getAttributeByName(resizableCard, 'style', cardIndex);
        size === 'bigger'
            ? await clickAndMoveElement(verticalResize, 200, 0, resizeIndex)
            : await clickAndMoveElement(verticalResize, -200, 0, resizeIndex);
        await pause(1500);
        const sizeAfterVerticalMoving = await getAttributeByName(resizableCard, 'style', cardIndex);

        await expect(sizeAfterVerticalMoving).not.toEqual(
            defaultSize,
            `failed try to make card ${size} vertical for ${section}`
        );
        await scrollIntoView(horizontalResize, resizeIndex);
        size === 'bigger'
            ? await clickAndMoveElement(horizontalResize, 0, 300, resizeIndex)
            : await clickAndMoveElement(horizontalResize, 0, -100, resizeIndex);
        await pause(1500);
        await expect(await getAttributeByName(resizableCard, 'style', cardIndex)).not.toEqual(
            sizeAfterVerticalMoving,
            `failed try to make card ${size} horizontal for ${section}`
        );
        await click(closeButton);
    }

    async function checkOpenClose(section: string): Promise<void> {
        await click(section + button);
        await expect(await isElementDisplayed(dynamicHeader)).toBe(true, 'Dynamic page did not open');
        await click(acceptButton);
        await expect(await doesItExist(dynamicHeader)).toBe(false, 'Dynamic page did not close');

        await click(section + button);
        await click(exitScreen);
        await expect(await doesItExist(dynamicHeader)).toBe(false, 'Dynamic page did not close');

        await click(section + button);
        await click(rejectButton);
        await expect(await doesItExist(dynamicHeader)).toBe(false, 'Dynamic page did not close');

        await click(section + button);
        await click(closeButton);
        await expect(await doesItExist(dynamicHeader)).toBe(false, 'Dynamic page did not close');
    }
});
