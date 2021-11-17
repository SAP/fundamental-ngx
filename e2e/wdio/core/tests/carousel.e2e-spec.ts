import { CarouselPo } from '../pages/carousel.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementLocation,
    getText,
    mouseHoverElement,
    scrollIntoView,
    waitForElDisplayed,
    clickAndDragElement,
    getElementClass,
    pause,
    isElementDisplayed
} from '../../driver/wdio';
import { imgSource, active, numberedPages, loadErrorMsg } from '../fixtures/appData/carousel-contents';

describe('Carousel test suite', () => {
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
    } = carouselPage;

    beforeAll(() => {
        carouselPage.open();
    }, 1);

    describe('carousel with one active item example', () => {
        it('should check navigation', () => {
            checkCarouselNavigation(0, 1);
        });

        it('should check horizontal navigation', () => {
            scrollIntoView(sectionTitle);
            const imgLocationX = Math.floor(getElementLocation(displayedImg, 0, 'x'));
            const imgLocationY = Math.floor(getElementLocation(displayedImg, 0, 'y'));
            const firstImg = getAttributeByName(displayedImg, imgSource);

            clickAndDragElement(imgLocationX + 10, imgLocationY + 10, imgLocationX - 200, imgLocationY);
            expect(getAttributeByName(displayedImg, imgSource)).not.toBe(firstImg);
        });

        it('should check page indicator dots', () => {
            expect(getElementClass(pageIndicators, 1)).toContain(active);
            expect(getElementClass(pageIndicators, 2)).not.toContain(active);
            click(navBtns, 1);
            expect(getElementClass(pageIndicators)).not.toContain(active);
            expect(getElementClass(pageIndicators, 2)).toContain(active);
            expect(getElementClass(pageIndicators, 3)).not.toContain(active);
        });
    });

    describe('carousel with vertical direction example', () => {
        it('should check navigation', () => {
            checkCarouselNavigation(1, 3);
        });

        it('should scroll vertically', () => {
            scrollIntoView(sectionTitle, 1);
            const imgLocationX = Math.floor(getElementLocation(displayedImg, 1, 'x'));
            const imgLocationY = Math.floor(getElementLocation(displayedImg, 1, 'y'));
            const firstImg = getAttributeByName(displayedImg, imgSource, 1);

            clickAndDragElement(imgLocationX + 10, imgLocationY + 10, imgLocationX, imgLocationY - 200);
            expect(getAttributeByName(displayedImg, imgSource, 1)).not.toBe(firstImg);
            // in prod mode missed attr: ng-reflect-vertical
            // expect(getAttributeByName(carouselProperties, verticalAttr, 1)).toBe('true');
        });
    });

    describe('carousel with multiple active items example', () => {
        it('should check navigation', () => {
            const originalFirstCard = getText(displayedCards);
            const originalSecondCard = getText(displayedCards, 1);
            const originalThirdCard = getText(displayedCards, 2);

            click(navBtns, 5);
            // pause for animation to finish
            pause(500);
            const newThirdCard = getText(displayedCards, 2);
            expect(getText(displayedCards)).toEqual(originalSecondCard);
            expect(getText(displayedCards, 1)).toEqual(originalThirdCard);
            expect(getText(displayedCards, 2)).toEqual(newThirdCard);
            expect(getText(displayedCards, 2)).not.toEqual(originalThirdCard);

            click(navBtns, 4);
            // pause for animation to finish
            pause(500);
            expect(getText(displayedCards)).toEqual(originalFirstCard);
            expect(getText(displayedCards, 1)).toEqual(originalSecondCard);
            expect(getText(displayedCards, 2)).toEqual(originalThirdCard);
        });

        it('should check multiple active items shown', () => {
            // in prod mode missed attr: ng-reflect-visible-slides-count
            // expect(getAttributeByName(carouselProperties, visibilityCount, 2)).toBe('3');
            expect(getElementArrayLength(multiDisplayedCards)).toBe(3);
        });
    });

    describe('carousel with dynamic items example', () => {
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

    describe('carousel with no page indicator example', () => {
        it('should check the page indicator is hidden', () => {
            expect(hiddenPageIndicator).not.toBeVisible();
        });

        it('should check navigation', () => {
            checkCarouselNavigation(2, 9);
        });
    });

    describe('carousel with hidden nav buttons example', () => {
        it('should check nav buttons are hidden', () => {
            expect(hiddenNavBtns).not.toBeVisible();
        });

        it('should check swipe navigation', () => {
            scrollIntoView(sectionTitle, 5);
            const imgLocationX = Math.floor(getElementLocation(displayedImg, 3, 'x'));
            const imgLocationY = Math.floor(getElementLocation(displayedImg, 3, 'y'));
            const firstImg = getAttributeByName(displayedImg, imgSource, 3);

            clickAndDragElement(imgLocationX + 10, imgLocationY + 10, imgLocationX - 250, imgLocationY);
            expect(getAttributeByName(displayedImg, imgSource, 3)).not.toBe(firstImg);
        });
    });

    describe('carousel with navigation inside content area example', () => {
        it('should check navigation buttons shown on hover', () => {
            scrollIntoView(displayedImg, 4);
            mouseHoverElement(displayedImg, 4);
            expect(waitForElDisplayed(contentNavBtns)).toBe(true, 'nav buttons not displyed on hover');

            scrollIntoView(sectionTitle, 6);
            mouseHoverElement(sectionTitle, 6);
            expect(isElementDisplayed(contentNavBtns)).toBe(false, 'nav buttons displayed when mouse not hovering img');
        });

        it('should check numbered pagination', () => {
            waitForElDisplayed(numberedPagination);
            expect(getText(numberedPagination).trim()).toBe(numberedPages);
        });

        it('should check navigation', () => {
            scrollIntoView(displayedImg, 4);
            mouseHoverElement(displayedImg, 4);
            waitForElDisplayed(contentNavBtns);
            checkCarouselNavigation(4, 13);
        });
    });

    describe('carousel with looped navigation example', () => {
        it('should check loop navigation', () => {
            const firstImg = getAttributeByName(displayedImg, imgSource, 5);

            click(navBtns, 14);
            // pause for animation to complete
            pause(1500);
            expect(getAttributeByName(displayedImg, imgSource, 5)).not.toBe(firstImg);

            click(navBtns, 15);
            // pause for animation to complete
            pause(1500);
            expect(getAttributeByName(displayedImg, imgSource, 5)).toBe(firstImg);
        });
    });

    describe('carousel error message when no item is loaded example', () => {
        it('should check error message', () => {
            expect(getText(errorMsg)).toBe(loadErrorMsg);
        });
    });

    describe('carousel item loading indicator examples', () => {
        // TODO: not working
        it('should check busy indicator visible', () => {
            scrollIntoView(disableLoadingBtn);
            expect(waitForElDisplayed(busyIndicator)).toBe(true);
        });

        it('should check disabling busy indicator', () => {
            click(disableLoadingBtn, 2);
            expect(busyIndicator).not.toBeVisible();
        });
    });

    describe('orientation checks', () => {
        it('should check rtl, ltr orientations', () => {
            carouselPage.checkRtlSwitch();
        });
    });

    function checkCarouselNavigation(imgIndex: number, nextImgBtnIndex: number): void {
        const firstImg = getAttributeByName(displayedImg, imgSource, imgIndex);

        scrollIntoView(navBtns, nextImgBtnIndex);
        click(navBtns, nextImgBtnIndex);
        // pause for animation to finish
        pause(1500);
        expect(getAttributeByName(displayedImg, imgSource, imgIndex)).not.toBe(firstImg);
        click(navBtns, nextImgBtnIndex - 1);
        // pause for animation to finish
        pause(1500);
        expect(getAttributeByName(displayedImg, imgSource, imgIndex)).toBe(firstImg);
    }
});
