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
    const { selectionExample, buttonExample, button, checkbox, listItem, radioButtonLabel, radioButtonInput } =
        listBylinePage;

    beforeAll(async () => {
        await listBylinePage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(listBylinePage.root);
        await waitForElDisplayed(listBylinePage.title);
    }, 1);

    it('should check is clickable items for all examples', async () => {
        const itemLength = await getElementArrayLength(listItem);
        for (let i = 0; i < itemLength; i++) {
            await expect(await isElementClickable(listItem, i)).toBe(true, `item with index ${i} not clickable`);
        }
    });

    it('verify that checkbox work correctly', async () => {
        const checkboxLength = await getElementArrayLength(selectionExample + checkbox);
        for (let i = 0; i < checkboxLength; i++) {
            await scrollIntoView(selectionExample + checkbox, i);
            if (i === 0) {
                await click(selectionExample + checkbox, i);
                await expect(await getAttributeByName(selectionExample + listItem, 'aria-selected', i)).toBe('false');
                continue;
            }
            await click(selectionExample + checkbox, i);
            await expect(await getAttributeByName(selectionExample + listItem, 'aria-selected', i)).toBe('true');
        }
    });

    it('verify that radio buttons work correctly', async () => {
        const radioButtonLabels = await $$(`${selectionExample} ${radioButtonLabel}`);
        const radioButtonInputs = await $$(`${selectionExample} ${radioButtonInput}`);
        for (let i = 0; i < radioButtonLabels.length; i++) {
            const label = radioButtonLabels[i];
            await label.scrollIntoView();
            await label.click();
            const ariaChecked = await radioButtonInputs[i].getAttribute('aria-checked');
            await expect(ariaChecked).toBe('true');
        }
    });

    it('should check is clickable buttons for List with Byline, Buttons and Counter example', async () => {
        await expect(await isElementClickable(buttonExample + button)).toBe(true, 'edit button not clickable');

        await expect(await isElementClickable(buttonExample + button, 1)).toBe(true, 'decline button not clickable');
    });

    it('should check RTL and LTR orientation', async () => {
        await listBylinePage.checkRtlSwitch();
    });

    xit('should check visual regression for all examples', async () => {
        await listBylinePage.saveExampleBaselineScreenshot();
        await expect(await listBylinePage.compareWithBaseline()).toBeLessThan(5);
    });
});
