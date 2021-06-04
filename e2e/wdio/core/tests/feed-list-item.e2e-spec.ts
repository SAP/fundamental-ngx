import { FeedListItemPo } from '../pages/feed-list-item.po';
import {
    addIsActiveClass,
    checkElementScreenshot, click, getAlertText,
    getElementArrayLength, getImageTagBrowserPlatform,
    mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView, waitForPresent
} from '../../driver/wdio';

import {
    paragraphTag,
    paragraphExtendsTag,
    authorLinkTag,
    checkBoxTag,
    buttonActionSettingsTag,
    buttonMenuTag,
    optionsMenuTag,
    buttonOverflowTag,
    optionsOverflowTag,
    cancelOptionTag

} from '../fixtures/testData/feed-list-item.tags';

import { box, button, link, option, text, alertText } from '../fixtures/appData/feed-list-item-contents';

describe('Feed list item test suite:', function() {

    const feedListItemPage = new FeedListItemPo();
    const {
        paragraphs, checkbox, linkMore, links, actionSettingsButton, menuButton, menuOption, overflowButton,
        overflowOption, optionCancel
    } = feedListItemPage;

    beforeAll(() => {
        feedListItemPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(paragraphs);
    }, 1);

    it('verify alert text', () => {
        scrollIntoView(actionSettingsButton);
        click(actionSettingsButton);
        expect(alertText).toContain(getAlertText());
    });

    describe('Check visual regression', function() {

        xit('should check author links states', () => {
            const linksLength = getElementArrayLength(links);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(links, i);
                checkElementStates(links, authorLinkTag + i + '-', link, i);
            }
        });

        it('should check basic visual regression', () => {
            feedListItemPage.saveExampleBaselineScreenshot();
            expect(feedListItemPage.compareWithBaseline()).toBeLessThan(5);
        });

        xit('should check all paragraphs visual regression', () => {
            const paragraphsLength = getElementArrayLength(paragraphs);
            for (let i = 0; i < paragraphsLength; i++) {
                scrollIntoView(paragraphs, i);
                checkElementHoverState(paragraphs, paragraphTag + i + '-hover-state-', text, i);
            }
        });

        xit('should check checkbox states', () => {
            scrollIntoView(checkbox);
            checkElementHoverActiveState(checkbox, checkBoxTag, box);
        });

        xit('should check action settings button states', () => {
            scrollIntoView(actionSettingsButton);
            checkElementHoverActiveState(actionSettingsButton, buttonActionSettingsTag, button);
        });

        xit('should check menu button states', () => {
            scrollIntoView(menuButton);
            checkElementStates(menuButton, buttonMenuTag, button);
        });

        xit('should check menu options hover state', () => {
            scrollIntoView(menuButton);
            click(menuButton);
            const menuOptionLength = getElementArrayLength(menuOption);
            for (let i = 0; i < menuOptionLength; i++) {
                scrollIntoView(menuOption, i);
                checkElementHoverActiveState(menuOption, optionsMenuTag + i + '-', option, i);
            }
        });

        xit('should check overflow button hover state', () => {
            scrollIntoView(overflowButton);
            checkElementHoverActiveState(overflowButton, buttonOverflowTag, button);
        });

        xit('should check overflow option states', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            const overflowOptionLength = getElementArrayLength(overflowOption);
            for (let i = 0; i < overflowOptionLength; i++) {
                checkElementStates(overflowOption, optionsOverflowTag + i + '-', option, i);
            }
        });

        xit('should check option cancel states', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            checkElementHoverActiveState(optionCancel, cancelOptionTag, option);
        });

        xit('should check extends paragraph 1st after clicking more hover state', () => {
            scrollIntoView(paragraphs);
            click(linkMore);
            checkElementHoverState(paragraphs, paragraphExtendsTag + '0-hover-state-', text);
        });

        xit('should check extends paragraph 2nd after clicking more hover state', () => {
            scrollIntoView(paragraphs, 1);
            click(linkMore, 1);
            checkElementHoverState(paragraphs, paragraphExtendsTag + '1-hover-state', text, 1);
        });

        xit('should check extends paragraph 3d after clicking more hover state', () => {
            scrollIntoView(paragraphs, 2);
            click(linkMore, 2);
            checkElementHoverState(paragraphs, paragraphExtendsTag + '2-hover-state', text, 2);
        });

        xit('should check extends paragraph with formatted text after clicking more hover state', () => {
            scrollIntoView(paragraphs, 3);
            click(checkbox);
            click(linkMore, 3);
            checkElementHoverState(paragraphs, paragraphExtendsTag + '3-hover-state-', text, 3);
        });

        xit('should check extends paragraph with long text after clicking more hover state', () => {
            scrollIntoView(paragraphs, 4);
            click(linkMore, 3);
            scrollIntoView(paragraphs, 4);
            checkElementHoverState(paragraphs, paragraphExtendsTag + '4-hover-state-', text, 4);
        });

        xit('should check last extends paragraph after clicking more hover state', () => {
            scrollIntoView(linkMore, 4);
            click(linkMore, 4);
            scrollIntoView(paragraphs, 19);
            checkElementHoverState(paragraphs, paragraphExtendsTag + '5-hover-state-', text, 19);
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item ${index} hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item ${index} focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }

    function checkElementHoverActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }
});


