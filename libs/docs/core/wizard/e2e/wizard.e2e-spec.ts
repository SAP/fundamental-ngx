import { WizardPo } from './wizard.po';
import {
    browserIsSafari,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { firstAdress, firstAdressLength, fullName, secAdress, update } from './wizard.tags';

describe('Wizard component test', () => {
    const wizardPage = new WizardPo();
    const {
        defaultExample,
        customizableExample,
        mobileExample,
        branchingExample,
        dialogExample,
        ngforExample,
        button,
        exitButton,
        wizard,
        step,
        nextStep,
        dialogWizard,
        fullNameInput,
        firstAdressInput,
        secAdressInput,
        savedFirstAdress,
        savedSecAdress,
        savedName,
        editButton,
        contentSection,
        buttonsBar,
        stepContainer,
        radioButton,
        dialogContainer,
        continueButton,
        cancelButton,
        radioButtonLabel
    } = wizardPage;

    beforeAll(() => {
        wizardPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(wizardPage.root);
        waitForElDisplayed(wizardPage.title);
    }, 2);

    it('should check open-closing wizard', () => {
        checkOpenClose(defaultExample);
        checkOpenClose(customizableExample);
        checkOpenClose(branchingExample);
        checkOpenClose(ngforExample);
        checkOpenClose(dialogExample);
    });

    it('should check basic way through default example', () => {
        click(defaultExample + button);
        let stepsLength = getElementArrayLength(wizard + step);
        if (browserIsSafari()) {
            stepsLength--;
        }

        for (let i = 0; i < stepsLength; i++) {
            if (i !== stepsLength - 1) {
                expect(getElementClass(wizard + step, i + 1)).toContain('step--upcoming');
            }

            if (i !== 1) {
                expect(getElementClass(wizard + step, i)).toContain('step--current');
            }
            if (i === 1) {
                setValue(fullNameInput, fullName);
                setValue(firstAdressInput, firstAdress);
                setValue(secAdressInput, secAdress);
            }
            click(wizard + nextStep, i);
            pause(1000);
            if (i !== 0) {
                expect(getElementClass(wizard + step, i - 1)).toContain('step--completed');
            }
        }
        expect(getText(savedName)).toEqual(fullName);
        expect(getText(savedFirstAdress)).toEqual(firstAdress);
        expect(getText(savedSecAdress)).toEqual(secAdress);

        click(editButton);
        setValue(fullNameInput, fullName + update);
        setValue(firstAdressInput, firstAdress + update);
        setValue(secAdressInput, secAdress + update);
        click(wizard + nextStep, 3);

        expect(getText(savedName)).toEqual(fullName + update);
        expect(getText(savedFirstAdress)).toEqual(firstAdress + update);
        expect(getText(savedSecAdress)).toEqual(secAdress + update);
    });

    it('should check navigation by scrolling to the step point', () => {
        checkStatusStepScroll(branchingExample, 'scroll');
        checkStatusStepScroll(ngforExample, 'scroll');
        checkStatusStepScroll(defaultExample, 'scroll');
        checkStatusStepScroll(customizableExample, 'scroll');
    });

    it('should check navigation by clicking to the step point', () => {
        checkStatusStepScroll(branchingExample, 'click');
        checkStatusStepScroll(ngforExample, 'click');
        checkStatusStepScroll(defaultExample, 'click');
        checkStatusStepScroll(customizableExample, 'click');
    });

    it('should check that entered value in the field saves after re-open', () => {
        checkReOpen(defaultExample, wizard);
        checkReOpen(dialogExample, dialogWizard);
    });

    it('should check validation for empty fields for dialog example', () => {
        click(dialogExample + button);
        click(dialogWizard + buttonsBar + ':nth-child(1) ' + button);

        expect(getElementClass(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toContain('is-disabled');
        expect(isElementClickable(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toBe(
            false,
            'button is clickable'
        );
        setValue(fullNameInput, fullName);
        setValue(firstAdressInput, firstAdress);
        expect(getElementClass(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).not.toContain('is-disabled');
        expect(isElementClickable(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toBe(
            true,
            'button is not clickable'
        );

        for (let i = 0; i < firstAdressLength; i++) {
            sendKeys('Backspace');
        }
        expect(getElementClass(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toContain('is-disabled');
        expect(isElementClickable(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toBe(
            false,
            'button is clickable'
        );
    });

    it('should check confirmation changing payment type in branching example', () => {
        // skip due to unknown error
        if (browserIsSafari()) {
            return;
        }
        click(branchingExample + button);
        waitForElDisplayed(wizard + nextStep);
        click(wizard + nextStep);
        click(radioButtonLabel);
        pause(500);
        expect(getAttributeByName(radioButton, 'aria-checked')).toBe('true', 'radio button is not selected');
        click(radioButtonLabel, 1);
        // pause for dialog element to be created
        pause(500);
        expect(waitForElDisplayed(dialogContainer)).toBe(true, 'dialog container did not open');
        click(cancelButton);
        pause(500);
        expect(getAttributeByName(radioButton, 'aria-checked')).toBe('true', 'focus dissapeared');
        click(radioButtonLabel, 1);
        // pause for dialog element to be created
        pause(500);
        waitForElDisplayed(dialogContainer);
        click(continueButton);
        pause(500);
        expect(getAttributeByName(radioButton, 'aria-checked', 1)).toBe('true', 'focus did not change');
    }, 1);

    it('should check navigation in mobile example', () => {
        click(mobileExample + nextStep);
        expect(getElementClass(mobileExample + step, 1)).toContain(
            'step--current',
            'you are not moved to the second step'
        );
        click(mobileExample + stepContainer);
        expect(getElementClass(mobileExample + step, 0)).toContain(
            'step--current',
            'you are not moved to the first step'
        );
        click(mobileExample + nextStep);
        expect(getElementClass(mobileExample + step, 1)).toContain(
            'step--current',
            'button did not direct you to the step 2'
        );
    });

    it('should check compliting form for mobile example', () => {
        const stepsLength = getElementArrayLength(mobileExample + step) / 2;
        for (let i = 0; i < stepsLength; i++) {
            expect(getElementClass(mobileExample + step, i)).toContain('step--current');
            click(mobileExample + nextStep);
        }
        refreshPage(true);
    });

    it('should check orientations', () => {
        wizardPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', () => {
        wizardPage.saveExampleBaselineScreenshot();
        expect(wizardPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkReOpen(section: string, block: string): void {
        click(section + button);
        if (section === defaultExample) {
            pause(5000);
            waitForElDisplayed(block + nextStep);
            click(block + nextStep);
        }
        if (section !== defaultExample) {
            waitForElDisplayed(dialogWizard + buttonsBar + ':nth-child(1) ' + button);
            click(dialogWizard + buttonsBar + ':nth-child(1) ' + button);
        }
        setValue(fullNameInput, fullName);
        setValue(firstAdressInput, firstAdress);
        setValue(secAdressInput, secAdress);
        if (section === defaultExample) {
            click(block + exitButton);
            click(section + button);
            waitForElDisplayed(block + nextStep);
            click(block + nextStep);
        }
        if (section !== defaultExample) {
            click(dialogWizard + buttonsBar + ':nth-child(3) ' + button);
            click(section + button);
        }
        expect(getValue(fullNameInput)).toEqual(fullName);
        expect(getValue(firstAdressInput)).toEqual(firstAdress);
        expect(getValue(secAdressInput)).toEqual(secAdress);
        if (section === defaultExample) {
            click(block + exitButton);
        }
        if (section !== defaultExample) {
            click(dialogWizard + buttonsBar + ':nth-child(3) ' + button);
        }
    }

    function checkOpenClose(section: string): void {
        click(section + button);
        if (section !== dialogExample) {
            expect(waitForElDisplayed(section + wizard)).toBe(true, `wizard in ${section} did not open`);
            expect(getAttributeByName(section + wizard, 'style')).toEqual('width: 100%;');
            click(section + exitButton);
            expect(isElementDisplayed(section + wizard)).toBe(false, `wizard in ${section} did not close`);
            expect(getAttributeByName(section + wizard, 'style')).toEqual('width: 0%;');
        }
        if (section === dialogExample) {
            expect(waitForElDisplayed(dialogWizard)).toBe(true, 'dialog wizard did not open');
            click(dialogWizard + buttonsBar + ':nth-child(2) ' + button);
            expect(doesItExist(dialogWizard)).toBe(false, 'dialog wizard did not close, still exist in DOM');
        }
    }

    function checkStatusStepScroll(section: string, method: 'click' | 'scroll'): void {
        click(section + button);
        let stepsLength = getElementArrayLength(wizard + step);
        if (browserIsSafari()) {
            stepsLength--;
        }
        for (let i = 0; i < stepsLength; i++) {
            click(wizard + step, i);
            if (i === stepsLength - 1) {
                switch (method) {
                    case 'scroll':
                        scrollIntoView(contentSection);
                        break;
                    case 'click':
                        click(wizard + stepContainer);
                        break;
                }
                expect(getElementClass(wizard + step, 0)).toContain('step--current');
                expect(getElementClass(wizard + step, 1)).toContain('step--upcoming');
            }
        }
        click(exitButton);
    }
});
