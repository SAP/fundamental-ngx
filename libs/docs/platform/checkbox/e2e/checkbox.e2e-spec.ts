import { CheckboxPO } from './checkbox.po';
import {
    a11yCheckboxAriaLabel,
    a11yCheckboxAriaLabelledBy,
    checkboxErrorTooltip,
    disabledCheckboxTitle,
    markingDisplayStyle
} from './checkbox-page-contents';
import {
    acceptAlert,
    browserIsFirefox,
    click,
    clickNextElement,
    executeScriptBeforeTagAttr,
    getAlertText,
    getAttributeByName,
    getElementAriaLabel,
    getElementTitle,
    getText,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Checkbox test suite', () => {
    const {
        binaryTempCheckbox,
        disabledBinaryCheckbox,
        checkboxWithoutForm,
        disabledCheckboxWithoutForm,
        checkboxWithValue,
        tristateCheckboxes,
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
        waitForPresent(checkboxPage.root);
        waitForElDisplayed(checkboxPage.title);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(checkboxPage.root);
        waitForElDisplayed(checkboxPage.title);
    }, 1);

    describe('check binary checkbox used with form examples', () => {
        it('should check binary checkbox in template driven form', () => {
            // check checkbox labels
            for (let i = 0; 3 > i; i++) {
                checkIfDisabled(binaryTempCheckbox, 'aria-disabled', 'false', i);
            }
        });

        it('should check binary checkbox in reactive/model driven form', () => {
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
            for (let i = 0; 2 > i; i++) {
                checkIfDisabled(checkboxWithoutForm, 'aria-disabled', 'false', i);
            }
        });

        it('should check binary checkbox without value', () => {
            for (let i = 2; 4 > i; i++) {
                checkIfDisabled(checkboxWithoutForm, 'aria-disabled', 'false', i);
            }
        });

        it('should check disabled checkbox', () => {
            waitForPresent(disabledCheckboxWithoutForm);
            scrollIntoView(disabledCheckboxWithoutForm);
            checkIfDisabled(disabledCheckboxWithoutForm, 'aria-disabled', 'true');
        });
    });

    describe('Check checkboxes with value property examples', () => {
        it('should check template driven form', () => {
            for (let i = 0; 2 > i; i++) {
                checkIfDisabled(checkboxWithValue, 'aria-disabled', 'false', i);
            }
        });

        it('should check reactive/model driven form', () => {
            for (let i = 2; 4 > i; i++) {
                checkIfDisabled(checkboxWithValue, 'aria-disabled', 'false', i);
            }
        });
    });

    describe('Check Tristate Checkbox With Value Property and Without Value Property', () => {
        it('should check reactive form', () => {
            for (let i = 0; 8 > i; i++) {
                checkIfDisabled(tristateCheckboxes, 'aria-disabled', 'false', i);
            }
        });

        it('should check template form', () => {
            for (let i = 8; 16 > i; i++) {
                checkIfDisabled(tristateCheckboxes, 'aria-disabled', 'false', i);
            }
        });

        it('should check tristate checkbox with multiple checkboxes', () => {
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
            click(checkboxPage.submitBtn);
            expect(getAlertText()).toEqual('Status: VALID');
            acceptAlert();
        });

        it('should check error handling form submission 222 ', () => {
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
