import { RatingIndicatorPo } from '../pages/rating-indicator.po';
import {
    click,
    mouseHoverElement,
    isElementClickable,
    doesItExist,
    getElementArrayLength,
    refreshPage,
    scrollIntoView,
    setValue, waitForPresent
} from '../../driver/wdio';

describe('Rating indicator test suite', function() {

    const ratingIndicatorPage = new RatingIndicatorPo();

    const {
        starsRatingExamples,
        sizeRatingIndicator,
        starsRatingDisplayMode,
        starsRatingDynamicChanges,
        containerDynamicChanges,
        inputsDynamicChanges
    } = ratingIndicatorPage;

    beforeAll(() => {
        ratingIndicatorPage.open();
    }, 1);

    describe('Test rating indicator with predefined ratings object', function() {

        it('verify that amount of stars is 5', () => {
            const lengthOfStars = getElementArrayLength(starsRatingExamples) - 1;
            expect(lengthOfStars).toBe(5);
        });

        it('verify that popover is shown after hover over the mouse', () => {
            const length = getElementArrayLength(sizeRatingIndicator);
            for (let i = 0; i < length; i++) {
                scrollIntoView(sizeRatingIndicator, i);
                mouseHoverElement(sizeRatingIndicator, i);
                expect(doesItExist(starsRatingDisplayMode)).toBe(true, `Size rating ${i} not have popover`);
                refreshPage();
            }
        });

        it('verify that star is disabled', () => {
            const lengthOfStars = getElementArrayLength(starsRatingDisplayMode);
            for (let i = 1; i < lengthOfStars; i++) {
                expect(isElementClickable(starsRatingDisplayMode, i)).toBe(false, `${starsRatingDisplayMode} ${i} not clickable`);
            }
        });
    });

    describe('Test dynamic changes', function() {

        it('verify that amount of stars changed', () => {
            const starCount = 7;
            scrollIntoView(inputsDynamicChanges);
            setValue(inputsDynamicChanges, starCount + '');
            const starLength = getElementArrayLength(starsRatingDynamicChanges) - 1;
            expect(starLength).toBe(starCount);
        });

        it('verify that it is allowed to select half of star', () => {
            const lengthOfStarsBeforeChanges = getElementArrayLength(starsRatingDynamicChanges) - 1;
            scrollIntoView(inputsDynamicChanges);
            click(inputsDynamicChanges);
            const lengthOfStarsAfterChanges = getElementArrayLength(starsRatingDynamicChanges) - 1;
            expect(lengthOfStarsBeforeChanges * 2).toBe(lengthOfStarsAfterChanges);
        });

        it('verify that star is disabled', () => {
            scrollIntoView(inputsDynamicChanges);
            click(inputsDynamicChanges);
            expect(isElementClickable(starsRatingDynamicChanges)).toBe(false, `${starsRatingDynamicChanges} not clickable`);
        });

        it('verify that stars are in display mode', () => {
            scrollIntoView(inputsDynamicChanges);
            click(inputsDynamicChanges);
            expect(getElementArrayLength(containerDynamicChanges)).toBe(2, `${starsRatingDisplayMode} stars are not in display mode`);
        });
    });

    it('should check RTL and LTR orientation', () => {
        ratingIndicatorPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            ratingIndicatorPage.saveExampleBaselineScreenshot();
            expect(ratingIndicatorPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
