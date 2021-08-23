import { PopoverPo } from '../pages/popover.po';
import {
    click, getAttributeByName,
    getElementArrayLength, getElementClass, getText, isElementClickable, isElementDisplayed,
    refreshPage, scrollIntoView
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
    hoverTestText,
    containerTestText,
    triggerTestText, messageTestText
} from '../fixtures/appData/popover-contents';

describe('Popover test suite', function() {
    const popoverPage = new PopoverPo();
    const {
        avatar, popover, option, icon, iconMoney, standardMoneyButton, barElement, basicPopoverButton,
        simplePopoverButton, popoverMessage, headerPopoverButton, placementPopoverButton, programmaticControlButton,
        popoverDialogsButton, multiInputButton, multiInputOption, multiInputSpan, popoverDialogsHeader, popoverDialogParagraph,
        clickMeButton, popoverDialogMessage, hoverElement, triggerButton2, triggerButton, popoverContainer, scrollButton,
        scrollMessage, plusButton, dynamicOption, dropdownButton, dropdownOption, dynamicSubOption, cdkButton, segmentButton,
        topButton, endButton, centerButton, startButton, bottomButton
    } = popoverPage;

    beforeAll(() => {
        popoverPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 1);

    describe('Check Basic Popovers', function() {

        it('should check that avatars have popovers and all options are clickable', () => {
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
            expect(getText(barElement)).toBe(cozyHeaderTestText);
            expect(getText(barElement, 1)).toBe(subheaderTestText);

            expect(isElementClickable(barElement, 2)).toBe(true, `save button not clickable`);
            expect(isElementClickable(barElement, 3)).toBe(true, `cancel button not clickable`);
        });
    });

    describe('Check Simple Popover', function() {

        it('check that after clicking the button a message with text is displayed', () => {
            scrollIntoView(simplePopoverButton);
            click(simplePopoverButton);
            expect(isElementDisplayed(popoverMessage)).toBe(true, `message not displayed`);
            expect(getText(popoverMessage)).toBe(popoverTestText);
        });
    });

    describe('Check Popover with Header and Footer', function() {

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

    describe('Check Popover Placement', function() {

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

    describe('Check Programmatic Control', function() {

        it('should check that avatar has popover and all options are clickable', () => {
            scrollIntoView(avatar, 2);
            expect(isElementDisplayed(avatar, 2)).toBe(true, `avatar not displayed`);
            click(programmaticControlButton);
            expect(isElementDisplayed(popover, 1)).toBe(true, `popover not displayed`);
            const buttonLength = getElementArrayLength(option);
            for (let i = 3; i < buttonLength; i++) {
                expect(isElementClickable(option, i)).toBe(true, `option with index ${i} not clickable`);
            }
            click(programmaticControlButton, 1);
        });
    });

    describe('Check Popovers in Dialogs', function() {

        it('should check popovers in dialogs example', () => {
            scrollIntoView(popoverDialogsButton);
            click(popoverDialogsButton);
            click(multiInputButton);
            const optionLength = getElementArrayLength(multiInputOption);
            for (let i = 3; i < optionLength; i++) {
                click(multiInputOption, i);

                if (i !== (optionLength - 1)) {
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
        });
    });

    describe('Check Fill Control Width', function() {

        it('should check fill control width example', () => {
            scrollIntoView(hoverElement);
            expect(getText(hoverElement)).toBe(hoverTestText);
        });
    });

    describe('Check Popover Focus Trap', function() {

        it('should check that after clicking trigger button appears message with text and container have some text', () => {
            scrollIntoView(triggerButton);
            click(triggerButton);
            expect(isElementDisplayed(popoverMessage)).toBe(true, `message not displayed`);
            expect(getText(popoverMessage)).toBe(triggerTestText);
            expect(getText(popoverContainer)).toBe(containerTestText);
        });
    });

    describe('Check Popover Focus Trap', function() {

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

    describe('Check Popover Scroll Example', function() {

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
    });

    describe('Check Dynamic Body Height', function() {

        it('should check that first dropdown option has clickable suboptions', () => {
            scrollIntoView(plusButton);
            click(plusButton);
            click(dynamicOption);
            const subOptionsLength = getElementArrayLength(dynamicSubOption);
            for (let i = 0; i < subOptionsLength - 12; i++) {
                scrollIntoView(dynamicSubOption, i);
                expect(isElementClickable(dynamicSubOption, i)).toBe(true, `suboption with index ${i} not clickable`);
            }
        });

        it('should check that second dropdown option has clickable suboptions', () => {
            scrollIntoView(plusButton);
            click(plusButton);
            click(dynamicOption, 1);
            const subOptionsLength = getElementArrayLength(dynamicSubOption);
            for (let i = 3; i < subOptionsLength - 9; i++) {
                scrollIntoView(dynamicSubOption, i);
                expect(isElementClickable(dynamicSubOption, i)).toBe(true, `suboption with index ${i} not clickable`);
            }
        });

        it('should check that third dropdown option has clickable suboptions', () => {
            scrollIntoView(plusButton);
            click(plusButton);
            click(dynamicOption, 2);
            const subOptionsLength = getElementArrayLength(dynamicSubOption);
            for (let i = 6; i < subOptionsLength - 6; i++) {
                scrollIntoView(dynamicSubOption, i);
                expect(isElementClickable(dynamicSubOption, i)).toBe(true, `suboption with index ${i} not clickable`);
            }
        });

        it('should check that forth dropdown option has clickable suboptions', () => {
            scrollIntoView(plusButton);
            click(plusButton);
            click(dynamicOption, 3);
            const subOptionsLength = getElementArrayLength(dynamicSubOption);
            for (let i = 9; i < subOptionsLength - 3; i++) {
                scrollIntoView(dynamicSubOption, i);
                expect(isElementClickable(dynamicSubOption, i)).toBe(true, `suboption with index ${i} not clickable`);
            }
        });

        it('should check that fifth dropdown option has clickable suboptions', () => {
            scrollIntoView(plusButton);
            click(plusButton);
            click(dynamicOption, 4);
            const subOptionsLength = getElementArrayLength(dynamicSubOption);
            for (let i = 12; i < subOptionsLength; i++) {
                scrollIntoView(dynamicSubOption, i);
                expect(isElementClickable(dynamicSubOption, i)).toBe(true, `suboption with index ${i} not clickable`);
            }
        });
    });

    describe('Check Dropdown Popover', function() {

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

    describe('Check Dropdown Popover', function() {

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
            click(centerButton)
            expect(getElementClass(centerButton)).toContain('toggled');
            click(endButton);
            expect(getElementClass(endButton)).toContain('toggled');
            // Origin Y
            click(bottomButton);
            expect(getElementClass(bottomButton)).toContain('toggled');
            click(centerButton, 1)
            expect(getElementClass(centerButton, 1)).toContain('toggled');
            click(topButton);
            expect(getElementClass(topButton)).toContain('toggled');
            // // Overlay X
            click(startButton, 1);
            expect(getElementClass(startButton, 1)).toContain('toggled');
            click(centerButton, 2)
            expect(getElementClass(centerButton, 2)).toContain('toggled');
            click(endButton, 1);
            expect(getElementClass(endButton, 1)).toContain('toggled');
            // // Overlay Y
            click(bottomButton, 1);
            expect(getElementClass(bottomButton, 1)).toContain('toggled');
            click(centerButton, 3)
            expect(getElementClass(centerButton, 3)).toContain('toggled');
            click(topButton, 1);
            expect(getElementClass(topButton, 1)).toContain('toggled');
        });
    });

    it('should check orientation', () => {
        popoverPage.checkRtlSwitch();
    });

    xdescribe('visual regression', function() {

        it('should check examples visual regression', () => {
            popoverPage.saveExampleBaselineScreenshot();
            expect(popoverPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
