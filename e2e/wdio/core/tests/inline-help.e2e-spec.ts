import {
    checkElementScreenshot,
    click,
    getAttributeByName,
    getElementArrayLength,
    getText,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { InlineHelpPo } from '../pages/inline-help.po';
import { customMessage, defaultMessage } from '../fixtures/appData/inline-help-contents';

describe('Inline help test suite', () => {
    const inlineHelpPage = new InlineHelpPo();
    const {
        inlineHelpIcons,
        inlineHelpInput,
        inlineHelpButton,
        inlineHelpStyledIcon,
        inlineHelpTemplateExample,
        exampleAreaContainersArr,
        inlineHelpExampleExtended,
        popover
    } = inlineHelpPage;

    beforeAll(() => {
        inlineHelpPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(inlineHelpPage.title);
    }, 1);

    it('Verify icons hover tooltip', () => {
        const arr = getElementArrayLength(inlineHelpIcons);
        scrollIntoView(exampleAreaContainersArr);
        for (let i = 0, diff = 0; i < arr; i++, diff = 0) {
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
        expect(getText(popover)).toBe(defaultMessage);
    });

    it('Verify styled inline help icon', () => {
        scrollIntoView(exampleAreaContainersArr, 2);
        mouseHoverElement(inlineHelpStyledIcon);
        waitForPresent(popover);

        expect(getText(popover)).toBe(defaultMessage);
    });

    it('Verify template inline help example', () => {
        scrollIntoView(exampleAreaContainersArr, 3);
        mouseHoverElement(inlineHelpTemplateExample);
        waitForPresent(popover);
        expect(getText(popover)).toBe(customMessage);
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
