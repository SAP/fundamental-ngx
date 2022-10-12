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

    beforeAll(async () => {
        await wizardPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(wizardPage.root);
        await waitForElDisplayed(wizardPage.title);
    }, 2);

    it('should check open-closing wizard', async () => {
        await checkOpenClose(defaultExample);
        await checkOpenClose(customizableExample);
        await checkOpenClose(branchingExample);
        await checkOpenClose(ngforExample);
        await checkOpenClose(dialogExample);
    });

    it('should check basic way through default example', async () => {
        await click(defaultExample + button);
        let stepsLength = await getElementArrayLength(wizard + step);
        if (await browserIsSafari()) {
            stepsLength--;
        }

        for (let i = 0; i < stepsLength; i++) {
            if (i !== stepsLength - 1) {
                await expect(await getElementClass(wizard + step, i + 1)).toContain('step--upcoming');
            }

            if (i !== 1) {
                await expect(await getElementClass(wizard + step, i)).toContain('step--current');
            }
            if (i === 1) {
                await setValue(fullNameInput, fullName);
                await setValue(firstAdressInput, firstAdress);
                await setValue(secAdressInput, secAdress);
            }
            await click(wizard + nextStep, i);
            await pause(1000);
            if (i !== 0) {
                await expect(await getElementClass(wizard + step, i - 1)).toContain('step--completed');
            }
        }
        await expect(await getText(savedName)).toEqual(fullName);
        await expect(await getText(savedFirstAdress)).toEqual(firstAdress);
        await expect(await getText(savedSecAdress)).toEqual(secAdress);

        await click(editButton);
        await setValue(fullNameInput, fullName + update);
        await setValue(firstAdressInput, firstAdress + update);
        await setValue(secAdressInput, secAdress + update);
        await click(wizard + nextStep, 3);

        await expect(await getText(savedName)).toEqual(fullName + update);
        await expect(await getText(savedFirstAdress)).toEqual(firstAdress + update);
        await expect(await getText(savedSecAdress)).toEqual(secAdress + update);
    });

    it('should check navigation by scrolling to the step point', async () => {
        await checkStatusStepScroll(branchingExample, 'scroll');
        await checkStatusStepScroll(ngforExample, 'scroll');
        await checkStatusStepScroll(defaultExample, 'scroll');
        await checkStatusStepScroll(customizableExample, 'scroll');
    });

    it('should check navigation by clicking to the step point', async () => {
        await checkStatusStepScroll(branchingExample, 'click');
        await checkStatusStepScroll(ngforExample, 'click');
        await checkStatusStepScroll(defaultExample, 'click');
        await checkStatusStepScroll(customizableExample, 'click');
    });

    it('should check that entered value in the field saves after re-open', async () => {
        await checkReOpen(defaultExample, wizard);
        await checkReOpen(dialogExample, dialogWizard);
    });

    it('should check validation for empty fields for dialog example', async () => {
        await click(dialogExample + button);
        await click(dialogWizard + buttonsBar + ':nth-child(1) ' + button);

        await expect(await getElementClass(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toContain(
            'is-disabled'
        );
        await expect(await isElementClickable(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toBe(
            false,
            'button is clickable'
        );
        await setValue(fullNameInput, fullName);
        await setValue(firstAdressInput, firstAdress);
        await expect(await getElementClass(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).not.toContain(
            'is-disabled'
        );
        await expect(await isElementClickable(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toBe(
            true,
            'button is not clickable'
        );

        for (let i = 0; i < firstAdressLength; i++) {
            await sendKeys('Backspace');
        }
        await expect(await getElementClass(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toContain(
            'is-disabled'
        );
        await expect(await isElementClickable(dialogWizard + buttonsBar + ':nth-child(2) ' + button)).toBe(
            false,
            'button is clickable'
        );
    });

    it('should check confirmation changing payment type in branching example', async () => {
        // skip due to unknown error
        if (await browserIsSafari()) {
            return;
        }
        await click(branchingExample + button);
        await waitForElDisplayed(wizard + nextStep);
        await click(wizard + nextStep);
        await click(radioButtonLabel);
        await pause(500);
        await expect(await getAttributeByName(radioButton, 'aria-checked')).toBe(
            'true',
            'radio button is not selected'
        );
        await click(radioButtonLabel, 1);
        // pause for dialog element to be created
        await pause(500);
        await expect(await waitForElDisplayed(dialogContainer)).toBe(true, 'dialog container did not open');
        await click(cancelButton);
        await pause(500);
        await expect(await getAttributeByName(radioButton, 'aria-checked')).toBe('true', 'focus dissapeared');
        await click(radioButtonLabel, 1);
        // pause for dialog element to be created
        await pause(500);
        await waitForElDisplayed(dialogContainer);
        await click(continueButton);
        await pause(500);
        await expect(await getAttributeByName(radioButton, 'aria-checked', 1)).toBe('true', 'focus did not change');
    }, 1);

    it('should check navigation in mobile example', async () => {
        await click(mobileExample + nextStep);
        await expect(await getElementClass(mobileExample + step, 1)).toContain(
            'step--current',
            'you are not moved to the second step'
        );
        await click(mobileExample + stepContainer);
        await expect(await getElementClass(mobileExample + step, 0)).toContain(
            'step--current',
            'you are not moved to the first step'
        );
        await click(mobileExample + nextStep);
        await expect(await getElementClass(mobileExample + step, 1)).toContain(
            'step--current',
            'button did not direct you to the step 2'
        );
    });

    it('should check compliting form for mobile example', async () => {
        const stepsLength = (await getElementArrayLength(mobileExample + step)) / 2;
        for (let i = 0; i < stepsLength; i++) {
            await expect(await getElementClass(mobileExample + step, i)).toContain('step--current');
            await click(mobileExample + nextStep);
        }
        await refreshPage(true);
    });

    it('should check orientations', async () => {
        await wizardPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await wizardPage.saveExampleBaselineScreenshot();
        await expect(await wizardPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkReOpen(section: string, block: string): Promise<void> {
        await click(section + button);
        if (section === defaultExample) {
            await pause(5000);
            await waitForElDisplayed(block + nextStep);
            await click(block + nextStep);
        }
        if (section !== defaultExample) {
            await waitForElDisplayed(dialogWizard + buttonsBar + ':nth-child(1) ' + button);
            await click(dialogWizard + buttonsBar + ':nth-child(1) ' + button);
        }
        await setValue(fullNameInput, fullName);
        await setValue(firstAdressInput, firstAdress);
        await setValue(secAdressInput, secAdress);
        if (section === defaultExample) {
            await click(block + exitButton);
            await click(section + button);
            await waitForElDisplayed(block + nextStep);
            await click(block + nextStep);
        }
        if (section !== defaultExample) {
            await click(dialogWizard + buttonsBar + ':nth-child(3) ' + button);
            await click(section + button);
        }
        await expect(await getValue(fullNameInput)).toEqual(fullName);
        await expect(await getValue(firstAdressInput)).toEqual(firstAdress);
        await expect(await getValue(secAdressInput)).toEqual(secAdress);
        if (section === defaultExample) {
            await click(block + exitButton);
        }
        if (section !== defaultExample) {
            await click(dialogWizard + buttonsBar + ':nth-child(3) ' + button);
        }
    }

    async function checkOpenClose(section: string): Promise<void> {
        await click(section + button);
        if (section !== dialogExample) {
            await expect(await waitForElDisplayed(section + wizard)).toBe(true, `wizard in ${section} did not open`);
            await expect(await getAttributeByName(section + wizard, 'style')).toEqual('width: 100%;');
            await click(section + exitButton);
            await expect(await isElementDisplayed(section + wizard)).toBe(false, `wizard in ${section} did not close`);
            await expect(await getAttributeByName(section + wizard, 'style')).toEqual('width: 0%;');
        }
        if (section === dialogExample) {
            await expect(await waitForElDisplayed(dialogWizard)).toBe(true, 'dialog wizard did not open');
            await click(dialogWizard + buttonsBar + ':nth-child(2) ' + button);
            await expect(await doesItExist(dialogWizard)).toBe(
                false,
                'dialog wizard did not close, still exist in DOM'
            );
        }
    }

    async function checkStatusStepScroll(section: string, method: 'click' | 'scroll'): Promise<void> {
        await click(section + button);
        let stepsLength = await getElementArrayLength(wizard + step);
        if (await browserIsSafari()) {
            stepsLength--;
        }
        for (let i = 0; i < stepsLength; i++) {
            await click(wizard + step, i);
            if (i === stepsLength - 1) {
                switch (method) {
                    case 'scroll':
                        await scrollIntoView(contentSection);
                        break;
                    case 'click':
                        await click(wizard + stepContainer);
                        break;
                }
                await expect(await getElementClass(wizard + step, 0)).toContain('step--current');
                await expect(await getElementClass(wizard + step, 1)).toContain('step--upcoming');
            }
        }
        await click(exitButton);
    }
});
