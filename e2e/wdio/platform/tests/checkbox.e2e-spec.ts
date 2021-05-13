import { CheckboxPO } from '../pages/checkbox.po';
import {
    markingDisplayStyle, disabledCheckboxTitle, a11yCheckboxAriaLabel,
    a11yCheckboxAriaLabelledBy, checkboxErrorTooltip, checkboxHoverState, checkboxFocusStyle, checkboxErrorState
} from '../fixtures/appData/checkbox-page-contents';
import {
    acceptAlert,
    browserIsIEorSafari,
    click,
    clickNextElement,
    executeScriptBeforeTagAttr, focusElement, getAlertText,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength, getText,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForPresent,
    waitForElDisplayed, browserIsFirefox, getElementAriaLabel, getElementTitle
} from '../../driver/wdio';

describe('Checkbox test suite', () => {

    const {
        binaryTempCheckbox,
        disabledBinaryCheckbox,
        checkboxWithoutForm,
        disabledCheckboxWithoutForm,
        checkboxWithValue,
        tristateCheckboxes,
        acceptAllCheckbox,
        termsAndConditionsCheckbox,
        tristateCheckboxParis,
        errorCheckboxes,
        presenceCheckbox,
        accessibilityCheckboxes,
        disabledAccessibilityCheckbox,
        disabledAccessibilityCheckboxLabel,

    } = new CheckboxPO();
    const checkboxPage = new CheckboxPO();
    beforeAll(() => {
        checkboxPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(checkboxPage.binaryTempCheckbox);
    }, 1);

    describe('check binary checkbox used with form examples', () => {
        // TODO: Unskip after fix
        xit('should check binary checkbox in template driven form', () => {

            waitForElDisplayed(binaryTempCheckbox, 0);
            // check checkbox labels
            for (let i = 0; 3 > i; i++) {
                checkIfDisabled(binaryTempCheckbox, 'ng-reflect-is-disabled', 'false', i);
            }
            if (browserIsIEorSafari()) {
                console.log('Skip check for Safari and IE');
                return;
            }
            checkHoverState(binaryTempCheckbox);
            checkFocusState(binaryTempCheckbox);
        });

        xit('should check binary checkbox in reactive/model driven form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }

            for (let i = 3; 6 > i; i++) {
                checkIfDisabled(binaryTempCheckbox, 'ng-reflect-is-disabled', 'false', i);
            }

            checkHoverState(binaryTempCheckbox, 3);
            checkFocusState(binaryTempCheckbox, 3);
        });

        it('should check disabled checkbox', () => {
            scrollIntoView(disabledBinaryCheckbox);
            checkIfDisabled(disabledBinaryCheckbox, 'ng-reflect-is-disabled', 'true');
        });
    });

    describe('Check checkbox used without form examples', () => {
        xit('should check binary checkbox with value', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }

            for (let i = 0; 2 > i; i++) {
                checkIfDisabled(checkboxWithoutForm, 'ng-reflect-is-disabled', 'false', i);
            }

            checkHoverState(checkboxWithoutForm);
            checkFocusState(checkboxWithoutForm);
        });

        xit('should check binary checkbox without value', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 2; 4 > i; i++) {
                checkIfDisabled(checkboxWithoutForm, 'ng-reflect-is-disabled', 'false', i);
            }
            checkFocusState(checkboxWithoutForm, 2);
            checkHoverState(checkboxWithoutForm, 2);
        });

        it('should check disabled checkbox', () => {
            // TODO: Fix for Safari and IE
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            waitForPresent(disabledCheckboxWithoutForm);
            scrollIntoView(disabledCheckboxWithoutForm);
            waitForElDisplayed(disabledCheckboxWithoutForm);
            checkIfDisabled(disabledCheckboxWithoutForm, 'ng-reflect-is-disabled', 'true');
        });
    });

    xdescribe('Check checkboxes with value property examples', () => {
        it('should check template driven form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 0; 2 > i; i++) {
                checkIfDisabled(checkboxWithValue, 'ng-reflect-is-disabled', 'false', i);
            }
            checkHoverState(checkboxWithValue);
            checkFocusState(checkboxWithValue);
        });

        it('should check reactive/model driven form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 2; 4 > i; i++) {
                checkIfDisabled(checkboxWithValue, 'ng-reflect-is-disabled', 'false', i);
            }
            checkHoverState(checkboxWithValue, 2);
            checkFocusState(checkboxWithValue, 2);
        });
    });

    describe('Check Tristate Checkbox With Value Property and Without Value Property', () => {
        xit('should check reactive form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 0; 8 > i; i++) {
                checkIfDisabled(tristateCheckboxes, 'ng-reflect-is-disabled', 'false', i);
            }
            checkHoverState(tristateCheckboxes);
            checkFocusState(tristateCheckboxes);
        });

        xit('should check template form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }

            for (let i = 8; 16 > i; i++) {
                checkIfDisabled(tristateCheckboxes, 'ng-reflect-is-disabled', 'false', i);
            }
            checkHoverState(tristateCheckboxes, 8);
            checkFocusState(tristateCheckboxes, 8);
        });

        xit('should check tristate checkbox with multiple checkboxes', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 16; 20 > i; i++) {
                checkIfDisabled(tristateCheckboxes, 'ng-reflect-is-disabled', 'false', i);
            }
            checkHoverState(acceptAllCheckbox);
            checkFocusState(acceptAllCheckbox);
            checkHoverState(termsAndConditionsCheckbox);
            checkFocusState(termsAndConditionsCheckbox);
        });

        it('should check checkbox markings are centered', () => {
            const checkboxMarkDisplayStyle = executeScriptBeforeTagAttr(tristateCheckboxParis, 'display');
            expect(checkboxMarkDisplayStyle).toContain(markingDisplayStyle);
        });
    });

    describe('Checkbox With Form and State Change on Error', () => {
        it('should check error handling examples', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            const errorCheckboxesLength = getElementArrayLength(errorCheckboxes);

            for (let i = 0; errorCheckboxesLength > i; i++) {
                checkIfDisabled(errorCheckboxes, 'ng-reflect-is-disabled', 'false', i);
            }

            scrollIntoView(checkboxPage.submitBtn);
            clickNextElement(presenceCheckbox);
            expect(getCSSPropertyByName(presenceCheckbox, 'border-bottom-color').value)
                .toContain(checkboxErrorState);
            scrollIntoView(checkboxPage.submitBtn);
            mouseHoverElement(checkboxPage.submitBtn);
            waitForElDisplayed(checkboxPage.errorTooltip);
            expect(getText(checkboxPage.errorTooltip).trim()).toEqual(checkboxErrorTooltip);
            checkFocusState(errorCheckboxes, 1);
            // TODO improve hover check stability for FF
            if (browserIsFirefox()) {
                console.log('skip hover check');
                return;
            }
            checkHoverState(errorCheckboxes, 1);
        }, 1);

        it('should check error handling form submission', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            click(checkboxPage.submitBtn);
            expect(getAlertText()).toEqual('Status: VALID');
            acceptAlert();
            // checks with required checkbox not marked
        });

        it('should check error handling form submission 222 ', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            clickNextElement(presenceCheckbox);
            click(checkboxPage.submitBtn);

            expect(getAlertText()).toEqual('Status: INVALID');
            acceptAlert();
        });
    });

    xdescribe('Check Accessibility on checkbox examples', () => {
        it('should check a11y checkboxes', () => {
            expect(getElementAriaLabel(accessibilityCheckboxes)).toEqual(a11yCheckboxAriaLabel);
            expect(getAttributeByName(accessibilityCheckboxes, 'aria-disabled')).toBe('false');

            expect(getAttributeByName(accessibilityCheckboxes, 'aria-labelledby', 1))
                .toEqual(a11yCheckboxAriaLabelledBy);
            expect(getAttributeByName(accessibilityCheckboxes, 'aria-disabled', 1)).toBe('false');
        });

        it('should check the disabled accessibility checkbox', () => {
            checkIfDisabled(disabledAccessibilityCheckbox, 'ng-reflect-is-disabled', 'true');
            expect(getAttributeByName(disabledAccessibilityCheckbox, 'aria-disabled')).toBe('true');
            expect(getElementTitle(disabledAccessibilityCheckboxLabel)).toEqual(disabledCheckboxTitle);
        });
    });

    describe('check example orientation', () => {
        it('should check RTL orientation', () => {
            checkboxPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            checkboxPage.saveExampleBaselineScreenshot();
            expect(checkboxPage.compareWithBaseline()).toBeLessThan(3);
        });
    });
});

function checkHoverState(elementSelector, index: number = 0): boolean {
    scrollIntoView(elementSelector, index);
    mouseHoverElement(elementSelector, index);
    return expect(getCSSPropertyByName(elementSelector, 'border-bottom-color', index).value).toContain(checkboxHoverState);
}

function checkFocusState(elementSelector, index: number = 0): boolean {
    // clickNextElement(elementSelector, index);
    focusElement(elementSelector, index);
    return expect(getCSSPropertyByName(elementSelector, 'outline-style', index).value).toContain(checkboxFocusStyle);
}

function checkIfDisabled(element, attribute: string, value: string, index: number = 0): void {
    expect(getAttributeByName(element, attribute, index)).toBe(value);
}
