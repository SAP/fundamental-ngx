import {
    doesItExist,
    elementDisplayed,
    getAttributeByName,
    getElementArrayLength,
    getElementPlaceholder,
    getElementTitle,
    isEnabled,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '@fundamental-ngx/e2e';
import { four_lines_text } from './feed-input';
import { default_avatar, default_placeholder, send_button_tooltip } from './feed-input-page-contents';
import { FeedInputPo } from './feed-input.po';

describe('Verify Feed Input component', () => {
    const feedInputPage = new FeedInputPo();
    const { feedInputTextArea, feedInputAvatar, feedInputButton, feedInputNoAvatar } = new FeedInputPo();

    beforeAll(async () => {
        await feedInputPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await feedInputPage.waitForRoot();
        await waitForElDisplayed(feedInputPage.title);
    }, 1);

    it('should have correct placeholder assigned', async () => {
        const feedInputLength = await getElementArrayLength(feedInputTextArea);
        for (let i = 0; i < feedInputLength; i++) {
            await expect(await getElementPlaceholder(feedInputTextArea, i)).toEqual(default_placeholder);
        }
    });

    it('should have example with avatar image assigned', async () => {
        const inputAvatarLength = await getElementArrayLength(feedInputAvatar);
        for (let i = 0; i < inputAvatarLength; i++) {
            if (i === 1) {
                continue;
            }
            await waitForPresent(feedInputAvatar, i);
            await expect(await getAttributeByName(feedInputAvatar, 'image', i)).not.toBe('');
            await expect(await getAttributeByName(feedInputAvatar, 'image', i)).not.toBeNull();
        }
    });

    it('should have example with default avatar assigned', async () => {
        await expect(await getAttributeByName(feedInputAvatar, 'glyph', 1)).toContain(default_avatar);
    });

    it('should have example with no avatar', async () => {
        await waitForElDisplayed(feedInputButton, 2);
        await scrollIntoView(feedInputButton, 2);
        await expect(await doesItExist(feedInputNoAvatar)).toBe(false);
    });

    it('should have Send button assigned and to be disabled if no value set in the input', async () => {
        const inputButtonLength = await getElementArrayLength(feedInputButton);
        for (let i = 0; inputButtonLength > i; i++) {
            await waitForPresent(feedInputButton, i);
            await scrollIntoView(feedInputButton, i);
            await expect(await elementDisplayed(feedInputButton, i)).toBe(true);
            await expect(await getAttributeByName(feedInputButton, 'aria-disabled', i)).toBe('true');
        }
    });

    it('should have Send button enabled if value is set in the input', async () => {
        const inputButtonLength = await getElementArrayLength(feedInputButton);
        for (let i = 0; i < inputButtonLength; i++) {
            if (i === 3) {
                continue;
            }
            await waitForPresent(feedInputTextArea, i);
            await scrollIntoView(feedInputTextArea, i);
            await setValue(feedInputTextArea, four_lines_text, i);
            await scrollIntoView(feedInputButton, i);
            await expect(await isEnabled(feedInputButton, i)).toBe(true);
        }
    });

    it('should avatar and Send button has correct tooltip', async () => {
        const inputButtonLength = await getElementArrayLength(feedInputButton);
        for (let i = 0; i < inputButtonLength; i++) {
            await expect(await getElementTitle(feedInputButton, i)).toEqual(send_button_tooltip);
        }
    });

    it('should check RTL', async () => {
        await feedInputPage.checkRtlSwitch();
    });
});
