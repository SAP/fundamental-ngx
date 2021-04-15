import {
    click,
    getAttributeByName, getArrValues,
    getElementArrayLength, getText,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import { MultiInputPo } from '../pages/multi-input.po';

describe('Multi input test suite', function() {
    const multiInputPage = new MultiInputPo();
    const {
        activeDropdownButtons, activeInputs, options, filledInput
    } = multiInputPage;

    beforeAll(() => {
        multiInputPage.open();
        waitForPresent(activeDropdownButtons);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(activeDropdownButtons);
    }, 1);

    it('Check RTL/LTR orientation', () => {
        multiInputPage.checkRtlSwitch();
    });

    it('Verify inputs should have placeholder', () => {
        const activeInputsLength = getElementArrayLength(activeInputs);
        for (let i = 0; i < activeInputsLength; i++) {
            if (i === 8) {
                scrollIntoView(activeInputs, i);
                expect(getAttributeByName(activeInputs, 'placeholder', i)).toBe('Search Here...');
            } else if (i === 9) {
                scrollIntoView(activeInputs, i);
                expect(getAttributeByName(activeInputs, 'placeholder', i)).toBe('');
            } else {
                scrollIntoView(activeInputs, i);
                expect(getAttributeByName(activeInputs, 'placeholder', i)).toBe('Search here...');
            }
        }
    });

    const activeButtonsLength = getElementArrayLength(activeDropdownButtons);
    for (let i = 0; i < activeButtonsLength; i++) {
            multiInputPage.expandDropdown(activeDropdownButtons, i);
            const optionsArr = getArrValues(options, 8);
            multiInputPage.selectOption(optionsArr[0]);
            multiInputPage.expandDropdown(activeDropdownButtons, i);
            multiInputPage.selectOption(optionsArr[1]);
            expect(getText(filledInput, i)).toContain(optionsArr[0]);
            expect(getText(filledInput, i)).toContain(optionsArr[1]);
            expect(getText(filledInput, i).split('\n')[0]).toBe(optionsArr[0]);
            expect(getText(filledInput, i).split('\n')[1]).toBe(optionsArr[1]);
    }
});
