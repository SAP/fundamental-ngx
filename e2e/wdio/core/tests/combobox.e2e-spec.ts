import { ComboboxPo } from '../pages/combobox.po';
import {
    acceptAlert,
    click, getAlertText,
    getAttributeByName,
    getElementArrayLength, getText, isElementClickable, isElementDisplayed, pause,
    refreshPage, scrollIntoView, setValue
} from '../../driver/wdio';

import {
    alertTestText,
    appleTestText, bananaTestText,
    placeholders,
    searchPineappleText,
    searchTermAppleText,
    titleTestText,
    capsSearchTermAppleText,
    capsSearchTermTomatoText, openStateAlertTestText
} from '../fixtures/appData/combobox-contents';

describe('Combobox component test suit', function() {
    const comboboxPage = new ComboboxPo();
    const {
        allInputFields, disableInputFields, dropdownPopover, activeInputButton, dropdownPopoverOption, smallText,
        smallText_2, mobileButton, mobileTitle
    } = comboboxPage;

    beforeAll(() => {
        comboboxPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    it('verify placeholders in all input fields', () => {
        const inputLengths = getElementArrayLength(allInputFields);
        for (let i = 0; i < inputLengths; i++) {
            scrollIntoView(allInputFields, i);
            expect(getAttributeByName(allInputFields, 'placeholder', i)).toBe(placeholders[i]);
        }
    });

    it('verify placeholders in all disable input fields input fields', () => {
        const inputLength = getElementArrayLength(disableInputFields);
        for (let i = 0; i < inputLength; i++) {
            scrollIntoView(disableInputFields, i);
            expect(getAttributeByName(disableInputFields, 'ng-reflect-disabled', i)).toBe('true');
        }
    });

    // xdescribe('Check Standard Combobox', function() {
    //
    //     it('verify dropdown expands after clicking on the button', () => {
    //         const inputLength = getElementArrayLength(activeInputButton);
    //         for (let i = 1; i < inputLength - 12; i++) {
    //             scrollIntoView(activeInputButton, i);
    //             click(activeInputButton, i);
    //             expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
    //             click(dropdownPopoverOption);
    //             expect(getText(smallText)).toBe(searchTermAppleText);
    //         }
    //     });
    // });

    describe('Check Combobox as Search Field', function() {

        it('verify Combobox as Search Field by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 6);
            click(activeInputButton, 5);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownPopoverOption);
            expect(getText(smallText, 6)).toBe(searchTermAppleText);

            setValue(allInputFields, 'Pi', 6);
            click(dropdownPopoverOption);
            expect(getText(smallText, 6)).toBe(searchPineappleText);
        });
    });

    describe('Check Custom Filter', function() {

        it('verify Combobox as Search Field by choose option typing name of it', () => {
            scrollIntoView(allInputFields, 7);
            click(activeInputButton, 6);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownPopoverOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 7)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 7);
            click(dropdownPopoverOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 7)).toBe(bananaTestText);
        });
    });

    describe('Check Custom Search Function', function() {

        it('verify Custom Search Function by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 8);
            click(activeInputButton, 7);
            expect(getAlertText()).toBe(alertTestText);
            acceptAlert();
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownPopoverOption);
            expect(getText(smallText_2)).toBe(searchTermAppleText);

            setValue(allInputFields, 'Pi', 8);
            click(dropdownPopoverOption);
            expect(getText(smallText_2)).toBe(searchPineappleText);
        });
    });

    describe('Check Combobox Mobile Mode', function() {

        it('verify Combobox Mobile Mode by choose option in mobile window or typing name of it', () => {
            scrollIntoView(allInputFields, 9);
            click(allInputFields, 9);
            click(dropdownPopoverOption);
            click(mobileButton, 1);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 9)).toBe(appleTestText);

            click(allInputFields, 9);
            setValue(allInputFields, 'Ba', 9);
            click(dropdownPopoverOption);
            click(mobileButton, 1);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 9)).toBe(bananaTestText);
        });

        it('verify Combobox Mobile Mode has clickable buttons cancel, close and has header', () => {
            scrollIntoView(allInputFields, 9);
            click(allInputFields, 9);
            expect(getText(mobileTitle)).toBe(titleTestText);

            expect(isElementClickable(mobileButton)).toBe(true, 'close button not clickable');
            expect(isElementClickable(mobileButton, 2)).toBe(true, 'cancel button not clickable');
        });
    });

    describe('Check Display Object Property', function() {

        it('verify Display Object Property by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 10);
            click(activeInputButton, 8);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownPopoverOption);
            expect(getText(smallText_2, 1)).toBe(capsSearchTermAppleText);

            setValue(allInputFields, 'To', 10);
            click(dropdownPopoverOption);
            expect(getText(smallText_2, 1)).toBe(capsSearchTermTomatoText);
        });
    });

    describe('Check Open State Control', function() {

        it('verify Open State Control by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 11);
            click(activeInputButton, 9);
            expect(getAlertText()).toBe(openStateAlertTestText[0]);
            acceptAlert();
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownPopoverOption);
            expect(getAlertText()).toBe(openStateAlertTestText[1]);
            acceptAlert();
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 11)).toBe(appleTestText);

            click(activeInputButton, 9);
            acceptAlert();
            setValue(allInputFields, 'Ba', 11);
            click(dropdownPopoverOption);
            acceptAlert();
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 11)).toBe(bananaTestText);
        });
    });

    fdescribe('Check Observable Async Example', function() {

        it('verify Observable Async by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 12);
            click(activeInputButton, 10);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownPopoverOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 12)).toBe(appleTestText);

            setValue(allInputFields, 'BA', 12);
            click(dropdownPopoverOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 12)).toBe(bananaTestText);
        });
    });

    describe('Check orientation', function() {

        it('should check RTL and LTR orientation', () => {
            comboboxPage.checkRtlSwitch();
        });
    });

    xdescribe('Should check visual regression', function() {

        it('should check visual regression for all examples', () => {
            comboboxPage.saveExampleBaselineScreenshot();
            expect(comboboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
