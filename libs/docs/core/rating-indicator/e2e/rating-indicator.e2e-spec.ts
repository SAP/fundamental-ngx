import { RatingIndicatorPo } from './rating-indicator.po';
import {
    click,
    currentPlatformName,
    doesItExist,
    getElementArrayLength,
    getText,
    getValue,
    isElementClickable,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Rating indicator test suite', () => {
    const ratingIndicatorPage = new RatingIndicatorPo();

    const {
        starsRatingExamples,
        sizeRatingIndicator,
        starsRatingDisabledMode,
        starsRatingDynamicChanges,
        containerDynamicChanges,
        inputsDynamicChanges,
        touchedInputsDynamicChanges,
        inputsBasicExample,
        touchedInputsBasicExample,
        starsRatingDisplayMode,
        textDisplayMode
    } = ratingIndicatorPage;

    beforeAll(() => {
        ratingIndicatorPage.open();
    }, 1);

    describe('Test rating indicator with predefined ratings object', () => {
        it('verify that amount of stars is 5', () => {
            const lengthOfStars = getElementArrayLength(starsRatingExamples) - 1;
            expect(lengthOfStars).toBe(5);
        });

        it('verify that popover is shown after hover over the mouse', () => {
            const length = getElementArrayLength(sizeRatingIndicator);
            for (let i = 0; i < length; i++) {
                scrollIntoView(sizeRatingIndicator, i);
                mouseHoverElement(sizeRatingIndicator, i);
                expect(doesItExist(starsRatingDisabledMode)).toBe(true, `Size rating ${i} not have popover`);
                refreshPage(true);
            }
        });

        it('verify that star is disabled', () => {
            const lengthOfStars = getElementArrayLength(starsRatingDisabledMode);
            for (let i = 1; i < lengthOfStars; i++) {
                expect(isElementClickable(starsRatingDisabledMode, i)).toBe(
                    false,
                    `${starsRatingDisabledMode} ${i} not clickable`
                );
            }
        });

        it('should check that minimal value in input is 1', () => {
            click(inputsBasicExample);
            for (let i = parseFloat(getValue(inputsBasicExample)); i > 0; i = i - 0.1) {
                sendKeys('ArrowDown');
            }
            sendKeys('ArrowDown');
            expect(getValue(touchedInputsBasicExample)).toBe('0');
        });
    });

    describe('Test dynamic changes', () => {
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
            expect(isElementClickable(starsRatingDynamicChanges)).toBe(
                false,
                `${starsRatingDynamicChanges} not clickable`
            );
        });

        it('verify that stars are in display mode', () => {
            scrollIntoView(inputsDynamicChanges);
            click(inputsDynamicChanges);
            expect(getElementArrayLength(containerDynamicChanges)).toBe(
                2,
                `${starsRatingDisabledMode} stars are not in display mode`
            );
        });

        it('should check that minimal value in input is 1', () => {
            if (currentPlatformName() !== 'windows') {
                return;
            }
            refreshPage();
            waitForPresent(ratingIndicatorPage.root);
            waitForElDisplayed(ratingIndicatorPage.title);
            click(inputsDynamicChanges);
            // eslint-disable-next-line radix
            for (let i = parseInt(getValue(inputsDynamicChanges)); i !== 1; i--) {
                sendKeys('ArrowDown');
            }
            sendKeys('ArrowDown');
            expect(getValue(touchedInputsDynamicChanges)).toBe('1');
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7268
        xit('should check selecting rating indicator stars and that text is correct in label', () => {
            scrollIntoView(starsRatingDisplayMode);
            const starsLength = getElementArrayLength(starsRatingDisplayMode);
            for (let i = 0; i < starsLength; i++) {
                click(starsRatingDisplayMode, i);
                expect(getText(textDisplayMode)).toBe(`(${i + 1} of ${starsLength})`);
            }
        });
    });

    it('should check RTL and LTR orientation', () => {
        ratingIndicatorPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            ratingIndicatorPage.saveExampleBaselineScreenshot();
            expect(ratingIndicatorPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
