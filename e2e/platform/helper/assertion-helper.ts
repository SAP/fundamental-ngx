import { ElementFinder } from 'protractor';
import { clickCheckbox, getValueOfAttribute, hoverMouse } from './helper';
import { checkboxErrorState, checkboxFocusStyle, checkboxHoverState } from '../fixtures/appData/checkbox-page-contents';

// tslint:disable-next-line:typedef
export async function checkIfDisabled(element: ElementFinder, attribute: string, value: string) {
    return await expect(await getValueOfAttribute(element, attribute)).toEqual(value);
}
// tslint:disable-next-line:typedef
export async function getMapAttributes(array) {
    return await array.map(async element =>
        await getValueOfAttribute(await element, 'aria-checked'));
}
// tslint:disable-next-line:typedef
export async function checkMarkingCheckbox(checkboxArray) {
    const beforeClicking = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickCheckbox(element);
    }
    const afterClickingOnce = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickCheckbox(element);
    }
    const afterClickingTwice = await getMapAttributes(checkboxArray);

    expect(Promise.all(beforeClicking)).not.toEqual(Promise.all(afterClickingOnce));
    expect(Promise.all(afterClickingTwice)).toEqual(Promise.all(beforeClicking));
}

// tslint:disable-next-line:typedef
export async function checkTristateCheckboxMarking(checkboxArray) {
    const beforeClicking = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickCheckbox(element);
    }
    const afterClickingOnce = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickCheckbox(element);
    }
    const afterClickingTwice = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickCheckbox(element);
    }
    const afterThirdClick = await getMapAttributes(checkboxArray);

    expect(Promise.all(afterClickingOnce)).not.toEqual(Promise.all(beforeClicking));
    expect(Promise.all(afterClickingTwice)).not.toEqual(Promise.all(afterClickingOnce));
    expect(Promise.all(afterThirdClick)).not.toEqual(Promise.all(afterClickingTwice));
    expect(Promise.all(afterThirdClick)).toEqual(Promise.all(beforeClicking));
}

// tslint:disable-next-line:typedef
export async function checkTriStateTwoStateCheckboxMarking (checkboxArray) {
    const firstState = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickCheckbox(element);
    }
    const secondState = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickCheckbox(element);
    }
    const thirdState = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickCheckbox(element);
    }
    const fourthState = await getMapAttributes(checkboxArray);

    expect(Promise.all(secondState)).not.toEqual(Promise.all(firstState));
    expect(Promise.all(thirdState)).not.toEqual(Promise.all(firstState));
    expect(Promise.all(fourthState)).not.toEqual(Promise.all(firstState));
    expect(Promise.all(fourthState)).toEqual(Promise.all(secondState));
}
// tslint:disable-next-line:typedef
export async function checkHoverState(element) {
    const checkboxHover = await hoverMouse(await element).then( () => {
        return element.getCssValue('border-color');
    });
    return await expect(checkboxHover).toContain(checkboxHoverState);
}

// tslint:disable-next-line:typedef
export async function checkFocusState(element) {
    const checkboxHover = await clickCheckbox(await element).then( () => {
        return element.getCssValue('outline-style');
    });
    return await expect(checkboxHover).toContain(checkboxFocusStyle);
}

// tslint:disable-next-line:typedef
export async function checkErrorHoverState(element) {
    await (await getValueOfAttribute(element, 'aria-checked'));
    await clickCheckbox(element);

    const checkboxHover = await hoverMouse(await element).then( () => {
        return element.getCssValue('border-color');
    });
    return await expect(checkboxHover).toContain(checkboxErrorState);
}

// tslint:disable-next-line:typedef
export async function checkErrorTooltip(element, tooltipElement) {
    await hoverMouse(element);
    return await getValueOfAttribute(tooltipElement, 'innerHTML'); // todo: Anton, please take a look.
}
// tslint:disable-next-line:typedef
export async function checkLabels(array, expectation) {
    const labels = await array.map(async element => {
        return await element.getText();
    });
    await expect(Promise.all(labels)).toEqual(expectation);
}
// tslint:disable-next-line:typedef
export async function checkBorderColor(array, expectedColor) {
    await array.forEach(async element => {
        return await expect(await element.getCssValue('border-color')).toEqual(expectedColor);
    });
}
// tslint:disable-next-line:typedef
export async function checkOutputLabel(array, label, selections) {
    await array.forEach(async element => {
        await expect(element.getText()).toEqual(label + selections);
    });
}
