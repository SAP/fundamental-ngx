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
} from '@fundamental-ngx/e2e';
import { ComboboxPo } from './combobox.po';

describe('Combobox component test suit', () => {
    const comboboxPage = new ComboboxPo();

    const dropdownPopover = '.fd-combobox-custom-list';
    const dropdownFirstOption = '.fd-combobox-custom-list li.fd-list__item:not(.fd-list__group-header)';

    beforeAll(async () => {
        await comboboxPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await comboboxPage.waitForRoot();
        await waitForElDisplayed(comboboxPage.title);
    }, 2);

    it('verify disable input field', async () => {
        const disabledExampleInput = 'fd-combobox-disabled-example fd-combobox input';
        await expect(await isEnabled(disabledExampleInput)).withContext(false, '');
    });

    describe('Check Standard Combobox', () => {
        it('should verify that each standard combobox can be opened and an option can be selected', async () => {
            const comboboxButtons = 'fd-combobox-example .fd-combobox button';
            const comboboxButtonLength = await getElementArrayLength(comboboxButtons);
            for (let i = 0; i < comboboxButtonLength - 1; i++) {
                await scrollIntoView(comboboxButtons, i);
                await click(comboboxButtons, i);
                await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
                await click(dropdownFirstOption);
                await expect(await getText('fd-combobox-example small')).withContext('Search Term: Apple');
            }
        });
    });

    describe('Check Combobox as Search Field', () => {
        it('verify Combobox as Search Field by choosing option in dropdown or typing name of it', async () => {
            const searchField = 'fd-combobox-search-field-example fd-combobox';
            const searchFieldInput = searchField + ' input';
            const searchFieldButton = searchField + ' button';
            await scrollIntoView(searchField);
            await click(searchFieldButton);
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownFirstOption);
            await expect(await getText(searchFieldInput)).withContext('Search Term: Apple');

            await setValue(searchFieldInput, 'Pi');
            await click(dropdownFirstOption);
            await expect(await getText(searchFieldInput)).withContext('Search Term: Pineapple');
        });
    });

    describe('Check Custom Search Function', () => {
        it('verify Custom Search Function by dismissing the alert, choosing an option in dropdown or typing name of it', async () => {
            const customSearchField = 'fd-combobox-search-function-example fd-combobox';
            const customSearchFieldInput = customSearchField + ' input';
            const customSearchFieldButton = customSearchField + ' button';
            await scrollIntoView(customSearchField);
            await click(customSearchFieldButton);
            await acceptAlert();
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownFirstOption);
            await expect(await getText(customSearchFieldInput)).withContext('Search Term: Apple');

            await setValue(customSearchFieldInput, 'Pi');
            await click(dropdownFirstOption);
            await expect(await getText(customSearchFieldInput)).withContext('Search Term: Pineapple');
        });
    });

    describe('Check Combobox Mobile Mode', () => {
        const mobileCombobox = 'fd-combobox-mobile-example fd-combobox';

        it('should select an option by clicking an item in the list', async () => {
            await scrollIntoView(mobileCombobox);
            await click(mobileCombobox);
            await click('fd-dialog-body li'); // click the first item in the dialog list
            await expect(await getValue(mobileCombobox + ' input')).withContext('Apple'); // checks the combobox input on the main page
            await expect(await getValue('fd-dialog-header input')).withContext('Apple'); // checks the input in the dialog
        });

        it('verify Combobox Mobile Mode has clickable buttons cancel, close and has header', async () => {
            await scrollIntoView(mobileCombobox);
            await click(mobileCombobox);
            await expect(await getText('fd-dialog-header h1.fd-title--h5')).withContext('Title');

            await expect(await isElementClickable('.fd-dialog__content--mobile button')).withContext(
                true,
                'close button not clickable'
            );
            await expect(await isElementClickable('.fd-dialog__content--mobile button', 2)).withContext(
                true,
                'cancel button not clickable'
            );
        });
    });

    describe('Check Display Object Property', () => {
        it('verify Display Object Property by choose option in dropdown or typing name of it', async () => {
            const displayObjectExample = 'fd-combobox-displaywith-example';
            await scrollIntoView(displayObjectExample);
            await click(displayObjectExample + ' fd-combobox button');
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownFirstOption);
            await expect(await getText(displayObjectExample + ' small')).withContext('Search Term: APPLE');

            await clearValue(displayObjectExample + ' fd-combobox input');
            await click(displayObjectExample + ' fd-combobox input');
            await sendKeys('To');
            await click(dropdownFirstOption);
            await expect(await getText(displayObjectExample + ' small')).withContext('Search Term: TOMATO');
        });
    });

    describe('Check Open State Control', () => {
        it('verify Open State Control events by handling alerts, and by choose option in dropdown or typing name of it', async () => {
            const stateControlExample = 'fd-combobox-open-control-example';
            await scrollIntoView(stateControlExample + ' fd-combobox input');
            await click(stateControlExample + ' fd-combobox button');
            await acceptAlert();
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownFirstOption);
            await acceptAlert();
            await expect(await getValue(stateControlExample + ' fd-combobox input')).withContext('Apple');
        });
    });

    describe('Check Observable Async Example', () => {
        it('verify Observable Async by choose option in dropdown or typing name of it', async () => {
            const asyncExample = 'fd-combobox-async-example';
            await scrollIntoView(asyncExample + ' fd-combobox input');
            await click(asyncExample + ' fd-combobox button');
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownFirstOption);
            await expect(await getValue(asyncExample + ' fd-combobox input')).withContext('Apple');
            await click(asyncExample + ' fd-combobox button');
            await setValue(asyncExample + ' fd-combobox input', 'Ba');
            await click(dropdownFirstOption);
            await expect(await getValue(asyncExample + ' fd-combobox input')).withContext('Banana');
        });
    });

    describe('Check Custom Item Template', () => {
        // will be fixed later
        it('verify Custom Item Template by choose option in dropdown or typing name of it', async () => {
            if (await browserIsSafari()) {
                return;
            }
            const templateExample = 'fd-combobox-template-example';
            await scrollIntoView(templateExample + ' fd-combobox input');
            await click(templateExample + ' fd-combobox button');
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownFirstOption);
            await expect(await getText(templateExample + ' small')).withContext('Search Term: Photo Voltaic');
            await expect(await getText(templateExample + ' small', 1)).withContext(
                'Returned from itemClicked Event: { "item": { "name": "Photo Voltaic", "icon": "photo-voltaic" }, "index": 0 }'
            );

            await click(templateExample + ' fd-combobox button');
            await scrollIntoView(templateExample + ' fd-combobox input');
            await setValue(templateExample + ' fd-combobox input', 'Se');
            await click(dropdownFirstOption);
            await expect(await getText(templateExample + ' small')).withContext('Search Term: Settings');
            await expect(await getText(templateExample + ' small', 1)).withContext(
                'Returned from itemClicked Event: { "item": { "name": "Settings", "icon": "settings" }, "index": 1 }'
            );
        });
    });

    describe('Check Combobox with Groups', () => {
        it('verify Combobox with Groups by choose option in dropdown or typing name of it', async () => {
            const groupExample = 'fd-combobox-group-example';
            await scrollIntoView(groupExample + ' fd-combobox input');
            await click(groupExample + ' fd-combobox button');
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownFirstOption);
            await expect(await getText(groupExample + ' small')).withContext('Search Term: Apple');
            await click(groupExample + ' fd-combobox button');
            await setValue(groupExample + ' fd-combobox input', 'Pi');
            await click(dropdownFirstOption);
            await expect(await getText(groupExample + ' small')).withContext('Search Term: Pineapple');
        });
    });

    describe('Check Return results including search term', () => {
        it('verify Return results including search term by choose option in dropdown or typing name of it', async () => {
            const includesExample = 'fd-combobox-includes-example fd-combobox';
            await scrollIntoView(includesExample + ' input');
            await click(includesExample + ' button');
            await expect(await isElementDisplayed(dropdownPopover)).withContext(true, 'popover not displayed');
            await click(dropdownFirstOption);
            await expect(await getValue(includesExample + ' input')).withContext('Apple');

            await setValue(includesExample + ' input', 'Ba');
            await click(dropdownFirstOption);
            await expect(await getValue(includesExample + ' input')).withContext('Banana');
        });
    });

    describe('Check Reactive Form', () => {
        // will be fixed later
        it('verify Reactive Form by choose option in dropdown and verify small text is correct', async () => {
            const reactiveFormButton = 'fd-combobox-forms-example button';
            const reactiveFormText = 'fd-combobox-forms-example small';
            const reactiveFormTestText1 = [
                'Touched: true',
                'Dirty: true',
                'Json Value: { "displayedValue": "Apple", "value": "AppleValue" }'
            ];
            const reactiveFormTestText2 = ['Touched: true', 'Dirty: true', 'Json Value: "Apple"'];
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(reactiveFormButton);
            const buttonsLength = await getElementArrayLength(reactiveFormButton);
            for (let i = 0; i < buttonsLength; i++) {
                await scrollIntoView(reactiveFormButton);
                await click(reactiveFormButton, i);
                await click(dropdownFirstOption);
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
