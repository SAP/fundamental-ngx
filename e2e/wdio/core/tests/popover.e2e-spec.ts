import { PopoverPo } from '../pages/popover.po';
import {
    acceptAlert,
    browserIsSafari,
    click,
    doesItExist,
    getAlertText,
    getElementArrayLength,
    getElementClass,
    getElementPlaceholder,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';

import {
    headerTestText,
    cozyHeaderTestText,
    subheaderTestText,
    popoverTestText,
    cozySubheaderTestText,
    fruitsTestArr,
    popoverExampleTestText,
    popoverParagraphTestText,
    buttonsPopoverTestText,
    containerTestText,
    triggerTestText,
    messageTestText,
    placeholderTestText,
    popoverTestText2,
    popoverTestText3,
    alertText1,
    alertText2
} from '../fixtures/appData/popover-contents';

describe('Popover test suite', () => {
    const popoverPage = new PopoverPo();
    const {
        avatar,
        programmaticAvatar,
        popover,
        option,
        icon,
        iconMoney,
        standardMoneyButton,
        barElement,
        basicPopoverButton,
        simplePopoverButton,
        popoverMessage,
        headerPopoverButton,
        placementPopoverButton,
        programmaticControlButton,
        popoverDialogsButton,
        multiInputButton,
        multiInputOption,
        multiInputSpan,
        popoverDialogsHeader,
        popoverDialogParagraph,
        clickMeButton,
        popoverDialogMessage,
        hoverElement,
        triggerButton2,
        popoverContainer,
        scrollButton,
        scrollMessage,
        plusButton,
        dynamicButton,
        dropdownButton,
        dropdownOption,
        cdkButton,
        topButton,
        endButton,
        centerButton,
        startButton,
        bottomButton,
        dialogInput,
        popoverNoArrow,
        paragraph,
        triggerButtonContainer,
        popoverMobileExample,
        mobilePopoverButton,
        button,
        mobileInput,
        mobileFooterButton,
        scrollCheckbox
    } = popoverPage;

    beforeAll(() => {
        popoverPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(popoverPage.root);
        waitForElDisplayed(popoverPage.title);
    }, 1);

    describe('Check Basic Popovers', () => {
        it('should check that avatars have popovers', () => {
            scrollIntoView(avatar);
            const avatarLength = getElementArrayLength(avatar);
            for (let i = 0; i < avatarLength - 1; i++) {
                click(avatar, i);
                expect(isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
                const optionLength = getElementArrayLength(option);
                for (let j = 3; j < optionLength; j++) {
                    expect(isElementClickable(option, j)).toBe(true, `option with index ${j} not clickable`);
                }
            }
        });

        it('should check that icon has popover and all options are clickable', () => {
            scrollIntoView(icon, 1);
            click(icon, 1);
            const iconLength = getElementArrayLength(option);
            for (let i = 3; i < iconLength; i++) {
                expect(isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
        });

        it('should check that icon money has popover and all options and arrow button are clickable', () => {
            scrollIntoView(iconMoney);
            click(iconMoney);
            expect(isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
            expect(isElementClickable(standardMoneyButton)).toBe(true, `button not clickable`);
            expect(getText(barElement, 1)).toBe(headerTestText);
            const iconMoneyLength = getElementArrayLength(option);
            for (let i = 3; i < iconMoneyLength; i++) {
                expect(isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
        });

        it('should check that basic popover buttons have popovers and all options are clickable', () => {
            scrollIntoView(basicPopoverButton);
            const buttonsLength = getElementArrayLength(basicPopoverButton);
            for (let i = 0; i < buttonsLength; i++) {
                click(basicPopoverButton, i);
                expect(isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
                const optionLength = getElementArrayLength(option);
                for (let j = 3; j < optionLength; j++) {
                    expect(isElementClickable(option, j)).toBe(true, `option with index ${j} not clickable`);
                }
            }
        });

        it('should check that button popover have header, subheader and buttons are clickable', () => {
            scrollIntoView(basicPopoverButton);
            click(basicPopoverButton);
            expect(getText(barElement).trim()).toBe(cozyHeaderTestText);
            expect(getText(barElement, 1).trim()).toBe(subheaderTestText);

            expect(isElementClickable(barElement, 2)).toBe(true, `save button not clickable`);
            expect(isElementClickable(barElement, 3)).toBe(true, `cancel button not clickable`);
        });
    });

    describe('Check Simple Popover', () => {
        it('check that after clicking the button a message with text is displayed', () => {
            scrollIntoView(simplePopoverButton);
            click(simplePopoverButton);
            expect(isElementDisplayed(popoverMessage)).toBe(true, `message not displayed`);
            expect(getText(popoverMessage)).toBe(popoverTestText);
        });
    });

    describe('Check Popover with Header and Footer', () => {
        it('should check that buttons have popovers and all options are clickable', () => {
            scrollIntoView(headerPopoverButton);
            const buttonLength = getElementArrayLength(headerPopoverButton);
            for (let i = 0; i < buttonLength; i++) {
                click(headerPopoverButton, i);
                const optionLength = getElementArrayLength(option);
                for (let j = 3; j < optionLength; j++) {
                    expect(isElementClickable(option, j)).toBe(true, `option with index ${j} not clickable`);
                }
            }
        });

        it('should check that button "with header" has header', () => {
            scrollIntoView(headerPopoverButton);
            click(headerPopoverButton, 1);
            expect(getText(barElement)).toBe(cozyHeaderTestText);
        });

        it('should check that button "with header and footer" has header and all buttons are clickable', () => {
            scrollIntoView(headerPopoverButton);
            click(headerPopoverButton, 2);
            expect(getText(barElement)).toBe(cozyHeaderTestText);

            expect(isElementClickable(barElement, 1)).toBe(true, `save button not clickable`);
            expect(isElementClickable(barElement, 2)).toBe(true, `cancel button not clickable`);
        });

        it('should check that button "with header, subHeader and footer" has header, subheader and all buttons are clickable', () => {
            scrollIntoView(headerPopoverButton);
            click(headerPopoverButton, 3);
            expect(getText(barElement)).toBe(cozyHeaderTestText);
            expect(getText(barElement, 1)).toBe(cozySubheaderTestText);

            expect(isElementClickable(barElement, 2)).toBe(true, `save button not clickable`);
            expect(isElementClickable(barElement, 3)).toBe(true, `cancel button not clickable`);
        });
    });

    describe('Check Popover Placement', () => {
        it('should check that arrow buttons have popovers and all options are clickable', () => {
            scrollIntoView(placementPopoverButton);
            const buttonsLength = getElementArrayLength(placementPopoverButton);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(placementPopoverButton, i);
                click(placementPopoverButton, i);
                expect(isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
                const optionLength = getElementArrayLength(option);
                for (let j = 3; j < optionLength; j++) {
                    expect(isElementClickable(option, j)).toBe(true, `option with index ${j} not clickable`);
                }
            }
        });
    });

    describe('Check Programmatic Control', () => {
        it('should check that avatar has popover', () => {
            scrollIntoView(programmaticAvatar);
            expect(isElementDisplayed(avatar)).toBe(true, `avatar not displayed`);
            click(programmaticControlButton);
            expect(isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
            click(programmaticControlButton, 1);
        });
    });

    describe('Check Popovers in Dialogs', () => {
        it('should check popovers in dialogs example', () => {
            scrollIntoView(popoverDialogsButton);
            click(popoverDialogsButton);
            click(multiInputButton);
            const optionLength = getElementArrayLength(multiInputOption);
            for (let i = 0; i < optionLength; i++) {
                click(multiInputOption, i);

                if (i !== optionLength - 1) {
                    click(multiInputButton);
                }
            }
            const spanLength = getElementArrayLength(multiInputSpan);
            for (let i = 0; i < spanLength; i++) {
                expect(getText(multiInputSpan, i)).toBe(fruitsTestArr[i]);
            }
        });

        it('should check dialog have header and paragraph', () => {
            scrollIntoView(popoverDialogsButton);
            click(popoverDialogsButton);
            expect(getText(popoverDialogsHeader)).toBe(popoverExampleTestText);
            expect(getText(popoverDialogParagraph)).toBe(popoverParagraphTestText);
        });

        it('should check that after clicking button "Click me!" message appears', () => {
            scrollIntoView(popoverDialogsButton);
            click(popoverDialogsButton);
            click(clickMeButton);
            expect(isElementDisplayed(popoverDialogMessage)).toBe(true, 'message not displayed');
            expect(getText(popoverDialogMessage)).toBe(buttonsPopoverTestText);
            click(clickMeButton);
            expect(doesItExist(popoverDialogMessage)).toBe(false, 'message still displayed');
        });

        it('should check dialog placeholder', () => {
            scrollIntoView(popoverDialogsButton);
            click(popoverDialogsButton);
            expect(getElementPlaceholder(dialogInput)).toBe(placeholderTestText);
        });
    });

    describe('Check Fill Control Width', () => {
        it('should check fill control width example', () => {
            // skipped due to hoverElement does not work in Safari
            if (browserIsSafari()) {
                return;
            }
            scrollIntoView(hoverElement);
            mouseHoverElement(hoverElement);
            expect(isElementDisplayed(popoverNoArrow)).toBe(true, 'popover not displayed');
            expect(getText(popoverNoArrow + paragraph)).toBe(popoverTestText2);
            expect(getText(popoverNoArrow + paragraph, 1)).toBe(popoverTestText3);

            mouseHoverElement(popoverNoArrow);
            expect(doesItExist(popoverNoArrow)).toBe(false, 'popover still displayed');
        });
    });

    describe('Check Different Popover Container', () => {
        it('should check different popover container example', () => {
            scrollIntoView(triggerButtonContainer);
            click(triggerButtonContainer);
            expect(isElementDisplayed(popoverNoArrow)).toBe(true, 'popover not displayed');

            click(triggerButtonContainer);
            expect(doesItExist(popoverNoArrow)).toBe(false, 'popover still displayed');
        });

        it('should check that after clicking trigger button appears message with text and container have some text', () => {
            scrollIntoView(triggerButtonContainer);
            click(triggerButtonContainer);
            expect(getText(popoverMessage)).toBe(triggerTestText);
            expect(getText(popoverContainer)).toBe(containerTestText);
        });
    });

    describe('Check Popover Focus Trap', () => {
        it('should check that after clicking trigger button has popover and all options are clickable', () => {
            scrollIntoView(triggerButton2);
            click(triggerButton2);
            const buttonLength = getElementArrayLength(option);
            for (let i = 3; i < buttonLength; i++) {
                expect(isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
        });

        it('should check header and clickable buttons', () => {
            scrollIntoView(triggerButton2);
            click(triggerButton2);
            const buttonsLength = getElementArrayLength(barElement);
            for (let i = 0; i < buttonsLength; i++) {
                if (i === 1) {
                    continue;
                }
                expect(isElementClickable(barElement)).toBe(true, `button with index ${i} not clickable`);
            }
            expect(getText(barElement, 1)).toBe(headerTestText);
        });
    });

    describe('Check Popover Scroll Example', () => {
        it('should check that after clicking messages appears', () => {
            scrollIntoView(scrollButton);
            const buttonLength = getElementArrayLength(scrollButton);
            for (let i = 0; i < buttonLength; i++) {
                scrollIntoView(scrollButton, i);
                click(scrollButton, i);
                expect(isElementDisplayed(scrollMessage)).toBe(true, 'message not displayed');
                expect(getText(scrollMessage)).toBe(messageTestText);
                click(scrollButton, i);
            }
        });

        it('should check that popover message still present after scrolling', () => {
            click(scrollButton);
            scrollIntoView(scrollButton, 1);
            expect(isElementDisplayed(scrollMessage)).toBe(true, 'message not displayed');
        });

        it('should check that popover message disappears after scrolling', () => {
            click(scrollButton, 2);
            scrollIntoView(scrollButton, 3);
            scrollIntoView(scrollButton, 2);
            expect(doesItExist(scrollMessage)).toBe(false, 'message not displayed');
        });

        it('should check that popover message disappears when you scroll away from message', () => {
            // enable mode when message disappear when you scroll away
            click(scrollCheckbox);
            click(scrollButton, 3);
            // scroll to element near the message(in the visible zone)
            scrollIntoView(scrollButton, 1);
            scrollIntoView(scrollButton, 3);
            expect(isElementDisplayed(scrollMessage)).toBe(true, 'message is not displayed');
            // scroll away
            scrollIntoView(avatar);
            scrollIntoView(scrollButton, 3);
            expect(doesItExist(scrollMessage)).toBe(false);

            // enable mode when message still present anyway
            click(scrollCheckbox);
            click(scrollButton, 3);
            scrollIntoView(avatar);
            scrollIntoView(scrollButton, 3);
            expect(isElementDisplayed(scrollMessage)).toBe(true, 'message is not displayed');
        });
    });

    describe('Check Dynamic Body Height', () => {
        it('should check that popover has clickable button', () => {
            scrollIntoView(plusButton);
            click(plusButton);
            click(dynamicButton);
        });
    });

    describe('Check Dropdown Popover', () => {
        it('should check disable button', () => {
            scrollIntoView(dropdownButton);
            expect(getElementClass(dropdownButton, 1)).toContain('is-disabled');
        });

        it('should check that buttons have dropdown and options', () => {
            scrollIntoView(dropdownButton);
            const buttonLength = getElementArrayLength(dropdownButton);
            for (let i = 0; i < buttonLength; i++) {
                if (i === 1) {
                    continue;
                }
                click(dropdownButton, i);
                expect(isElementDisplayed(popover, 1)).toBe(true, 'popover not displayed');
                const optionsLength = getElementArrayLength(dropdownOption);
                for (let j = 0; j < optionsLength; j++) {
                    expect(isElementClickable(dropdownOption, i)).toBe(true, `option with index ${j} not clickable`);
                }
            }
        });
    });

    describe('Check Popover CDK Placement', () => {
        it('should check that arrow button is clickable and it has popover and clickable options', () => {
            scrollIntoView(cdkButton);
            click(cdkButton, 5);
            click(cdkButton, 9);
            scrollIntoView(cdkButton, 12);
            expect(isElementClickable(cdkButton, 12)).toBe(true, 'arrow button not clickable');
            expect(isElementDisplayed(popover)).toBe(true, 'popover not displayed');
            const optionsLength = getElementArrayLength(option);
            for (let i = 0; i < optionsLength; i++) {
                expect(isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
        });

        it('should check that popover can move around the button', () => {
            scrollIntoView(cdkButton);
            // Origin X
            click(startButton);
            expect(getElementClass(startButton)).toContain('toggled');
            click(centerButton);
            expect(getElementClass(centerButton)).toContain('toggled');
            click(endButton);
            expect(getElementClass(endButton)).toContain('toggled');
            // Origin Y
            click(bottomButton);
            expect(getElementClass(bottomButton)).toContain('toggled');
            click(centerButton, 1);
            expect(getElementClass(centerButton, 1)).toContain('toggled');
            click(topButton);
            expect(getElementClass(topButton)).toContain('toggled');
            // // Overlay X
            click(startButton, 1);
            expect(getElementClass(startButton, 1)).toContain('toggled');
            click(centerButton, 2);
            expect(getElementClass(centerButton, 2)).toContain('toggled');
            click(endButton, 1);
            expect(getElementClass(endButton, 1)).toContain('toggled');
            // // Overlay Y
            click(bottomButton, 1);
            expect(getElementClass(bottomButton, 1)).toContain('toggled');
            click(centerButton, 3);
            expect(getElementClass(centerButton, 3)).toContain('toggled');
            click(topButton, 1);
            expect(getElementClass(topButton, 1)).toContain('toggled');
        });
    });

    describe('Check Responsive Popover in mobile mode Example', () => {
        it('should check ability add and reset clicks', () => {
            scrollIntoView(popoverMobileExample + button);
            click(popoverMobileExample + button);
            click(mobilePopoverButton);
            expect(getValue(mobileInput)).toBe('1');

            click(mobilePopoverButton, 1);
            expect(getValue(mobileInput)).toBe('0');
        });

        it('should check alert messages appears', () => {
            scrollIntoView(popoverMobileExample + button);
            click(popoverMobileExample + button);
            click(mobileFooterButton);
            expect(getAlertText()).toBe(alertText1);
            acceptAlert();

            click(mobileFooterButton, 1);
            expect(getAlertText()).toBe(alertText2);
            acceptAlert();
        });
    });

    it('should check orientation', () => {
        popoverPage.checkRtlSwitch();
    });

    xdescribe('visual regression', () => {
        it('should check examples visual regression', () => {
            popoverPage.saveExampleBaselineScreenshot();
            expect(popoverPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
