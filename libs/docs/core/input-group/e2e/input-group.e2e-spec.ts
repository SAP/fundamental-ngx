import { InputGroupPo } from './input-group.po';
import {
    clearValue,
    click,
    getElementArrayLength,
    getElementClass,
    getElementPlaceholder,
    getElementSize,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { smallTestText, testText } from './input-group-contents';

describe('Input group component test', () => {
    const inputGroupPage = new InputGroupPo();
    const {
        inputFields,
        inputGroupSearchText,
        inputButtons,
        playgroundCheckbox,
        playgroundInputField,
        rightTextAddon,
        playgroundInputButton,
        iconExample,
        icon,
        inputGroup
    } = inputGroupPage;

    beforeAll(() => {
        inputGroupPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(inputGroupPage.root);
        waitForElDisplayed(inputGroupPage.title);
    }, 2);

    describe('Check all placeholders', () => {
        it('verify inputs have amount placeholder text', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 1; i < inputLength - 10; i++) {
                expect(getElementPlaceholder(inputFields, i)).toBe('Amount');
            }
        });

        it('verify Input Group Search placeholder', () => {
            expect(getElementPlaceholder(inputFields, 9)).toBe('Search');
            expect(getElementPlaceholder(inputFields, 10)).toBe('Search');
        });

        it('verify Input Group with States placeholder', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 14; i < inputLength - 1; i++) {
                expect(getElementPlaceholder(inputFields, i)).toBe('Placeholder');
            }
        });
    });

    describe('Check Input Group Search Component Within Angular Reactive Forms', () => {
        it('verify that input is disabled', () => {
            expect(isEnabled(inputFields, 11)).toBe(false);
        });
    });

    describe('Check all input fields accept values', () => {
        it('verify eight input fields accept values', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 1; i < inputLength - 10; i++) {
                scrollIntoView(inputFields, i);
                setValue(inputFields, testText, i);
                expect(getValue(inputFields, i)).toBe(testText);
            }
        });

        it('verify Input Group Search accept values', () => {
            scrollIntoView(inputFields, 9);

            setValue(inputFields, testText, 9);
            setValue(inputFields, testText, 10);

            expect(getText(inputGroupSearchText)).toBe(smallTestText);
            expect(getText(inputGroupSearchText, 1)).toBe(smallTestText);
        });

        it('verify Input Group with complex templates and Input Group with States accept values', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 12; i < inputLength - 1; i++) {
                scrollIntoView(inputFields, i);
                setValue(inputFields, testText, i);
                expect(getValue(inputFields, i)).toBe(testText);
            }
        });
    });

    it('verify in examples all buttons are clickable', () => {
        const buttonLength = getElementArrayLength(inputButtons);
        for (let i = 0; i < buttonLength; i++) {
            expect(isElementClickable(inputButtons, i)).toBe(true, `button with index ${i} not clickable`);
        }
    });

    it('compact be smaller than the default', () => {
        const defaultHeight = getElementSize(inputFields, 1);
        const compactHeight = getElementSize(inputFields, 7);

        expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('verify that icons in Icon add example are present', () => {
        expect(isElementDisplayed(iconExample + icon)).toBe(true);
    });

    it('should check input group states', () => {
        expect(getElementClass(inputGroup, 14)).toContain('information');
        expect(getElementClass(inputGroup, 15)).toContain('success');
        expect(getElementClass(inputGroup, 16)).toContain('warning');
        expect(getElementClass(inputGroup, 17)).toContain('error');
    });

    describe('Check playground', () => {
        it('inline be smaller than the default', () => {
            scrollIntoView(playgroundCheckbox);
            const defaultWidth = getElementSize(inputFields, 18);
            click(playgroundCheckbox);
            const inlineWidth = getElementSize(inputFields, 18);

            expect(defaultWidth.width).toBeGreaterThan(inlineWidth.width);
        });

        it('verify placeholder', () => {
            scrollIntoView(inputFields, 18);
            setValue(playgroundInputField, 'Search');
            clearValue(inputFields, 18);
            expect(getElementPlaceholder(inputFields, 18)).toBe('Search');
        });

        it('verify playground input accept values by ngModel and addOnText', () => {
            scrollIntoView(inputFields, 18);
            setValue(playgroundInputField, testText, 1);
            setValue(playgroundInputField, '$', 2);

            expect(getValue(inputFields, 18)).toBe(testText);
            expect(getText(rightTextAddon)).toContain('$');
        });

        it('verify input button', () => {
            scrollIntoView(inputFields, 18);
            click(playgroundCheckbox, 1);
            expect(isElementClickable(playgroundInputButton)).toBe(true, 'playground button is not clickable');
        });

        it('verify disable input', () => {
            scrollIntoView(playgroundCheckbox, 2);
            click(playgroundCheckbox, 2);
            expect(isEnabled(inputFields, 18)).toBe(false, 'input field is active');
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            inputGroupPage.checkRtlSwitch();
        });
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', () => {
            inputGroupPage.saveExampleBaselineScreenshot();
            expect(inputGroupPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
