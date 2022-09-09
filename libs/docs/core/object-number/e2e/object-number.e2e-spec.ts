import { ObjectNumberPo } from './object-number.po';
import {
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import {
    basicExamplesText,
    objDecimalExamplesText,
    objStatusExamplesText,
    objTruncationText,
    objUnitExamplesText,
    styledObjExampleText,
    unitAttr
} from './object-number-content';

describe('object number test suite', () => {
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
        boldObjExampleText
    } = objectNumberPage;

    beforeAll(() => {
        objectNumberPage.open();
    }, 1);

    describe('main checks', () => {
        it('should check elements displayed and unit property', () => {
            const objectCount = getElementArrayLength(allExamples);

            for (let i = 0; i < objectCount; i++) {
                scrollIntoView(allExamples, i);
                expect(waitForElDisplayed(allExamples, i)).toBe(true);
                expect([null, '']).not.toContain(getAttributeByName(allExamples, unitAttr, i));
            }
        });
    });

    describe('basic object number examples', () => {
        xit('should check values', () => {
            checkObjectValues(basicExamples, basicExamplesText);
        });
    });

    describe('object number status examples', () => {
        it('should check object number status examples', () => {
            checkObjectValues(objStatusExamples, objStatusExamplesText);
        });
    });

    describe('large object number examples', () => {
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

    describe('bold object number examples', () => {
        it('should check values', () => {
            checkObjectValues(boldObjExamples, styledObjExampleText);
        });

        it('should check bold font', () => {
            const objectCount = getElementArrayLength(boldObjExamples);

            for (let i = 0; i < objectCount; i++) {
                expect(getElementClass(boldObjExampleText)).toContain('bold');
            }
        });
    });

    describe('object number units examples', () => {
        it('should check values', () => {
            checkObjectValues(unitObjExamples, objUnitExamplesText);
        });
    });

    describe('object number decimal examples', () => {
        it('should check values', () => {
            checkObjectValues(decimalObjExamples, objDecimalExamplesText);
        });
    });

    describe('object number decimal examples', () => {
        it('should check values', () => {
            checkObjectValues(truncationObjExample, objTruncationText);
        });
    });

    describe('check orientation', () => {
        it('should check RTL and LTR', () => {
            objectNumberPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
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
        const textValue = getText(selector + ' .fd-object-number__text', i).trim();
        expect(textValue + ' ' + unitValue).toEqual(dataArr[i] + ' ' + unitValue);
    }
}
