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

    beforeAll(async () => {
        await objectNumberPage.open();
    }, 1);

    describe('main checks', () => {
        it('should check elements displayed and unit property', async () => {
            const objectCount = await getElementArrayLength(allExamples);

            for (let i = 0; i < objectCount; i++) {
                await scrollIntoView(allExamples, i);
                await expect(await waitForElDisplayed(allExamples, i)).toBe(true);
                await expect([null, '']).not.toContain(await getAttributeByName(allExamples, unitAttr, i));
            }
        });
    });

    describe('basic object number examples', () => {
        xit('should check values', async () => {
            await checkObjectValues(basicExamples, basicExamplesText);
        });
    });

    describe('object number status examples', () => {
        it('should check object number status examples', async () => {
            await checkObjectValues(objStatusExamples, objStatusExamplesText);
        });
    });

    describe('large object number examples', () => {
        it('should check values', async () => {
            await checkObjectValues(largeObjExamples, styledObjExampleText);
        });

        it('should check large font', async () => {
            const objectCount = await getElementArrayLength(largeObjExamples);

            for (let i = 0; i < objectCount; i++) {
                // in prod mode missed attr: ng-reflect-large
                // expect(getAttributeByName(largeObjExamples, largeFont, i)).toEqual('true');
            }
        });
    });

    describe('bold object number examples', () => {
        it('should check values', async () => {
            await checkObjectValues(boldObjExamples, styledObjExampleText);
        });

        it('should check bold font', async () => {
            const objectCount = await getElementArrayLength(boldObjExamples);

            for (let i = 0; i < objectCount; i++) {
                await expect(await getElementClass(boldObjExampleText)).toContain('bold');
            }
        });
    });

    describe('object number units examples', () => {
        it('should check values', async () => {
            await checkObjectValues(unitObjExamples, objUnitExamplesText);
        });
    });

    describe('object number decimal examples', () => {
        it('should check values', async () => {
            await checkObjectValues(decimalObjExamples, objDecimalExamplesText);
        });
    });

    describe('object number decimal examples', () => {
        it('should check values', async () => {
            await checkObjectValues(truncationObjExample, objTruncationText);
        });
    });

    describe('check orientation', () => {
        it('should check RTL and LTR', async () => {
            await objectNumberPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await objectNumberPage.saveExampleBaselineScreenshot();
            await expect(await objectNumberPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

async function checkObjectValues(selector, dataArr): Promise<void> {
    const objectCount = await getElementArrayLength(selector);

    for (let i = 0; i < objectCount; i++) {
        const unitValue = await getAttributeByName(selector, unitAttr, i);
        const textValue = (await getText(selector + ' .fd-object-number__text', i)).trim();
        await expect(textValue + ' ' + unitValue).toEqual(dataArr[i] + ' ' + unitValue);
    }
}
