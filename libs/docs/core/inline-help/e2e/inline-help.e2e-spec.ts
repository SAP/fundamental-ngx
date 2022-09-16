import {
    browserIsSafari,
    click,
    getAttributeByName,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { InlineHelpPo } from './inline-help.po';
import { customMessage, defaultMessage } from './inline-help-contents';

describe('Inline help test suite', () => {
    const inlineHelpPage = new InlineHelpPo();
    const {
        inlineHelpIcons,
        inlineHelpInput,
        inlineHelpButton,
        inlineHelpStyledIcon,
        inlineHelpTemplateExample,
        exampleAreaContainersArr,
        popover,
        inlineHelp
    } = inlineHelpPage;

    beforeAll(() => {
        inlineHelpPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(inlineHelpPage.root);
        waitForElDisplayed(inlineHelpPage.title);
    }, 1);

    it('Verify icons hover tooltip', () => {
        const arr = getElementArrayLength(inlineHelpIcons);
        scrollIntoView(exampleAreaContainersArr);
        for (let i = 0; i < arr; i++) {
            mouseHoverElement(inlineHelpIcons, i);
            expect(getAttributeByName(inlineHelpIcons, 'fd-inline-help', i)).toContain('Inline Help Tooltip');
        }
    });

    it('Verify inline help input', () => {
        scrollIntoView(exampleAreaContainersArr);
        mouseHoverElement(inlineHelpInput);
        expect(getAttributeByName(inlineHelpInput, 'fd-inline-help')).toContain('Inline Help Tooltip');
    });

    it('Verify button inline help', () => {
        scrollIntoView(exampleAreaContainersArr, 1);
        click(inlineHelpButton);
        waitForPresent(popover);
        expect(getText(popover).trim()).toBe(defaultMessage);
    });

    it('Verify styled inline help icon', () => {
        // skipped due to hoverElement does not work in Safari
        if (browserIsSafari()) {
            return;
        }
        scrollIntoView(exampleAreaContainersArr, 2);
        mouseHoverElement(inlineHelpStyledIcon);
        waitForPresent(popover);

        expect(getText(popover)).toBe(defaultMessage);
    });

    it('Verify template inline help example', () => {
        // skipped due to hoverElement does not work in Safari
        if (browserIsSafari()) {
            return;
        }
        scrollIntoView(exampleAreaContainersArr, 3);
        mouseHoverElement(inlineHelpTemplateExample);
        waitForPresent(popover);
        expect(getText(popover)).toBe(customMessage);
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6398
    xit('should check that inline help by hover does not work in other way after clicking button', () => {
        // skipped due to hoverElement does not work in Safari
        if (browserIsSafari()) {
            return;
        }
        scrollIntoView(inlineHelpIcons, 2);
        mouseHoverElement(inlineHelpIcons, 2);
        expect(isElementDisplayed(inlineHelp)).toBe(true);
        click(inlineHelpIcons, 2);
        mouseHoverElement(inlineHelpIcons, 2);
        expect(isElementDisplayed(inlineHelp)).toBe(true);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            inlineHelpPage.saveExampleBaselineScreenshot();
            expect(inlineHelpPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    describe('Check orientation', () => {
        it('Verify RTL and LTR orientation', () => {
            inlineHelpPage.checkRtlSwitch();
        });
    });
});
