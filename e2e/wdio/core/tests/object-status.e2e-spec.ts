import { ObjectStatusPo } from '../pages/object-status.po';
import {
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getTextArr,
    waitForElDisplayed
} from '../../driver/wdio';
import {
    statusAttr, colorAttr, semanticColors, semanticText, indicatorAttr, genericColors, genericColorText,
    objStatusText, backgroundColorAttr, invertedColor, sizeAttr, invertedSemanticColors
} from '../fixtures/appData/object-status-contents';
import { checkElArrIsClickable } from '../../helper/assertion-helper';

describe('Object Status test suite', function() {
    const objectStatusPage = new ObjectStatusPo();
    const {
        iconExamples, textExamples, textAndIconExamples, colorsExamples, clickableExamples, invertedExamples,
        invertedColorExamples, largeExamples, status, text, icons
    } = objectStatusPage;

    beforeAll(() => {
        objectStatusPage.open();
    }, 1);

    describe('object status icon only examples', function() {
        it('should check icons present', () => {
            const iconCount = getElementArrayLength(iconExamples + icons);

            for (let i = 0; i < iconCount; i++) {
                expect(waitForElDisplayed(iconExamples + icons, i));
            }
        });

        xit('should check semantic colors', () => {
            checkObjectColors(iconExamples + status, iconExamples + text, statusAttr, colorAttr, semanticColors);
        });
    });

    describe('object status text only examples', function() {
        xit('should check text value and colors', () => {
            checkObjectValues(textExamples + text, semanticText);
            checkObjectColors(textExamples + status, textExamples + text, statusAttr, colorAttr, semanticColors);
        });
    });

    describe('object status with text and icon examples', function() {
        xit('should check text value and colors', () => {
            checkObjectValues(textAndIconExamples + text, semanticText);
            checkObjectColors(textAndIconExamples + status, textAndIconExamples + text, statusAttr, colorAttr, semanticColors);
            // skip until issue fixed https://github.com/SAP/fundamental-ngx/issues/4493
            // checkObjectColors(textAndIconExamples + status, textAndIconExamples + icons, colorAttr, semanticColors);
        });
    });

    describe('object status with generic indication colors examples', function() {
        xit('should check text value and colors', () => {
            checkObjectValues(colorsExamples + text, genericColorText);
            checkObjectColors(colorsExamples + status, colorsExamples + text, indicatorAttr, colorAttr, genericColors);
        });
    });

    describe('clickable object status examples', function() {
        xit('should check text value and colors', () => {
            const objTextValues = semanticText.concat(genericColorText);
            const objectCount = getElementArrayLength(clickableExamples + status);

            for (let i = 0; i < objectCount; i++) {
                checkObjectValues(clickableExamples + text, objTextValues);
                if (i < 5) {
                    const objectStatus = getAttributeByName(clickableExamples + status, statusAttr, i);
                    expect(getCSSPropertyByName(clickableExamples + status, colorAttr, i).value).toContain(semanticColors[objectStatus]);
                    continue;
                }
                const objectIndicator = getAttributeByName(clickableExamples + status, indicatorAttr, i);
                expect(getCSSPropertyByName(clickableExamples + status, colorAttr, i).value).toContain(genericColors[objectIndicator]);
            }
        });

        it('should check objects are clickable', () => {
            checkElArrIsClickable(clickableExamples + status);
        });
    });

    describe('inverted object status examples', function() {
        xit('should check text value and colors', () => {
            checkObjectValues(invertedExamples + text, objStatusText);
            checkObjectColors(invertedExamples + status, invertedExamples + status, statusAttr, backgroundColorAttr, invertedSemanticColors);
        });
    });

    describe('inverted object status with generic indication colors examples', function() {
        xit('should check text value and inverted colors', () => {
            checkObjectValues(invertedColorExamples + text, genericColorText);
            checkObjectColors(invertedColorExamples + status, invertedColorExamples + status, indicatorAttr, backgroundColorAttr, genericColors);

            const objectCount = getElementArrayLength(invertedColorExamples);
            for (let i = 0; i < objectCount; i++) {
                expect(getCSSPropertyByName(invertedColorExamples + text, colorAttr, i).value).toContain(invertedColor);
            }
        });
    });

    describe('object status large design examples', function() {
        it('should check object status is large', () => {
            const objectCount = getElementArrayLength(largeExamples);
            for (let i = 0; i < objectCount; i++) {
                expect(getAttributeByName(largeExamples + status, sizeAttr, i)).toBe('true');
            }
        });

        xit('should check text value and color', () => {
            const objectCount = getElementArrayLength(largeExamples);

            for (let i = 0; i < objectCount; i++) {
                const objectStatus = getAttributeByName(largeExamples + status, statusAttr, i);
                if (i < 4) {
                    expect(getCSSPropertyByName(largeExamples + status, backgroundColorAttr, i).value)
                        .toContain(invertedSemanticColors[objectStatus]);
                    expect(getCSSPropertyByName(largeExamples + icons, colorAttr, i).value).toContain(invertedColor);
                }
                if (i > 3 && i < 19) {
                    expect(getCSSPropertyByName(largeExamples + status, colorAttr, i).value)
                        .toContain(semanticColors[objectStatus]);
                }
                if (i > 18) {
                    expect(getCSSPropertyByName(largeExamples + status, backgroundColorAttr, i).value)
                        .toContain(invertedSemanticColors[objectStatus]);
                    expect(getCSSPropertyByName(largeExamples + text, colorAttr, i).value).toContain(invertedColor);
                }
            }
            checkObjectValues(largeExamples + text, objStatusText);
        });
    });

    describe('check orientation', function() {
        it('should check RTL and LTR', () => {
            objectStatusPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        xit('should check examples visual regression', () => {
            objectStatusPage.saveExampleBaselineScreenshot();
            expect(objectStatusPage.compareWithBaseline()).toBeLessThan(3);
        });
    });

});

function checkObjectValues(selector, dataArr): void {
    const textValue = getTextArr(selector);
    expect(textValue).toEqual(dataArr);
}

function checkObjectColors(attrSelector, textSelector, statAttr, colorsAttr, colorsArr): void {
    const objectCount = getElementArrayLength(textSelector);

    for (let i = 0; i < objectCount; i++) {
        const objectStatus = getAttributeByName(attrSelector, statAttr, i);

        expect(getCSSPropertyByName(textSelector, colorsAttr, i).value).toContain(colorsArr[objectStatus]);
    }
}
