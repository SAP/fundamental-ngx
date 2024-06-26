import { ComboboxPo } from './combobox.po';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
    acceptAlert,
    browserIsSafari,
    clearValue,
    click,
    getElementArrayLength,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed
} from '../../../../../e2e';

import {
    appleTestText,
    bananaTestText,
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
        standardButton
    } = comboboxPage;

    beforeAll(async () => {
        await comboboxPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await comboboxPage.waitForRoot();
        await waitForElDisplayed(comboboxPage.title);
    }, 2);

    it('verify disable input field', async () => {
        await expect(await isEnabled(allInputFields, 21)).withContext(false, '');
    });

    describe('Check Standard Combobox', () => {
        it('verify Standard Combobox by choose option in dropdown', async () => {
            const inputLength = await getElementArrayLength(standardButton);
            for (let i = 0; i < inputLength - 1; i++) {
                await scrollIntoView(standardButton, i);
                await click(standardButton, i);
                await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
                await click(dropdownOption);
                await expect(await getText(smallText)).withContext(searchTermAppleText);
            }
        });

        it('verify Hide Addon Button by typing name of option', async () => {
            await setValue(allInputFields, 'Ba', 5);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 5)).withContext(bananaTestText);
        });
    });

    describe('Check Combobox as Search Field', () => {
        it('verify Combobox as Search Field by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 8);
            await click(activeInputButton, 4);
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText, 6)).withContext(searchTermAppleText);

            await setValue(allInputFields, 'Pi', 6);
            await click(dropdownOption);
            await expect(await getText(smallText, 6)).withContext(searchPineappleText);
        });
    });

    describe('Check Custom Filter', () => {
        it('verify Combobox as Search Field by choose option typing name of it', async () => {
            await scrollIntoView(allInputFields, 7);
            await click(activeInputButton, 5);
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 7)).withContext(appleTestText);

            await setValue(allInputFields, 'Ba', 7);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 7)).withContext(bananaTestText);
        });
    });

    describe('Check Custom Search Function', () => {
        it('verify Custom Search Function by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 9);
            await click(activeInputButton, 7);
            await acceptAlert();
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText_2)).withContext(searchTermAppleText);

            await setValue(allInputFields, 'Pi', 9);
            await click(dropdownOption);
            await expect(await getText(smallText_2)).withContext(searchPineappleText);
        });
    });

    describe('Check Combobox Mobile Mode', () => {
        it('verify Combobox Mobile Mode by choose option in mobile window or typing name of it', async () => {
            await scrollIntoView(allInputFields, 9);
            await click(allInputFields, 10);
            await click(dropdownOption);
            await click(mobileButton, 2);
            await expect(await getValue(allInputFields, 10)).toBe(appleTestText);

            await click(allInputFields, 10);
            await setValue(allInputFields, 'Ba', 10);
            await click(dropdownOption);
            await click(mobileButton, 2);
            await expect(await getValue(allInputFields, 10)).toBe(bananaTestText);
        });

        it('verify Combobox Mobile Mode has clickable buttons cancel, close and has header', async () => {
            await scrollIntoView(allInputFields, 10);
            await click(allInputFields, 10);
            await expect(await getText(mobileTitle)).toBe(titleTestText);

            await expect(await isElementClickable(mobileButton)).toBe(true, 'close button not clickable');
            await expect(await isElementClickable(mobileButton, 2)).toBe(true, 'cancel button not clickable');
        });
    });

    describe('Check Display Object Property', () => {
        it('verify Display Object Property by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 10);
            await click(activeInputButton, 7);
            await acceptAlert();
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText_2)).withContext(searchTermAppleText);

            await clearValue(allInputFields, 10);
            await click(allInputFields, 10);
            await sendKeys('To');
            await click(dropdownOption);
            await expect(await getText(smallText_2)).withContext(searchTermAppleText);
        });
    });

    describe('Check Open State Control', () => {
        it('verify Open State Control by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 11);
            await click(activeInputButton, 9);
            await acceptAlert();
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await acceptAlert();
            await expect(await getValue(allInputFields, 12)).withContext(appleTestText);
            await click(activeInputButton, 9);
            await acceptAlert();
            await setValue(allInputFields, 'Ba', 12);
            await click(dropdownOption);
            await acceptAlert();
            await expect(await getValue(allInputFields, 12)).withContext(bananaTestText);
        });
    });

    describe('Check Observable Async Example', () => {
        it('verify Observable Async by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 12);
            await click(activeInputButton, 9);
            await acceptAlert();
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await acceptAlert();
            await expect(await getValue(allInputFields, 12)).withContext(appleTestText);
            await click(activeInputButton, 9);
            await acceptAlert();
            await setValue(allInputFields, 'Ba', 12);
            await click(dropdownOption);
            await acceptAlert();
            await expect(await getValue(allInputFields, 12)).withContext(bananaTestText);
        });
    });

    describe('Check Custom Item Template', () => {
        // will be fixed later
        it('verify Custom Item Template by choose option in dropdown or typing name of it', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(allInputFields, 13);
            await click(activeInputButton, 11);
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText_2, 2)).withContext(settingsTestText[0]);
            await expect(await getText(smallText_2, 3)).withContext(settingsTestText[1]);

            await click(activeInputButton, 11);
            await setValue(allInputFields, 'Se', 14);
            await click(dropdownOption);
            await expect(await getText(smallText_2, 2)).withContext(settingsTestText[2]);
            await expect(await getText(smallText_2, 3)).withContext(settingsTestText[3]);
        });
    });

    describe('Check Combobox with Two Columns', () => {
        it('verify Combobox with Two Columns by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 14);
            await click(activeInputButton, 12);
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getText(smallText_2, 4)).withContext(searchTermOneUsdTestText);
            await click(activeInputButton, 12);
            await setValue(allInputFields, 'Ba', 15);
            await click(dropdownOption);
            await expect(await getText(smallText_2, 4)).withContext(searchTermHalfUsdTestText);
        });
    });

    describe('Check Combobox with Groups', () => {
        it('verify Combobox with Groups by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 15);
            await click(activeInputButton, 13);
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');

            await click(dropdownOption);
            await expect(await getText(smallText_2, 5)).withContext(searchTermAppleText);
            await click(activeInputButton, 13);
            await setValue(allInputFields, 'Pi', 16);
            await click(dropdownOption);
            await expect(await getText(smallText_2, 5)).withContext(searchPineappleText);
        });
    });

    describe('Check Custom Height Example', () => {
        it('verify Custom Height Example by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 17);
            await click(activeInputButton, 14);
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 17)).withContext(appleTestText);

            await setValue(allInputFields, 'Ba', 17);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 17)).withContext(bananaTestText);
        });
    });

    describe('Check Return results including search term', () => {
        it('verify Return results including search term by choose option in dropdown or typing name of it', async () => {
            await scrollIntoView(allInputFields, 17);
            await click(activeInputButton, 14);
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 17)).withContext(appleTestText);

            await setValue(allInputFields, 'Ba', 17);
            await click(dropdownOption);
            await expect(await getValue(allInputFields, 17)).withContext(bananaTestText);
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
                        await expect(await getText(reactiveFormText, j)).withContext(reactiveFormTestText1[j]);
                    }
                }
                if (i === 1) {
                    const smallTextLength = await getElementArrayLength(reactiveFormText);
                    for (let j = 3; j < smallTextLength; j++) {
                        await expect(await getText(reactiveFormText, j)).withContext(reactiveFormTestText2[j - 3]);
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
});
