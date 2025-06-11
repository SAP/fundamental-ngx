import {
    addValue,
    clearValue,
    doesItExist,
    elementDisplayed,
    getAttributeByName,
    getAttributeByNameArr,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '@fundamental-ngx/e2e';
import { eight_lines_text, four_lines_text } from './feed-input';
import {
    avatar_tooltip,
    default_avatar_class,
    placeholders_array,
    send_button_tooltip
} from './feed-input-page-contents';
import { FeedInputPo } from './feed-input.po';

describe('Verify Feed Input component', () => {
    const {
        feedInputAvatar,
        feedInputTextArea,
        feedInput,
        feedInputNoAvatar,
        feedInputButton,
        feedInputPlaceholder1,
        feedInputPlaceholder2
    } = new FeedInputPo();
    const feedInputPage = new FeedInputPo();

    beforeAll(async () => {
        await feedInputPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await feedInputPage.waitForRoot();
        await waitForElDisplayed(feedInputPage.title);
    }, 1);

    it('should have correct placeholder assigned', async () => {
        await expect(await getAttributeByNameArr(feedInputTextArea, 'placeholder')).toEqual(placeholders_array);
    });

    it('should have example with avatar image assigned', async () => {
        await waitForPresent(feedInput);
        await waitForPresent(feedInputAvatar);
        await expect(await getAttributeByName(feedInput, 'avatarsrc')).not.toBe('');
        await expect(await getAttributeByName(feedInput, 'avatarsrc')).not.toBeNull();
        await expect(await getElementClass(feedInputAvatar)).not.toContain(default_avatar_class);

        await waitForPresent(feedInput, 3);
        await waitForPresent(feedInputAvatar, 2);
        await expect(await getAttributeByName(feedInput, 'avatarsrc', 3)).not.toBe('');
        await expect(await getAttributeByName(feedInput, 'avatarsrc', 3)).not.toBeNull();
        await expect(await getElementClass(feedInputAvatar, 2)).not.toContain(default_avatar_class);

        await waitForPresent(feedInput, 4);
        await waitForPresent(feedInputAvatar, 3);
        await expect(await getAttributeByName(feedInput, 'avatarsrc', 4)).not.toBe('');
        await expect(await getAttributeByName(feedInput, 'avatarsrc', 4)).not.toBeNull();
        await expect(await getElementClass(feedInputAvatar, 3)).not.toContain(default_avatar_class);
    });

    it('should have example with default avatar assigned', async () => {
        await expect(['', null]).toContain(await getAttributeByName(feedInput, 'avatarsrc', 1));
        await expect(await getElementClass(feedInputAvatar, 1)).toContain(default_avatar_class);
    });

    it('should have example with no avatar', async () => {
        await waitForElDisplayed(feedInputButton, 2);
        await scrollIntoView(feedInputButton, 2);
        await expect(await doesItExist(feedInputNoAvatar)).toBe(false);
    });

    it('should have Send button assigned and to be disabled if no value set in the input', async () => {
        const arrLength = await getElementArrayLength(feedInputButton);
        for (let i = 0; arrLength > i; i++) {
            await waitForPresent(feedInputButton, i);
            await scrollIntoView(feedInputButton, i);
            await expect(await elementDisplayed(feedInputButton, i)).toBe(true);
            await expect(await getAttributeByName(feedInputButton, 'disabled', i)).toBe('true');
        }
    });

    it('should have Send button enabled if value is set in the input', async () => {
        const arrLength = await getElementArrayLength(feedInputButton);
        for (let i = 0; arrLength > i; i++) {
            if (i === 3) {
                continue;
            }
            await waitForPresent(feedInputTextArea, i);
            await scrollIntoView(feedInputTextArea, i);
            await setValue(feedInputTextArea, four_lines_text, i);
            await waitForPresent(feedInputButton, i);
            await expect(await isEnabled(feedInputButton, i)).toBe(true);
        }
    });

    it('should grow if multiple row text is entered to the input', async () => {
        await waitForPresent(feedInputTextArea);
        await scrollIntoView(feedInputTextArea);
        const arrLength = await getElementArrayLength(feedInputButton);
        for (let i = 0; arrLength - 1 > i; i++) {
            if (i === 3) {
                continue;
            }

            await clearValue(feedInputTextArea);
            const feedInputSize1 = await (await getElementSize(feedInputTextArea, i)).height;
            await setValue(feedInputTextArea, eight_lines_text, i);
            const feedInputSize2 = await (await getElementSize(feedInputTextArea, i)).height;

            await addValue(feedInputTextArea, eight_lines_text, i);
            const feedInputSize3 = await (await getElementSize(feedInputTextArea, i)).height;

            await expect(feedInputSize1).toBeLessThan(feedInputSize2);
            await expect(feedInputSize2).toBeLessThan(feedInputSize3);
        }
    });

    it('should avatar and Send button has correct tooltip', async () => {
        await expect(await getAttributeByNameArr(feedInputButton, 'title')).toEqual(send_button_tooltip);
        await expect(await getAttributeByNameArr(feedInputAvatar, 'title')).toEqual(avatar_tooltip);
    });

    it('should check that all placeholders are displayed', async () => {
        const firstPlaceholderLength = await getElementArrayLength(feedInputPlaceholder1);
        const secondPlaceholderLength = await getElementArrayLength(feedInputPlaceholder2);

        for (let i = 0; i < firstPlaceholderLength; i++) {
            await expect(await isElementDisplayed(feedInputPlaceholder1, i)).toBe(true, 'placeholder is not displayed');
        }
        for (let i = 0; i < secondPlaceholderLength; i++) {
            await expect(await isElementDisplayed(feedInputPlaceholder2, i)).toBe(true, 'placeholder is not displayed');
        }
    });

    it('should check that no ablity to type text in disabled input', async () => {
        await expect(await isElementClickable(feedInputTextArea, 3)).toBe(false, 'input is not disabled');
        await expect(await isElementClickable(feedInputButton, 3)).toBe(false, 'submit button is not disabled');
    });

    it('should check RTL', async () => {
        await feedInputPage.checkRtlSwitch();
    });
});
