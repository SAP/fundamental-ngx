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

    beforeAll(() => {
        radioButtonPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(radioButtonPage.root);
        waitForElDisplayed(radioButtonPage.title);
    }, 2);

    it('verify disable radio buttons', () => {
        const disableRadioButtonsLength = getElementArrayLength(disableRadioButton);
        for (let i = 0; i < disableRadioButtonsLength; i++) {
            scrollIntoView(disableRadioButton, i);
            expect(getAttributeByName(disableRadioButton, 'aria-disabled', i)).toBe('true');
        }
    });

    it('verify that active radio buttons work correctly', () => {
        const activeRadioButtonsLength = getElementArrayLength(activeInput);
        for (let i = 0; i < activeRadioButtonsLength; i++) {
            scrollIntoView(activeInput, i);
            click(activeRadioButton, i);
            expect(getAttributeByName(activeInput, 'aria-checked', i)).toBe('true');
        }
    });

    it('verify by default radio button is not selected', () => {
        scrollIntoView(activeRadioButton, 8);
        expect(getAttributeByName(activeInput, 'aria-checked', 8)).toBe('false');

        scrollIntoView(activeRadioButton, 13);
        expect(getAttributeByName(activeInput, 'aria-checked', 13)).toBe('false');

        scrollIntoView(disableRadioButton, 1);
        expect(getAttributeByName(disableDefaultRadioButton, 'aria-checked')).toBe('false');
    });

    it('should check RTL and LTR orientation', () => {
        radioButtonPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', () => {
            radioButtonPage.saveExampleBaselineScreenshot();
            expect(radioButtonPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
