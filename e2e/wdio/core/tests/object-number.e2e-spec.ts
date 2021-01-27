import { ObjectNumberPo } from '../pages/object-number.po';
import {
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    scrollIntoView,
    waitForElDisplayed
} from '../../driver/wdio';
import {
    unitAttr, statusAttr, colorAttr, basicExamplesText, statusColors, objStatusExamplesText, styledObjExampleText,
    largeFont, boldAttr, objUnitExamplesText, objDecimalExamplesText
} from '../fixtures/appData/object-number-content';

describe('object number test suite', function() {
    const objectNumberPage = new ObjectNumberPo();
    const {
        basicExamples, allExamples, objStatusExamples, largeObjExamples, boldObjExamples, unitObjExamples,
        decimalObjExamples, objectNumberText, objectNumberUnit
    } = objectNumberPage;

    beforeAll(() => {
        objectNumberPage.open();
    }, 1);

    describe('main checks', function() {
        it('should check elements displayed and unit property', () => {
            const objectCount = getElementArrayLength(allExamples);

            for (let i = 0; i < objectCount; i++) {
                scrollIntoView(allExamples, i);
                expect(waitForElDisplayed(allExamples, i)).toBe(true);
                expect([null, '']).not.toContain(getAttributeByName(allExamples, unitAttr, i));
            }
        });
    });

    describe('basic object number examples', function() {
        it('should check colors and values', () => {
            checkObjectValues(basicExamples, basicExamplesText);
            checkStatusColors(basicExamples, objectNumberText(basicExamples), statusColors);
            checkStatusColors(basicExamples, objectNumberUnit(basicExamples), statusColors);
        });
    });

    describe('object number status examples', function() {
        it('should check object number status examples', () => {
            checkObjectValues(objStatusExamples, objStatusExamplesText);
            checkStatusColors(objStatusExamples, objectNumberText(objStatusExamples), statusColors);
            checkStatusColors(objStatusExamples, objectNumberUnit(objStatusExamples), statusColors);
        });
    });

    describe('large object number examples', function() {
        it('should check colors and values', () => {
            checkObjectValues(largeObjExamples, styledObjExampleText);
            checkStatusColors(largeObjExamples, objectNumberText(largeObjExamples), statusColors);
            checkStatusColors(largeObjExamples, objectNumberUnit(largeObjExamples), statusColors);
        });

        it('should check large font', () => {
            const objectCount = getElementArrayLength(largeObjExamples);

            for (let i = 0; i < objectCount; i++) {
                expect(getAttributeByName(largeObjExamples, largeFont, i)).toEqual('true');
            }
        });
    });

    describe('bold object number examples', function() {
        it('should check colors and values', () => {
            checkObjectValues(boldObjExamples, styledObjExampleText);
            checkStatusColors(boldObjExamples, objectNumberText(boldObjExamples), statusColors);
            checkStatusColors(boldObjExamples, objectNumberUnit(boldObjExamples), statusColors);
        });

        it('should check bold font', () => {
            const objectCount = getElementArrayLength(boldObjExamples);

            for (let i = 0; i < objectCount; i++) {
                expect(getAttributeByName(boldObjExamples, boldAttr, i)).toEqual('true');
            }
        });
    });

    describe('object number units examples', function() {
        it('should check colors and values', () => {
            checkObjectValues(unitObjExamples, objUnitExamplesText);
            checkStatusColors(unitObjExamples, objectNumberText(unitObjExamples), statusColors);
            checkStatusColors(unitObjExamples, objectNumberUnit(unitObjExamples), statusColors);
        });
    });

    describe('object number decimal examples', function() {
        it('should check colors and values', () => {
            checkObjectValues(decimalObjExamples, objDecimalExamplesText);
            checkStatusColors(decimalObjExamples, objectNumberText(decimalObjExamples), statusColors);
            checkStatusColors(decimalObjExamples, objectNumberUnit(decimalObjExamples), statusColors);
        });
    });
});

function checkObjectValues(selector, dataArr): void {
    const objectCount = getElementArrayLength(selector);

    for (let i = 0; i < objectCount; i++) {
        const unitValue = getAttributeByName(selector, unitAttr, i);
        const textValue = getText(selector, i);

        expect(textValue).toEqual(dataArr[i] + ' ' + unitValue);
    }
}

function checkStatusColors(attrSelector, textSelector, colorsArr): void {
    const objectCount = getElementArrayLength(textSelector);

    for (let i = 0; i < objectCount; i++) {
        const objectStatus = getAttributeByName(attrSelector, statusAttr, i);

        expect(getCSSPropertyByName(textSelector, colorAttr, i).value).toContain(colorsArr[objectStatus]);
    }
}
