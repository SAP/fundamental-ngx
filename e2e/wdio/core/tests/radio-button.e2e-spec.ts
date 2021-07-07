import { RadioButtonPo } from '../pages/radio-button.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    refreshPage, scrollIntoView
} from '../../driver/wdio';


describe('Radio button component test', function() {
    const radioButtonPage = new RadioButtonPo();
    const { disableRadioButton, activeRadioButton, activeInput, disableDefaultRadioButton } = radioButtonPage;

    beforeAll(() => {
        radioButtonPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    it('verify disable radio buttons', () => {
        const disableRadioButtonsLength = getElementArrayLength(disableRadioButton);
        for (let i = 0; i < disableRadioButtonsLength; i++) {
            if (i <= 5) {
                scrollIntoView(disableRadioButton, i);
                expect(getAttributeByName(disableRadioButton, 'disabled', i)).toBe('true');
            }
            if (i > 5) {
                scrollIntoView(disableRadioButton, i);
                expect(getAttributeByName(disableRadioButton, 'ng-reflect-name', i)).toBe('disabledRadio');
            }
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

    describe('Should check visual regression', function() {

        it('should check visual regression for all examples', () => {
            radioButtonPage.saveExampleBaselineScreenshot();
            expect(radioButtonPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
