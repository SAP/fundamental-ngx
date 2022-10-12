import { FeedListItemPo } from './feed-list-item.po';
import {
    browserIsSafari,
    click,
    doesItExist,
    getAlertText,
    getElementArrayLength,
    getElementSize,
    getText,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { alertText, testTextLess, testTextMore } from './feed-list-item-contents';

describe('Feed list item test suite:', () => {
    const feedListItemPage = new FeedListItemPo();
    const {
        paragraphs,
        actionSettingsButton,
        simpleExample,
        links,
        avatarExample,
        actionExample,
        footerExample,
        mobileExample,
        linkMore,
        avatar,
        overflowButton,
        overflowOption,
        mobileMenu,
        optionCancel,
        actionMenuButton,
        icon,
        actionMenuButtonOption
    } = feedListItemPage;

    beforeAll(async () => {
        await feedListItemPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(feedListItemPage.root);
        await waitForElDisplayed(feedListItemPage.title);
    }, 1);

    it('should check clickability author and reply links', async () => {
        await checkClickableLinks(simpleExample);
        await checkClickableLinks(avatarExample);
        await checkClickableLinks(actionExample);
        await checkClickableLinks(footerExample);
        await checkClickableLinks(mobileExample);
    });

    it('should check by clicking button "more" displayed more text', async () => {
        // skipped due to unknown error when element not interactable
        if (await browserIsSafari()) {
            return;
        }
        await checkMoreText(simpleExample);
        await checkMoreText(footerExample);
        await checkMoreText(mobileExample);
    });

    it('should check displayed avatars', async () => {
        await checkIsAvatarsDisplayed(avatarExample);
        await checkIsAvatarsDisplayed(mobileExample);
    });

    it('should check alert text', async () => {
        await scrollIntoView(actionSettingsButton);
        await click(actionSettingsButton);
        await expect(alertText).toContain(await getAlertText());
    });

    it('should check clickability popovers menu links', async () => {
        await scrollIntoView(actionMenuButton);
        await click(actionMenuButton);
        const optionLength = await getElementArrayLength(actionMenuButtonOption);
        for (let i = 0; i < optionLength; i++) {
            await expect(await isElementClickable(actionMenuButtonOption, i)).toBe(
                true,
                `option with index ${i} not clickable`
            );
        }
    });

    it('should check clickability buttons in mobile menu', async () => {
        await scrollIntoView(mobileExample);
        await click(overflowButton);
        const optionLength = await getElementArrayLength(overflowOption);
        for (let i = 0; i < optionLength; i++) {
            await expect(await isElementClickable(overflowOption, i)).toBe(
                true,
                `button with index ${i} not clickable`
            );
        }
    });

    it('should check after click cancel button mobile menu disappears', async () => {
        await scrollIntoView(mobileExample);
        await click(overflowButton);
        await expect(await doesItExist(mobileMenu)).toBe(true, 'mobile menu not displayed');

        await click(optionCancel);
        await expect(await doesItExist(mobileMenu)).toBe(false, 'mobile menu still displayed');
    });

    it('should check that icons are present near menu items', async () => {
        await scrollIntoView(actionExample);
        await click(actionMenuButton);
        const menuItemsLength = await getElementArrayLength(actionMenuButtonOption);
        for (let i = 0; i < menuItemsLength; i++) {
            await expect(await isElementDisplayed(actionMenuButtonOption + icon, i)).toBe(true);
        }
    });

    it('should check RTL and LTR orientation', async () => {
        await feedListItemPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check basic visual regression', async () => {
            await feedListItemPage.saveExampleBaselineScreenshot();
            await expect(await feedListItemPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function checkClickableLinks(example: string): Promise<void> {
        await scrollIntoView(example);
        const linksLength = await getElementArrayLength(example + links);
        for (let i = 0; i < linksLength; i++) {
            await expect(await isElementClickable(example + links)).toBe(true, `link with index ${i} not clickable`);
        }
    }

    async function checkMoreText(example: string): Promise<void> {
        await scrollIntoView(example);
        const moreLinkLength = await getElementArrayLength(example + linkMore);
        for (let i = 0; i < moreLinkLength; i++) {
            if (i === 3) {
                await expect(await getText(example + linkMore, i)).toBe(testTextMore);
                await click(example + linkMore, i);
                await expect(await getText(example + linkMore, i)).toBe(testTextLess);
            } else {
                await scrollIntoView(example + linkMore, i);
                const beforeSize = await getElementSize(example + paragraphs, i);
                await click(example + linkMore, i);
                const afterSize = await getElementSize(example + paragraphs, i);
                await expect(afterSize.height).toBeGreaterThan(beforeSize.height);
            }
        }
    }

    async function checkIsAvatarsDisplayed(example: string): Promise<void> {
        await scrollIntoView(example);
        const avatarLength = await getElementArrayLength(example + avatar);
        for (let i = 0; i < avatarLength; i++) {
            await expect(await isElementDisplayed(example + avatar, i)).toBe(
                true,
                `avatar with index ${i} not displayed`
            );
        }
    }
});
