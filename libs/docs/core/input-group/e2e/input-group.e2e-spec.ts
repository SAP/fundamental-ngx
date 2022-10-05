import { InputGroupPo } from './input-group.po';
import {
    clearValue,
    click,
    focusElement,
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

    beforeAll(async () => {
        await inputGroupPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(inputGroupPage.root);
        await waitForElDisplayed(inputGroupPage.title);
    }, 2);

    describe('Check all placeholders', () => {
        it('verify inputs have amount placeholder text', async () => {
            const inputLength = await getElementArrayLength(inputFields);
            for (let i = 2; i < inputLength - 11; i++) {
                await expect(await getElementPlaceholder(inputFields, i)).toBe('Amount');
            }
        });

        it('verify Input Group Search placeholder', async () => {
            await expect(await getElementPlaceholder(inputFields, 9)).toBe('Search');
            await expect(await getElementPlaceholder(inputFields, 10)).toBe('Search');
        });

        it('verify Input Group with States placeholder', async () => {
            const inputLength = await getElementArrayLength(inputFields);
            for (let i = 15; i < inputLength - 1; i++) {
                await expect(await getElementPlaceholder(inputFields, i)).toBe('Placeholder');
            }
        });
    });

    describe('Check Input Group Search Component Within Angular Reactive Forms', () => {
        it('verify that input is disabled', async () => {
            await expect(await isEnabled(inputFields, 11)).toBe(false);
        });
    });

    describe('Check all input fields accept values', () => {
        it('verify eight input fields accept values', async () => {
            const inputLength = await getElementArrayLength(inputFields);
            for (let i = 1; i < inputLength - 10; i++) {
                await scrollIntoView(inputFields, i);
                await setValue(inputFields, testText, i);
                await expect(await getValue(inputFields, i)).toBe(testText);
            }
        });

        it('verify Input Group Search accept values', async () => {
            await scrollIntoView(inputFields, 9);

            await setValue(inputFields, testText, 9);
            await setValue(inputFields, testText, 10);

            await expect(await getText(inputGroupSearchText)).toBe(smallTestText);
            await expect(await getText(inputGroupSearchText, 1)).toBe(smallTestText);
        });

        it('verify Input Group with complex templates and Input Group with States accept values', async () => {
            const inputLength = await getElementArrayLength(inputFields);
            for (let i = 12; i < inputLength - 1; i++) {
                await scrollIntoView(inputFields, i);
                await setValue(inputFields, testText, i);
                await expect(await getValue(inputFields, i)).toBe(testText);
            }
        });
    });

    it('verify in examples all buttons are clickable', async () => {
        const buttonLength = await getElementArrayLength(inputButtons);
        for (let i = 0; i < buttonLength; i++) {
            await expect(await isElementClickable(inputButtons, i)).toBe(true, `button with index ${i} not clickable`);
        }
    });

    it('compact be smaller than the default', async () => {
        const defaultHeight = await getElementSize(inputFields, 1);
        const compactHeight = await getElementSize(inputFields, 7);

        await expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('verify that icons in Icon add example are present', async () => {
        await expect(await isElementDisplayed(iconExample + icon)).toBe(true);
    });

    it('should check input group states', async () => {
        await expect(await getElementClass(inputGroup, 15)).toContain('information');
        await expect(await getElementClass(inputGroup, 16)).toContain('success');
        await expect(await getElementClass(inputGroup, 17)).toContain('warning');
        await expect(await getElementClass(inputGroup, 18)).toContain('error');
    });

    describe('Check playground', () => {
        it('inline be smaller than the default', async () => {
            await scrollIntoView(playgroundCheckbox);
            const defaultWidth = await getElementSize(inputFields, 19);
            await click(playgroundCheckbox);
            const inlineWidth = await getElementSize(inputFields, 19);

            await expect(defaultWidth.width).toBeGreaterThan(inlineWidth.width);
        });

        it('verify placeholder', async () => {
            await scrollIntoView(inputFields, 19);
            await setValue(playgroundInputField, 'Search');
            await clearValue(inputFields, 19);
            await expect(await getElementPlaceholder(inputFields, 19)).toBe('Search');
        });

        it('verify playground input accept values by ngModel and addOnText', async () => {
            await scrollIntoView(inputFields, 19);
            await setValue(playgroundInputField, testText, 1);
            await setValue(playgroundInputField, '$', 2);

            await expect(await getValue(inputFields, 19)).toBe(testText);
            await expect(await getText(rightTextAddon)).toContain('$');
        });

        it('verify input button', async () => {
            await scrollIntoView(inputFields, 18);
            await click(playgroundCheckbox, 1);
            await expect(await isElementClickable(playgroundInputButton)).toBe(
                true,
                'playground button is not clickable'
            );
        });

        it('verify disable input', async () => {
            await scrollIntoView(playgroundCheckbox, 2);
            await click(playgroundCheckbox, 2);
            await expect(await isEnabled(inputFields, 19)).toBe(false, 'input field is active');
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await inputGroupPage.checkRtlSwitch();
        });
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', async () => {
            await inputGroupPage.saveExampleBaselineScreenshot();
            await expect(await inputGroupPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
