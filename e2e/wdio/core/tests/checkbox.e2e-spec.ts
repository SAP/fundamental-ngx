import { CheckboxPo } from '../pages/checkbox.po';
import {
    applyState,
    click,
    executeScriptBeforeTagAttr,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    isElementClickable,
    isEnabled,
    refreshPage,
    scrollIntoView
} from '../../driver/wdio';
import {
    acceptAllTrue,
    allMarkedFalse,
    allMarkedTrue,
    altCustomLabel,
    customLabel,
    customLabelsArr,
    emptyDataArr,
    emptyString,
    stateClassesArr
} from '../fixtures/appData/checkbox-content';

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

    beforeAll(() => {
        checkboxPage.open();
    }, 1);

    describe('standard checkbox examples', () => {
        it('should mark checkbox', () => {
            scrollIntoView(standardCheckbox);

            expect(executeScriptBeforeTagAttr(standardCheckbox + checkboxLabel, 'content')).toEqual(
                emptyString,
                'mark is present'
            );

            click(standardCheckbox + checkboxLabel);

            expect(executeScriptBeforeTagAttr(standardCheckbox + checkboxLabel, 'content')).not.toEqual(
                emptyString,
                'mark is not present'
            );
        });
    });

    describe('tristate checkbox examples', () => {
        it('should check the 3 checkbox marking states', () => {
            scrollIntoView(tristateCheckbox);
            const startValue = getText(tristateOutput).slice(39).trim();

            expect(startValue).toEqual('false');

            click(tristateCheckbox + checkboxLabel);
            const secondValue = getText(tristateOutput).slice(39).trim();

            expect(secondValue).toEqual('null');

            click(tristateCheckbox + checkboxLabel);
            const thirdValue = getText(tristateOutput).slice(39).trim();

            expect(thirdValue).toEqual('true');

            click(tristateCheckbox + checkboxLabel);
            const fourthValue = getText(tristateOutput).slice(39).trim();

            expect(fourthValue).toEqual(startValue);
        });

        it('should check 3rd state not markable', () => {
            scrollIntoView(tristateCheckbox);
            const startValue = getText(tristateOutput, 2).slice(41).trim();

            expect(startValue).toEqual('null');

            click(tristateCheckbox + checkboxLabel, 1);
            const secondValue = getText(tristateOutput, 2).slice(41).trim();

            expect(secondValue).toEqual('true');

            click(tristateCheckbox + checkboxLabel, 1);
            const thirdValue = getText(tristateOutput, 2).slice(41).trim();

            expect(thirdValue).toEqual('false');

            click(tristateCheckbox + checkboxLabel, 1);
            const fourthValue = getText(tristateOutput, 2).slice(41).trim();

            expect(fourthValue).not.toEqual(startValue);
        });
    });

    describe('checkbox custom values examples', () => {
        it('should check 2 state custom labels', () => {
            scrollIntoView(customValueCheckbox);
            const initialTextArr = getText(customValueCheckbox).split('\n');
            const firstExampleValue1 = initialTextArr[1].replace('Value: ', '');

            expect(firstExampleValue1).toEqual(customLabelsArr[0]);

            click(customValueCheckbox + checkboxLabel);
            const secondTextArr = getText(customValueCheckbox).split('\n');
            const firstExampleValue2 = secondTextArr[1].replace('Value: ', '');

            expect(firstExampleValue2).toEqual(customLabelsArr[1]);
        });

        it('should check 3 state custom labels', () => {
            scrollIntoView(customValueCheckbox);
            const initialTextArr = getText(customValueCheckbox).split('\n');
            const secondExampleValue1 = initialTextArr[3].replace('Value: ', '');

            expect(secondExampleValue1).toEqual(customLabelsArr[0]);

            click(customValueCheckbox + checkboxLabel, 1);
            const secondTextArr = getText(customValueCheckbox).split('\n');
            const secondExampleValue2 = secondTextArr[3].replace('Value: ', '');

            expect(secondExampleValue2).toEqual(customLabelsArr[1]);

            click(customValueCheckbox + checkboxLabel, 1);
            const thirdTextArr = getText(customValueCheckbox).split('\n');
            const secondExampleValue3 = thirdTextArr[3].replace('Value: ', '');

            expect(secondExampleValue3).toEqual(customLabelsArr[2]);
        });
    });

    describe('checkbox with reactive form examples', () => {
        afterEach(() => {
            refreshPage();
        }, 1);

        it('check that marking accept all will mark/unmark all options', () => {
            scrollIntoView(reactiveFormCheckbox);
            const checkboxCount = getElementArrayLength(reactiveFormCheckbox + checkbox);
            click(reactiveFormCheckbox + checkboxLabel);

            for (let i = 0; i < checkboxCount; i++) {
                expect(executeScriptBeforeTagAttr(reactiveFormCheckbox + checkboxLabel, 'content', i)).not.toEqual(
                    emptyString
                );
            }
            const textArr = getText(reactiveFormCheckbox).split('\n');
            const outputValue1 = textArr[5];

            expect(outputValue1).toEqual(allMarkedTrue, 'marking acceptall doesnt mark all options');

            click(reactiveFormCheckbox + checkboxLabel);

            for (let i = 0; i < checkboxCount; i++) {
                expect(executeScriptBeforeTagAttr(reactiveFormCheckbox + checkboxLabel, 'content', i)).toEqual(
                    emptyString
                );
            }
            const textArr2 = getText(reactiveFormCheckbox).split('\n');
            const outputValue2 = textArr2[5];

            expect(outputValue2).toEqual(allMarkedFalse, 'unmarking acceptall doesnt unmark all options');
        });

        it("check that marking 1 option doesn't mark accept all box", () => {
            scrollIntoView(reactiveFormCheckbox);
            click(reactiveFormCheckbox + checkboxLabel, 1);
            const textArr = getText(reactiveFormCheckbox).split('\n');
            const outputValue = textArr[5];

            expect(outputValue).not.toContain(acceptAllTrue, 'marking one option marks accept all');
        });

        it('check marking all options marks accept all box', () => {
            scrollIntoView(reactiveFormCheckbox);
            const checkboxCount = getElementArrayLength(reactiveFormCheckbox + checkbox);

            for (let i = 1; i < checkboxCount; i++) {
                click(reactiveFormCheckbox + checkboxLabel, i);
            }
            const textArr = getText(reactiveFormCheckbox).split('\n');
            const outputValue = textArr[5];

            expect(outputValue).toEqual(allMarkedTrue, 'all options not marked');
        });
    });

    describe('checkbox with custom label examples', () => {
        it('should have a custom label', () => {
            scrollIntoView(customLabelCheckbox);
            const textArr = getText(customLabelCheckbox).split('\n');
            const checkboxLabelText = textArr[0];

            expect([customLabel, altCustomLabel]).toContain(checkboxLabelText);
        });

        it('should check the checkbox and link are clickable', () => {
            expect(isElementClickable(customLabelCheckbox + checkboxLabel)).toBe(true, 'checkbox is not clickable');
            expect(isEnabled(customLabelCheckbox + link)).toBe(true);
        });
    });

    describe('checkbox styling properties examples', () => {
        it('should check states', () => {
            scrollIntoView(styledCheckbox);
            const checkboxCount = getElementArrayLength(styledCheckbox + checkbox);

            for (let i = 0; i < checkboxCount; i++) {
                expect(getAttributeByName(styledCheckbox + checkboxInput, 'class', i)).toContain(stateClassesArr[i]);
            }
        });

        it('should check checkboxes are clickable', () => {
            const checkboxCount = getElementArrayLength(styledCheckbox + checkbox);

            for (let i = 0; i < checkboxCount; i++) {
                if (i === 5) {
                    continue;
                }
                expect(isElementClickable(styledCheckbox + checkboxLabel, i)).toBe(
                    true,
                    `checkbox ${i} is not clickable`
                );
            }
        });

        it('should check disabled checkbox is not clickable', () => {
            expect(isElementClickable(styledCheckbox + checkboxLabel, 5)).toBe(false, 'disabled checkbox is clickable');
        });
    });

    describe('general checks', () => {
        it('should check focus style exists', () => {
            const checkboxCount = getElementArrayLength(checkboxInput);

            for (let i = 0; i < checkboxCount; i++) {
                if (i === 15) {
                    // disabled checkbox
                    continue;
                }
                applyState('focus', checkboxInput, i);
                expect(emptyDataArr).not.toContain(getCSSPropertyByName(checkboxInput, 'outline-style', i).value);
            }
        });

        it('should check orientation', () => {
            checkboxPage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', () => {
        beforeAll(() => {
            refreshPage();
        }, 1);

        it('should check example blocks', () => {
            checkboxPage.saveExampleBaselineScreenshot();
            expect(checkboxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
