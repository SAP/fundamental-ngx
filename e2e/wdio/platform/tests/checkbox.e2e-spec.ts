import { CheckboxPO } from '../pages/checkbox.po';
import {
    markingDisplayStyle,
    disabledCheckboxTitle,
    a11yCheckboxAriaLabel,
    a11yCheckboxAriaLabelledBy,
    checkboxErrorTooltip
} from '../fixtures/appData/checkbox-page-contents';
import {
    acceptAlert,
    browserIsIEorSafari,
    click,
    clickNextElement,
    executeScriptBeforeTagAttr,
    getAlertText,
    getAttributeByName,
    getText,
    refreshPage,
    scrollIntoView,
    waitForPresent,
    waitForElDisplayed,
    browserIsFirefox,
    getElementAriaLabel,
    getElementTitle
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
        disabledAccessibilityCheckboxLabel
    } = new CheckboxPO();
    const checkboxPage = new CheckboxPO();
    beforeAll(() => {
        checkboxPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(checkboxPage.title);
    }, 1);

    describe('check binary checkbox used with form examples', () => {
        it('should check binary checkbox in template driven form', () => {
            // check checkbox labels
            for (let i = 0; 3 > i; i++) {
                checkIfDisabled(binaryTempCheckbox, 'aria-disabled', 'false', i);
            }
            if (browserIsIEorSafari()) {
                console.log('Skip check for Safari and IE');
                return;
            }
        });

        it('should check binary checkbox in reactive/model driven form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }

            for (let i = 3; 6 > i; i++) {
                checkIfDisabled(binaryTempCheckbox, 'aria-disabled', 'false', i);
            }
        });

        it('should check disabled checkbox', () => {
            scrollIntoView(disabledBinaryCheckbox);
            checkIfDisabled(disabledBinaryCheckbox, 'aria-disabled', 'true');
        });
    });

    describe('Check checkbox used without form examples', () => {
        it('should check binary checkbox with value', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }

            for (let i = 0; 2 > i; i++) {
                checkIfDisabled(checkboxWithoutForm, 'aria-disabled', 'false', i);
            }
        });

        it('should check binary checkbox without value', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 2; 4 > i; i++) {
                checkIfDisabled(checkboxWithoutForm, 'aria-disabled', 'false', i);
            }
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
            checkIfDisabled(disabledCheckboxWithoutForm, 'aria-disabled', 'true');
        });
    });

    describe('Check checkboxes with value property examples', () => {
        it('should check template driven form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 0; 2 > i; i++) {
                checkIfDisabled(checkboxWithValue, 'aria-disabled', 'false', i);
            }
        });

        it('should check reactive/model driven form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 2; 4 > i; i++) {
                checkIfDisabled(checkboxWithValue, 'aria-disabled', 'false', i);
            }
        });
    });

    describe('Check Tristate Checkbox With Value Property and Without Value Property', () => {
        it('should check reactive form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 0; 8 > i; i++) {
                checkIfDisabled(tristateCheckboxes, 'aria-disabled', 'false', i);
            }
        });

        it('should check template form', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }

            for (let i = 8; 16 > i; i++) {
                checkIfDisabled(tristateCheckboxes, 'aria-disabled', 'false', i);
            }
        });

        it('should check tristate checkbox with multiple checkboxes', () => {
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            for (let i = 16; 20 > i; i++) {
                checkIfDisabled(tristateCheckboxes, 'aria-disabled', 'false', i);
            }
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

            scrollIntoView(errorCheckboxes, 1);
            click(errorCheckboxes, 1);
            waitForElDisplayed(checkboxPage.errorTooltip);
            expect(getText(checkboxPage.errorTooltip).trim()).toEqual(checkboxErrorTooltip);
            // TODO improve hover check stability for FF
            if (browserIsFirefox()) {
                console.log('skip hover check');
                return;
            }
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

    describe('Check Accessibility on checkbox examples', () => {
        it('should check a11y checkboxes', () => {
            expect(getElementAriaLabel(accessibilityCheckboxes)).toEqual(a11yCheckboxAriaLabel);
            expect(getAttributeByName(accessibilityCheckboxes, 'aria-disabled')).toBe('false');

            expect(getAttributeByName(accessibilityCheckboxes, 'aria-labelledby', 1)).toContain(
                a11yCheckboxAriaLabelledBy
            );
            expect(getAttributeByName(accessibilityCheckboxes, 'aria-disabled', 1)).toBe('false');
        });

        it('should check the disabled accessibility checkbox', () => {
            checkIfDisabled(disabledAccessibilityCheckbox, 'aria-disabled', 'true');
            expect(getAttributeByName(disabledAccessibilityCheckbox, 'aria-disabled')).toBe('true');
            expect(getElementTitle(disabledAccessibilityCheckboxLabel)).toEqual(disabledCheckboxTitle);
        });
    });

    describe('check example orientation', () => {
        it('should check RTL orientation', () => {
            checkboxPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            checkboxPage.saveExampleBaselineScreenshot();
            expect(checkboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

function checkIfDisabled(element, attribute: string, value: string, index: number = 0): void {
    scrollIntoView(element, index);
    expect(getAttributeByName(element, attribute, index)).toBe(value);
}
