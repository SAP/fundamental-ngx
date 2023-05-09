import { CheckboxPo } from './checkbox.po';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
    applyState,
    browserIsSafari,
    click,
    executeScriptBeforeTagAttr,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementClickable,
    isEnabled,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import {
    acceptAllTrue,
    allMarkedFalse,
    allMarkedFalseSF,
    allMarkedTrue,
    allMarkedTrueSF,
    altCustomLabel,
    customLabel,
    customLabelsArr,
    emptyDataArr,
    emptyString,
    stateClassesArr
} from './checkbox-content';

describe('checkbox test suite', () => {
    const checkboxPage = new CheckboxPo();
    const {
        standardCheckbox,
        tristateCheckbox,
        customValueCheckbox,
        reactiveFormCheckbox,
        customLabelCheckbox,
        styledCheckbox,
        checkbox,
        checkboxInput,
        checkboxLabel,
        link,
        tristateOutput
    } = checkboxPage;

    beforeAll(async () => {
        await checkboxPage.open();
    }, 1);

    describe('standard checkbox examples', () => {
        it('should mark checkbox', async () => {
            await scrollIntoView(standardCheckbox);

            await expect(await executeScriptBeforeTagAttr(standardCheckbox + checkboxLabel, 'content')).toEqual(
                emptyString,
                'mark is present'
            );

            await click(standardCheckbox + checkboxLabel);

            await expect(await executeScriptBeforeTagAttr(standardCheckbox + checkboxLabel, 'content')).not.toEqual(
                emptyString,
                'mark is not present'
            );
        });
    });

    describe('tristate checkbox examples', () => {
        it('should check the 3 checkbox marking states', async () => {
            let trimCount;
            if (await browserIsSafari()) {
                trimCount = 42;
            } else {
                trimCount = 39;
            }
            await scrollIntoView(tristateCheckbox);
            const startValue = (await getText(tristateOutput)).slice(trimCount).trim();

            await expect(startValue).toEqual('false');

            await click(tristateCheckbox + checkboxLabel);
            const secondValue = (await getText(tristateOutput)).slice(trimCount).trim();

            await expect(secondValue).toEqual('null');

            await click(tristateCheckbox + checkboxLabel);
            const thirdValue = (await getText(tristateOutput)).slice(trimCount).trim();

            await expect(thirdValue).toEqual('true');

            await click(tristateCheckbox + checkboxLabel);
            const fourthValue = (await getText(tristateOutput)).slice(trimCount).trim();

            await expect(fourthValue).toEqual(startValue);
        });

        it('should check 3rd state not markable', async () => {
            let trimCount;
            if (await browserIsSafari()) {
                trimCount = 44;
            } else {
                trimCount = 41;
            }
            await scrollIntoView(tristateCheckbox);
            const startValue = (await getText(tristateOutput, 2)).slice(trimCount).trim();

            await expect(startValue).toEqual('null');

            await click(tristateCheckbox + checkboxLabel, 1);
            const secondValue = (await getText(tristateOutput, 2)).slice(trimCount).trim();

            await expect(secondValue).toEqual('true');

            await click(tristateCheckbox + checkboxLabel, 1);
            const thirdValue = (await getText(tristateOutput, 2)).slice(trimCount).trim();

            await expect(thirdValue).toEqual('false');

            await click(tristateCheckbox + checkboxLabel, 1);
            const fourthValue = (await getText(tristateOutput, 2)).slice(trimCount).trim();

            await expect(fourthValue).not.toEqual(startValue);
        });
    });

    describe('checkbox custom values examples', () => {
        it('should check 2 state custom labels', async () => {
            await scrollIntoView(customValueCheckbox);
            if (await browserIsSafari()) {
                let initialTextSafari = (await getText(customValueCheckbox + 'div')).slice(-4).trim();
                await expect(initialTextSafari).toEqual(customLabelsArr[0]);

                await click(customValueCheckbox + checkboxLabel);
                initialTextSafari = (await getText(customValueCheckbox + 'div')).slice(-3).trim();
                await expect(initialTextSafari).toEqual(customLabelsArr[1]);
            }
            if (!(await browserIsSafari())) {
                const initialTextArr = (await getText(customValueCheckbox)).split('\n');
                const firstExampleValue1 = initialTextArr[1].replace('Value: ', '');

                await expect(firstExampleValue1).toEqual(customLabelsArr[0]);

                await click(customValueCheckbox + checkboxLabel);
                const secondTextArr = (await getText(customValueCheckbox)).split('\n');
                const firstExampleValue2 = secondTextArr[1].replace('Value: ', '');

                await expect(firstExampleValue2).toEqual(customLabelsArr[1]);
            }
        });

        it('should check 3 state custom labels', async () => {
            if (await browserIsSafari()) {
                let initialTextSafari = (await getText(customValueCheckbox + 'div', 2)).slice(-4).trim();
                await expect(initialTextSafari).toEqual(customLabelsArr[0]);

                await click(customValueCheckbox + checkboxLabel, 1);
                initialTextSafari = (await getText(customValueCheckbox + 'div', 2)).slice(-3).trim();
                await expect(initialTextSafari).toEqual(customLabelsArr[1]);

                await click(customValueCheckbox + checkboxLabel, 1);
                initialTextSafari = (await getText(customValueCheckbox + 'div', 2)).slice(-23).trim();
                await expect(initialTextSafari).toEqual(customLabelsArr[2]);
            }
            if (!(await browserIsSafari())) {
                await scrollIntoView(customValueCheckbox);
                const initialTextArr = (await getText(customValueCheckbox)).split('\n');
                const secondExampleValue1 = initialTextArr[3].replace('Value: ', '');

                await expect(secondExampleValue1).toEqual(customLabelsArr[0]);

                await click(customValueCheckbox + checkboxLabel, 1);
                const secondTextArr = (await getText(customValueCheckbox)).split('\n');
                const secondExampleValue2 = secondTextArr[3].replace('Value: ', '');

                await expect(secondExampleValue2).toEqual(customLabelsArr[1]);

                await click(customValueCheckbox + checkboxLabel, 1);
                const thirdTextArr = (await getText(customValueCheckbox)).split('\n');
                const secondExampleValue3 = thirdTextArr[3].replace('Value: ', '');

                await expect(secondExampleValue3).toEqual(customLabelsArr[2]);
            }
        });
    });

    describe('checkbox with reactive form examples', () => {
        afterEach(async () => {
            await refreshPage();
            await waitForElDisplayed(checkboxPage.title);
        }, 1);

        it('check that marking accept all will mark/unmark all options', async () => {
            let allMarked, outputValue;
            await scrollIntoView(reactiveFormCheckbox);
            const checkboxCount = await getElementArrayLength(reactiveFormCheckbox + checkbox);
            await click(reactiveFormCheckbox + checkboxLabel);

            for (let i = 0; i < checkboxCount; i++) {
                await expect(
                    await executeScriptBeforeTagAttr(reactiveFormCheckbox + checkboxLabel, 'content', i)
                ).not.toEqual(emptyString);
            }
            const textArr = (await getText(reactiveFormCheckbox)).split('\n');
            if (await browserIsSafari()) {
                outputValue = textArr[1].trim();
                allMarked = allMarkedTrueSF;
            }
            if (!(await browserIsSafari())) {
                outputValue = textArr[5];
                allMarked = allMarkedTrue;
            }

            await expect(outputValue).toEqual(allMarked, 'marking acceptall doesnt mark all options');

            await click(reactiveFormCheckbox + checkboxLabel);

            for (let i = 0; i < checkboxCount; i++) {
                await expect(
                    await executeScriptBeforeTagAttr(reactiveFormCheckbox + checkboxLabel, 'content', i)
                ).toEqual(emptyString);
            }
            const textArr2 = (await getText(reactiveFormCheckbox)).split('\n');
            if (await browserIsSafari()) {
                outputValue = textArr2[1].trim();
                allMarked = allMarkedFalseSF;
            }
            if (!(await browserIsSafari())) {
                outputValue = textArr2[5];
                allMarked = allMarkedFalse;
            }
            await expect(outputValue).toEqual(allMarked, 'unmarking acceptall doesnt unmark all options');
        });

        it("check that marking 1 option doesn't mark accept all box", async () => {
            await scrollIntoView(reactiveFormCheckbox);
            await click(reactiveFormCheckbox + checkboxLabel, 1);
            const textArr = (await getText(reactiveFormCheckbox)).split('\n');
            const outputValue = textArr[5];

            await expect(outputValue).not.toContain(acceptAllTrue, 'marking one option marks accept all');
        });

        it('check marking all options marks accept all box', async () => {
            let outputValue, allMarked;
            await scrollIntoView(reactiveFormCheckbox);
            const checkboxCount = await getElementArrayLength(reactiveFormCheckbox + checkbox);

            for (let i = 1; i < checkboxCount; i++) {
                await click(reactiveFormCheckbox + checkboxLabel, i);
            }
            const textArr = (await getText(reactiveFormCheckbox)).split('\n');
            if (!(await browserIsSafari())) {
                outputValue = textArr[5];
                allMarked = allMarkedTrue;
            }
            if (await browserIsSafari()) {
                outputValue = textArr[1].trim();
                allMarked = allMarkedTrueSF;
            }
            await expect(outputValue).toEqual(allMarked, 'all options not marked');
        });
    });

    describe('checkbox with custom label examples', () => {
        it('should have a custom label', async () => {
            let checkboxLabelText;
            await scrollIntoView(customLabelCheckbox);
            const textArr = (await getText(customLabelCheckbox)).split('\n');
            if (!(await browserIsSafari())) {
                checkboxLabelText = textArr[0];
            }
            if (await browserIsSafari()) {
                checkboxLabelText = textArr[0].slice(1, -14);
            }

            await expect([customLabel, altCustomLabel]).toContain(checkboxLabelText);
        });

        it('should check the checkbox and link are clickable', async () => {
            await expect(await isElementClickable(customLabelCheckbox + checkboxLabel)).toBe(
                true,
                'checkbox is not clickable'
            );
            await expect(await isEnabled(customLabelCheckbox + link)).toBe(true);
        });
    });

    describe('checkbox styling properties examples', () => {
        it('should check states', async () => {
            await scrollIntoView(styledCheckbox);
            const checkboxCount = await getElementArrayLength(styledCheckbox + checkbox);

            for (let i = 0; i < checkboxCount; i++) {
                await expect(await getAttributeByName(styledCheckbox + checkboxInput, 'class', i)).toContain(
                    stateClassesArr[i]
                );
            }
        });

        it('should check compact checkbox', async () => {
            await scrollIntoView(styledCheckbox);

            await expect(await getElementClass(`${styledCheckbox} fd-checkbox[fdCompact]`)).toContain('is-compact');
        });

        it('should check checkboxes are clickable', async () => {
            const checkboxCount = await getElementArrayLength(styledCheckbox + checkbox);

            for (let i = 0; i < checkboxCount; i++) {
                if (i === 5) {
                    continue;
                }
                await expect(await isElementClickable(styledCheckbox + checkboxLabel, i)).toBe(
                    true,
                    `checkbox ${i} is not clickable`
                );
            }
        });

        it('should check disabled checkbox is not clickable', async () => {
            await expect(await isElementClickable(styledCheckbox + checkboxLabel, 5)).toBe(
                false,
                'disabled checkbox is clickable'
            );
        });
    });

    describe('general checks', () => {
        it('should check orientation', async () => {
            await checkboxPage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', () => {
        beforeAll(async () => {
            await refreshPage();
        }, 1);

        it('should check example blocks', async () => {
            await checkboxPage.saveExampleBaselineScreenshot();
            await expect(await checkboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
