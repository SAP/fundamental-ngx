import { FeedListItemPo } from '../pages/feed-list-item.po';
import {
    addIsActiveClass,
    checkElementScreenshot, click, getAlertText,
    getElementArrayLength,
    mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView, waitForPresent
} from '../../driver/wdio';

import {
    paragraphExample,
    paragraphExtendsHoverState,
    paragraphHoverState,
    linkExample,
    linkHoverState,
    linkMoreExample,
    linkLessExample,
    linkMoreHoverState,
    linkLessHoverState,
    linkActiveState,
    linkFocusState,
    linkMoreActiveState,
    linkLessActiveState,
    checkboxExample,
    checkboxActiveState,
    checkboxHoverState,
    actionSettingsButtonExample,
    actionSettingsButtonHoverState,
    actionSettingsButtonActiveState,
    menuButtonExample,
    menuButtonHoverState,
    menuButtonActiveState,
    menuButtonFocusState,
    menuOptionHoverState,
    menuOptionExample,
    menuOptionActiveState,
    overflowButtonExample,
    overflowButtonHoverState,
    overflowButtonActiveState,
    overflowButtonFocusState,
    overflowOptionExample,
    overflowOptionHoverState,
    overflowOptionActiveState,
    overflowOptionFocusState, optionCancelExample, optionCancelHoverState, optionCancelActiveState,

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

    describe('Check visual regression', function() {

        it('should check basic visual regression', () => {
            feedListItemPage.saveExampleBaselineScreenshot();
            expect(feedListItemPage.compareWithBaseline()).toBeLessThan(1);
        });

        it('should check all paragraphs visual regression', () => {
            const paragraphsLength = getElementArrayLength(paragraphs);
            for (let i = 0; i < paragraphsLength; i++) {
                    scrollIntoView(paragraphs, i);
                    checkElementHoverState(paragraphs, paragraphExample + paragraphHoverState + '-' + i, text, i);
            }
        });

        it('should check paragraphs with link more visual regression', () => {

            for (let i = 0; i < 5; i++) {
                if (i === 3) {
                    scrollIntoView(paragraphs, i);
                    click(checkbox);
                    click(linkMore, i);
                    checkElementHoverState(paragraphs, paragraphExample + paragraphExtendsHoverState + '-' + i, text, i);
                } else {
                        scrollIntoView(paragraphs, i);
                        click(linkMore, i);
                        checkElementHoverState(paragraphs, paragraphExample + paragraphExtendsHoverState + '-' + i, text, i);
                }
            }
        });

        it('should check action examples visual regression', () => {
            scrollIntoView(paragraphs, 15);
            click(linkMore, 4);
            checkElementHoverState(paragraphs, paragraphExample + paragraphExtendsHoverState + '-5', text, 15);
        });

        it('should check footer examples visual regression', () => {
            scrollIntoView(paragraphs, 16);
            click(linkMore, 5);
            checkElementHoverState(paragraphs, paragraphExample + paragraphExtendsHoverState + '-6', text, 16);
        });

        it('should check mobile example with action sheet control  visual regression', () => {
            scrollIntoView(paragraphs, 19);
            click(linkMore, 6);
            checkElementHoverState(paragraphs, paragraphExample + paragraphExtendsHoverState + '-7', text, 19);
        });

        it('should check author links hover state', () => {
            const linksLength = getElementArrayLength(links);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(links, i);
                checkElementHoverState(links, linkExample + linkHoverState + '-' + i, link, i );
            }
        });

        it('should check author links active state', () => {
            const linksLength = getElementArrayLength(links);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(links, i);
                checkElementActiveState(links, linkExample + linkActiveState + '-' + i, link, i );
            }
        });

        it('should check author links focus state', () => {
            const linksLength = getElementArrayLength(links);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(links, i);
                checkElementFocusState(links, linkExample + linkFocusState + '-' + i, link, i );
            }
        });

        it('should check links more and less hover state', () => {
            for (let i = 0; i < 5; i++) {
                if (i === 3) {
                    click(checkbox);
                    scrollIntoView(linkMore, i);
                    checkElementHoverState(linkMore, linkMoreExample + linkMoreHoverState + '-' + i, link, i);
                    click(linkMore, i);
                    scrollIntoView(linkMore, i);
                    checkElementHoverState(linkMore, linkLessExample + linkLessHoverState + '-' + i, link, i);
                } else {
                    scrollIntoView(linkMore, i);
                    checkElementHoverState(linkMore, linkMoreExample + linkMoreHoverState + '-' + i, link, i);
                    click(linkMore, i);
                    scrollIntoView(linkMore, i);
                    checkElementHoverState(linkMore, linkLessExample + linkLessHoverState + '-' + i, link, i);
                }
            }
        });

        it('should check links more and less active state', () => {
            for (let i = 0; i < 5; i++) {
                if (i === 3) {
                    scrollIntoView(linkMore, i);
                    click(checkbox);
                    checkElementActiveState(linkMore, linkMoreExample + linkMoreActiveState + '-' + i, link, i);
                    click(linkMore, i);
                    checkElementActiveState(linkMore, linkLessExample + linkLessActiveState + '-' + i, link, i);
                } else {
                    scrollIntoView(linkMore, i);
                    checkElementActiveState(linkMore, linkMoreExample + linkMoreActiveState + '-' + i, link, i);
                    click(linkMore, i);
                    checkElementActiveState(linkMore, linkLessExample + linkLessActiveState + '-' + i, link, i);
                }
            }
        });

        it('should check action examples links more and less hover state', () => {
            scrollIntoView(linkMore, 4);
            checkElementHoverState(linkMore, linkMoreExample + linkMoreHoverState + '-5' , link, 4);
            click(linkMore, 4);
            checkElementHoverState(linkMore, linkLessExample + linkLessHoverState + '-5', link, 4);
        });

        it('should check footer examples links more and less hover state', () => {
            scrollIntoView(linkMore, 5);
            checkElementHoverState(linkMore, linkMoreExample + linkMoreHoverState + '-6' , link, 5);
            click(linkMore, 5);
            checkElementHoverState(linkMore, linkLessExample + linkLessHoverState + '-6', link, 5);
        });

        it('should check mobile example with action sheet control links more and less  hover state', () => {
            scrollIntoView(linkMore, 6);
            checkElementHoverState(linkMore, linkMoreExample + linkMoreHoverState + '-7' , link, 6);
            click(linkMore, 6);
            checkElementHoverState(linkMore, linkLessExample + linkLessHoverState + '-7', link, 6);
        });

        it('should check action examples links more and less active state', () => {
            scrollIntoView(linkMore, 4);
            checkElementActiveState(linkMore, linkMoreExample + linkMoreActiveState + '-5' , link, 4);
            click(linkMore, 4);
            checkElementActiveState(linkMore, linkLessExample + linkLessActiveState + '-5', link, 4);
        });

        it('should check footer examples links more and less active state', () => {
            scrollIntoView(linkMore, 5);
            checkElementActiveState(linkMore, linkMoreExample + linkMoreActiveState + '-6' , link, 5);
            click(linkMore, 5);
            checkElementActiveState(linkMore, linkLessExample + linkLessActiveState + '-6', link, 5);
        });

        it('should check mobile example with action sheet control links more and less active state', () => {
            scrollIntoView(linkMore, 6);
            checkElementActiveState(linkMore, linkMoreExample + linkMoreActiveState + '-7' , link, 6);
            click(linkMore, 6);
            checkElementActiveState(linkMore, linkLessExample + linkLessActiveState + '-7', link, 6);
        });

        it('should check checkbox hover state', () => {
            scrollIntoView(checkbox);
            checkElementHoverState(checkbox, checkboxExample + checkboxHoverState + '0' , box);
        });

        it('should check checkbox active state', () => {
            scrollIntoView(checkbox);
            checkElementActiveState(checkbox, checkboxExample + checkboxActiveState + '1' , box);
        });

        it('should check checkbox without check mark hover state', () => {
            scrollIntoView(checkbox);
            click(checkbox);
            checkElementHoverState(checkbox, checkboxExample + checkboxHoverState + '2' , box);
        });

        it('should check checkbox without check mark active state', () => {
            scrollIntoView(checkbox);
            click(checkbox);
            checkElementActiveState(checkbox, checkboxExample + checkboxActiveState + '3' , box);
        });

        it('should check action settings button hover state', () => {
            scrollIntoView(actionSettingsButton);
            checkElementHoverState(actionSettingsButton, actionSettingsButtonExample + actionSettingsButtonHoverState + '0' , button);
        });

        it('should check action settings button active state', () => {
            scrollIntoView(actionSettingsButton);
            checkElementActiveState(actionSettingsButton, actionSettingsButtonExample + actionSettingsButtonActiveState + '1' , button);
        });

        it('should check menu button hover state', () => {
            scrollIntoView(menuButton);
            checkElementHoverState(menuButton, menuButtonExample + menuButtonHoverState + '0' , button);
        });

        it('should check menu button active state', () => {
            scrollIntoView(menuButton);
            checkElementActiveState(menuButton, menuButtonExample + menuButtonActiveState + '1' , button);
        });

        it('should check menu button focus state', () => {
            scrollIntoView(menuButton);
            checkElementFocusState(menuButton, menuButtonExample + menuButtonFocusState + '2' , button);
        });

        it('should check menu options hover state', () => {
            scrollIntoView(menuButton);
            click(menuButton);
            const menuOptionLength = getElementArrayLength(menuOption);
            for (let i = 0; i < menuOptionLength; i++) {
                scrollIntoView(menuOption, i);
                checkElementHoverState(menuOption, menuOptionExample + menuOptionHoverState + '-' + i, option, i);
            }
        });

        it('should check menu options active state', () => {
            scrollIntoView(menuButton);
            click(menuButton);
            const menuOptionLength = getElementArrayLength(menuOption);
            for (let i = 0; i < menuOptionLength; i++) {
                scrollIntoView(menuOption, i);
                checkElementActiveState(menuOption, menuOptionExample + menuOptionActiveState + '-' + i, option, i);
            }
        });

        it('should check overflow button hover state', () => {
            scrollIntoView(overflowButton);
            checkElementHoverState(overflowButton, overflowButtonExample + overflowButtonHoverState + '0' , button);
        });

        it('should check overflow button active state', () => {
            scrollIntoView(overflowButton);
            checkElementActiveState(overflowButton, overflowButtonExample + overflowButtonActiveState + '1' , button);
        });

        it('should check overflow button focus state', () => {
            scrollIntoView(overflowButton);
            checkElementFocusState(overflowButton, overflowButtonExample + overflowButtonFocusState + '2' , button);
        });

        it('should check overflow option hover state', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            const overflowOptionLength = getElementArrayLength(overflowOption);
            for (let i = 0; i < overflowOptionLength; i++) {
                checkElementHoverState(overflowOption, overflowOptionExample + overflowOptionHoverState + '-' + i, option, i);
            }
        });

        it('should check overflow option active state', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            const overflowOptionLength = getElementArrayLength(overflowOption);
            for (let i = 0; i < overflowOptionLength; i++) {
                checkElementActiveState(overflowOption, overflowOptionExample + overflowOptionActiveState + '-' + i, option, i);
            }
        });

        it('should check overflow option focus state', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            const overflowOptionLength = getElementArrayLength(overflowOption);
            for (let i = 0; i < overflowOptionLength; i++) {
                checkElementFocusState(overflowOption, overflowOptionExample + overflowOptionFocusState + '-' + i, option, i);
            }
        });

        it('should check option cancel hover state', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            checkElementHoverState(optionCancel, optionCancelExample + optionCancelHoverState + '0' , option);
        });

        it('should check option cancel active state', () => {
            scrollIntoView(overflowButton);
            click(overflowButton);
            checkElementActiveState(optionCancel, optionCancelExample + optionCancelActiveState + '1' , option);
        });


    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag, feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag, feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag, feedListItemPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, feedListItemPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element item ${index} active state mismatch`);
    }
});


