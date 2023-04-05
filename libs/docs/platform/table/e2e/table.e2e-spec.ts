import { runCommonTests } from './table-common-tests';
import { wait } from '@nrwl/nx-cloud/lib/utilities/waiter';
import { TablePo } from './table.po';
import {
    browserIsSafari,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementPlaceholder,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    pause,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    placeholderTestText,
    tableCellArr,
    tableCellArr3,
    tableCellArr6,
    tableCellArr7,
    testText,
    testText3,
    freezeTableCellArr
} from './table-contents';

describe('Table component test suite', () => {
    const tablePage = new TablePo('/table/basic');
    const {
        tableDefaultExample,
        button,
        input,
        tableRow,
        tableCellText,
        tableCustomWidthExample,
        tableFreezableExample,
        tableLoadingExample,
        busyIndicator,
        buttonSearch,
        tableInitialStateExample,
        tableCustomColumnExample,
        inputFields,
        playgroundExample,
        fdpTable,
        optionCondensed,
        optionCozy,
        optionCompact,
        playgroundContentDensityDropdown,
        playgroundSelectionModeDropdown,
        optionSingle,
        optionMultiple,
        tableCellClass,
        checkbox,
        playgroundSchemaInput,
        toolbarText,
        tableNoItemsTemplateExample,
        tableSemanticExample,
        tableRowClassExample,
        allInputFields,
        tableRowInitialState,
        tableCellInitialState,
        synchronizeButton,
        tableTreeExample,
        arrowButton,
        tableWrapExample,
        tableNoOuterBordersExample
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

    describe('Check Simple Table example', () => {
        it('should check alert messages', async () => {
            await tablePage.checkAlertMessages(tableDefaultExample);
        });

        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableDefaultExample, tableCellArr);
        });
    });

    describe('Check Custom Column Width & Column Resizing', () => {
        it('should check alert messages', async () => {
            await tablePage.checkAlertMessages(tableCustomWidthExample);
        });

        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableCustomWidthExample, tableCellArr);
        });

        // Simple example was updated to use custom heading.
        it('should check correct operation x button', async () => {
            await scrollIntoView(tableCustomWidthExample);
            await setValue(tableCustomWidthExample + input, 'Astro');
            await click(tableCustomWidthExample + button, 1);

            const filterRowCount = await getElementArrayLength(tableCustomWidthExample + tableRow);
            await expect(filterRowCount).toEqual(2);

            await click(tableCustomWidthExample + button);
            const nonFilterRowCount = await getElementArrayLength(tableCustomWidthExample + tableRow);
            await expect(nonFilterRowCount).toEqual(16);
        });
    });

    describe('Check Custom Column', () => {
        it('should check table item single selection', async () => {
            await scrollIntoView(tableCustomColumnExample);
            await setValue(tableCustomColumnExample + input, testText);
            await click(tableCustomColumnExample + button, 1);
            const rowLength = await getElementArrayLength(tableCustomColumnExample + tableRow);
            await expect(rowLength).toEqual(1);
            const cellLength = await getElementArrayLength(tableCustomColumnExample + tableRow + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                if (i === 1) {
                    continue;
                }
                await expect((await getText(tableCustomColumnExample + tableRow + tableCellText, i)).trim()).toBe(
                    tableCellArr6[i]
                );
            }
        });

        it('should check possible to change description', async () => {
            await scrollIntoView(tableCustomColumnExample);
            await setValue(tableCustomColumnExample + 'fdp-table-cell input', 'test');
            await expect(await getValue(tableCustomColumnExample + 'fdp-table-cell input')).toBe('test');
        });
    });

    describe('Check Column Freezing', () => {
        it('should check table item single selection', async () => {
            await scrollIntoView(tableFreezableExample + input);
            await setValue(tableFreezableExample + input, tableCellArr[1]);
            await click(tableFreezableExample + button, 1);
            const rowLength = await getElementArrayLength(tableFreezableExample + tableRow);
            await expect(rowLength).toEqual(1);
            const cellLength = await getElementArrayLength(tableFreezableExample + tableRow + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                await expect((await getText(tableFreezableExample + tableRow + tableCellText, i)).trim()).toBe(
                    freezeTableCellArr[i]
                );
            }
        });

        it('should verify checkboxes', async () => {
            await tablePage.checkAllCheckbox(tableFreezableExample);
        });
    });

    describe('Check Loading/Busy State', () => {
        it('should check alert messages', async () => {
            await tablePage.checkAlertMessages(tableLoadingExample);
        });

        it('should check busy indicator', async () => {
            await scrollIntoView(tableLoadingExample);
            await pause(300);
            await expect(await doesItExist(busyIndicator)).toBe(false, 'busy indicator should not be displayed');

            await setValue(tableLoadingExample + input, 'Astro');
            await click(tableLoadingExample + buttonSearch);
            await expect(await doesItExist(busyIndicator)).toBe(true, 'busy indicator should be displayed');

            await pause(300);
            await expect(await doesItExist(busyIndicator)).toBe(false, 'busy indicator should not be displayed');
        });

        it('should check table content is not interactive while table is loading', async () => {
            await scrollIntoView(tableLoadingExample);
            await setValue(tableLoadingExample + input, 'Astro');
            await click(tableLoadingExample + buttonSearch);

            await expect(await isEnabled(tableLoadingExample + input)).toBe(false, 'input is enable');
        });
    });

    describe('Check Initial State', () => {
        it('should check table item single selection', async () => {
            await scrollIntoView(tableInitialStateExample);
            await setValue(tableInitialStateExample + input, testText3);
            await click(tableInitialStateExample + buttonSearch);
            const rowLength = await getElementArrayLength(tableInitialStateExample + tableRowInitialState);
            await expect(rowLength).toEqual(1);
            const cellLength = await getElementArrayLength(
                tableInitialStateExample + tableRowInitialState + tableCellText
            );
            for (let i = 0; i < cellLength; i++) {
                await expect(
                    (await getText(tableInitialStateExample + tableRowInitialState + tableCellText, i)).trim()
                ).toBe(tableCellArr3[i]);
            }
        });

        it('should check cell expanded', async () => {
            await scrollIntoView(tableInitialStateExample + tableCellInitialState);
            await click(tableInitialStateExample + tableCellInitialState);
            await click(tableInitialStateExample + tableCellInitialState, 1);

            await expect(
                await getAttributeByName(tableInitialStateExample + tableCellInitialState, 'aria-expanded')
            ).toBe('false');
            await expect(
                await getAttributeByName(tableInitialStateExample + tableCellInitialState, 'aria-expanded', 1)
            ).toBe('false');
        });
    });

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

    describe('Checks for all examples', () => {
        it('should check placeholders in all input fields', async () => {
            const inputLength = await getElementArrayLength(inputFields);
            for (let i = 0; i < inputLength; i++) {
                await expect(await getElementPlaceholder(inputFields, i)).toBe(placeholderTestText);
            }
        });

        it('should check clickability synchronize button', async () => {
            const buttonLength = await getElementArrayLength(synchronizeButton);
            for (let i = 0; i < buttonLength; i++) {
                await expect(await isElementClickable(synchronizeButton, i)).toBe(
                    true,
                    `synchronize button with index ${i} not clickable`
                );
            }
        });
    });

    describe('Check playground', () => {
        it('should check table item single selection', async () => {
            await scrollIntoView(playgroundExample);
            await setValue(playgroundExample + inputFields, tableCellArr[1]);
            await click(playgroundExample + buttonSearch);
            const rowLength = await getElementArrayLength(playgroundExample + tableRow);
            await expect(rowLength).toEqual(1);
            const cellLength = await getElementArrayLength(playgroundExample + tableRow + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                await expect((await getText(playgroundExample + tableRow + tableCellText, i)).trim()).toBe(
                    tableCellArr[i]
                );
            }
        });

        it('should check clickability action button', async () => {
            await scrollIntoView(playgroundExample);
            await expect(await isElementClickable(playgroundExample + button, 1)).toBe(
                true,
                ' action button not clickable'
            );
        });

        it('should check table content density', async () => {
            await scrollIntoView(playgroundExample);
            await click(playgroundContentDensityDropdown);
            await click(optionCompact);
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain('is-compact');

            await click(playgroundContentDensityDropdown);
            await click(optionCozy);
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain('fdp-table');

            await click(playgroundContentDensityDropdown);
            await click(optionCondensed);
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain('is-condensed');
        });

        it('should check table selection mode', async () => {
            await scrollIntoView(playgroundExample);
            await click(playgroundSelectionModeDropdown);
            await click(optionSingle);
            await click(playgroundSelectionModeDropdown);
            await click(optionMultiple);
            await expect(await getElementClass(playgroundExample + tableCellClass)).toContain(
                'fd-table__cell--checkbox'
            );
        });

        it('should check table without horizontal borders', async () => {
            await scrollIntoView(playgroundExample);
            await click(playgroundExample + checkbox);
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain(
                'fd-table--no-horizontal-borders'
            );
        });

        it('should check table without vertical borders', async () => {
            await scrollIntoView(playgroundExample);
            await click(playgroundExample + checkbox, 1);
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain(
                'fd-table--no-vertical-borders'
            );
        });

        it('should check table without all borders', async () => {
            await scrollIntoView(playgroundExample);
            await click(playgroundExample + checkbox, 2);
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain(
                'fd-table--no-horizontal-borders fd-table--no-vertical-borders'
            );
        });

        it('should check busy indicator appearance', async () => {
            await scrollIntoView(playgroundExample);
            await click(playgroundExample + checkbox, 5);
            await expect(await isElementDisplayed(playgroundExample + busyIndicator)).toBe(
                true,
                'busy indicator not displayed'
            );
        });

        it('should check changing title and hide element count', async () => {
            await scrollIntoView(playgroundExample);
            await setValue(playgroundExample + playgroundSchemaInput, 'test');

            await expect((await getText(playgroundExample + toolbarText)).trim()).toBe('test (30)');

            await click(playgroundExample + checkbox, 7);
            await expect((await getText(playgroundExample + toolbarText)).trim()).toBe('test');
        });
    });

    describe('Check Custom component to render "No data" message', () => {
        it('should check alert messages', async () => {
            await tablePage.checkAlertMessages(tableNoItemsTemplateExample);
        });
    });

    describe('Check Semantic Highlighting', () => {
        it('should check alert messages', async () => {
            await tablePage.checkAlertMessages(tableSemanticExample);
        });

        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableSemanticExample, tableCellArr);
        });
    });

    describe('Check Row custom CSS class', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableRowClassExample, tableCellArr);
        });
    });

    describe('Check Wrapping text in columns', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableWrapExample, tableCellArr7);
        });

        it('should check alert messages', async () => {
            await tablePage.checkAlertMessages(tableWrapExample);
        });
    });

    describe('Check No outer borders', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableNoOuterBordersExample, tableCellArr);
        });

        it('should check alert messages', async () => {
            await tablePage.checkAlertMessages(tableNoOuterBordersExample);
        });

        it('should check checkboxes', async () => {
            await tablePage.checkAllCheckbox(tableNoOuterBordersExample);
        });
    });

    runCommonTests(allInputFields, tablePage);
});
