import {
    click,
    currentPlatformName,
    doesItExist,
    getElementArrayLength,
    getValue,
    isElementClickable,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { RatingIndicatorPo } from './rating-indicator.po';

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
        touchedInputsBasicExample
    } = ratingIndicatorPage;

    beforeAll(async () => {
        await ratingIndicatorPage.open();
    }, 1);

    describe('Test rating indicator with predefined ratings object', () => {
        it('verify that amount of stars is 5', async () => {
            const lengthOfStars = (await getElementArrayLength(starsRatingExamples)) - 1;
            await expect(lengthOfStars).toBe(5);
        });

        it('verify that popover is shown after hover over the mouse', async () => {
            const length = await getElementArrayLength(sizeRatingIndicator);
            for (let i = 0; i < length; i++) {
                await scrollIntoView(sizeRatingIndicator, i);
                await mouseHoverElement(sizeRatingIndicator, i);
                await expect(await doesItExist(starsRatingDisabledMode)).toBe(
                    true,
                    `Size rating ${i} not have popover`
                );
                await refreshPage(true);
            }
        });

        it('verify that star is disabled', async () => {
            const lengthOfStars = await getElementArrayLength(starsRatingDisabledMode);
            for (let i = 1; i < lengthOfStars; i++) {
                await expect(await isElementClickable(starsRatingDisabledMode, i)).toBe(
                    false,
                    `${starsRatingDisabledMode} ${i} not clickable`
                );
            }
        });

        it('should check that minimal value in input is 1', async () => {
            await click(inputsBasicExample);
            for (let i = parseFloat(await getValue(inputsBasicExample)); i > 0; i = i - 0.1) {
                await sendKeys('ArrowDown');
            }
            await sendKeys('ArrowDown');
            await expect(await getValue(touchedInputsBasicExample)).toBe('0');
        });
    });

    // TODO: This needs to be rewritten for playground.
    xdescribe('Test dynamic changes', () => {
        it('verify that amount of stars changed', async () => {
            const starCount = 7;
            await scrollIntoView(inputsDynamicChanges);
            await setValue(inputsDynamicChanges, starCount + '');
            const starLength = (await getElementArrayLength(starsRatingDynamicChanges)) - 1;
            await expect(starLength).toBe(starCount);
        });

        it('verify that it is allowed to select half of star', async () => {
            const lengthOfStarsBeforeChanges = (await getElementArrayLength(starsRatingDynamicChanges)) - 1;
            await scrollIntoView(inputsDynamicChanges);
            await click(inputsDynamicChanges);
            const lengthOfStarsAfterChanges = (await getElementArrayLength(starsRatingDynamicChanges)) - 1;
            await expect(lengthOfStarsBeforeChanges * 2).toBe(lengthOfStarsAfterChanges);
        });

        it('verify that star is disabled', async () => {
            await scrollIntoView(inputsDynamicChanges);
            await click(inputsDynamicChanges);
            await expect(await isElementClickable(starsRatingDynamicChanges)).toBe(
                false,
                `${starsRatingDynamicChanges} not clickable`
            );
        });

        it('verify that stars are in display mode', async () => {
            await scrollIntoView(inputsDynamicChanges);
            await click(inputsDynamicChanges);
            await expect(await getElementArrayLength(containerDynamicChanges)).toBe(
                2,
                `${starsRatingDisabledMode} stars are not in display mode`
            );
        });

        it('should check that minimal value in input is 1', async () => {
            if ((await currentPlatformName()) !== 'windows') {
                return;
            }
            await refreshPage();
            await ratingIndicatorPage.waitForRoot();
            await waitForElDisplayed(ratingIndicatorPage.title);
            await click(inputsDynamicChanges);
            for (let i = parseInt(await getValue(inputsDynamicChanges)); i !== 1; i--) {
                await sendKeys('ArrowDown');
            }
            await sendKeys('ArrowDown');
            await expect(await getValue(touchedInputsDynamicChanges)).toBe('1');
        });
    });

    it('should check RTL and LTR orientation', async () => {
        await ratingIndicatorPage.checkRtlSwitch();
    });
});
