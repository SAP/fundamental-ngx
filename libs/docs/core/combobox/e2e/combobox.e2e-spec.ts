import { ComboboxPo } from './combobox.po';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    acceptAlert,
    browserIsSafari,
    clearValue,
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementSize,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import {
    appleTestText,
    bananaTestText,
    capsSearchTermAppleText,
    capsSearchTermTomatoText,
    placeholderTestText,
    reactiveFormTestText1,
    reactiveFormTestText2,
    searchPineappleText,
    searchTermAppleText,
    searchTermHalfUsdTestText,
    searchTermOneUsdTestText,
    settingsTestText,
    titleTestText
} from './combobox-contents';

describe('Combobox component test suit', () => {
    const comboboxPage = new ComboboxPo();
    const {
        allInputFields,
        dropdownPopover,
        activeInputButton,
        dropdownOption,
        smallText,
        smallText_2,
        mobileButton,
        mobileTitle,
        reactiveFormButton,
        reactiveFormText,
        standardButton,
        compactInput
    } = comboboxPage;

    beforeAll(() => {
        comboboxPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(comboboxPage.root);
        waitForElDisplayed(comboboxPage.title);
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

    describe('Check Standard Combobox', () => {
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
            expect(getValue(allInputFields, 5)).toBe(bananaTestText);
        });

        it('should check compact input be smaller than basic input', () => {
            const basicInputS = getElementSize(allInputFields);
            const compactInputS = getElementSize(compactInput);

            expect(basicInputS.height).toBeGreaterThan(compactInputS.height);
        });
    });

    describe('Check Combobox as Search Field', () => {
        it('verify Combobox as Search Field by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 6);
            click(activeInputButton, 4);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getText(smallText, 6)).toBe(searchTermAppleText);

            setValue(allInputFields, 'Pi', 6);
            click(dropdownOption);
            expect(getText(smallText, 6)).toBe(searchPineappleText);
        });
    });

    describe('Check Custom Filter', () => {
        it('verify Combobox as Search Field by choose option typing name of it', () => {
            scrollIntoView(allInputFields, 7);
            click(activeInputButton, 5);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getValue(allInputFields, 7)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 7);
            click(dropdownOption);
            expect(getValue(allInputFields, 7)).toBe(bananaTestText);
        });
    });

    describe('Check Custom Search Function', () => {
        it('verify Custom Search Function by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 8);
            click(activeInputButton, 6);
            acceptAlert();
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getText(smallText_2)).toBe(searchTermAppleText);

            setValue(allInputFields, 'Pi', 8);
            click(dropdownOption);
            expect(getText(smallText_2)).toBe(searchPineappleText);
        });
    });

    describe('Check Combobox Mobile Mode', () => {
        it('verify Combobox Mobile Mode by choose option in mobile window or typing name of it', () => {
            scrollIntoView(allInputFields, 9);
            click(allInputFields, 9);
            click(dropdownOption);
            click(mobileButton, 2);
            expect(getValue(allInputFields, 9)).toBe(appleTestText);

            click(allInputFields, 9);
            setValue(allInputFields, 'Ba', 10);
            click(dropdownOption);
            click(mobileButton, 2);
            expect(getValue(allInputFields, 9)).toBe(bananaTestText);
        });

        it('verify Combobox Mobile Mode has clickable buttons cancel, close and has header', () => {
            scrollIntoView(allInputFields, 9);
            click(allInputFields, 9);
            expect(getText(mobileTitle)).toBe(titleTestText);

            expect(isElementClickable(mobileButton)).toBe(true, 'close button not clickable');
            expect(isElementClickable(mobileButton, 2)).toBe(true, 'cancel button not clickable');
        });
    });

    describe('Check Display Object Property', () => {
        it('verify Display Object Property by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 10);
            click(activeInputButton, 7);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getText(smallText_2, 1)).toBe(capsSearchTermAppleText);

            clearValue(allInputFields, 10);
            click(allInputFields, 10);
            sendKeys('To');
            click(dropdownOption);
            expect(getText(smallText_2, 1)).toBe(capsSearchTermTomatoText);
        });
    });

    describe('Check Open State Control', () => {
        it('verify Open State Control by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 11);
            click(activeInputButton, 9);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getValue(allInputFields, 12)).toBe(appleTestText);
            click(activeInputButton, 9);
            setValue(allInputFields, 'Ba', 12);
            click(dropdownOption);
            expect(getValue(allInputFields, 12)).toBe(bananaTestText);
        });
    });

    describe('Check Observable Async Example', () => {
        it('verify Observable Async by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 12);
            click(activeInputButton, 9);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getValue(allInputFields, 12)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 12);
            click(dropdownOption);
            expect(getValue(allInputFields, 12)).toBe(bananaTestText);
        });
    });

    describe('Check Custom Item Template', () => {
        // will be fixed later
        it('verify Custom Item Template by choose option in dropdown or typing name of it', () => {
            if (browserIsSafari()) {
                return;
            }
            scrollIntoView(allInputFields, 13);
            click(activeInputButton, 10);
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

    describe('Check Combobox with Two Columns', () => {
        it('verify Combobox with Two Columns by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 13);
            click(activeInputButton, 11);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getText(smallText_2, 4)).toBe(searchTermOneUsdTestText);

            setValue(allInputFields, 'Ba', 14);
            click(dropdownOption);
            expect(getText(smallText_2, 4)).toBe(searchTermHalfUsdTestText);
        });
    });

    describe('Check Combobox with Groups', () => {
        it('verify Combobox with Groups by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 15);
            click(activeInputButton, 12);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');

            click(dropdownOption);
            expect(getText(smallText_2, 5)).toBe(searchTermAppleText);

            setValue(allInputFields, 'Pi', 15);
            click(dropdownOption);
            expect(getText(smallText_2, 5)).toBe(searchPineappleText);
        });
    });

    describe('Check Custom Height Example', () => {
        it('verify Custom Height Example by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 17);
            click(activeInputButton, 14);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getValue(allInputFields, 17)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 17);
            click(dropdownOption);
            expect(getValue(allInputFields, 17)).toBe(bananaTestText);
        });
    });

    describe('Check Return results including search term', () => {
        it('verify Return results including search term by choose option in dropdown or typing name of it', () => {
            scrollIntoView(allInputFields, 17);
            click(activeInputButton, 14);
            expect(isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            click(dropdownOption);
            expect(getValue(allInputFields, 17)).toBe(appleTestText);

            setValue(allInputFields, 'Ba', 17);
            click(dropdownOption);
            expect(getValue(allInputFields, 17)).toBe(bananaTestText);
        });
    });

    describe('Check Reactive Form', () => {
        // will be fixed later
        it('verify Reactive Form by choose option in dropdown and verify small text is correct', () => {
            if (browserIsSafari()) {
                return;
            }
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

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            comboboxPage.checkRtlSwitch();
        });
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', () => {
            comboboxPage.saveExampleBaselineScreenshot();
            expect(comboboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
