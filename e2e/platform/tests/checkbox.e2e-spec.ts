import { CheckboxPO } from '../pages/checkbox.po';
import { clickByMouseMove, getValueOfAttribute } from '../helper/helper';
import {
    checkErrorHoverState,
    checkErrorTooltip,
    checkFocusState,
    checkHoverState,
    checkIfDisabled,
    checkMarkingCheckbox,
    checkTristateCheckboxMarking,
    checkTriStateTwoStateCheckboxMarking
} from '../helper/assertion-helper';
import {
    a11yCheckboxAriaLabelledBy,
    a11yCheckboxAriaLabel,
    disabledCheckboxTitle,
    checkboxErrorTooltip,
    markingDisplayStyle
} from '../fixtures/appData/checkbox-page-contents';
import { browser } from 'protractor';

describe('Checkbox test suite', () => {
    const checkboxPage = new CheckboxPO();

    beforeAll(async () => {
        await checkboxPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    describe('check binary checkbox used with form examples',  () => {
        it('should check binary checkbox in template driven form', async () => {
            // check checkbox labels
            const templateCheckboxArr = await (await checkboxPage.binaryTempCheckbox).slice(0, 3);

            await templateCheckboxArr.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

            await checkMarkingCheckbox(templateCheckboxArr);
            await checkHoverState(templateCheckboxArr[0]);
            await checkFocusState(templateCheckboxArr[0]);
        });

        it('should check binary checkbox in reactive/model driven form', async () => {
            const reactiveCheckboxArr = await (await checkboxPage.binaryTempCheckbox).slice(3, 6);

            await reactiveCheckboxArr.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

            await checkMarkingCheckbox(reactiveCheckboxArr);
            await checkHoverState(reactiveCheckboxArr[0]);
            await checkFocusState(reactiveCheckboxArr[0]);
        });

        it('should check disabled checkbox', async () => {
            await checkIfDisabled(await checkboxPage.disabledBinaryCheckbox, 'ng-reflect-is-disabled', 'true');
        });
    });

    describe('Check checkbox used without form examples', () => {
        it('should check binary checkbox with value', async () => {
            const valueCheckbox = (await checkboxPage.checkboxWithoutForm).slice(0, 2);

            await valueCheckbox.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });
            await checkMarkingCheckbox(valueCheckbox);
            await checkHoverState(valueCheckbox[0]);
            await checkFocusState(valueCheckbox[0]);
        });

        it('should check binary checkbox without value', async () => {
            const withoutValueCheckbox = await (await checkboxPage.checkboxWithoutForm).slice(2, 4);

            await withoutValueCheckbox.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

            await checkMarkingCheckbox(withoutValueCheckbox);
            await checkFocusState(withoutValueCheckbox[0]);
            await checkHoverState(withoutValueCheckbox[0]);
        });

        it('should check disabled checkbox', async () => {
        await checkIfDisabled(checkboxPage.disabledCheckboxWithoutForm, 'ng-reflect-is-disabled', 'true');
        });
    });

    describe('Check checkboxes with value property examples', () => {
        it('should check template driven form', async () => {
            const withValueTemplateCheckbox = await (await checkboxPage.checkboxWithValue).slice(0, 2);

            await withValueTemplateCheckbox.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

            await checkMarkingCheckbox(withValueTemplateCheckbox);
            await checkHoverState(withValueTemplateCheckbox[0]);
            await checkFocusState(withValueTemplateCheckbox[0]);
        });
        it('should check reactive/model driven form', async () => {
            const withValueReactiveCheckbox = await (await checkboxPage.checkboxWithValue).slice(2, 4);

            await withValueReactiveCheckbox.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

            await checkMarkingCheckbox(withValueReactiveCheckbox);
            await checkHoverState(withValueReactiveCheckbox[0]);
            await checkFocusState(withValueReactiveCheckbox[0]);
        });
    });

    describe('Check Tristate Checkbox With Value Property and Without Value Property', () => {
        it('should check reactive form', async () => {
            const reactiveCheckboxes = await (await checkboxPage.tristateCheckboxes).slice(0, 8);
            const reactiveTristateCheckboxes = await (await checkboxPage.tristateCheckboxes).slice(0, 6);
            const tristateToTwoStateCheckbox = await (await checkboxPage.tristateCheckboxes).slice(6, 7);
            const reactiveTwostateCheckboxes = await (await checkboxPage.tristateCheckboxes).slice(7, 8);

            await reactiveCheckboxes.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

            await checkHoverState(reactiveCheckboxes[0]);
            await checkFocusState(reactiveCheckboxes[0]);
            await checkMarkingCheckbox(reactiveTwostateCheckboxes);
            await checkTristateCheckboxMarking(reactiveTristateCheckboxes);
            await checkTriStateTwoStateCheckboxMarking(tristateToTwoStateCheckbox);
        });

        it('should check template form', async () => {
            const templateCheckboxes = await (await checkboxPage.tristateCheckboxes).slice(8, 16);
            const templateTristateCheckboxes = await (await checkboxPage.tristateCheckboxes).slice(8, 14);
            const tristateToTwoStateCheckbox = await (await checkboxPage.tristateCheckboxes).slice(14, 16);

            await templateCheckboxes.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

            await checkHoverState(templateCheckboxes[0]);
            await checkFocusState(templateCheckboxes[0]);
            await checkTristateCheckboxMarking(templateTristateCheckboxes);
            await checkTriStateTwoStateCheckboxMarking(tristateToTwoStateCheckbox);
        });

        it('should check tristate checkbox with multiple checkboxes', async () => {
            const multiCheckboxes = await (await checkboxPage.tristateCheckboxes).slice(16, 20);
            const formCheckboxes = await (await checkboxPage.tristateCheckboxes).slice(17, 20);

            await multiCheckboxes.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

             await checkHoverState(checkboxPage.acceptAllCheckbox);
             await checkFocusState(checkboxPage.acceptAllCheckbox);
             await checkHoverState(checkboxPage.termsAndConditionsCheckbox);
             await checkFocusState(checkboxPage.termsAndConditionsCheckbox);


            await clickByMouseMove(checkboxPage.acceptAllCheckbox);
            await formCheckboxes.forEach(async element => {
                await expect(await getValueOfAttribute(await element, 'aria-checked')).toBe('true');
            });

            await clickByMouseMove(checkboxPage.acceptAllCheckbox);
            await formCheckboxes.forEach(async element => {
                await expect(await getValueOfAttribute(await element, 'aria-checked')).toBe('false');
            });

            await clickByMouseMove(checkboxPage.marketingCheckbox);
            await clickByMouseMove(checkboxPage.newsletterCheckbox);
            await expect(await getValueOfAttribute(checkboxPage.acceptAllCheckbox, 'aria-checked')).toBe('mixed');
        });
        it('should check checkbox markings are centered', async () => {
            const checkboxMarkDisplayStyle = await browser.executeScript(`return (window.getComputedStyle(document.querySelector(await '${checkboxPage.tristateCheckboxParis.locator().value}'), ":before").display)`);
            await expect(checkboxMarkDisplayStyle).toContain(markingDisplayStyle);
        });
    });

    describe('Checkbox With Form and State Change on Error', () => {
        it('should check error handling examples', async () => {
            const errorCheckboxes = await checkboxPage.errorCheckboxes;

            await errorCheckboxes.forEach(async element => {
                await checkIfDisabled(await element, 'ng-reflect-is-disabled', 'false');
            });

            await checkErrorHoverState(await checkboxPage.presenceCheckbox);
            await clickByMouseMove(checkboxPage.errorExampleTitle);
            // needed for getting error tooltip in next line
            // todo: Anton, please take a look
            await expect(checkErrorTooltip(await checkboxPage.presenceCheckbox, await checkboxPage.errorTooltip)).toEqual(checkboxErrorTooltip);
            await checkHoverState(errorCheckboxes[1]);
            await checkFocusState(errorCheckboxes[1]);
        });

        it('should check error handling form submission', async () => {
            await clickByMouseMove(checkboxPage.submitBtn);
            const validPopupAlert = await browser.switchTo().alert().then(async (alert) => {
                        await alert.accept();
                        return await alert.getText();
                    });
            await expect(validPopupAlert).toEqual('Status: VALID');

            // checks with required checkbox not marked
            await clickByMouseMove(checkboxPage.presenceCheckbox);
            await clickByMouseMove(checkboxPage.submitBtn);
            const invalidPopupAlert = await browser.switchTo().alert().then(async (alert) => {
                await alert.accept();
                return await alert.getText();
            });
            await expect(invalidPopupAlert).toEqual('Status: INVALID');
        });
    });

    describe('Check Accessibility on checkbox examples', () => {
        it('should check a11y checkboxes', async () => {
            const a11yCheckboxWithAriaLabel = await (await checkboxPage.accessibilityCheckboxes).splice(0, 1);
            const a11yCheckboxWithAriaLabelledBy = await (await checkboxPage.accessibilityCheckboxes).splice(1, 1);

            await checkMarkingCheckbox(a11yCheckboxWithAriaLabel);
            await checkMarkingCheckbox(a11yCheckboxWithAriaLabelledBy);

            await a11yCheckboxWithAriaLabel.forEach( async element => {
                await expect(await getValueOfAttribute(await element, 'aria-label')).toEqual(a11yCheckboxAriaLabel);
                await expect(await getValueOfAttribute(await element, 'aria-disabled')).toBe('false');
            });

            await a11yCheckboxWithAriaLabelledBy.forEach( async element => {
                await expect(await getValueOfAttribute(await element, 'aria-labelledby')).toEqual(a11yCheckboxAriaLabelledBy);
                await expect(await getValueOfAttribute(await element, 'aria-disabled')).toBe('false');
            });
        });

        it('should check the disabled accessibility checkbox', async () => {
            await checkIfDisabled(checkboxPage.disabledAccessibilityCheckbox, 'ng-reflect-is-disabled', 'true');
            await expect(await getValueOfAttribute(checkboxPage.disabledAccessibilityCheckbox, 'aria-disabled')).toBe('true');
            await expect(await getValueOfAttribute(checkboxPage.disabledAccessibilityCheckboxLabel, 'title'))
                .toEqual(disabledCheckboxTitle);
        });
    });

    describe('check example orientation', () => {
        it('should check LTR orientation', async () => {
            const areaContainersArray = await checkboxPage.exampleAreaContainersArr;

            areaContainersArray.forEach(element => {
                expect(element.getCssValue('direction')).toBe('ltr', 'css prop direction ');
            });
        });

        it('should check RTL orientation', async () => {
            await checkboxPage.exampleAreaContainersArr.each(async (area, index) => {
                expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
                expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
                await checkboxPage.rtlSwitcherArr.get(index).click();
                expect(await area.getCssValue('direction')).toBe('rtl');
                expect(await area.getAttribute('dir')).toBe('rtl');
            });
        });
    });
});




