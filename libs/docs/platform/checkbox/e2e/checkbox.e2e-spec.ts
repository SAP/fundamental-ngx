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

    beforeAll(async () => {
        await checkboxPage.open();
        await waitForPresent(checkboxPage.root);
        await waitForElDisplayed(checkboxPage.title);
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(checkboxPage.root);
        await waitForElDisplayed(checkboxPage.title);
    }, 1);

    describe('check binary checkbox used with form examples', () => {
        it('should check binary checkbox in template driven form', async () => {
            // check checkbox labels
            for (let i = 0; 3 > i; i++) {
                await checkIfDisabled(binaryTempCheckbox, 'aria-disabled', 'false', i);
            }
        });

        it('should check binary checkbox in reactive/model driven form', async () => {
            for (let i = 3; 6 > i; i++) {
                await checkIfDisabled(binaryTempCheckbox, 'aria-disabled', 'false', i);
            }
        });

        it('should check disabled checkbox', async () => {
            await scrollIntoView(disabledBinaryCheckbox);
            await checkIfDisabled(disabledBinaryCheckbox, 'aria-disabled', 'true');
        });
    });

    describe('Check checkbox used without form examples', () => {
        it('should check binary checkbox with value', async () => {
            for (let i = 0; 2 > i; i++) {
                await checkIfDisabled(checkboxWithoutForm, 'aria-disabled', 'false', i);
            }
        });

        it('should check binary checkbox without value', async () => {
            for (let i = 2; 4 > i; i++) {
                await checkIfDisabled(checkboxWithoutForm, 'aria-disabled', 'false', i);
            }
        });

        it('should check disabled checkbox', async () => {
            await waitForPresent(disabledCheckboxWithoutForm);
            await scrollIntoView(disabledCheckboxWithoutForm);
            await checkIfDisabled(disabledCheckboxWithoutForm, 'aria-disabled', 'true');
        });
    });

    describe('Check checkboxes with value property examples', () => {
        it('should check template driven form', async () => {
            for (let i = 0; 2 > i; i++) {
                await checkIfDisabled(checkboxWithValue, 'aria-disabled', 'false', i);
            }
        });

        it('should check reactive/model driven form', async () => {
            for (let i = 2; 4 > i; i++) {
                await checkIfDisabled(checkboxWithValue, 'aria-disabled', 'false', i);
            }
        });
    });

    describe('Check Tristate Checkbox With Value Property and Without Value Property', () => {
        it('should check reactive form', async () => {
            for (let i = 0; 8 > i; i++) {
                await checkIfDisabled(tristateCheckboxes, 'aria-disabled', 'false', i);
            }
        });

        it('should check template form', async () => {
            for (let i = 8; 16 > i; i++) {
                await checkIfDisabled(tristateCheckboxes, 'aria-disabled', 'false', i);
            }
        });

        it('should check tristate checkbox with multiple checkboxes', async () => {
            for (let i = 16; 20 > i; i++) {
                await checkIfDisabled(tristateCheckboxes, 'aria-disabled', 'false', i);
            }
        });

        it('should check checkbox markings are centered', async () => {
            const checkboxMarkDisplayStyle = await executeScriptBeforeTagAttr(tristateCheckboxParis, 'display');
            await expect(checkboxMarkDisplayStyle).toContain(markingDisplayStyle);
        });
    });

    describe('Checkbox With Form and State Change on Error', () => {
        it('should check error handling examples', async () => {
            await scrollIntoView(errorCheckboxes, 1);
            await click(errorCheckboxes, 1);
            await waitForElDisplayed(checkboxPage.errorTooltip);
            await expect((await getText(checkboxPage.errorTooltip)).trim()).toEqual(checkboxErrorTooltip);
            // TODO improve hover check stability for FF
            if (await browserIsFirefox()) {
                console.log('skip hover check');
                return;
            }
        }, 1);

        it('should check error handling form submission', async () => {
            await click(checkboxPage.submitBtn);
            await expect(await getAlertText()).toEqual('Status: VALID');
            await acceptAlert();
        });

        it('should check error handling form submission 222 ', async () => {
            await clickNextElement(presenceCheckbox);
            await click(checkboxPage.submitBtn);

            await expect(await getAlertText()).toEqual('Status: INVALID');
            await acceptAlert();
        });
    });

    describe('Check Accessibility on checkbox examples', () => {
        it('should check a11y checkboxes', async () => {
            await expect(await getElementAriaLabel(accessibilityCheckboxes)).toEqual(a11yCheckboxAriaLabel);
            await expect(await getAttributeByName(accessibilityCheckboxes, 'aria-disabled')).toBe('false');

            await expect(await getAttributeByName(accessibilityCheckboxes, 'aria-labelledby', 1)).toContain(
                a11yCheckboxAriaLabelledBy
            );
            await expect(await getAttributeByName(accessibilityCheckboxes, 'aria-disabled', 1)).toBe('false');
        });

        it('should check the disabled accessibility checkbox', async () => {
            await checkIfDisabled(disabledAccessibilityCheckbox, 'aria-disabled', 'true');
            await expect(await getAttributeByName(disabledAccessibilityCheckbox, 'aria-disabled')).toBe('true');
            await expect(await getElementTitle(disabledAccessibilityCheckboxLabel)).toEqual(disabledCheckboxTitle);
        });
    });

    describe('check example orientation', () => {
        it('should check RTL orientation', async () => {
            await checkboxPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await checkboxPage.saveExampleBaselineScreenshot();
            await expect(await checkboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

async function checkIfDisabled(element, attribute: string, value: string, index: number = 0): Promise<void> {
    await scrollIntoView(element, index);
    await expect(await getAttributeByName(element, attribute, index)).toBe(value);
}
