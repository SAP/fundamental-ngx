import { ObjectStatusPo } from '../pages/object-status.po';
import { getAttributeByName, getCSSPropertyByName, getElementArrayLength, getText, waitForElDisplayed } from '../../driver/wdio';
import {
    statusAttr,
    colorAttr,
    semanticColors,
    semanticText,
    indicatorAttr,
    genericColors, genericColorText, objStatusText, backgroundColorAttr, invertedColor, sizeAttr, invertedSemanticColors
} from '../fixtures/appData/object-status-contents';
import { checkElArrIsClickable } from '../../helper/assertion-helper';

describe('', function() {
    const objectStatusPage = new ObjectStatusPo();
    const {
        objIcons, objText, objStatus, iconExamples, textExamples, textAndIconExamples, colorsExamples,
        clickableExamples, invertedExamples, invertedColorExamples, largeExamples
    } = objectStatusPage;

    beforeAll(() => {
        objectStatusPage.open();
    }, 1);

    describe('object status icon only examples', function() {
        it('should check icons present', () => {
            const iconCount = getElementArrayLength(objIcons(iconExamples));

            for (let i = 0; i < iconCount; i++) {
                expect(waitForElDisplayed(objIcons(iconExamples), i));
            }
        });

        it('should check semantic colors', () => {
            checkObjectColors(objStatus(iconExamples), objText(iconExamples), statusAttr, colorAttr, semanticColors);
        });
    });

    describe('object status text only examples', function() {
        it('should check text value and colors', () => {
            checkObjectValues(objText(textExamples), semanticText);
            checkObjectColors(objStatus(textExamples), objText(textExamples), statusAttr, colorAttr, semanticColors);
        });
    });

    describe('object status with text and icon examples', function() {
        it('should check text value and colors', () => {
            checkObjectValues(objText(textAndIconExamples), semanticText);
            checkObjectColors(objStatus(textAndIconExamples), objText(textAndIconExamples), statusAttr, colorAttr, semanticColors);
            // skip until issue fixed https://github.com/SAP/fundamental-ngx/issues/4493
            // checkObjectColors(objStatus(textAndIconExamples), objIcons(textAndIconExamples), colorAttr, semanticColors);
        });
    });

    describe('object status with generic indication colors examples', function() {
        it('should check text value and colors', () => {
            checkObjectValues(objText(colorsExamples), genericColorText);
            checkObjectColors(objStatus(colorsExamples), objText(colorsExamples), indicatorAttr, colorAttr, genericColors);
        });
    });

    describe('clickable object status examples', function() {
        it('should check text value and colors', () => {
            const objTextValues = semanticText.concat(genericColorText);
            const objectCount = getElementArrayLength(objStatus(clickableExamples));

            for (let i = 0; i < objectCount; i++) {
                if (i < 5) {
                    const objectStatus = getAttributeByName(objStatus(clickableExamples), statusAttr, i);
                    expect(getCSSPropertyByName(objStatus(clickableExamples), colorAttr, i).value).toContain(semanticColors[objectStatus]);
                }
                if (i >= 5) {
                    const objectIndicator = getAttributeByName(objStatus(clickableExamples), indicatorAttr, i);
                    expect(getCSSPropertyByName(objStatus(clickableExamples), colorAttr, i).value).toContain(genericColors[objectIndicator]);
                }
            }
            checkObjectValues(objText(clickableExamples), objTextValues);
        });

        it('should check objects are clickable', () => {
            checkElArrIsClickable(objStatus(clickableExamples));
        });
    });

    describe('inverted object status examples', function() {
        it('should check text value and colors', () => {
            checkObjectValues(objText(invertedExamples), objStatusText);
            checkObjectColors(objStatus(invertedExamples), objStatus(invertedExamples), statusAttr, backgroundColorAttr, invertedSemanticColors);
        });
    });

    describe('inverted object status with generic indication colors examples', function() {
        it('should check text value and inverted colors', () => {
            checkObjectValues(objText(invertedColorExamples), genericColorText);
            checkObjectColors(objStatus(invertedColorExamples), objStatus(invertedColorExamples), indicatorAttr, backgroundColorAttr, genericColors);

            const objectCount = getElementArrayLength(invertedColorExamples);
            for (let i = 0; i < objectCount; i++) {
                expect(getCSSPropertyByName(objText(invertedColorExamples), colorAttr, i).value).toContain(invertedColor);
            }
        });
    });

    describe('object status large design examples', function() {
        it('should check object status is large', () => {
            const objectCount = getElementArrayLength(largeExamples);
            for (let i = 0; i < objectCount; i++) {
                expect(getAttributeByName(objStatus(largeExamples), sizeAttr, i)).toBe('true');
            }
        });

        it('should check text value and color', () => {
            const objectCount = getElementArrayLength(largeExamples);

            for (let i = 0; i < objectCount; i++) {
                const objectStatus = getAttributeByName(objStatus(largeExamples), statusAttr, i);
                if (i < 4) {
                    expect(getCSSPropertyByName(objStatus(largeExamples), backgroundColorAttr, i).value)
                        .toContain(invertedSemanticColors[objectStatus]);
                    expect(getCSSPropertyByName(objIcons(largeExamples), colorAttr, i).value).toContain(invertedColor);
                }
                if (i > 3 && i < 19) {
                    expect(getCSSPropertyByName(objStatus(largeExamples), colorAttr, i).value)
                        .toContain(semanticColors[objectStatus]);
                }
                if (i > 18) {
                    expect(getCSSPropertyByName(objStatus(largeExamples), backgroundColorAttr, i).value)
                        .toContain(invertedSemanticColors[objectStatus]);
                    expect(getCSSPropertyByName(objText(largeExamples), colorAttr, i).value).toContain(invertedColor);
                }
            }
            checkObjectValues(objText(largeExamples), objStatusText);
        });
    });

    describe('check orientation', function() {
        it('should check RTL and LTR', () => {
            objectStatusPage.checkRtlSwitch();
        });
    });
});

function checkObjectValues(selector, dataArr): void {
    const objectCount = getElementArrayLength(selector);

    for (let i = 0; i < objectCount; i++) {
        const textValue = getText(selector, i);

        expect(textValue).toEqual(dataArr[i]);
    }
}

function checkObjectColors(attrSelector, textSelector, statAttr, colorsAttr, colorsArr): void {
    const objectCount = getElementArrayLength(textSelector);

    for (let i = 0; i < objectCount; i++) {
        const objectStatus = getAttributeByName(attrSelector, statAttr, i);

        expect(getCSSPropertyByName(textSelector, colorsAttr, i).value).toContain(colorsArr[objectStatus]);
    }
}
