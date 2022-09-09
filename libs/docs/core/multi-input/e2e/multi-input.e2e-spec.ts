import {
    browserIsSafari,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import { MultiInputPo } from './multi-input.po';

import {
    testOptionsArray1,
    testOptionsArray2,
    testOptionsArray3,
    testOptionsArray4,
    testOptionsArray5,
    testOptionsArray6
} from './multi-input-contents';

describe('Multi input test suite', () => {
    const multiInputPage = new MultiInputPo();
    const {
        activeDropdownButtons,
        activeInputs,
        disableInputs,
        simpleMultiInputOptions,
        multiInputOptions,
        buttonShowAll,
        expandedDropdown,
        hiddenAddonButtonInputOptions,
        compactMultiInputOptions,
        multiSelectButton,
        approveButton,
        mobileInputOptions,
        displayObjectOptions,
        searchTermOptions,
        customFilterOptions,
        asyncExampleOptions,
        tokenOptions,
        templateOptions,
        simpleExampleTokens,
        checkboxInput,
        listItem,
        simpleHiddenAddonExampleTokens,
        popover,
        compactExampleTokens,
        dialogCheckbox,
        selectAllItemsBtn,
        dialogListItem,
        compactInput
    } = multiInputPage;

    beforeAll(() => {
        multiInputPage.open();
        waitForPresent(multiInputPage.title);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(multiInputPage.root);
        waitForElDisplayed(multiInputPage.title);
    }, 1);

    it('Check RTL/LTR orientation', () => {
        multiInputPage.checkRtlSwitch();
    });

    it('Verify inputs should have placeholder', () => {
        const activeInputsLength = getElementArrayLength(activeInputs);
        for (let i = 0; i < activeInputsLength; i++) {
            scrollIntoView(activeInputs, i);
            if (i === 10 || i === 11) {
                expect(getAttributeByName(activeInputs, 'placeholder', i)).toBe('Search Here...');
            } else if (i === 12) {
                // skip due to for some reason it returns 'true' in Safari
                if (!browserIsSafari()) {
                    expect(getAttributeByName(activeInputs, 'placeholder', i)).toBe('');
                }
            } else {
                expect(getAttributeByName(activeInputs, 'placeholder', i)).toBe('Search here...');
            }
        }
    });

    it('verify disabled multi inputs', () => {
        const disableInputsLength = getElementArrayLength(disableInputs);
        for (let i = 0; i < disableInputsLength; i++) {
            scrollIntoView(disableInputs, i);
            expect(getAttributeByName(disableInputs, 'class', i)).toContain('is-disabled');
        }
    });

    it('should check enter key doesnt add an empty token', () => {
        const originalTokenCount = getElementArrayLength(simpleExampleTokens);
        click(activeInputs);
        sendKeys(['Enter']);
        const newTokenCount = getElementArrayLength(simpleExampleTokens);

        expect(newTokenCount).toEqual(originalTokenCount);
    });

    it('should check multiInput options stay open when clicking checkbox', () => {
        click(activeDropdownButtons);
        waitForElDisplayed(popover);
        click(checkboxInput);

        expect(isElementDisplayed(popover)).toBe(true, 'popover not displayed');
    });

    it('should check multiInput options close when clicking on list item', () => {
        click(activeDropdownButtons);
        waitForElDisplayed(popover);
        click(listItem);

        expect(doesItExist(popover)).toBe(false, 'popover still displayed');
    });

    it('should narrow down the selection to a single item and select it', () => {
        scrollIntoView(activeInputs, 1);
        click(activeInputs, 1);
        sendKeys('apple');
        waitForElDisplayed(listItem);
        click(listItem);
        expect(getElementArrayLength(simpleHiddenAddonExampleTokens)).toBe(2);
        expect(getText(simpleHiddenAddonExampleTokens, 0)).toBe('Kiwi');
        expect(getText(simpleHiddenAddonExampleTokens, 1)).toBe('Apple');
    });

    it('should be able to select all tokens and delete with delete key', () => {
        scrollIntoView(compactExampleTokens);
        click(activeInputs, 4);
        sendKeys(['Control', 'a']);
        sendKeys(['Delete']);
        const newTokenCount = getElementArrayLength(compactExampleTokens);

        expect(newTokenCount).toEqual(0);
    });

    describe('Check Mobile Mode Multi Input', () => {
        it('verify Simple Multi Input by select each option', () => {
            scrollIntoView(activeDropdownButtons);
            click(activeDropdownButtons);
            scrollIntoView(simpleMultiInputOptions, 7);
            click(simpleMultiInputOptions, 7);
            click(activeDropdownButtons);
            const inputOptionsLength = getElementArrayLength(multiInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(multiInputOptions, i);
                expect(getText(multiInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });
    });

    describe('Check Hidden Addon Button', () => {
        it('verify Hidden Addon Button by select each option', () => {
            scrollIntoView(activeInputs, 1);
            setValue(activeInputs, 'to', 1);
            scrollIntoView(buttonShowAll);
            click(buttonShowAll);
            expect(waitForElDisplayed(expandedDropdown, 1)).toBe(true);
            expect(getText(hiddenAddonButtonInputOptions, 0)).toBe(testOptionsArray2[0]);
            const optionsLength = getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                // deselecting first, selecting other
                scrollIntoView(checkboxInput, i);
                click(checkboxInput, i);
            }
            const inputOptionsLength = getElementArrayLength(hiddenAddonButtonInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(hiddenAddonButtonInputOptions, i);
                // expecting first element to be not selected, others to be selected
                expect(getText(hiddenAddonButtonInputOptions, i)).toBe(testOptionsArray2[i + 1]);
            }
        });
    });

    describe('Check Compact Multi Input', () => {
        it('verify Compact Multi Input by select each option', () => {
            scrollIntoView(activeDropdownButtons, 2);
            const inputOptionsLength = getElementArrayLength(compactMultiInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(compactMultiInputOptions, i);
                expect(getText(compactMultiInputOptions, i)).toBe(testOptionsArray1[i]);
            }
            click(activeDropdownButtons, 2);
            const optionsLength = getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength - 4; i++) {
                scrollIntoView(checkboxInput, i);
                click(checkboxInput, i);
            }
            click(activeDropdownButtons, 2);
            for (let i = 0; i < inputOptionsLength - 4; i++) {
                scrollIntoView(compactMultiInputOptions, i);
                expect(getText(compactMultiInputOptions, i)).toBe(testOptionsArray3[i]);
            }
        });
    });

    describe('Check Mobile Mode Multi Input', () => {
        it('verify Mobile Mode Multi Input by multi select button', () => {
            scrollIntoView(activeDropdownButtons, 3);
            click(activeDropdownButtons, 3);
            click(multiSelectButton);
            click(approveButton);
            const inputOptionsLength = getElementArrayLength(mobileInputOptions);
            for (let i = 0; i < inputOptionsLength - 8; i++) {
                scrollIntoView(mobileInputOptions, i);
                expect(getText(mobileInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });

        it('verify Mobile Mode Multi Input by select each option', () => {
            scrollIntoView(activeDropdownButtons, 3);
            click(activeDropdownButtons, 3);
            const optionsLength = getElementArrayLength(dialogCheckbox);
            for (let i = 0; i < optionsLength; i++) {
                scrollIntoView(dialogCheckbox, i);
                click(dialogCheckbox, i);
            }
            click(approveButton);
            const inputOptionsLength = getElementArrayLength(mobileInputOptions);
            for (let i = 0; i < inputOptionsLength - 8; i++) {
                scrollIntoView(mobileInputOptions, i);
                expect(getText(mobileInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });

        it('should check selecting all items by clicking Select All button', () => {
            scrollIntoView(activeDropdownButtons, 3);
            click(activeDropdownButtons, 3);
            const optionsLength = getElementArrayLength(dialogCheckbox);
            click(selectAllItemsBtn);
            for (let i = 0; i < optionsLength; i++) {
                expect(getElementClass(dialogListItem, i)).toContain('is-selected');
            }
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7203
        xit('should check unselecting all items after selecting by Select All button', () => {
            scrollIntoView(activeDropdownButtons, 3);
            click(activeDropdownButtons, 3);
            const optionsLength = getElementArrayLength(dialogCheckbox);
            click(selectAllItemsBtn);
            click(selectAllItemsBtn);
            for (let i = 0; i < optionsLength; i++) {
                expect(getElementClass(dialogListItem, i)).not.toContain('is-selected');
            }
        });
    });

    describe('Check Display Object Property', () => {
        it('verify Display Object Property by select each option', () => {
            scrollIntoView(activeDropdownButtons, 5);
            click(activeDropdownButtons, 5);
            const optionsLength = getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                scrollIntoView(checkboxInput, i);
                click(checkboxInput, i);
            }
            click(activeDropdownButtons, 5);
            const inputOptionsLength = getElementArrayLength(displayObjectOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(displayObjectOptions, i);
                expect(getText(displayObjectOptions, i)).toBe(testOptionsArray4[i]);
            }
        });
    });

    describe('Check Return results including search term', () => {
        it('verify Return results including search term by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 6);
            click(activeDropdownButtons, 6);
            const optionsLength = getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                scrollIntoView(checkboxInput, i);
                click(checkboxInput, i);
            }
            click(activeDropdownButtons, 6);
            const inputOptionsLength = getElementArrayLength(searchTermOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(searchTermOptions, i);
                expect(getText(searchTermOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Custom Filter', () => {
        it('verify Custom Filter by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 7);
            click(activeDropdownButtons, 7);
            const optionsLength = getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                scrollIntoView(checkboxInput, i);
                click(checkboxInput, i);
            }
            click(activeDropdownButtons, 7);
            const inputOptionsLength = getElementArrayLength(customFilterOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(customFilterOptions, i);
                expect(getText(customFilterOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    // Broken due to changes in example's data source.
    xdescribe('Check Observable Async Example', () => {
        it('verify Observable Async Example by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 8);
            click(activeDropdownButtons, 8);
            const optionsLength = getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                scrollIntoView(checkboxInput, i);
                click(checkboxInput, i);
            }
            click(activeDropdownButtons, 8);
            const inputOptionsLength = getElementArrayLength(asyncExampleOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(asyncExampleOptions, i);
                expect(getText(asyncExampleOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Multi Input in Reactive Form', () => {
        it('verify Multi Input in Reactive Form by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 9);
            click(activeDropdownButtons, 9);
            click(checkboxInput, 2);
            click(checkboxInput, 3);
            click(activeDropdownButtons, 9);
            const inputOptionsLength = getElementArrayLength(asyncExampleOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(asyncExampleOptions, i);
                expect(getText(asyncExampleOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Adding New Tokens', () => {
        it('verify Adding New Tokens by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 10);
            click(activeDropdownButtons, 10);
            const optionsLength = getElementArrayLength(checkboxInput);
            for (let i = 0; i < optionsLength; i++) {
                scrollIntoView(checkboxInput, i);
                click(checkboxInput, i);
            }
            click(activeDropdownButtons, 10);
            const inputOptionsLength = getElementArrayLength(tokenOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(tokenOptions, i);
                expect(getText(tokenOptions, i)).toBe(testOptionsArray1[i]);
            }
        });
    });

    describe('Check Custom Item Template', () => {
        it('verify Custom Item Template by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 11);
            click(activeDropdownButtons, 11);
            const optionsLength = getElementArrayLength(checkboxInput);
            for (let i = 5; i < optionsLength; i++) {
                scrollIntoView(checkboxInput, i);
                click(checkboxInput, i);
            }
            click(activeDropdownButtons, 11);
            const inputOptionsLength = getElementArrayLength(templateOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(templateOptions, i);
                expect(getText(templateOptions, i)).toBe(testOptionsArray6[i]);
            }
        });
    });

    it('should check compact input be smaller than basic input', () => {
        const basicInputS = getElementSize(activeInputs);
        const compactInputS = getElementSize(compactInput);

        expect(basicInputS.height).toBeGreaterThan(compactInputS.height);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            multiInputPage.saveExampleBaselineScreenshot();
            expect(multiInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
