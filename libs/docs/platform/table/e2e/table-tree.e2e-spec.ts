import { runCommonTests } from './table-common-tests';
import { TablePo } from './table.po';
import {
    browserIsSafari,
    click,
    refreshPage,
    getElementArrayLength,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Table component test suite', () => {
    const tablePage = new TablePo('/table/tree-table');
    const { tableRow, tableTreeExample, allInputFields, input, buttonSearch, arrowButton } = tablePage;

    beforeAll(async () => {
        await tablePage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(tablePage.root);
        await waitForElDisplayed(tablePage.title);
    }, 1);

    if (browserIsSafari()) {
        // skip due to unknown error where browser closes halfway through the test
        return;
    }

    describe('Check Tree Table', () => {
        it('should check table item single selection', async () => {
            await scrollIntoView(tableTreeExample);
            await setValue(tableTreeExample + input, 'Laptops');
            await click(tableTreeExample + buttonSearch);
            const rowLength = await getElementArrayLength(tableTreeExample + tableRow);
            await expect(rowLength).toEqual(1);
        });

        it('should check checkboxes', async () => {
            await tablePage.checkAllCheckbox(tableTreeExample);
        });

        it('should check expanded table row', async () => {
            await scrollIntoView(tableTreeExample);
            const arrowButtonLength = await getElementArrayLength(tableTreeExample + arrowButton);
            for (let i = 0; i < arrowButtonLength; i++) {
                await click(tableTreeExample + arrowButton, i);
            }
            await expect(await getElementArrayLength(tableTreeExample + tableRow)).toEqual(20);
        });
    });

    runCommonTests(allInputFields, tablePage);
});
