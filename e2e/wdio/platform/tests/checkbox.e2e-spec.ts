import { CheckboxPO } from '../pages/checkbox.po';
import checkboxGPData from '../../platform/fixtures/appData/checkbox-page-contents';
import checkboxData from '../fixtures/appData/checkbox-page-contents';
import { webDriver } from '../../driver/wdio';

describe('Checkbox test suite', () => {
    const checkboxPage = new CheckboxPO();

    beforeAll(() => {
        checkboxPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    describe('check binary checkbox used with form examples', () => {
        it('should check binary checkbox in template driven form', () => {
            webDriver.waitElementToBePresentInDOM(checkboxPage.binaryTempCheckbox, 0);
            webDriver.waitForDisplayed(checkboxPage.binaryTempCheckbox, 0);
            // check checkbox labels
            for (let i = 0; 3 > i; i++) {
                checkIfDisabled(checkboxPage.binaryTempCheckbox, 'ng-reflect-is-disabled', 'false', i);
                checkMarkingCheckbox(checkboxPage.binaryTempCheckbox, i);
            }
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                checkHoverState(checkboxPage.binaryTempCheckbox);
            }
            checkFocusState(checkboxPage.binaryTempCheckbox);
        });

        it('should check binary checkbox in reactive/model driven form', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                for (let i = 3; 6 > i; i++) {
                    checkIfDisabled(checkboxPage.binaryTempCheckbox, 'ng-reflect-is-disabled', 'false', i);
                    checkMarkingCheckbox(checkboxPage.binaryTempCheckbox, i);
                }

                checkHoverState(checkboxPage.binaryTempCheckbox, 3);
                checkFocusState(checkboxPage.binaryTempCheckbox, 3);
            }
        });

        it('should check disabled checkbox', () => {
            webDriver.waitForDisplayed(checkboxPage.disabledBinaryCheckbox, 0, 10000);
            checkIfDisabled(checkboxPage.disabledBinaryCheckbox, 'ng-reflect-is-disabled', 'true');
        });
    });

    describe('Check checkbox used without form examples', () => {
        it('should check binary checkbox with value', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                for (let i = 0; 2 > i; i++) {
                    checkIfDisabled(checkboxPage.checkboxWithoutForm, 'ng-reflect-is-disabled', 'false', i);
                    checkMarkingCheckbox(checkboxPage.checkboxWithoutForm, i);
                }

                checkHoverState(checkboxPage.checkboxWithoutForm);
                checkFocusState(checkboxPage.checkboxWithoutForm);
            }
        });

        it('should check binary checkbox without value', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                for (let i = 2; 4 > i; i++) {
                    checkIfDisabled(checkboxPage.checkboxWithoutForm, 'ng-reflect-is-disabled', 'false', i);
                    checkMarkingCheckbox(checkboxPage.checkboxWithoutForm, i);
                }

                checkFocusState(checkboxPage.checkboxWithoutForm, 2);
                checkHoverState(checkboxPage.checkboxWithoutForm, 2);
            }
        });

        it('should check disabled checkbox', () => {
            // TODO: Fix for Safari
            if (browser.capabilities.browserName === 'Safari') {
                console.log('skip');
            } else {
                webDriver.waitElementToBePresentInDOM(checkboxPage.disabledCheckboxWithoutForm);
                webDriver.scrollIntoView(checkboxPage.disabledCheckboxWithoutForm);
                webDriver.waitForDisplayed(checkboxPage.disabledCheckboxWithoutForm);
                checkIfDisabled(checkboxPage.disabledCheckboxWithoutForm, 'ng-reflect-is-disabled', 'true');
            }
        });
    });

    describe('Check checkboxes with value property examples', () => {
        it('should check template driven form', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                for (let i = 0; 2 > i; i++) {
                    checkIfDisabled(checkboxPage.checkboxWithValue, 'ng-reflect-is-disabled', 'false', i);
                    checkMarkingCheckbox(checkboxPage.checkboxWithValue, i);
                }
                checkHoverState(checkboxPage.checkboxWithValue);
                checkFocusState(checkboxPage.checkboxWithValue);
            }
        });
        it('should check reactive/model driven form', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                for (let i = 2; 4 > i; i++) {
                    checkIfDisabled(checkboxPage.checkboxWithValue, 'ng-reflect-is-disabled', 'false', i);
                    checkMarkingCheckbox(checkboxPage.checkboxWithValue, i);
                }

                checkHoverState(checkboxPage.checkboxWithValue, 2);
                checkFocusState(checkboxPage.checkboxWithValue, 2);
            }
        });
    });

    describe('Check Tristate Checkbox With Value Property and Without Value Property', () => {
        it('should check reactive form', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                for (let i = 0; 8 > i; i++) {
                    checkIfDisabled(checkboxPage.tristateCheckboxes, 'ng-reflect-is-disabled', 'false', i);
                }

                checkHoverState(checkboxPage.tristateCheckboxes);
                checkFocusState(checkboxPage.tristateCheckboxes);

                for (let j = 0; 6 > j; j++) {
                    checkTristateCheckboxMarking(checkboxPage.tristateCheckboxes, j);
                }

                checkTriStateTwoStateCheckboxMarking(checkboxPage.tristateCheckboxes, 6);
                checkMarkingCheckbox(checkboxPage.tristateCheckboxes, 7);
            }
        });

        it('should check template form', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                for (let i = 8; 16 > i; i++) {
                    checkIfDisabled(checkboxPage.tristateCheckboxes, 'ng-reflect-is-disabled', 'false', i);
                }
                checkHoverState(checkboxPage.tristateCheckboxes, 8);
                checkFocusState(checkboxPage.tristateCheckboxes, 8);

                for (let j = 8; 14 > j; j++) {
                    checkTristateCheckboxMarking(checkboxPage.tristateCheckboxes, j);
                }

                for (let k = 14; 16 > k; k++) {
                    checkTriStateTwoStateCheckboxMarking(checkboxPage.tristateCheckboxes, k);
                }
            }
        });

        it('should check tristate checkbox with multiple checkboxes', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                for (let i = 16; 20 > i; i++) {
                    checkIfDisabled(checkboxPage.tristateCheckboxes, 'ng-reflect-is-disabled', 'false', i);
                }

                checkHoverState(checkboxPage.acceptAllCheckbox);
                checkFocusState(checkboxPage.acceptAllCheckbox);
                checkHoverState(checkboxPage.termsAndConditionsCheckbox);
                checkFocusState(checkboxPage.termsAndConditionsCheckbox);

                webDriver.clickNextElement(checkboxPage.acceptAllCheckbox);
                for (let j = 17; 20 > j; j++) {
                    expect(webDriver.getAttributeByName(checkboxPage.tristateCheckboxes, 'aria-checked', j)).toBe('true');
                }

                webDriver.clickNextElement(checkboxPage.acceptAllCheckbox);
                for (let k = 17; 20 > k; k++) {
                    expect(webDriver.getAttributeByName(checkboxPage.tristateCheckboxes, 'aria-checked', k)).toBe('false');
                }
                webDriver.clickNextElement(checkboxPage.marketingCheckbox);
                webDriver.clickNextElement(checkboxPage.newsletterCheckbox);
                expect(webDriver.getAttributeByName(checkboxPage.acceptAllCheckbox, 'aria-checked')).toBe('mixed');
            }
        });

        it('should check checkbox markings are centered', () => {
            const checkboxMarkDisplayStyle = webDriver.executeScriptBeforeTagAttr(checkboxPage.tristateCheckboxParis, 'display');
            expect(checkboxMarkDisplayStyle).toContain(checkboxData.markingDisplayStyle);
        });
    });

    describe('Checkbox With Form and State Change on Error', () => {
        it('should check error handling examples', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                const errorCheckboxesLength = webDriver.getElementArrayLength(checkboxPage.errorCheckboxes);

                for (let i = 0; errorCheckboxesLength > i; i++) {
                    checkIfDisabled(checkboxPage.errorCheckboxes, 'ng-reflect-is-disabled', 'false', i);
                }

                webDriver.clickNextElement(checkboxPage.presenceCheckbox);
                expect(webDriver.getCSSPropertyByName(checkboxPage.presenceCheckbox, 'border-bottom-color').value)
                    .toContain(checkboxGPData.checkboxErrorState);
                webDriver.scrollIntoView(checkboxPage.errorExampleTitle);
                webDriver.click(checkboxPage.errorExampleTitle);
                webDriver.mouseHoverElement(checkboxPage.presenceCheckbox);
                expect(webDriver.getText(checkboxPage.errorTooltip).trim()).toEqual(checkboxData.checkboxErrorTooltip);

                checkHoverState(checkboxPage.errorCheckboxes, 1);
                checkFocusState(checkboxPage.errorCheckboxes, 1);
            }
        });

        it('should check error handling form submission', () => {
            webDriver.click(checkboxPage.submitBtn);
            expect(webDriver.getAlertText()).toEqual('Status: VALID');
            webDriver.acceptAlert();
            browser.switchToFrame()
            // checks with required checkbox not marked

        });
        it('should check error handling form submission 222 ', () => {
            if (browser.capabilities.browserName === 'Safari' || 'internet explorer') {
                console.log('skip');
            } else {
                webDriver.clickNextElement(checkboxPage.presenceCheckbox);
                webDriver.click(checkboxPage.submitBtn);

                expect(webDriver.getAlertText()).toEqual('Status: INVALID');
            }
        });
    });

    xdescribe('Check Accessibility on checkbox examples', () => {
        it('should check a11y checkboxes', () => {
            checkMarkingCheckbox(checkboxPage.accessibilityCheckboxes, 0);
            checkMarkingCheckbox(checkboxPage.accessibilityCheckboxes, 1);

            expect(webDriver.getAttributeByName(checkboxPage.accessibilityCheckboxes, 'aria-label'))
                .toEqual(checkboxData.a11yCheckboxAriaLabel);
            expect(webDriver.getAttributeByName(checkboxPage.accessibilityCheckboxes, 'aria-disabled')).toBe('false');

            expect(webDriver.getAttributeByName(checkboxPage.accessibilityCheckboxes, 'aria-labelledby', 1))
                .toEqual(checkboxData.a11yCheckboxAriaLabelledBy);
            expect(webDriver.getAttributeByName(checkboxPage.accessibilityCheckboxes, 'aria-disabled', 1)).toBe('false');
        });

        it('should check the disabled accessibility checkbox', () => {
            checkIfDisabled(checkboxPage.disabledAccessibilityCheckbox, 'ng-reflect-is-disabled', 'true');
            expect(webDriver.getAttributeByName(checkboxPage.disabledAccessibilityCheckbox, 'aria-disabled')).toBe('true');
            expect(webDriver.getAttributeByName(checkboxPage.disabledAccessibilityCheckboxLabel, 'title'))
                .toEqual(checkboxData.disabledCheckboxTitle);
        });
    });

    xdescribe('check example orientation', () => {
        it('should check LTR orientation', () => {
            const areaContainersArrayLength = webDriver.getElementArrayLength(checkboxPage.exampleAreaContainersArr);

            for (let i = 0; areaContainersArrayLength > i; i++) {
                expect(webDriver.getCSSPropertyByName(checkboxPage.exampleAreaContainersArr, 'direction', i).value)
                    .toBe('ltr', 'css prop direction ');
            }
        });

        it('should check RTL orientation', () => {
            const arrL = webDriver.getElementArrayLength(checkboxPage.exampleAreaContainersArr);

            for (let i = 0; arrL > i; i++) {
                webDriver.scrollIntoView(checkboxPage.exampleAreaContainersArr, i);
                expect(webDriver.getCSSPropertyByName(checkboxPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
                const dirValueBefore = webDriver.getAttributeByName(checkboxPage.exampleAreaContainersArr, 'dir', i);
                expect([null, '']).toContain(dirValueBefore);
                webDriver.click(checkboxPage.rtlSwitcherArr, i);
                expect(webDriver.getCSSPropertyByName(checkboxPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                expect(webDriver.getAttributeByName(checkboxPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
            }
        });
    });
});

function checkHoverState(elementSelector, index: number = 0): boolean {
    webDriver.scrollIntoView(elementSelector, index);
    webDriver.mouseHoverElement(elementSelector, index);
    return expect(webDriver.getCSSPropertyByName(elementSelector, 'border-bottom-color', index).value).toContain(checkboxGPData.checkboxHoverState);
}

function checkFocusState(elementSelector, index: number = 0): boolean {
    // webDriver.clickNextElement(elementSelector, index);
    webDriver.focusElement(elementSelector, index);
    return expect(webDriver.getCSSPropertyByName(elementSelector, 'outline-style', index).value).toContain(checkboxGPData.checkboxFocusStyle);
}

function checkMarkingCheckbox(selector: string, index: number = 0): void {
    const beforeClicking = webDriver.getAttributeByName(selector, 'aria-checked', index);
    webDriver.clickNextElement(selector, index);
    const afterClickingOnce = webDriver.getAttributeByName(selector, 'aria-checked', index);
    webDriver.clickNextElement(selector, index);
    const afterClickingTwice = webDriver.getAttributeByName(selector, 'aria-checked', index);

    expect(beforeClicking).not.toEqual(afterClickingOnce);
    expect(afterClickingTwice).toEqual(beforeClicking);
}


function checkTristateCheckboxMarking(checkboxSelector: string, index: number = 0): void {
    const beforeClicking = webDriver.getAttributeByName(checkboxSelector, 'aria-checked', index);
    webDriver.clickNextElement(checkboxSelector, index);
    const afterClickingOnce = webDriver.getAttributeByName(checkboxSelector, 'aria-checked', index);
    webDriver.clickNextElement(checkboxSelector, index);
    const afterClickingTwice = webDriver.getAttributeByName(checkboxSelector, 'aria-checked', index);
    webDriver.clickNextElement(checkboxSelector, index);
    const afterThirdClick = webDriver.getAttributeByName(checkboxSelector, 'aria-checked', index);

    expect(afterClickingOnce).not.toEqual(beforeClicking);
    expect(afterClickingTwice).not.toEqual(afterClickingOnce);
    expect(afterThirdClick).not.toEqual(afterClickingTwice);
    expect(afterThirdClick).toEqual(beforeClicking);
}

function checkTriStateTwoStateCheckboxMarking(checkboxSelector: string, index: number = 0): void {
    const firstState = webDriver.getAttributeByName(checkboxSelector, 'aria-checked', index);
    webDriver.clickNextElement(checkboxSelector, index);
    const secondState = webDriver.getAttributeByName(checkboxSelector, 'aria-checked', index);
    webDriver.clickNextElement(checkboxSelector, index);
    const thirdState = webDriver.getAttributeByName(checkboxSelector, 'aria-checked', index);
    webDriver.clickNextElement(checkboxSelector, index);
    const fourthState = webDriver.getAttributeByName(checkboxSelector, 'aria-checked', index);

    expect(secondState).not.toEqual(firstState);
    expect(thirdState).not.toEqual(firstState);
    expect(fourthState).not.toEqual(firstState);
    expect(fourthState).toEqual(secondState);
}

function checkIfDisabled(element, attribute: string, value: string, index: number = 0): void {
    expect(webDriver.getAttributeByName(element, attribute, index)).toBe(value);
}
