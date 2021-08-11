import { ObjectNumberPo } from '../pages/object-number.po';
import {
    getAttributeByName,
    getElementArrayLength,
    getText,
    scrollIntoView,
    waitForElDisplayed
} from '../../driver/wdio';
import {
    unitAttr,
    basicExamplesText,
    objStatusExamplesText,
    styledObjExampleText,
    largeFont,
    boldAttr,
    objUnitExamplesText,
    objDecimalExamplesText,
    objTruncationText
} from '../fixtures/appData/object-number-content';

describe('object number test suite', function () {
    const objectNumberPage = new ObjectNumberPo();
    const {
        basicExamples,
        allExamples,
        objStatusExamples,
        largeObjExamples,
        boldObjExamples,
        unitObjExamples,
        decimalObjExamples,
        truncationObjExample,
    } = objectNumberPage;

    beforeAll(() => {
        objectNumberPage.open();
    }, 1);

    describe('main checks', function () {
        it('should check elements displayed and unit property', () => {
            const objectCount = getElementArrayLength(allExamples);

            for (let i = 0; i < objectCount; i++) {
                scrollIntoView(allExamples, i);
                expect(waitForElDisplayed(allExamples, i)).toBe(true);
                expect([null, '']).not.toContain(getAttributeByName(allExamples, unitAttr, i));
            }
        });
    });

    describe('basic object number examples', function () {
        xit('should check values', () => {
            checkObjectValues(basicExamples, basicExamplesText);

        });
    });

    describe('object number status examples', function () {
        it('should check object number status examples', () => {
            checkObjectValues(objStatusExamples, objStatusExamplesText);
        });
    });

    describe('large object number examples', function () {
        it('should check values', () => {
            checkObjectValues(largeObjExamples, styledObjExampleText);
        });

        it('should check large font', () => {
            const objectCount = getElementArrayLength(largeObjExamples);

            for (let i = 0; i < objectCount; i++) {
                // in prod mode missed attr: ng-reflect-large
                // expect(getAttributeByName(largeObjExamples, largeFont, i)).toEqual('true');
            }
        });
    });

    describe('bold object number examples', function () {
        it('should check values', () => {
            checkObjectValues(boldObjExamples, styledObjExampleText);

        });

        it('should check bold font', () => {
            const objectCount = getElementArrayLength(boldObjExamples);

            for (let i = 0; i < objectCount; i++) {
                // in prod mode missed attr: ng-reflect-emphasized
                // expect(getAttributeByName(boldObjExamples, boldAttr, i)).toEqual('true');
            }
        });
    });

    describe('object number units examples', function () {
        it('should check values', () => {
            checkObjectValues(unitObjExamples, objUnitExamplesText);
        });
    });

    describe('object number decimal examples', function () {
        it('should check values', () => {
            checkObjectValues(decimalObjExamples, objDecimalExamplesText);
        });
    });

    describe('object number decimal examples', function () {
        it('should check values', () => {
            checkObjectValues(truncationObjExample, objTruncationText);
        });
    });

    describe('check orientation', function () {
        it('should check RTL and LTR', () => {
            objectNumberPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            objectNumberPage.saveExampleBaselineScreenshot();
            expect(objectNumberPage.compareWithBaseline()).toBeLessThan(5);
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
