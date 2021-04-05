import { FeedListItemPo } from '../pages/feed-list-item.po';
import {
    addIsActiveClass,
    checkElementScreenshot, click, getAlertText,
    getElementArrayLength, getImageTagBrowserPlatform,
    mouseHoverElement, pause,
    refreshPage, saveElementScreenshot,
    scrollIntoView, waitForPresent
} from '../../driver/wdio';

import {
    paragraph,
    paragraphExtends,
    authorLink,
    checkBox,
    buttonActionSettings,
    buttonMenu,
    optionsMenu,
    buttonOverflow,
    optionsOverflow,
    cancelOption,

} from '../fixtures/testData/feed-list-item.tags';

import { box, button, link, option, text, alertText } from '../fixtures/appData/feed-list-item-contents';

describe('Feed list item test suite:', function() {

    const feedListItemPage = new FeedListItemPo();
    const { paragraphs, checkbox, linkMore, links, actionSettingsButton, menuButton, menuOption, overflowButton,
        overflowOption, optionCancel} = feedListItemPage;

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

    fdescribe('Check visual regression', function() {

        it('should check basic visual regression', () => {
            feedListItemPage.saveExampleBaselineScreenshot();
            expect(feedListItemPage.compareWithBaseline()).toBeLessThan(1);
        });

        it('should check all paragraphs visual regression', () => {
            const paragraphsLength = getElementArrayLength(paragraphs);
            for (let i = 0; i < paragraphsLength; i++) {
                    scrollIntoView(paragraphs, i);
                    checkHoverState(paragraphs, paragraph + i + '-', text, i);
            }
        });

        it('should check author links states', () => {
            const linksLength = getElementArrayLength(links);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(links, i);
                checkElementStates(links, authorLink + i + '-', link, i );
            }
        });

        it('should check checkbox states', () => {
            scrollIntoView(checkbox);
            checkElementWithoutFocusState(checkbox, checkBox, box);
        });

        it('should check action settings button states', () => {
            scrollIntoView(actionSettingsButton);
            checkElementWithoutFocusState(actionSettingsButton, buttonActionSettings, button);
        });

        it('should check menu button states', () => {
            scrollIntoView(menuButton);
            checkElementStates(menuButton, buttonMenu, button);
        });

        it('should check menu options hover state', () => {
            scrollIntoView(menuButton);
            click(menuButton);
            const menuOptionLength = getElementArrayLength(menuOption);
            for (let i = 0; i < menuOptionLength; i++) {
                scrollIntoView(menuOption, i);
                checkElementWithoutFocusState(menuOption, optionsMenu + i + '-', option, i);
            }
        });

        it('should check overflow button hover state', () => {
            scrollIntoView(overflowButton);
            checkElementWithoutFocusState(overflowButton, buttonOverflow, button);
        });

        it('should check overflow option states', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            const overflowOptionLength = getElementArrayLength(overflowOption);
            for (let i = 0; i < overflowOptionLength; i++) {
                checkElementStates(overflowOption, optionsOverflow + i + '-', option, i);
            }
        });

        it('should check option cancel states', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            checkElementWithoutFocusState(optionCancel, cancelOption, option);
        });

        it('should check extends paragraph 1st after clicking more hover state', () => {
            scrollIntoView(paragraphs, 0);
            click(linkMore, 0);
            checkHoverState(paragraphs, paragraphExtends + '0-', text, 0);
        });

        it('should check extends paragraph 2nd after clicking more hover state', () => {
            scrollIntoView(paragraphs, 1);
            click(linkMore, 1);
            checkHoverState(paragraphs, paragraphExtends + '1-', text, 1);
        });

        it('should check extends paragraph 3d after clicking more hover state', () => {
            scrollIntoView(paragraphs, 2);
            click(linkMore, 2);
            checkHoverState(paragraphs, paragraphExtends + '2-', text, 2);
        });

        it('should check extends paragraph with formatted text after clicking more hover state', () => {
            scrollIntoView(paragraphs, 3);
            click(checkbox);
            click(linkMore, 3);
            checkHoverState(paragraphs, paragraphExtends + '3-', text, 3);
        });

        it('should check extends paragraph with long text after clicking more hover state', () => {
            scrollIntoView(paragraphs, 4);
            click(linkMore, 3);
            scrollIntoView(paragraphs, 4);
            checkHoverState(paragraphs, paragraphExtends + '4-', text, 4);
        });

        fit('should check last extends paragraph after clicking more hover state', () => {
            scrollIntoView(paragraphs, 19);
            click(linkMore, 4);
            checkHoverState(paragraphs, paragraphExtends + '5-', text, 19);
        });

    });

    function checkHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform() + 'hover-state-',
            feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform() + 'hover-state-',
            feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element item ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }

    function checkElementWithoutFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }
});


