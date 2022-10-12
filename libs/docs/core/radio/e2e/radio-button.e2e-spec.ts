import { RadioButtonPo } from './radio-button.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Radio button component test', () => {
    const radioButtonPage = new RadioButtonPo();
    const { disableRadioButton, activeRadioButton, activeInput, disableDefaultRadioButton } = radioButtonPage;

    beforeAll(async () => {
        await radioButtonPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(radioButtonPage.root);
        await waitForElDisplayed(radioButtonPage.title);
    }, 2);

    it('verify disable radio buttons', async () => {
        const disableRadioButtonsLength = await getElementArrayLength(disableRadioButton);
        for (let i = 0; i < disableRadioButtonsLength; i++) {
            await scrollIntoView(disableRadioButton, i);
            await expect(await getAttributeByName(disableRadioButton, 'aria-disabled', i)).toBe('true');
        }
    });

    it('verify that active radio buttons work correctly', async () => {
        const activeRadioButtonsLength = await getElementArrayLength(activeInput);
        for (let i = 0; i < activeRadioButtonsLength; i++) {
            await scrollIntoView(activeInput, i);
            await click(activeRadioButton, i);
            await expect(await getAttributeByName(activeInput, 'aria-checked', i)).toBe('true');
        }
    });

    it('verify by default radio button is not selected', async () => {
        await scrollIntoView(activeRadioButton, 8);
        await expect(await getAttributeByName(activeInput, 'aria-checked', 8)).toBe('false');

        await scrollIntoView(activeRadioButton, 13);
        await expect(await getAttributeByName(activeInput, 'aria-checked', 13)).toBe('false');

        await scrollIntoView(disableRadioButton, 1);
        await expect(await getAttributeByName(disableDefaultRadioButton, 'aria-checked')).toBe('false');
    });

    it('should check RTL and LTR orientation', async () => {
        await radioButtonPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', async () => {
            await radioButtonPage.saveExampleBaselineScreenshot();
            await expect(await radioButtonPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
