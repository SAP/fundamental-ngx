import { MessagePagePo } from './message-page.po';
import {
    checkElArrIsClickable,
    click,
    getCurrentUrl,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import { subtitleTextArr, titleTextArr } from './message-page-content';

describe('Message Page test suite', () => {
    const messagePage = new MessagePagePo();
    const { examples, icons, content, contentTitle, contentSubTitle, contentButton, contentLink } = messagePage;

    beforeAll(async () => {
        await messagePage.open();
    }, 1);

    it('should check icons are present', async () => {
        const exampleCount = await getElementArrayLength(examples);
        const noIconExample = 6;

        for (let i = 0; i < exampleCount; i++) {
            if (i === noIconExample) {
                continue;
            }
            await scrollIntoView(icons, i);

            await expect(await isElementDisplayed(icons, i)).toBe(true, `icon for example ${i} is not displayed`);
        }
    });

    it('should check content is displayed', async () => {
        const exampleCount = await getElementArrayLength(examples);

        for (let i = 0; i < exampleCount; i++) {
            await expect(await isElementDisplayed(content, i)).toBe(true, `content for example ${i} not displayed`);
        }
    });

    it('should check content title text', async () => {
        const titleCount = await getElementArrayLength(contentTitle);

        for (let i = 0; i < titleCount; i++) {
            await expect(await getText(contentTitle, i)).toEqual(titleTextArr[i]);
        }
    });

    it('should check content subtitle text', async () => {
        const subtitleCount = await getElementArrayLength(contentSubTitle);

        for (let i = 0; i < subtitleCount; i++) {
            await expect(await getText(contentSubTitle, i)).toEqual(subtitleTextArr[i]);
        }
    });

    it('should check content buttons are clickable', async () => {
        await checkElArrIsClickable(contentButton);
    });

    it('should check home page link', async () => {
        await click(contentLink);
        await waitForElDisplayed(messagePage.root);

        await expect(await getCurrentUrl()).toContain('/home');
    });

    it('should check RTL mode', async () => {
        await messagePage.checkRtlSwitch();
    });
});
