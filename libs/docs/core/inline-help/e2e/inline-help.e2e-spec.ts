import {
    browserIsSafari,
    click,
    getAttributeByName,
    getElementArrayLength,
    getText,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { customMessage, defaultMessage } from './inline-help-contents';
import { InlineHelpPo } from './inline-help.po';

describe('Inline help test suite', () => {
    const inlineHelpPage = new InlineHelpPo();
    const {
        inlineHelpIcons,
        inlineHelpInput,
        inlineHelpButton,
        inlineHelpStyledIcon,
        inlineHelpTemplateExample,
        exampleAreaContainersArr,
        popover
    } = inlineHelpPage;

    beforeAll(async () => {
        await inlineHelpPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await inlineHelpPage.waitForRoot();
        await waitForElDisplayed(inlineHelpPage.title);
    }, 1);

    it('Verify icons hover tooltip', async () => {
        const arr = await getElementArrayLength(inlineHelpIcons);
        await scrollIntoView(exampleAreaContainersArr);
        for (let i = 0; i < arr; i++) {
            await mouseHoverElement(inlineHelpIcons, i);
            await expect(await getAttributeByName(inlineHelpIcons, 'fd-inline-help', i)).toContain(
                'Inline Help Tooltip'
            );
        }
    });

    it('Verify inline help input', async () => {
        await scrollIntoView(exampleAreaContainersArr);
        await mouseHoverElement(inlineHelpInput);
        await expect(await getAttributeByName(inlineHelpInput, 'fd-inline-help')).toContain('Inline Help Tooltip');
    });

    it('Verify button inline help', async () => {
        await scrollIntoView(exampleAreaContainersArr, 1);
        await click(inlineHelpButton);
        await waitForPresent(popover);
        await expect((await getText(popover)).trim()).toBe(defaultMessage);
    });

    it('Verify styled inline help icon', async () => {
        // skipped due to hoverElement does not work in Safari
        if (await browserIsSafari()) {
            return;
        }
        await scrollIntoView(exampleAreaContainersArr, 2);
        await mouseHoverElement(inlineHelpStyledIcon);
        await waitForPresent(popover);

        await expect(await getText(popover)).toBe(defaultMessage);
    });

    it('Verify template inline help example', async () => {
        // skipped due to hoverElement does not work in Safari
        if (await browserIsSafari()) {
            return;
        }
        await scrollIntoView(exampleAreaContainersArr, 3);
        await mouseHoverElement(inlineHelpTemplateExample);
        await waitForPresent(popover);
        await expect(await getText(popover)).toBe(customMessage);
    });

    describe('Check orientation', () => {
        it('Verify RTL and LTR orientation', async () => {
            await inlineHelpPage.checkRtlSwitch();
        });
    });
});
