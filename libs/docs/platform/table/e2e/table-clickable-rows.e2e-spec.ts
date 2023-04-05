import { runCommonTests } from './table-common-tests';
import { TablePo } from './table.po';
import {
    browserIsSafari,
    checkElArrIsClickable,
    click,
    getElementClass,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { tableCellArr } from './table-contents';

describe('Table component test suite', () => {
    const tablePage = new TablePo('/table/clickable-rows');
    const { button, tableRow, tableActivableExample, tableNavigatableRowIndicatorExample, allInputFields } = tablePage;

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

    describe('Check Activable Rows', () => {
        it('should check alert messages', async () => {
            await tablePage.checkAlertMessages(tableActivableExample);
        });

        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableActivableExample, tableCellArr);
        });

        it('should check activable row', async () => {
            await scrollIntoView(tableActivableExample);
            await expect(await getElementClass(tableActivableExample + tableRow)).toContain('fd-table__row--activable');
        });
    });

    describe('Check  Navigatable rows', () => {
        it('should check example', async () => {
            await scrollIntoView(tableNavigatableRowIndicatorExample);
            await click(tableNavigatableRowIndicatorExample + button);
            await checkElArrIsClickable(tableNavigatableRowIndicatorExample + tableRow);

            await click(tableNavigatableRowIndicatorExample + button, 1);
            await expect(await getElementClass(tableNavigatableRowIndicatorExample + tableRow, 1)).toBe(
                'fd-table__row fd-table__row--main ng-star-inserted'
            );
        });
    });

    runCommonTests(allInputFields, tablePage);
});
