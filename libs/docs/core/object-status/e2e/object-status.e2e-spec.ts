import { ObjectStatusPo } from './object-status.po';
import {
    getElementArrayLength,
    getElementClass,
    getTextArr,
    waitForElDisplayed,
    checkElArrIsClickable
} from '../../../../../e2e';
import { genericColorText, objStatusText, semanticText } from './object-status-contents';

describe('Object Status test suite', () => {
    const objectStatusPage = new ObjectStatusPo();
    const {
        iconExamples,
        textExamples,
        textAndIconExamples,
        colorsExamples,
        clickableExamples,
        invertedExamples,
        invertedColorExamples,
        largeExamples,
        status,
        text,
        icons
    } = objectStatusPage;

    beforeAll(async () => {
        await objectStatusPage.open();
    }, 1);

    describe('object status icon only examples', () => {
        it('should check icons present', async () => {
            const iconCount = await getElementArrayLength(iconExamples + icons);

            for (let i = 0; i < iconCount; i++) {
                expect(await waitForElDisplayed(iconExamples + icons, i));
            }
        });
    });

    describe('object status text only examples', () => {
        it('should check text value', async () => {
            await checkObjectValues(textExamples + text, semanticText);
        });
    });

    describe('object status with text and icon examples', () => {
        it('should check text value', async () => {
            await checkObjectValues(textAndIconExamples + text, semanticText);
        });
    });

    describe('object status with generic indication colors examples', () => {
        it('should check text value', async () => {
            await checkObjectValues(colorsExamples + text, genericColorText);
        });
    });

    describe('clickable object status examples', () => {
        it('should check text value', async () => {
            const objTextValues = semanticText.concat(genericColorText);
            await checkObjectValues(clickableExamples + text, objTextValues);
        });

        it('should check objects are clickable', async () => {
            await checkElArrIsClickable(clickableExamples + status);
        });
    });

    describe('inverted object status examples', () => {
        it('should check text value', async () => {
            await checkObjectValues(invertedExamples + text, objStatusText);
        });
    });

    describe('inverted object status with generic indication colors examples', () => {
        it('should check text value', async () => {
            await checkObjectValues(invertedColorExamples + text, genericColorText);
        });
    });

    describe('object status large design examples', () => {
        it('should check object status is large', async () => {
            const objectCount = await getElementArrayLength(largeExamples);
            for (let i = 0; i < objectCount; i++) {
                await expect(await getElementClass(largeExamples + status, i)).toContain('large');
            }
        });

        it('should check text value', async () => {
            await checkObjectValues(largeExamples + text, objStatusText);
        });
    });

    describe('check orientation', () => {
        it('should check RTL and LTR', async () => {
            await objectStatusPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await objectStatusPage.saveExampleBaselineScreenshot();
            await expect(await objectStatusPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

async function checkObjectValues(selector, dataArr): Promise<void> {
    const textValue = await getTextArr(selector);
    await expect(textValue).toEqual(dataArr);
}
