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

    beforeAll(() => {
        resizableCardLayoutPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(resizableCardLayoutPage.root);
        waitForElDisplayed(resizableCardLayoutPage.title);
    }, 2);

    it('should check resizing card in examples', () => {
        if (!browserIsFirefox()) {
            checkChaningSizeOfCard(defaultExample, 'bigger');
            checkChaningSizeOfCard(defaultExample, 'smaller', 1);
            checkChaningSizeOfCard(configExample, 'bigger');
            checkChaningSizeOfCard(configExample, 'smaller', 2);
            checkChaningSizeOfCard(itemExample, 'bigger');
            checkChaningSizeOfCard(itemExample, 'smaller');
        }
    });

    it('should check open-closing examples', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            checkOpenClose(blockExamples[i]);
        }
    });

    it('should check quantity of items in the card after changin size', () => {
        if (!browserIsFirefox()) {
            for (let i = 0; i < blockExamples.length; i++) {
                checkItemQuantity(blockExamples[i]);
            }
        }
    });

    it('should check collapsible area', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            checkCollapsibleArea(blockExamples[i], 'collapseButton');
            checkCollapsibleArea(blockExamples[i], 'resizeButton');
        }
    });

    it('should check pin button working', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            checkPinButtonWorking(blockExamples[i]);
        }
    });

    it('should check changing position of card above/below', () => {
        for (let i = 0; i < blockExamples.length; i++) {
            checkChanginPositionOfCardAround(blockExamples[i]);
        }
    });

    it('should check orientation', () => {
        resizableCardLayoutPage.checkRtlSwitch();
    });

    xit('should check visual regression for all examples', () => {
        resizableCardLayoutPage.saveExampleBaselineScreenshot();
        expect(resizableCardLayoutPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkChanginPositionOfCardAround(section: string): void {
        click(section + button);
        const defaultPosition = getAttributeByName(card, 'style', 1);
        clickAndMoveElement(verticalResize, 500, 0);
        pause(1500);
        expect(getAttributeByName(card, 'style', 1)).not.toEqual(defaultPosition);
        click(closeButton);
    }

    function checkPinButtonWorking(section: string): void {
        click(section + button);
        click(pinButton);
        expect(getAttributeByName(pinButton, 'aria-selected')).toBe('true');
        click(closeButton);
    }

    function checkCollapsibleArea(section: string, clickbutton: 'collapseButton' | 'resizeButton'): void {
        click(section + button);
        clickbutton === 'collapseButton' ? click(collapseButton) : click(resizeButton);
        expect(isElementDisplayed(collapsibleArea)).toBe(false);
        clickbutton === 'collapseButton' ? click(collapseButton) : click(resizeButton);
        expect(isElementDisplayed(collapsibleArea)).toBe(true);
        click(closeButton);
    }

    function checkItemQuantity(section: string): void {
        click(section + button);
        const defaultItemsQuantity = getElementArrayLength(listItem);
        scrollIntoView(horizontalResize);
        clickAndMoveElement(horizontalResize, 0, -100);
        pause(1000);
        const itemsQuantityAfterChangingSize = getElementArrayLength(listItem);
        expect(getElementArrayLength(listItem)).toBeLessThan(defaultItemsQuantity);
        scrollIntoView(horizontalResize);
        clickAndMoveElement(horizontalResize, 0, 200);
        pause(1000);
        expect(getElementArrayLength(listItem)).toBeGreaterThan(itemsQuantityAfterChangingSize);
        click(closeButton);
    }

    function checkChaningSizeOfCard(
        section: string,
        size: 'smaller' | 'bigger',
        resizeIndex: number = 0,
        cardIndex: number = 0
    ): void {
        if (section === defaultExample && size === 'smaller') {
            cardIndex = resizeIndex + 1;
        }
        if (section === configExample && size === 'smaller') {
            cardIndex = resizeIndex;
        }
        click(section + button);
        const defaultSize = getAttributeByName(resizableCard, 'style', cardIndex);
        size === 'bigger'
            ? clickAndMoveElement(verticalResize, 200, 0, resizeIndex)
            : clickAndMoveElement(verticalResize, -200, 0, resizeIndex);
        pause(1500);
        const sizeAfterVerticalMoving = getAttributeByName(resizableCard, 'style', cardIndex);

        expect(sizeAfterVerticalMoving).not.toEqual(
            defaultSize,
            `failed try to make card ${size} vertical for ${section}`
        );
        scrollIntoView(horizontalResize, resizeIndex);
        size === 'bigger'
            ? clickAndMoveElement(horizontalResize, 0, 300, resizeIndex)
            : clickAndMoveElement(horizontalResize, 0, -100, resizeIndex);
        pause(1500);
        expect(getAttributeByName(resizableCard, 'style', cardIndex)).not.toEqual(
            sizeAfterVerticalMoving,
            `failed try to make card ${size} horizontal for ${section}`
        );
        click(closeButton);
    }

    function checkOpenClose(section: string): void {
        click(section + button);
        expect(isElementDisplayed(dynamicHeader)).toBe(true, 'Dynamic page did not open');
        click(acceptButton);
        expect(doesItExist(dynamicHeader)).toBe(false, 'Dynamic page did not close');

        click(section + button);
        click(exitScreen);
        expect(doesItExist(dynamicHeader)).toBe(false, 'Dynamic page did not close');

        click(section + button);
        click(rejectButton);
        expect(doesItExist(dynamicHeader)).toBe(false, 'Dynamic page did not close');

        click(section + button);
        click(closeButton);
        expect(doesItExist(dynamicHeader)).toBe(false, 'Dynamic page did not close');
    }
});
