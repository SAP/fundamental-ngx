import {
    browserIsSafari,
    click,
    getAttributeByName,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed
} from '../../../../../e2e';
import { runCommonTests } from './table-common-tests';
import { tableCellArr } from './table-contents';
import { TablePo } from './table.po';

describe('Table component test suite', () => {
    const tablePage = new TablePo('/table/row-selection');
    const {
        button,
        input,
        tableRow,
        tableSingleRowSelectionExample,
        tableMultipleRowSelectionExample,
        tableCell,
        allInputFields
    } = tablePage;

    beforeAll(async () => {
        await tablePage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await tablePage.waitForRoot();
        await waitForElDisplayed(tablePage.title);
    }, 1);

    if (browserIsSafari()) {
        // skip due to unknown error where browser closes halfway through the test
        return;
    }

    describe('Check Single Row Selection', () => {
        it('should check table item single selection items', async () => {
            await tablePage.findElementInTable(tableSingleRowSelectionExample, tableCellArr);
        });

        it('should check table item single selection', async () => {
            await scrollIntoView(tableSingleRowSelectionExample);
            await click(tableSingleRowSelectionExample + tableRow + tableCell);
            await expect(
                await getAttributeByName(tableSingleRowSelectionExample + tableRow, 'aria-selected')
            ).withContext('true');
        });

        it('should check selected row not gets unselected', async () => {
            await scrollIntoView(tableSingleRowSelectionExample);
            await setValue(tableSingleRowSelectionExample + input, 'Astro');
            await click(tableSingleRowSelectionExample + button, 1);
            await click(tableSingleRowSelectionExample + tableCell);
            await click(tableSingleRowSelectionExample + button);
            await expect(
                await getAttributeByName(tableSingleRowSelectionExample + tableRow, 'aria-selected', 1)
            ).withContext('true');
        });
    });

    describe('Check Multi Row Selection', () => {
        it('should verify checkboxes', async () => {
            await tablePage.checkAllCheckbox(tableMultipleRowSelectionExample, true);
        });
    });

    runCommonTests(allInputFields, tablePage);
});
