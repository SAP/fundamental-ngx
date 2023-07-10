import { PopoverPo } from './popover.po';
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
} from '../../../../../e2e';

import {
    alertText1,
    alertText2,
    buttonsPopoverTestText,
    containerTestText,
    cozyHeaderTestText,
    cozySubheaderTestText,
    fruitsTestArr,
    headerTestText,
    messageTestText,
    placeholderTestText,
    popoverExampleTestText,
    popoverParagraphTestText,
    popoverTestText,
    popoverTestText2,
    popoverTestText3,
    subheaderTestText,
    triggerTestText
} from './popover-contents';

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

    beforeAll(async () => {
        await popoverPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(popoverPage.root);
        await waitForElDisplayed(popoverPage.title);
    }, 1);

    describe('Check Basic Popovers', () => {
        it('should check that avatars have popovers', async () => {
            await scrollIntoView(avatar);
            const avatarLength = await getElementArrayLength(avatar);
            for (let i = 0; i < avatarLength - 1; i++) {
                await click(avatar, i);
                await expect(await isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
                const optionLength = await getElementArrayLength(option);
                for (let j = 3; j < optionLength; j++) {
                    await expect(await isElementClickable(option, j)).toBe(
                        true,
                        `option with index ${j} not clickable`
                    );
                }
            }
        });

        it('should check that icon has popover and all options are clickable', async () => {
            await scrollIntoView(icon, 1);
            await click(icon, 1);
            const iconLength = await getElementArrayLength(option);
            for (let i = 3; i < iconLength; i++) {
                await expect(await isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
        });

        it('should check that icon money has popover and all options and arrow button are clickable', async () => {
            await scrollIntoView(iconMoney);
            await click(iconMoney);
            await expect(await isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
            await expect(await isElementClickable(standardMoneyButton)).toBe(true, `button not clickable`);
            await expect(await getText(barElement, 1)).toBe(headerTestText);
            const iconMoneyLength = await getElementArrayLength(option);
            for (let i = 3; i < iconMoneyLength; i++) {
                await expect(await isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
        });

        it('should check that basic popover buttons have popovers and all options are clickable', async () => {
            await scrollIntoView(basicPopoverButton);
            const buttonsLength = await getElementArrayLength(basicPopoverButton);
            for (let i = 0; i < buttonsLength; i++) {
                await click(basicPopoverButton, i);
                await expect(await isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
                const optionLength = await getElementArrayLength(option);
                for (let j = 3; j < optionLength; j++) {
                    await expect(await isElementClickable(option, j)).toBe(
                        true,
                        `option with index ${j} not clickable`
                    );
                }
            }
        });

        it('should check that button popover have header, subheader and buttons are clickable', async () => {
            await scrollIntoView(basicPopoverButton);
            await click(basicPopoverButton);
            await expect((await getText(barElement)).trim()).toBe(cozyHeaderTestText);
            await expect((await getText(barElement, 1)).trim()).toBe(subheaderTestText);

            await expect(await isElementClickable(barElement, 2)).toBe(true, `save button not clickable`);
            await expect(await isElementClickable(barElement, 3)).toBe(true, `cancel button not clickable`);
        });
    });

    describe('Check Simple Popover', () => {
        it('check that after clicking the button a message with text is displayed', async () => {
            await scrollIntoView(simplePopoverButton);
            await click(simplePopoverButton);
            await expect(await isElementDisplayed(popoverMessage)).toBe(true, `message not displayed`);
            await expect(await getText(popoverMessage)).toBe(popoverTestText);
        });
    });

    describe('Check Popover with Header and Footer', () => {
        it('should check that buttons have popovers and all options are clickable', async () => {
            await scrollIntoView(headerPopoverButton);
            const buttonLength = await getElementArrayLength(headerPopoverButton);
            for (let i = 0; i < buttonLength; i++) {
                await click(headerPopoverButton, i);
                const optionLength = await getElementArrayLength(option);
                for (let j = 3; j < optionLength; j++) {
                    await expect(await isElementClickable(option, j)).toBe(
                        true,
                        `option with index ${j} not clickable`
                    );
                }
            }
        });

        it('should check that button "with header" has header', async () => {
            await scrollIntoView(headerPopoverButton);
            await click(headerPopoverButton, 1);
            await expect(await getText(barElement)).toBe(cozyHeaderTestText);
        });

        it('should check that button "with header and footer" has header and all buttons are clickable', async () => {
            await scrollIntoView(headerPopoverButton);
            await click(headerPopoverButton, 2);
            await expect(await getText(barElement)).toBe(cozyHeaderTestText);

            await expect(await isElementClickable(barElement, 1)).toBe(true, `save button not clickable`);
            await expect(await isElementClickable(barElement, 2)).toBe(true, `cancel button not clickable`);
        });

        it('should check that button "with header, subHeader and footer" has header, subheader and all buttons are clickable', async () => {
            await scrollIntoView(headerPopoverButton);
            await click(headerPopoverButton, 3);
            await expect(await getText(barElement)).toBe(cozyHeaderTestText);
            await expect(await getText(barElement, 1)).toBe(cozySubheaderTestText);

            await expect(await isElementClickable(barElement, 2)).toBe(true, `save button not clickable`);
            await expect(await isElementClickable(barElement, 3)).toBe(true, `cancel button not clickable`);
        });
    });

    describe('Check Popover Placement', () => {
        it('should check that arrow buttons have popovers and all options are clickable', async () => {
            await scrollIntoView(placementPopoverButton);
            const buttonsLength = await getElementArrayLength(placementPopoverButton);
            for (let i = 0; i < buttonsLength; i++) {
                await scrollIntoView(placementPopoverButton, i);
                await click(placementPopoverButton, i);
                await expect(await isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
                const optionLength = await getElementArrayLength(option);
                for (let j = 3; j < optionLength; j++) {
                    await expect(await isElementClickable(option, j)).toBe(
                        true,
                        `option with index ${j} not clickable`
                    );
                }
            }
        });
    });

    describe('Check Programmatic Control', () => {
        it('should check that avatar has popover', async () => {
            await scrollIntoView(programmaticAvatar);
            await expect(await isElementDisplayed(avatar)).toBe(true, `avatar not displayed`);
            await click(programmaticControlButton);
            await expect(await isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
            await click(programmaticControlButton, 1);
        });
    });

    describe('Check Popovers in Dialogs', () => {
        it('should check popovers in dialogs example', async () => {
            await scrollIntoView(popoverDialogsButton);
            await click(popoverDialogsButton);
            await click(multiInputButton);
            const optionLength = await getElementArrayLength(multiInputOption);
            for (let i = 0; i < optionLength; i++) {
                await click(multiInputOption, i);

                if (i !== optionLength - 1) {
                    await click(multiInputButton);
                }
            }
            const spanLength = await getElementArrayLength(multiInputSpan);
            for (let i = 0; i < spanLength; i++) {
                await expect(await getText(multiInputSpan, i)).toBe(fruitsTestArr[i]);
            }
        });

        it('should check dialog have header and paragraph', async () => {
            await scrollIntoView(popoverDialogsButton);
            await click(popoverDialogsButton);
            await expect(await getText(popoverDialogsHeader)).toBe(popoverExampleTestText);
            await expect(await getText(popoverDialogParagraph)).toBe(popoverParagraphTestText);
        });

        it('should check that after clicking button "Click me!" message appears', async () => {
            await scrollIntoView(popoverDialogsButton);
            await click(popoverDialogsButton);
            await click(clickMeButton);
            await expect(await isElementDisplayed(popoverDialogMessage)).toBe(true, 'message not displayed');
            await expect(await getText(popoverDialogMessage)).toBe(buttonsPopoverTestText);
            await click(clickMeButton);
            await expect(await doesItExist(popoverDialogMessage)).toBe(false, 'message still displayed');
        });

        it('should check dialog placeholder', async () => {
            await scrollIntoView(popoverDialogsButton);
            await click(popoverDialogsButton);
            await expect(await getElementPlaceholder(dialogInput)).toBe(placeholderTestText);
        });
    });

    describe('Check Fill Control Width', () => {
        it('should check fill control width example', async () => {
            // skipped due to hoverElement does not work in Safari
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(hoverElement);
            await mouseHoverElement(hoverElement);
            await expect(await isElementDisplayed(popoverNoArrow)).toBe(true, 'popover not displayed');
            await expect(await getText(popoverNoArrow + paragraph)).toBe(popoverTestText2);
            await expect(await getText(popoverNoArrow + paragraph, 1)).toBe(popoverTestText3);

            await mouseHoverElement(popoverNoArrow);
            await expect(await doesItExist(popoverNoArrow)).toBe(false, 'popover still displayed');
        });
    });

    describe('Check Different Popover Container', () => {
        it('should check different popover container example', async () => {
            await scrollIntoView(triggerButtonContainer);
            await click(triggerButtonContainer);
            await expect(await isElementDisplayed(popoverNoArrow)).toBe(true, 'popover not displayed');

            await click(triggerButtonContainer);
            await expect(await doesItExist(popoverNoArrow)).toBe(false, 'popover still displayed');
        });

        it('should check that after clicking trigger button appears message with text and container have some text', async () => {
            await scrollIntoView(triggerButtonContainer);
            await click(triggerButtonContainer);
            await expect(await getText(popoverMessage)).toBe(triggerTestText);
            await expect(await getText(popoverContainer)).toBe(containerTestText);
        });
    });

    describe('Check Popover Focus Trap', () => {
        it('should check that after clicking trigger button has popover and all options are clickable', async () => {
            await scrollIntoView(triggerButton2);
            await click(triggerButton2);
            const buttonLength = await getElementArrayLength(option);
            for (let i = 3; i < buttonLength; i++) {
                await expect(await isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
        });

        it('should check header and clickable buttons', async () => {
            await scrollIntoView(triggerButton2);
            await click(triggerButton2);
            const buttonsLength = await getElementArrayLength(barElement);
            for (let i = 0; i < buttonsLength; i++) {
                if (i === 1) {
                    continue;
                }
                await expect(await isElementClickable(barElement)).toBe(true, `button with index ${i} not clickable`);
            }
            await expect(await getText(barElement, 1)).toBe(headerTestText);
        });
    });

    describe('Check Popover Scroll Example', () => {
        it('should check that after clicking messages appears', async () => {
            await scrollIntoView(scrollButton);
            const buttonLength = await getElementArrayLength(scrollButton);
            for (let i = 0; i < buttonLength; i++) {
                await scrollIntoView(scrollButton, i);
                await click(scrollButton, i);
                await expect(await isElementDisplayed(scrollMessage)).toBe(true, 'message not displayed');
                await expect(await getText(scrollMessage)).toBe(messageTestText);
                await click(scrollButton, i);
            }
        });

        it('should check that popover message still present after scrolling', async () => {
            await click(scrollButton);
            await scrollIntoView(scrollButton, 1);
            await expect(await isElementDisplayed(scrollMessage)).toBe(true, 'message not displayed');
        });

        it('should check that popover message disappears after scrolling', async () => {
            await click(scrollButton, 2);
            await scrollIntoView(scrollButton, 3);
            await scrollIntoView(scrollButton, 2);
            await expect(await doesItExist(scrollMessage)).toBe(false, 'message not displayed');
        });

        it('should check that popover message disappears when you scroll away from message', async () => {
            // enable mode when message disappear when you scroll away
            await click(scrollCheckbox);
            await click(scrollButton, 3);
            // scroll to element near the message(in the visible zone)
            await scrollIntoView(scrollButton, 1);
            await scrollIntoView(scrollButton, 3);
            await expect(await isElementDisplayed(scrollMessage)).toBe(true, 'message is not displayed');
            // scroll away
            await scrollIntoView(avatar);
            await scrollIntoView(scrollButton, 3);
            await expect(await doesItExist(scrollMessage)).toBe(false);

            // enable mode when message still present anyway
            await click(scrollCheckbox);
            await click(scrollButton, 3);
            await scrollIntoView(avatar);
            await scrollIntoView(scrollButton, 3);
            await expect(await isElementDisplayed(scrollMessage)).toBe(true, 'message is not displayed');
        });
    });

    describe('Check Dynamic Body Height', () => {
        it('should check that popover has clickable button', async () => {
            await scrollIntoView(plusButton);
            await click(plusButton);
            await click(dynamicButton);
        });
    });

    describe('Check Dropdown Popover', () => {
        it('should check disable button', async () => {
            await scrollIntoView(dropdownButton);
            await expect(await getElementClass(dropdownButton, 1)).toContain('is-disabled');
        });

        it('should check that buttons have dropdown and options', async () => {
            await scrollIntoView(dropdownButton);
            const buttonLength = await getElementArrayLength(dropdownButton);
            for (let i = 0; i < buttonLength; i++) {
                if (i === 1) {
                    continue;
                }
                await click(dropdownButton, i);
                await expect(await isElementDisplayed(popover, 1)).toBe(true, 'popover not displayed');
                const optionsLength = await getElementArrayLength(dropdownOption);
                for (let j = 0; j < optionsLength; j++) {
                    await expect(await isElementClickable(dropdownOption, i)).toBe(
                        true,
                        `option with index ${j} not clickable`
                    );
                }
            }
        });
    });

    describe('Check Popover CDK Placement', () => {
        it('should check that arrow button is clickable and it has popover and clickable options', async () => {
            await scrollIntoView(cdkButton);
            await click(cdkButton, 5);
            await click(cdkButton, 9);
            await scrollIntoView(cdkButton, 12);
            await expect(await isElementClickable(cdkButton, 12)).toBe(true, 'arrow button not clickable');
            await expect(await isElementDisplayed(popover)).toBe(true, 'popover not displayed');
            const optionsLength = await getElementArrayLength(option);
            for (let i = 0; i < optionsLength; i++) {
                await expect(await isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
        });

        it('should check that popover can move around the button', async () => {
            await scrollIntoView(cdkButton);
            // Origin X
            await click(startButton);
            await expect(await getElementClass(startButton)).toContain('toggled');
            await click(centerButton);
            await expect(await getElementClass(centerButton)).toContain('toggled');
            await click(endButton);
            await expect(await getElementClass(endButton)).toContain('toggled');
            // Origin Y
            await click(bottomButton);
            await expect(await getElementClass(bottomButton)).toContain('toggled');
            await click(centerButton, 1);
            await expect(await getElementClass(centerButton, 1)).toContain('toggled');
            await click(topButton);
            await expect(await getElementClass(topButton)).toContain('toggled');
            // // Overlay X
            await click(startButton, 1);
            await expect(await getElementClass(startButton, 1)).toContain('toggled');
            await click(centerButton, 2);
            await expect(await getElementClass(centerButton, 2)).toContain('toggled');
            await click(endButton, 1);
            await expect(await getElementClass(endButton, 1)).toContain('toggled');
            // // Overlay Y
            await click(bottomButton, 1);
            await expect(await getElementClass(bottomButton, 1)).toContain('toggled');
            await click(centerButton, 3);
            await expect(await getElementClass(centerButton, 3)).toContain('toggled');
            await click(topButton, 1);
            await expect(await getElementClass(topButton, 1)).toContain('toggled');
        });
    });

    describe('Check Responsive Popover in mobile mode Example', () => {
        it('should check ability add and reset clicks', async () => {
            await scrollIntoView(popoverMobileExample + button);
            await click(popoverMobileExample + button);
            await click(mobilePopoverButton);
            await expect(await getValue(mobileInput)).toBe('1');

            await click(mobilePopoverButton, 1);
            await expect(await getValue(mobileInput)).toBe('0');
        });

        it('should check alert message appears', async () => {
            await scrollIntoView(popoverMobileExample + button);
            await click(popoverMobileExample + button);
            await waitForElDisplayed(mobileFooterButton);
            await click(mobileFooterButton);
            await expect(await getAlertText()).toBe(alertText1);
            await acceptAlert();
        });

        it('should check alert message 2 appears', async () => {
            await scrollIntoView(popoverMobileExample + button);
            await click(popoverMobileExample + button);
            await waitForElDisplayed(mobileFooterButton);
            await click(mobileFooterButton, 1);
            await expect(await getAlertText()).toBe(alertText2);
            await acceptAlert();
        });
    });

    it('should check orientation', async () => {
        await popoverPage.checkRtlSwitch();
    });

    xdescribe('visual regression', () => {
        it('should check examples visual regression', async () => {
            await popoverPage.saveExampleBaselineScreenshot();
            await expect(await popoverPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
