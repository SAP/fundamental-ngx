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

    beforeAll(() => {
        feedListItemPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(feedListItemPage.root);
        waitForElDisplayed(feedListItemPage.title);
    }, 1);

    it('should check clickability author and reply links', () => {
        checkClickableLinks(simpleExample);
        checkClickableLinks(avatarExample);
        checkClickableLinks(actionExample);
        checkClickableLinks(footerExample);
        checkClickableLinks(mobileExample);
    });

    it('should check by clicking button "more" displayed more text', () => {
        // skipped due to unknown error when element not interactable
        if (browserIsSafari()) {
            return;
        }
        checkMoreText(simpleExample);
        checkMoreText(footerExample);
        checkMoreText(mobileExample);
    });

    it('should check displayed avatars', () => {
        checkIsAvatarsDisplayed(avatarExample);
        checkIsAvatarsDisplayed(mobileExample);
    });

    it('should check alert text', () => {
        scrollIntoView(actionSettingsButton);
        click(actionSettingsButton);
        expect(alertText).toContain(getAlertText());
    });

    it('should check clickability popovers menu links', () => {
        scrollIntoView(actionMenuButton);
        click(actionMenuButton);
        const optionLength = getElementArrayLength(actionMenuButtonOption);
        for (let i = 0; i < optionLength; i++) {
            expect(isElementClickable(actionMenuButtonOption, i)).toBe(true, `option with index ${i} not clickable`);
        }
    });

    it('should check clickability buttons in mobile menu', () => {
        scrollIntoView(mobileExample);
        click(overflowButton);
        const optionLength = getElementArrayLength(overflowOption);
        for (let i = 0; i < optionLength; i++) {
            expect(isElementClickable(overflowOption, i)).toBe(true, `button with index ${i} not clickable`);
        }
    });

    it('should check after click cancel button mobile menu disappears', () => {
        scrollIntoView(mobileExample);
        click(overflowButton);
        expect(doesItExist(mobileMenu)).toBe(true, 'mobile menu not displayed');

        click(optionCancel);
        expect(doesItExist(mobileMenu)).toBe(false, 'mobile menu still displayed');
    });

    it('should check that icons are present near menu items', () => {
        scrollIntoView(actionExample);
        click(actionMenuButton);
        const menuItemsLength = getElementArrayLength(actionMenuButtonOption);
        for (let i = 0; i < menuItemsLength; i++) {
            expect(isElementDisplayed(actionMenuButtonOption + icon, i)).toBe(true);
        }
    });

    it('should check RTL and LTR orientation', () => {
        feedListItemPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check basic visual regression', () => {
            feedListItemPage.saveExampleBaselineScreenshot();
            expect(feedListItemPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkClickableLinks(example: string): void {
        scrollIntoView(example);
        const linksLength = getElementArrayLength(example + links);
        for (let i = 0; i < linksLength; i++) {
            expect(isElementClickable(example + links)).toBe(true, `link with index ${i} not clickable`);
        }
    }

    function checkMoreText(example: string): void {
        scrollIntoView(example);
        const moreLinkLength = getElementArrayLength(example + linkMore);
        for (let i = 0; i < moreLinkLength; i++) {
            if (i === 3) {
                expect(getText(example + linkMore, i)).toBe(testTextMore);
                click(example + linkMore, i);
                expect(getText(example + linkMore, i)).toBe(testTextLess);
            } else {
                scrollIntoView(example + linkMore, i);
                const beforeSize = getElementSize(example + paragraphs, i);
                click(example + linkMore, i);
                const afterSize = getElementSize(example + paragraphs, i);
                expect(afterSize.height).toBeGreaterThan(beforeSize.height);
            }
        }
    }

    function checkIsAvatarsDisplayed(example: string): void {
        scrollIntoView(example);
        const avatarLength = getElementArrayLength(example + avatar);
        for (let i = 0; i < avatarLength; i++) {
            expect(isElementDisplayed(example + avatar, i)).toBe(true, `avatar with index ${i} not displayed`);
        }
    }
});
