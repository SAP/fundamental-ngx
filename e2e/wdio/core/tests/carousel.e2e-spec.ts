import { CarouselPo } from '../pages/carousel.po';
import { click, getAttributeByName, getElementArrayLength, getText, mouseHoverElement, scrollIntoView } from '../../driver/wdio';
import {
    imgSource,
    verticalAttr,
    classAttr,
    active,
    visibilityCount,
    numberedPages,
    loadErrorMsg
} from '../fixtures/appData/carousel-contents';

describe('Carousel test suite', function() {
    const carouselPage = new CarouselPo();
    const {
        navBtns,
        displayedImg,
        carouselProperties,
        pageIndicators,
        displayedCards,
        multiDisplayedCards,
        hideCardBtns,
        hiddenPageIndicator,
        hiddenNavBtns,
        numberedPagination,
        errorMsg,
        busyIndicator,
        disableLoadingBtn,
        contentNavBtns,
        sectionTitle
    } = new CarouselPo();

    beforeAll(() => {
        carouselPage.open();
    }, 1);

    describe('carousel with one active item example', function() {
        it('should check navigation', () => {
            const firstImg = getAttributeByName(displayedImg, imgSource);

            click(navBtns, 1);
            expect(getAttributeByName(displayedImg, imgSource)).not.toBe(firstImg);
            click(navBtns);
            expect(getAttributeByName(displayedImg, imgSource)).toBe(firstImg);
        });

        xit('should check horizontal navigation', () => {
            // TODO: add check for click and slide
        });

        it('should check page indicator dots', () => {
            expect(getAttributeByName(pageIndicators, classAttr)).toContain(active);
            expect(getAttributeByName(pageIndicators, classAttr, 1)).not.toContain(active);
            click(navBtns, 1);
            expect(getAttributeByName(pageIndicators, classAttr)).not.toContain(active);
            expect(getAttributeByName(pageIndicators, classAttr, 1)).toContain(active);
            expect(getAttributeByName(pageIndicators, classAttr, 2)).not.toContain(active);
        });
    });

    describe('carousel with vertical direction example', function() {
        it('should check navigation', () => {
            const firstImg = getAttributeByName(displayedImg, imgSource, 1);

            click(navBtns, 3);
            expect(getAttributeByName(displayedImg, imgSource, 1)).not.toBe(firstImg);
            click(navBtns, 2);
            expect(getAttributeByName(displayedImg, imgSource, 1)).toBe(firstImg);
        });

        it('should scroll vertically', () => {
            // TODO: add check for click and slide
            expect(getAttributeByName(carouselProperties, verticalAttr, 1)).toBe('true');
        });
    });

    describe('carousel with multiple active items example', function() {
        it('should check navigation', () => {
            const originalFirstCard = getText(displayedCards);
            const originalSecondCard = getText(displayedCards, 1);
            const originalThirdCard = getText(displayedCards, 2);

            click(navBtns, 5);
            const newThirdCard = getText(displayedCards, 2);
            expect(getText(displayedCards)).toEqual(originalSecondCard);
            expect(getText(displayedCards, 1)).toEqual(originalThirdCard);
            expect(getText(displayedCards, 2)).toEqual(newThirdCard);
            expect(getText(displayedCards, 2)).not.toEqual(originalThirdCard);

            click(navBtns, 4);
            expect(getText(displayedCards)).toEqual(originalFirstCard);
            expect(getText(displayedCards, 1)).toEqual(originalSecondCard);
            expect(getText(displayedCards, 2)).toEqual(originalThirdCard);
        });

        it('should check multiple active items shown', () => {
            expect(getAttributeByName(carouselProperties, visibilityCount, 2)).toBe('3');
            expect(getElementArrayLength(multiDisplayedCards)).toBe(3);
        });
    });

    describe('carousel with dynamic items example', function() {
        it('should check hide card btns', () => {
            const originalFirstCard = getText(displayedCards, 3);
            const originalSecondCard = getText(displayedCards, 4);
            const originalThirdCard = getText(displayedCards, 5);

            click(hideCardBtns, 2);
            expect(getText(displayedCards, 3)).toEqual(originalFirstCard);
            expect(getText(displayedCards, 4)).toEqual(originalSecondCard);
            expect(getText(displayedCards, 5)).not.toEqual(originalThirdCard);

            click(hideCardBtns, 1);
            expect(getText(displayedCards, 3)).toEqual(originalFirstCard);
            expect(getText(displayedCards, 4)).not.toEqual(originalSecondCard);
            expect(getText(displayedCards, 5)).not.toEqual(originalThirdCard);

            click(hideCardBtns);
            expect(getText(displayedCards, 3)).not.toEqual(originalFirstCard);
            expect(getText(displayedCards, 4)).not.toEqual(originalSecondCard);
            expect(getText(displayedCards, 5)).not.toEqual(originalThirdCard);

            click(hideCardBtns);
            expect(getText(displayedCards, 3)).toEqual(originalFirstCard);
            expect(getText(displayedCards, 4)).not.toEqual(originalSecondCard);
            expect(getText(displayedCards, 5)).not.toEqual(originalThirdCard);
        });
    });

    describe('carousel with no page indicator example', function() {
        it('should check the page indicator is hidden', () => {
            expect(hiddenPageIndicator).not.toBeVisible();
        });
    });

    describe('carousel with hidden nav buttons example', function() {
        it('should check nav buttons are hidden', () => {
            expect(hiddenNavBtns).not.toBeVisible();
        });
    });

    describe('carousel with navigation inside content area example', function() {
        // skip due to issue https://github.com/SAP/fundamental-ngx/issues/4434
        xit('should check navigation buttons shown on hover', () => {
            mouseHoverElement(displayedImg, 4);
            expect(contentNavBtns).toBeVisible();

            mouseHoverElement(sectionTitle);
            expect(contentNavBtns).not.toBeVisible();
        });

        it('should check numbered pagination', () => {
            expect(numberedPagination).toBeVisible();
            expect(getText(numberedPagination).trim()).toBe(numberedPages);
        });
    });

    describe('carousel with looped navigation example', function() {
        // skip because of https://github.com/SAP/fundamental-ngx/issues/4432
        xit('should check loop navigation', () => {
            const firstImg = getAttributeByName(displayedImg, imgSource, 5);

            click(navBtns, 14);
            expect(getAttributeByName(displayedImg, imgSource, 5)).not.toBe(firstImg);

            click(navBtns, 15);
            expect(getAttributeByName(displayedImg, imgSource, 5)).toBe(firstImg);
        });
    });

    describe('carousel error message when no item is loaded example', function() {
        it('should check error message', () => {
            expect(getText(errorMsg)).toBe(loadErrorMsg)
        });
    });

    describe('carousel item loading indicator examples', function() {
        // TODO: not working
        xit('should check busy indicator visible', () => {
            scrollIntoView(disableLoadingBtn);
            expect(busyIndicator).toBeVisible();
        });

        it('should check disabling busy indicator', () => {
            click(disableLoadingBtn);
            expect(busyIndicator).not.toBeVisible();
        });
    });

    xdescribe('orientation checks', function() {
        it('should check rtl, ltr orientations', () => {
            carouselPage.checkRtlSwitch();
        });
    });
});
