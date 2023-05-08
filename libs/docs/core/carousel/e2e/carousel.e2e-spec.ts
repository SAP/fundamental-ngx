import { CarouselPo } from './carousel.po';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
    browserIsSafari,
    click,
    clickAndDragElement,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementLocation,
    getText,
    isElementDisplayed,
    mouseHoverElement,
    pause,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import { active, imgSource, loadErrorMsg, numberedPages } from './carousel-contents';

describe('Carousel test suite', () => {
    const carouselPage = new CarouselPo();
    const {
        navBtns,
        displayedImg,
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

    beforeAll(async () => {
        await carouselPage.open();
    }, 1);

    describe('carousel with one active item example', () => {
        it('should check navigation', async () => {
            await checkCarouselNavigation(0, 1);
        });

        it('should check horizontal navigation', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(sectionTitle);
            const imgLocationX = Math.floor(await getElementLocation(displayedImg, 0, 'x'));
            const imgLocationY = Math.floor(await getElementLocation(displayedImg, 0, 'y'));
            const firstImg = await getAttributeByName(displayedImg, imgSource);

            await clickAndDragElement(imgLocationX + 10, imgLocationY + 10, imgLocationX - 200, imgLocationY);
            await expect(await getAttributeByName(displayedImg, imgSource)).not.toBe(firstImg);
        });

        // skip due to cannot reproduce failing, needs deeper investigation
        xit('should check page indicator dots', async () => {
            await click(navBtns, 1);
            await expect(await getElementClass(pageIndicators, 1)).toContain(active);
            await expect(await getElementClass(pageIndicators, 2)).not.toContain(active);
            await expect(await getElementClass(pageIndicators)).not.toContain(active);
            await click(navBtns, 1);
            await expect(await getElementClass(pageIndicators, 2)).toContain(active);
            await expect(await getElementClass(pageIndicators, 3)).not.toContain(active);
        });
    });

    describe('carousel with vertical direction example', () => {
        it('should check navigation', async () => {
            await checkCarouselNavigation(1, 3);
        });

        it('should scroll vertically', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(sectionTitle, 1);
            const imgLocationX = Math.floor(await getElementLocation(displayedImg, 1, 'x'));
            const imgLocationY = Math.floor(await getElementLocation(displayedImg, 1, 'y'));
            const firstImg = await getAttributeByName(displayedImg, imgSource, 1);

            await clickAndDragElement(imgLocationX + 10, imgLocationY + 10, imgLocationX, imgLocationY - 200);
            await expect(await getAttributeByName(displayedImg, imgSource, 1)).not.toBe(firstImg);
            // in prod mode missed attr: ng-reflect-vertical
            // expect(getAttributeByName(carouselProperties, verticalAttr, 1)).toBe('true');
        });
    });

    describe('carousel with multiple active items example', () => {
        it('should check navigation', async () => {
            const originalFirstCard = await getText(displayedCards);
            const originalSecondCard = await getText(displayedCards, 1);
            const originalThirdCard = await getText(displayedCards, 2);

            await click(navBtns, 5);
            // pause for animation to finish
            await pause(500);
            const newThirdCard = await getText(displayedCards, 2);
            await expect(await getText(displayedCards)).toEqual(originalSecondCard);
            await expect(await getText(displayedCards, 1)).toEqual(originalThirdCard);
            await expect(await getText(displayedCards, 2)).toEqual(newThirdCard);
            await expect(await getText(displayedCards, 2)).not.toEqual(originalThirdCard);

            await click(navBtns, 4);
            // pause for animation to finish
            await pause(500);
            await expect(await getText(displayedCards)).toEqual(originalFirstCard);
            await expect(await getText(displayedCards, 1)).toEqual(originalSecondCard);
            await expect(await getText(displayedCards, 2)).toEqual(originalThirdCard);
        });

        it('should check multiple active items shown', async () => {
            // in prod mode missed attr: ng-reflect-visible-slides-count
            // expect(getAttributeByName(carouselProperties, visibilityCount, 2)).toBe('3');
            await expect(await getElementArrayLength(multiDisplayedCards)).toBe(3);
        });
    });

    describe('carousel with dynamic items example', () => {
        it('should check hide card btns', async () => {
            const originalFirstCard = await getText(displayedCards, 3);
            const originalSecondCard = await getText(displayedCards, 4);
            const originalThirdCard = await getText(displayedCards, 5);

            await click(hideCardBtns, 2);
            await expect(await getText(displayedCards, 3)).toEqual(originalFirstCard);
            await expect(await getText(displayedCards, 4)).toEqual(originalSecondCard);
            await expect(await getText(displayedCards, 5)).not.toEqual(originalThirdCard);

            await click(hideCardBtns, 1);
            await expect(await getText(displayedCards, 3)).toEqual(originalFirstCard);
            await expect(await getText(displayedCards, 4)).not.toEqual(originalSecondCard);
            await expect(await getText(displayedCards, 5)).not.toEqual(originalThirdCard);

            await click(hideCardBtns);
            await expect(await getText(displayedCards, 3)).not.toEqual(originalFirstCard);
            await expect(await getText(displayedCards, 4)).not.toEqual(originalSecondCard);
            await expect(await getText(displayedCards, 5)).not.toEqual(originalThirdCard);

            await click(hideCardBtns);
            await expect(await getText(displayedCards, 3)).toEqual(originalFirstCard);
            await expect(await getText(displayedCards, 4)).not.toEqual(originalSecondCard);
            await expect(await getText(displayedCards, 5)).not.toEqual(originalThirdCard);
        });
    });

    describe('carousel with no page indicator example', () => {
        it('should check the page indicator is hidden', async () => {
            const isDisplayed = await $(hiddenPageIndicator).isDisplayed();
            await expect(isDisplayed).toBeFalsy();
        });

        it('should check navigation', async () => {
            await checkCarouselNavigation(2, 9);
        });
    });

    describe('carousel with hidden nav buttons example', () => {
        it('should check nav buttons are hidden', async () => {
            const isDisplayed = await $(hiddenNavBtns).isDisplayed();
            await expect(isDisplayed).toBeFalsy();
        });

        it('should check swipe navigation', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(sectionTitle, 5);
            const imgLocationX = Math.floor(await getElementLocation(displayedImg, 3, 'x'));
            const imgLocationY = Math.floor(await getElementLocation(displayedImg, 3, 'y'));
            const firstImg = await getAttributeByName(displayedImg, imgSource, 3);

            await clickAndDragElement(imgLocationX + 10, imgLocationY + 10, imgLocationX - 250, imgLocationY);
            await expect(await getAttributeByName(displayedImg, imgSource, 3)).not.toBe(firstImg);
        });
    });

    describe('carousel with navigation inside content area example', () => {
        it('should check navigation buttons shown on hover', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(displayedImg, 4);
            await mouseHoverElement(displayedImg, 4);
            await expect(await waitForElDisplayed(contentNavBtns)).toBe(true, 'nav buttons not displyed on hover');

            await scrollIntoView(sectionTitle, 6);
            await mouseHoverElement(sectionTitle, 6);
            await expect(await isElementDisplayed(contentNavBtns)).toBe(
                false,
                'nav buttons displayed when mouse not hovering img'
            );
        });

        it('should check numbered pagination', async () => {
            await waitForElDisplayed(numberedPagination);
            await expect((await getText(numberedPagination)).trim()).toBe(numberedPages);
        });

        it('should check navigation', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(displayedImg, 4);
            await mouseHoverElement(displayedImg, 4);
            await waitForElDisplayed(contentNavBtns);
            await checkCarouselNavigation(4, 13);
        });
    });

    describe('carousel with looped navigation example', () => {
        it('should check loop navigation', async () => {
            const firstImg = await getAttributeByName(displayedImg, imgSource, 5);

            await click(navBtns, 14);
            // pause for animation to complete
            await pause(1500);
            await expect(await getAttributeByName(displayedImg, imgSource, 5)).not.toBe(firstImg);

            await click(navBtns, 15);
            // pause for animation to complete
            await pause(1500);
            await expect(await getAttributeByName(displayedImg, imgSource, 5)).toBe(firstImg);
        });
    });

    describe('carousel error message when no item is loaded example', () => {
        it('should check error message', async () => {
            await expect(await getText(errorMsg)).toBe(loadErrorMsg);
        });
    });

    describe('carousel item loading indicator examples', () => {
        // TODO: not working
        it('should check busy indicator visible', async () => {
            await scrollIntoView(disableLoadingBtn);
            await expect(await waitForElDisplayed(busyIndicator)).toBe(true);
        });

        it('should check disabling busy indicator', async () => {
            await click(disableLoadingBtn, 2);
            const isDisplayed = await $(busyIndicator).isDisplayed();
            await expect(isDisplayed).toBeFalsy();
        });
    });

    describe('orientation checks', () => {
        it('should check rtl, ltr orientations', async () => {
            await carouselPage.checkRtlSwitch();
        });
    });

    async function checkCarouselNavigation(imgIndex: number, nextImgBtnIndex: number): Promise<void> {
        const firstImg = await getAttributeByName(displayedImg, imgSource, imgIndex);

        await scrollIntoView(navBtns, nextImgBtnIndex);
        await click(navBtns, nextImgBtnIndex);
        // pause for animation to finish
        await pause(1500);
        await expect(await getAttributeByName(displayedImg, imgSource, imgIndex)).not.toBe(firstImg);
        await click(navBtns, nextImgBtnIndex - 1);
        // pause for animation to finish
        await pause(1500);
        await expect(await getAttributeByName(displayedImg, imgSource, imgIndex)).toBe(firstImg);
    }
});
