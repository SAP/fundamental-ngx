import { ListBylinePo } from './list-byline.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('List byline test suite', () => {
    const listBylinePage = new ListBylinePo();
    const { selectionExample, buttonExample, button, checkbox, listItem, radioButton, radioButtonInput } =
        listBylinePage;

    beforeAll(() => {
        listBylinePage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(listBylinePage.root);
        waitForElDisplayed(listBylinePage.title);
    }, 1);

    it('should check is clickable items for all examples', () => {
        const itemLength = getElementArrayLength(listItem);
        for (let i = 0; i < itemLength; i++) {
            expect(isElementClickable(listItem, i)).toBe(true, `item with index ${i} not clickable`);
        }
    });

    it('verify that checkbox work correctly', () => {
        const checkboxLength = getElementArrayLength(selectionExample + checkbox);
        for (let i = 0; i < checkboxLength; i++) {
            scrollIntoView(selectionExample + checkbox, i);
            if (i === 0) {
                click(selectionExample + checkbox, i);
                expect(getAttributeByName(selectionExample + listItem, 'aria-selected', i)).toBe('false');
                continue;
            }
            click(selectionExample + checkbox, i);
            expect(getAttributeByName(selectionExample + listItem, 'aria-selected', i)).toBe('true');
        }
    });

    it('verify that radio buttons work correctly', () => {
        const radioButtonLength = getElementArrayLength(selectionExample + radioButton);
        for (let i = 0; i < radioButtonLength; i++) {
            scrollIntoView(selectionExample + radioButton, i);
            click(selectionExample + radioButton, i);
            expect(getAttributeByName(radioButtonInput, 'aria-checked', i)).toBe('true');
        }
    });

    it('should check is clickable buttons for List with Byline, Buttons and Counter example', () => {
        expect(isElementClickable(buttonExample + button)).toBe(true, 'edit button not clickable');

        expect(isElementClickable(buttonExample + button, 1)).toBe(true, 'decline button not clickable');
    });

    it('should check RTL and LTR orientation', () => {
        listBylinePage.checkRtlSwitch();
    });

    xit('should check visual regression for all examples', () => {
        listBylinePage.saveExampleBaselineScreenshot();
        expect(listBylinePage.compareWithBaseline()).toBeLessThan(5);
    });
});
