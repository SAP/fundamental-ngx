import {
    checkElementScreenshot,
    click,
    getAttributeByName,
    getElementArrayLength,
    mouseHoverElement,
    saveElementScreenshot,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import { InlineHelpPo } from '../pages/inline-help.po';

describe('Inline help test suite', function() {
    const inlineHelpPage = new InlineHelpPo();
    const {
        inlineHelpIcons,
        inlineHelpInput,
        inlineHelpButton,
        inlineHelpStyledIcon,
        inlineHelpTemplateExample,
        exampleAreaContainersArr,
        inlineHelpExampleExtended
    } = inlineHelpPage;

    beforeAll(() => {
        inlineHelpPage.open();
    }, 1);

    it('Verify icons hover state', () => {
        const arr = getElementArrayLength(inlineHelpIcons);
        scrollIntoView(exampleAreaContainersArr);
        for (let i = 0, diff = 0; i < arr; i++, diff = 0) {
            mouseHoverElement(inlineHelpIcons, i);
            saveElementScreenshot(exampleAreaContainersArr, `inline-help-icon-${i}`, inlineHelpPage.getScreenshotFolder());
            checkElementScreenshot(exampleAreaContainersArr, `inline-help-icon-${i}`, inlineHelpPage.getScreenshotFolder());

            expect(diff).toBeLessThan(3, `Inline help icon ${i} has mismatch percentage of ${diff}%`);
            expect(getAttributeByName(inlineHelpIcons, 'fd-inline-help', i)).toContain('Inline Help Tooltip');
        }
    });

    it('Verify inline help input', () => {
        scrollIntoView(exampleAreaContainersArr);
        mouseHoverElement(inlineHelpInput);
        saveElementScreenshot(inlineHelpInput, `inline-help-input`, inlineHelpPage.getScreenshotFolder());
        const diff = checkElementScreenshot(exampleAreaContainersArr, `inline-help-input`, inlineHelpPage.getScreenshotFolder());

        expect(diff).toBeLessThan(3, `Inline help input has mismatch percentage of ${diff}%`);
        expect(getAttributeByName(inlineHelpInput, 'fd-inline-help')).toContain('Inline Help Tooltip');
    });

    it('Verify button inline help', () => {
        scrollIntoView(exampleAreaContainersArr, 1);
        click(inlineHelpButton);
        waitForPresent('fd-popover-body');
        saveElementScreenshot(inlineHelpExampleExtended, `inline-help-button`, inlineHelpPage.getScreenshotFolder(), 1);
        const diff = checkElementScreenshot(inlineHelpExampleExtended, `inline-help-button`, inlineHelpPage.getScreenshotFolder(), 1);

        expect(diff).toBeLessThan(3, `Inline help button has mismatch percentage of ${diff}%`);
        expect(getAttributeByName(inlineHelpButton, 'fd-inline-help')).toContain('Inline Help Tooltip');
    });

    it('Verify styled inline help icon', () => {
        scrollIntoView(exampleAreaContainersArr, 2);
        mouseHoverElement(inlineHelpStyledIcon);
        saveElementScreenshot(inlineHelpExampleExtended, `inline-help-styled-icon`, inlineHelpPage.getScreenshotFolder(), 2);
        const diff = checkElementScreenshot(inlineHelpExampleExtended, `inline-help-styled-icon`, inlineHelpPage.getScreenshotFolder(), 2);

        expect(diff).toBeLessThan(3, `Inline help styled icon has mismatch percentage of ${diff}%`);
        expect(getAttributeByName(inlineHelpStyledIcon, 'fd-inline-help')).toContain('Inline Help Tooltip');
    });

    it('Verify template inline help example', () => {
        scrollIntoView(exampleAreaContainersArr, 3);
        mouseHoverElement(inlineHelpTemplateExample);
        saveElementScreenshot(inlineHelpExampleExtended, `inline-help-template`, inlineHelpPage.getScreenshotFolder(), 3);
        const diff = checkElementScreenshot(inlineHelpExampleExtended, `inline-help-template`, inlineHelpPage.getScreenshotFolder(), 3);

        expect(diff).toBeLessThan(3, `Inline help template has mismatch percentage of ${diff}%`);
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            inlineHelpPage.saveExampleBaselineScreenshot();
            expect(inlineHelpPage.compareWithBaseline()).toBeLessThan(3);
        });
    });

    describe('Check orientation', function() {
        it('Verify RTL and LTR orientation', () => {
            inlineHelpPage.checkRtlSwitch();
        });
    });
});
