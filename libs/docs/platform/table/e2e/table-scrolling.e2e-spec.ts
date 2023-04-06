import { runCommonTests } from './table-common-tests';
import { TablePo } from './table.po';
import {
    browserIsSafari,
    click,
    doesItExist,
    getElementArrayLength,
    getText,
    pause,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { tableCellArr2, testText2 } from './table-contents';

describe('Table component test suite', () => {
    const tablePage = new TablePo('/table/scrolling');
    const {
        input,
        tableRow,
        tableCellText,
        tableCellDescription,
        tableCellName,
        busyIndicator,
        buttonSearch,
        tablePageScrollingExample,
        allInputFields
    } = tablePage;

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

    describe('Check Page Scrolling', () => {
        it('should check table item single selection', async () => {
            await scrollIntoView(tablePageScrollingExample);
            await setValue(tablePageScrollingExample + input, testText2);
            await click(tablePageScrollingExample + buttonSearch);
            await expect(await doesItExist(busyIndicator)).toBe(true, "busy indicator isn't displayed");
            await pause(500);
            await expect(await doesItExist(busyIndicator)).toBe(false, 'busy indicator is displayed');
            const rowLength = await getElementArrayLength(tablePageScrollingExample + tableRow);
            await expect(rowLength).toEqual(1);
            const cellLength = await getElementArrayLength(tablePageScrollingExample + tableRow + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                await scrollIntoView(tablePageScrollingExample + tableRow + tableCellText, i);
                await expect((await getText(tablePageScrollingExample + tableRow + tableCellText, i)).trim()).toBe(
                    tableCellArr2[i]
                );
            }
        });

        it('should check scroll', async () => {
            await scrollIntoView(tablePageScrollingExample);
            await scrollIntoView(tablePageScrollingExample + tableRow, 40);

            await expect((await getText(tablePageScrollingExample + tableCellName, 40)).trim()).toBe('Product name 40');
            await expect((await getText(tablePageScrollingExample + tableCellDescription, 40)).trim()).toBe(
                'Product description goes here 40'
            );
        });
    });

    runCommonTests(allInputFields, tablePage);
});
