import { ComboboxPo } from '../pages/combobox.po';
import {
    acceptAlert,
    click, getAlertText,
    getAttributeByName,
    getElementArrayLength, getText, isElementClickable, isElementDisplayed, isEnabled,
    refreshPage, scrollIntoView, setValue
} from '../../driver/wdio';

import {
    alertTestText,
    appleTestText,
    bananaTestText,
    placeholderTestText,
    searchPineappleText,
    searchTermAppleText,
    titleTestText,
    capsSearchTermAppleText,
    capsSearchTermTomatoText,
    openStateAlertTestText,
    settingsTestText,
    searchTermOneUsdTestText,
    searchTermHalfUsdTestText, reactiveFormTestText1, reactiveFormTestText2
} from '../fixtures/appData/combobox-contents';

describe('Combobox component test suit', function() {
    const comboboxPage = new ComboboxPo();
    const {
        allInputFields, dropdownPopover, activeInputButton, dropdownOption, smallText,
        smallText_2, mobileButton, mobileTitle, reactiveFormButton, reactiveFormText, standardButton
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
            expect(getAttributeByName(allInputFields, 'placeholder', i)).toBe(placeholderTestText[i]);
        }
    });

    it('verify disable input field', () => {
        expect(isEnabled(allInputFields, 20)).toBe(false, '');
    });

    describe('Check Standard Combobox', function() {

        it('verify Standard Combobox by choose option in dropdown', () => {
            const inputLength = getElementArrayLength(standardButton);
            for (let i = 0; i < inputLength - 1; i++) {
                scrollIntoView(standardButton, i);
                click(standardButton, i);
                expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
                click(dropdownOption);
                expect(getText(smallText)).toBe(searchTermAppleText);
            }
        });

        it('verify Hide Addon Button by typing name of option', () => {
            setValue(allInputFields, 'Ba', 5);
            click(dropdownOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 5)).toBe(bananaTestText);
        });
    });

    describe('Check Combobox as Search Field', function() {

        it('verify Combobox as Search Field by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 6);
            click(activeInputButton, 5);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getText(smallText, 6)).toBe(searchTermAppleText);

            setValue(allInputFields, 'Pi', 6);
            click(dropdownOption);
            expect(getText(smallText, 6)).toBe(searchPineappleText);
        });
    });

    describe('Check Custom Filter', function() {

        it('verify Combobox as Search Field by choose option typing name of it', () => {
            scrollIntoView(allInputFields, 7);
            click(activeInputButton, 6);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 7)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 7);
            click(dropdownOption);
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
            click(dropdownOption);
            expect(getText(smallText_2)).toBe(searchTermAppleText);

            setValue(allInputFields, 'Pi', 8);
            click(dropdownOption);
            expect(getText(smallText_2)).toBe(searchPineappleText);
        });
    });

    describe('Check Combobox Mobile Mode', function() {

        it('verify Combobox Mobile Mode by choose option in mobile window or typing name of it', () => {
            scrollIntoView(allInputFields, 9);
            click(allInputFields, 9);
            click(dropdownOption);
            click(mobileButton, 1);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 9)).toBe(appleTestText);

            click(allInputFields, 9);
            setValue(allInputFields, 'Ba', 9);
            click(dropdownOption);
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
            click(dropdownOption);
            expect(getText(smallText_2, 1)).toBe(capsSearchTermAppleText);

            setValue(allInputFields, 'To', 10);
            click(dropdownOption);
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
            click(dropdownOption);
            expect(getAlertText()).toBe(openStateAlertTestText[1]);
            acceptAlert();
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 11)).toBe(appleTestText);

            click(activeInputButton, 9);
            acceptAlert();
            setValue(allInputFields, 'Ba', 11);
            click(dropdownOption);
            acceptAlert();
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 11)).toBe(bananaTestText);
        });
    });

    describe('Check Observable Async Example', function() {

        it('verify Observable Async by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 12);
            click(activeInputButton, 10);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 12)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 12);
            click(dropdownOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 12)).toBe(bananaTestText);
        });
    });

    describe('Check Custom Item Template', function() {

        it('verify Custom Item Template by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 13);
            click(activeInputButton, 11);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getText(smallText_2, 2)).toBe(settingsTestText[0]);
            expect(getText(smallText_2, 3)).toBe(settingsTestText[1]);

            setValue(allInputFields, 'Se', 13);
            click(dropdownOption);
            expect(getText(smallText_2, 2)).toBe(settingsTestText[2]);
            expect(getText(smallText_2, 3)).toBe(settingsTestText[3]);
        });
    });

    describe('Check Combobox with Two Columns', function() {

        it('verify Combobox with Two Columns by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 14);
            click(activeInputButton, 12);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getText(smallText_2, 4)).toBe(searchTermOneUsdTestText);

            setValue(allInputFields, 'Ba', 14);
            click(dropdownOption);
            expect(getText(smallText_2, 4)).toBe(searchTermHalfUsdTestText);
        });
    });

    describe('Check Combobox with Groups', function() {

        it('verify Combobox with Groups by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 15);
            click(activeInputButton, 13);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption, 1);
            expect(getText(smallText_2, 5)).toBe(searchTermAppleText);

            setValue(allInputFields, 'Pi', 15);
            click(dropdownOption, 1);
            expect(getText(smallText_2, 5)).toBe(searchPineappleText);
        });
    });

    describe('Check Custom Height Example', function() {

        it('verify Custom Height Example by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 16);
            click(activeInputButton, 14);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 16)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 16);
            click(dropdownOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 16)).toBe(bananaTestText);
        });
    });

    describe('Check Return results including search term', function() {

        it('verify Return results including search term by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 17);
            click(activeInputButton, 15);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 17)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 17);
            click(dropdownOption);
            expect(getAttributeByName(allInputFields, 'ng-reflect-input-text', 17)).toBe(bananaTestText);
        });
    });

    describe('Check Reactive Form', function() {

        it('verify Reactive Form by choose option in dropdown and verify small text is correct', () => {
            scrollIntoView(reactiveFormButton);
            const buttonsLength = getElementArrayLength(reactiveFormButton);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(reactiveFormButton);
                click(reactiveFormButton, i);
                click(dropdownOption);
                if (i === 0) {
                    const smallTextLength = getElementArrayLength(reactiveFormText);
                    for (let j = 0; j < smallTextLength - 3; j++) {
                        expect(getText(reactiveFormText, j)).toBe(reactiveFormTestText1[j]);
                    }
                }
                if (i === 1) {
                    const smallTextLength = getElementArrayLength(reactiveFormText);
                    for (let j = 3; j < smallTextLength; j++) {
                        expect(getText(reactiveFormText, j)).toBe(reactiveFormTestText2[j - 3]);
                    }
                }
            }
        });
    });

    describe('Check orientation', function() {

        it('should check RTL and LTR orientation', () => {
            comboboxPage.checkRtlSwitch();
        });
    });

    fdescribe('Should check visual regression', function() {

        it('should check visual regression for all examples', () => {
            comboboxPage.saveExampleBaselineScreenshot();
            expect(comboboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
