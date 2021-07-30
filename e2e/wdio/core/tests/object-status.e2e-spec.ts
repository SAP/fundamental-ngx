import { ObjectStatusPo } from '../pages/object-status.po';
import {
    getAttributeByName,
    getElementArrayLength,
    getTextArr,
    waitForElDisplayed
} from '../../driver/wdio';
import {
    semanticText, genericColorText, objStatusText, sizeAttr
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
    });

    describe('object status text only examples', function() {
        it('should check text value', () => {
            checkObjectValues(textExamples + text, semanticText);
        });
    });

    describe('object status with text and icon examples', function() {
        it('should check text value', () => {
            checkObjectValues(textAndIconExamples + text, semanticText);
        });
    });

    describe('object status with generic indication colors examples', function() {
        it('should check text value', () => {
            checkObjectValues(colorsExamples + text, genericColorText);
        });
    });

    describe('clickable object status examples', function() {
        it('should check text value', () => {
            const objTextValues = semanticText.concat(genericColorText);
            checkObjectValues(clickableExamples + text, objTextValues);
        });

        it('should check objects are clickable', () => {
            checkElArrIsClickable(clickableExamples + status);
        });
    });

    describe('inverted object status examples', function() {
        it('should check text value', () => {
            checkObjectValues(invertedExamples + text, objStatusText);
        });
    });

    describe('inverted object status with generic indication colors examples', function() {
        it('should check text value', () => {
            checkObjectValues(invertedColorExamples + text, genericColorText);
        });
    });

    describe('object status large design examples', function() {
        xit('should check object status is large', () => {
            const objectCount = getElementArrayLength(largeExamples);
            for (let i = 0; i < objectCount; i++) {
                expect(getAttributeByName(largeExamples + status, sizeAttr, i)).toBe('true');
            }
        });

        it('should check text value', () => {
            checkObjectValues(largeExamples + text, objStatusText);
        });
    });

    describe('check orientation', function() {
        it('should check RTL and LTR', () => {
            objectStatusPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            objectStatusPage.saveExampleBaselineScreenshot();
            expect(objectStatusPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

function checkObjectValues(selector, dataArr): void {
    const textValue = getTextArr(selector);
    expect(textValue).toEqual(dataArr);
}
