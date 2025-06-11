import {
    click,
    getElementArrayLength,
    getElementSize,
    getText,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { TextPo } from './text.po';

import { testTextLess, testTextLessLabel, testTextMore, testTextMoreLabel } from './text-contents';

describe('Text component test', () => {
    const textPage = new TextPo();
    const { linksExpandable, textParagraph, textExpandableExample } = textPage;

    beforeAll(async () => {
        await textPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await textPage.waitForRoot();
        await waitForElDisplayed(textPage.title);
    }, 2);

    describe('Check links More/Less', () => {
        it('should be clickable and display MORE/LESS text', async () => {
            await expect((await getText(linksExpandable)).toUpperCase()).toContain(testTextMore);
            await click(linksExpandable);
            await expect((await getText(linksExpandable)).toUpperCase()).toContain(testTextLess);

            await expect((await getText(linksExpandable, 1)).toUpperCase()).toContain(testTextLess);
            await click(linksExpandable, 1);
            await expect((await getText(linksExpandable, 1)).toUpperCase()).toContain(testTextMore);

            await expect((await getText(linksExpandable, 2)).toUpperCase()).toContain(testTextMoreLabel);
            await click(linksExpandable, 2);
            await expect((await getText(linksExpandable, 2)).toUpperCase()).toContain(testTextLessLabel);
        });
    });

    describe('Check Text Expandable example', () => {
        it('should check by clicking button "more" displayed more text', async () => {
            await scrollIntoView(linksExpandable);
            await click(linksExpandable, 1);
            const linksLength = await getElementArrayLength(linksExpandable);
            for (let i = 0; i < linksLength; i++) {
                await scrollIntoView(linksExpandable, i);
                const beforeSize = await getElementSize(textExpandableExample + textParagraph, i);
                await click(linksExpandable, i);
                const afterSize = await getElementSize(textExpandableExample + textParagraph, i);
                await expect(afterSize.height).toBeGreaterThan(beforeSize.height);
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await textPage.checkRtlSwitch();
        });
    });
});
