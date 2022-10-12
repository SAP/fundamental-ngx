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

    beforeAll(async () => {
        await comboboxPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(comboboxPage.root);
        await waitForElDisplayed(comboboxPage.title);
    }, 2);

    it('verify placeholders in all input fields', async () => {
        const inputLengths = await getElementArrayLength(allInputFields);
        for (let i = 0; i < inputLengths; i++) {
            await scrollIntoView(allInputFields, i);
            await expect(await getAttributeByName(allInputFields, 'placeholder', i)).toBe(placeholderTestText[i]);
        }
    });

    it('verify disable input field', async () => {
        await expect(await isEnabled(allInputFields, 20)).toBe(false, '');
    });

    describe('Check Standard Combobox', () => {
        it('verify Standard Combobox by choose option in dropdown', async () => {
            const inputLength = await getElementArrayLength(standardButton);
            for (let i = 0; i < inputLength - 1; i++) {
                await scrollIntoView(standardButton, i);
                await click(standardButton, i);
                await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
                await click(dropdownOption);
                await expect(await getText(smallText)).toBe(searchTermAppleText);
            }
        });

        it('verify Hide Addon Button by typing name of option', async () => {
            await setValue(allInputFields, 'Ba', 5);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 5)).toBe(bananaTestText);
        });

        it('should check compact input be smaller than basic input', async () => {
            const basicInputS = await getElementSize(allInputFields);
            const compactInputS = await getElementSize(compactInput);

            await expect(basicInputS.height).toBeGreaterThan(compactInputS.height);
        });
    });

    describe('Check Combobox as Search Field', () => {
        it('verify Combobox as Search Field by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 6);
            await click(activeInputButton, 4);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText, 6)).toBe(searchTermAppleText);

            await setValue(allInputFields, 'Pi', 6);
            await click(dropdownOption);
            await expect(await getText(smallText, 6)).toBe(searchPineappleText);
        });
    });

    describe('Check Custom Filter', () => {
        it('verify Combobox as Search Field by choose option typing name of it', async () => {
            await scrollIntoView(allInputFields, 7);
            await click(activeInputButton, 5);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 7)).toBe(appleTestText);

            await setValue(allInputFields, 'Ba', 7);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 7)).toBe(bananaTestText);
        });
    });

    describe('Check Custom Search Function', () => {
        it('verify Custom Search Function by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 8);
            await click(activeInputButton, 6);
            await acceptAlert();
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText_2)).toBe(searchTermAppleText);

            await setValue(allInputFields, 'Pi', 8);
            await click(dropdownOption);
            await expect(await getText(smallText_2)).toBe(searchPineappleText);
        });
    });

    describe('Check Combobox Mobile Mode', () => {
        it('verify Combobox Mobile Mode by choose option in mobile window or typing name of it', async () => {
            await scrollIntoView(allInputFields, 9);
            await click(allInputFields, 9);
            await click(dropdownOption);
            await click(mobileButton, 2);
            await expect(await getValue(allInputFields, 9)).toBe(appleTestText);

            await click(allInputFields, 9);
            await setValue(allInputFields, 'Ba', 10);
            await click(dropdownOption);
            await click(mobileButton, 2);
            await expect(await getValue(allInputFields, 9)).toBe(bananaTestText);
        });

        it('verify Combobox Mobile Mode has clickable buttons cancel, close and has header', async () => {
            await scrollIntoView(allInputFields, 9);
            await click(allInputFields, 9);
            await expect(await getText(mobileTitle)).toBe(titleTestText);

            await expect(await isElementClickable(mobileButton)).toBe(true, 'close button not clickable');
            await expect(await isElementClickable(mobileButton, 2)).toBe(true, 'cancel button not clickable');
        });
    });

    describe('Check Display Object Property', () => {
        it('verify Display Object Property by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 10);
            await click(activeInputButton, 7);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText_2, 1)).toBe(capsSearchTermAppleText);

            await clearValue(allInputFields, 10);
            await click(allInputFields, 10);
            await sendKeys('To');
            await click(dropdownOption);
            await expect(await getText(smallText_2, 1)).toBe(capsSearchTermTomatoText);
        });
    });

    describe('Check Open State Control', () => {
        it('verify Open State Control by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 11);
            await click(activeInputButton, 9);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 12)).toBe(appleTestText);
            await click(activeInputButton, 9);
            await setValue(allInputFields, 'Ba', 12);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 12)).toBe(bananaTestText);
        });
    });

    describe('Check Observable Async Example', () => {
        it('verify Observable Async by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 12);
            await click(activeInputButton, 9);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 12)).toBe(appleTestText);

            await setValue(allInputFields, 'Ba', 12);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 12)).toBe(bananaTestText);
        });
    });

    describe('Check Custom Item Template', () => {
        // will be fixed later
        it('verify Custom Item Template by choose option in dropdown or typing name of it', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(allInputFields, 13);
            await click(activeInputButton, 10);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText_2, 2)).toBe(settingsTestText[0]);
            await expect(await getText(smallText_2, 3)).toBe(settingsTestText[1]);

            await setValue(allInputFields, 'Se', 13);
            await click(dropdownOption);
            await expect(await getText(smallText_2, 2)).toBe(settingsTestText[2]);
            await expect(await getText(smallText_2, 3)).toBe(settingsTestText[3]);
        });
    });

    describe('Check Combobox with Two Columns', () => {
        it('verify Combobox with Two Columns by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 13);
            await click(activeInputButton, 11);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText_2, 4)).toBe(searchTermOneUsdTestText);

            await setValue(allInputFields, 'Ba', 14);
            await click(dropdownOption);
            await expect(await getText(smallText_2, 4)).toBe(searchTermHalfUsdTestText);
        });
    });

    describe('Check Combobox with Groups', () => {
        it('verify Combobox with Groups by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 15);
            await click(activeInputButton, 12);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');

            await click(dropdownOption);
            await expect(await getText(smallText_2, 5)).toBe(searchTermAppleText);

            await setValue(allInputFields, 'Pi', 15);
            await click(dropdownOption);
            await expect(await getText(smallText_2, 5)).toBe(searchPineappleText);
        });
    });

    describe('Check Custom Height Example', () => {
        it('verify Custom Height Example by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 17);
            await click(activeInputButton, 14);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 17)).toBe(appleTestText);

            await setValue(allInputFields, 'Ba', 17);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 17)).toBe(bananaTestText);
        });
    });

    describe('Check Return results including search term', () => {
        it('verify Return results including search term by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 17);
            await click(activeInputButton, 14);
            await expect(await isElementDisplayed(dropdownPopover)).toBe(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 17)).toBe(appleTestText);

            await setValue(allInputFields, 'Ba', 17);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 17)).toBe(bananaTestText);
        });
    });

    describe('Check Reactive Form', () => {
        // will be fixed later
        it('verify Reactive Form by choose option in dropdown and verify small text is correct', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(reactiveFormButton);
            const buttonsLength = await getElementArrayLength(reactiveFormButton);
            for (let i = 0; i < buttonsLength; i++) {
                await scrollIntoView(reactiveFormButton);
                await click(reactiveFormButton, i);
                await click(dropdownOption);
                if (i === 0) {
                    const smallTextLength = await getElementArrayLength(reactiveFormText);
                    for (let j = 0; j < smallTextLength - 3; j++) {
                        await expect(await getText(reactiveFormText, j)).toBe(reactiveFormTestText1[j]);
                    }
                }
                if (i === 1) {
                    const smallTextLength = await getElementArrayLength(reactiveFormText);
                    for (let j = 3; j < smallTextLength; j++) {
                        await expect(await getText(reactiveFormText, j)).toBe(reactiveFormTestText2[j - 3]);
                    }
                }
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await comboboxPage.checkRtlSwitch();
        });
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', async () => {
            await comboboxPage.saveExampleBaselineScreenshot();
            await expect(await comboboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
