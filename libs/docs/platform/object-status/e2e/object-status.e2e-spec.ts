import { ObjectStatusPo } from './object-status.po';
import {
    acceptAlert,
    checkElementDisplayed,
    checkElementTextValue,
    click,
    getElementArrayLength,
    getElementClass,
    getText,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../../../../e2e';
import { defaultStatusText, indicationColorText, semanticStatusText } from './object-status-contents';

describe('object status test suite', () => {
    const objectStatusPage = new ObjectStatusPo();
    const {
        defaultExamples,
        textOnlyExamples,
        textAndIconExamples,
        indicationColorExamples,
        clickableExamples,
        invertedExamples,
        invertedIndicationColorExamples,
        largeExamples,
        icons,
        text,
        status
    } = objectStatusPage;

    beforeAll(async () => {
        await objectStatusPage.open();
    }, 1);

    describe('default object status example', () => {
        it('should check default status', async () => {
            await expect(await getText(defaultExamples + text)).toBe(defaultStatusText);
        });
    });

    describe('object status text only example', () => {
        it('should check text values', async () => {
            await scrollIntoView(textOnlyExamples + text);
            await checkElementTextValue(textOnlyExamples + text, semanticStatusText);
        });
    });

    describe('object status with text and icon example', () => {
        it('should check text values', async () => {
            await scrollIntoView(textAndIconExamples + text);
            await checkElementTextValue(textAndIconExamples + text, semanticStatusText);
        });

        it('should check icons and icon colors', async () => {
            await checkElementDisplayed(textAndIconExamples + icons);
        });
    });

    describe('object status with generic indication colors example', () => {
        it('should check text values', async () => {
            await scrollIntoView(indicationColorExamples + text);
            await checkElementTextValue(indicationColorExamples + text, indicationColorText);
        });
    });

    describe('clickable object status example', () => {
        it('should check statuses are clickable', async () => {
            const statusCount = await getElementArrayLength(clickableExamples + status);

            for (let i = 0; statusCount > i; i++) {
                await scrollIntoView(clickableExamples + status, i);
                await click(clickableExamples + status, i);
                await acceptAlert();
            }
        });
    });

    describe('inverted object status example', () => {
        // TODO: write appropriate e2e
        xit('should check status is inverted', async () => {
            const statusCount = await getElementArrayLength(invertedExamples + status);

            for (let i = 0; i < statusCount; i++) {
                await scrollIntoView(invertedExamples + status);
            }
        });
    });

    describe('inverted object status with generic indication colors example', () => {
        it('should check status is inverted', async () => {
            const statusCount = await getElementArrayLength(invertedIndicationColorExamples + status);

            for (let i = 0; i < statusCount; i++) {
                await scrollIntoView(invertedIndicationColorExamples + status);
                await expect(await getElementClass(invertedIndicationColorExamples + status + ' span')).toContain(
                    'fd-object-status--inverted'
                );
            }
        });
    });

    describe('object status large design example', () => {
        // TODO: write appropriate e2e
        xit('should check large status', async () => {
            const statusCount = await getElementArrayLength(largeExamples + status);

            for (let i = 0; i < statusCount; i++) {
                await scrollIntoView(largeExamples + status);
            }
        });
    });

    describe('Orientation check', () => {
        it('should check RTL/LTR', async () => {
            await objectStatusPage.checkRtlSwitch();
        });
    });

    xdescribe('Visual regression', () => {
        it('should check examples visual regression', async () => {
            await refreshPage();
            await waitForPresent(defaultExamples + status);
            await objectStatusPage.saveExampleBaselineScreenshot();
            await expect(await objectStatusPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
