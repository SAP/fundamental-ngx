import {
    click,
    getAttributeByName,
    getElementArrayLength, getText, isElementDisplayed,
    refreshPage,
    scrollIntoView, setValue,
    waitForPresent
} from '../../driver/wdio';

import { MultiInputPo } from '../pages/multi-input.po';

import {
    testOptionsArray1, testOptionsArray2, testOptionsArray3, testOptionsArray4, testOptionsArray5, testOptionsArray6
} from '../fixtures/appData/multi-input-contents';

xdescribe('Multi input test suite', function() {
    const multiInputPage = new MultiInputPo();
    const {
        activeDropdownButtons, activeInputs, disableInputs, options, multiInputOptions, buttonShowAll, expandedDropdown,
        hiddenAddonButtonInputOptions, compactMultiInputOptions, multiSelectButton, approveButton, mobileInputOptions,
        displayObjectOptions, searchTermOptions, customFilterOptions, asyncExampleOptions, tokenOptions, templateOptions
    } = multiInputPage;

    beforeAll(() => {
        multiInputPage.open();
        waitForPresent(activeDropdownButtons);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(activeDropdownButtons);
    }, 1);

    it('Check RTL/LTR orientation', () => {
        multiInputPage.checkRtlSwitch();
    });

    it('Verify inputs should have placeholder', () => {
        const activeInputsLength = getElementArrayLength(activeInputs);
        for (let i = 0; i < activeInputsLength; i++) {
            if (i === 9 || i === 10) {
                continue;
            }
            scrollIntoView(activeInputs, i);
            expect(getAttributeByName(activeInputs, 'placeholder', i)).toBe('Search here...');
        }
        scrollIntoView(activeInputs, 9);
        expect(getAttributeByName(activeInputs, 'placeholder', 9)).toBe('Search Here...');
        scrollIntoView(activeInputs, 10);
        expect(getAttributeByName(activeInputs, 'placeholder', 10)).toBe('');
    });

    it('verify disabled multi inputs', () => {
        const disableInputsLength = getElementArrayLength(disableInputs);
        for (let i = 0; i < disableInputsLength; i++) {
            scrollIntoView(disableInputs, i);
            expect(getAttributeByName(disableInputs, 'class', i)).toContain('is-disabled');
        }
    });

    describe('Check Mobile Mode Multi Input', function() {

        it('verify Simple Multi Input by select each option', () => {
            scrollIntoView(activeDropdownButtons);
            click(activeDropdownButtons);
            scrollIntoView(options, 15);
            click(options, 15);
            click(activeDropdownButtons);
            const inputOptionsLength = getElementArrayLength(multiInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(multiInputOptions, i);
                expect(getText(multiInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });
    });

    describe('Check Hidden Addon Button', function() {

        it('verify Hidden Addon Button by select each option', () => {
            scrollIntoView(activeInputs, 1);
            setValue(activeInputs, 'to', 1);
            scrollIntoView(buttonShowAll);
            click(buttonShowAll);
            expect(isElementDisplayed(expandedDropdown, 1)).toBe(true);
            const optionsLength = getElementArrayLength(options);
            for (let i = 8; i < optionsLength; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            const inputOptionsLength = getElementArrayLength(hiddenAddonButtonInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(hiddenAddonButtonInputOptions, i);
                expect(getText(hiddenAddonButtonInputOptions, i)).toBe(testOptionsArray2[i]);
            }
        });
    });

    describe('Check Compact Multi Input', function() {
2
        it('verify Compact Multi Input by select each option', () => {
            scrollIntoView(activeDropdownButtons, 1);
            const inputOptionsLength = getElementArrayLength(compactMultiInputOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(compactMultiInputOptions, i);
                expect(getText(compactMultiInputOptions, i)).toBe(testOptionsArray1[i]);
            }
            click(activeDropdownButtons, 1);
            const optionsLength = getElementArrayLength(options);
            for (let i = 8; i < optionsLength - 4; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            click(activeDropdownButtons, 1);
            for (let i = 0; i < inputOptionsLength - 4; i++) {
                scrollIntoView(compactMultiInputOptions, i);
                expect(getText(compactMultiInputOptions, i)).toBe(testOptionsArray3[i]);
            }
        });
    });

    describe('Check Mobile Mode Multi Input', function() {

        it('verify Mobile Mode Multi Input by multi select button', () => {
            scrollIntoView(activeDropdownButtons, 2);
            click(activeDropdownButtons, 2);
            click(multiSelectButton);
            click(approveButton);
            const inputOptionsLength = getElementArrayLength(mobileInputOptions);
            for (let i = 0; i < inputOptionsLength - 8; i++) {
                scrollIntoView(mobileInputOptions, i);
                expect(getText(mobileInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });

        it('verify Mobile Mode Multi Input by select each option', () => {
            scrollIntoView(activeDropdownButtons, 2);
            click(activeDropdownButtons, 2);
            const optionsLength = getElementArrayLength(options);
            for (let i = 0; i < optionsLength; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            click(approveButton);
            const inputOptionsLength = getElementArrayLength(mobileInputOptions);
            for (let i = 0; i < inputOptionsLength - 8; i++) {
                scrollIntoView(mobileInputOptions, i);
                expect(getText(mobileInputOptions, i)).toBe(testOptionsArray1[i]);
            }
        });
    });

    describe('Check Display Object Property', function() {

        it('verify Display Object Property by select each option', () => {
            scrollIntoView(activeDropdownButtons, 4);
            click(activeDropdownButtons, 4);
            const optionsLength = getElementArrayLength(options);
            for (let i = 8; i < optionsLength; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            click(activeDropdownButtons, 4);
            const inputOptionsLength = getElementArrayLength(displayObjectOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(displayObjectOptions, i);
                expect(getText(displayObjectOptions, i)).toBe(testOptionsArray4[i]);
            }
        });
    });

    describe('Check Return results including search term', function() {

        it('verify Return results including search term by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 5);
            click(activeDropdownButtons, 5);
            const optionsLength = getElementArrayLength(options);
            for (let i = 8; i < optionsLength; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            click(activeDropdownButtons, 5);
            const inputOptionsLength = getElementArrayLength(searchTermOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(searchTermOptions, i);
                expect(getText(searchTermOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Custom Filter', function() {

        it('verify Custom Filter by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 6);
            click(activeDropdownButtons, 6);
            const optionsLength = getElementArrayLength(options);
            for (let i = 8; i < optionsLength; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            click(activeDropdownButtons, 6);
            const inputOptionsLength = getElementArrayLength(customFilterOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(customFilterOptions, i);
                expect(getText(customFilterOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Observable Async Example', function() {

        it('verify Observable Async Example by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 7);
            click(activeDropdownButtons, 7);
            const optionsLength = getElementArrayLength(options);
            for (let i = 8; i < optionsLength; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            click(activeDropdownButtons, 7);
            const inputOptionsLength = getElementArrayLength(asyncExampleOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(asyncExampleOptions, i);
                expect(getText(asyncExampleOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Multi Input in Reactive Form', function() {

        it('verify Multi Input in Reactive Form by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 8);
            click(activeDropdownButtons, 8);
            click(options, 10);
            click(options, 11);
            click(activeDropdownButtons, 8);
            const inputOptionsLength = getElementArrayLength(asyncExampleOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(asyncExampleOptions, i);
                expect(getText(asyncExampleOptions, i)).toBe(testOptionsArray5[i]);
            }
        });
    });

    describe('Check Adding New Tokens', function() {

        it('verify Adding New Tokens by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 9);
            click(activeDropdownButtons, 9);
            const optionsLength = getElementArrayLength(options);
            for (let i = 8; i < optionsLength; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            click(activeDropdownButtons, 9);
            const inputOptionsLength = getElementArrayLength(tokenOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(tokenOptions, i);
                expect(getText(tokenOptions, i)).toBe(testOptionsArray1[i]);
            }
        });
    });

    describe('Check Custom Item Template', function() {

        it('verify Custom Item Template by clicking each option', () => {
            scrollIntoView(activeDropdownButtons, 10);
            click(activeDropdownButtons, 10);
            const optionsLength = getElementArrayLength(options);
            for (let i = 13; i < optionsLength; i++) {
                scrollIntoView(options, i);
                click(options, i);
            }
            click(activeDropdownButtons, 10);
            const inputOptionsLength = getElementArrayLength(templateOptions);
            for (let i = 0; i < inputOptionsLength; i++) {
                scrollIntoView(templateOptions, i);
                expect(getText(templateOptions, i)).toBe(testOptionsArray6[i]);
            }
        });
    });

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            multiInputPage.saveExampleBaselineScreenshot();
            expect(multiInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
