import { TablePo } from './table.po';
import {
    acceptAlert,
    browserIsSafari,
    checkElArrIsClickable,
    checkLtrOrientation,
    checkRtlOrientation,
    click,
    doesItExist,
    getAlertText,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementPlaceholder,
    getElementSize,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    alertTestText1,
    alertTestText2,
    astroTestText,
    descriptionEndTestText,
    descriptionStartTestText,
    massaTestText,
    nameEndTestText,
    nameStartTestText,
    nuncTestText,
    pharetraTestText,
    placeholderTestText,
    priceEndTestText,
    priceStartTestText,
    tableCellArr,
    tableCellArr2,
    tableCellArr3,
    tableCellArr4,
    tableCellArr5,
    tableCellArr6,
    tableCellArr7,
    testText,
    testText2,
    testText3,
    testText4,
    testText5,
    testText7,
    testTextName,
    testTextSearch,
    groupTableCellArr,
    freezeTableCellArr
} from './table-contents';

describe('Table component test suite', () => {
    const tablePage = new TablePo();
    const {
        tableDefaultExample,
        button,
        input,
        tableRow,
        tableCellText,
        tableCustomWidthExample,
        tableActivableExample,
        tableSingleRowSelectionExample,
        tableSortableExample,
        buttonSortedBy,
        barButton,
        tableCellDescription,
        tableCellPrice,
        tableCellName,
        buttonSortedOrder,
        tableMultipleRowSelectionExample,
        tableGroupableExample,
        tableFreezableExample,
        tableLoadingExample,
        busyIndicator,
        buttonSearch,
        tablePageScrollingExample,
        tableInitialStateExample,
        tableNavigatableRowIndicatorExample,
        tableFilterableExample,
        filterItem,
        filterByColorItem,
        tableCellStatusColor,
        tableCellStatus,
        tableP13ColumnsExample,
        dialogCompactInput,
        dialogItemText,
        dialogMoveToBottom,
        footerButtonOk,
        dialogItem,
        columnHeader,
        tableP13SortExample,
        tableP13FilterExample,
        tableP13GroupExample,
        popoverDropdownButton,
        buttonAdd,
        buttonRemove,
        dialogInput,
        expandedButton,
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
        dropdownList,
        dropdownOption,
        dialogButton,
        tableCell,
        tableNoItemsTemplateExample,
        tableSemanticExample,
        tableRowClassExample,
        dialogFilters,
        filterInput,
        filterButtonOk,
        filterResetButton,
        allInputFields,
        sortableIcon,
        sortableOption,
        sortablePopover,
        buttonActionOne,
        buttonActionTwo,
        ellipsisButton,
        expandedOption,
        tableRowInitialState,
        tableCellInitialState,
        buttonFilter,
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
            await checkAlertMessages(tableDefaultExample);
        });

        it('should check table item single selection', async () => {
            await findElementInTable(tableDefaultExample, tableCellArr);
        });
    });

    describe('Check Custom Column Width & Column Resizing', () => {
        it('should check alert messages', async () => {
            await checkAlertMessages(tableCustomWidthExample);
        });

        it('should check table item single selection', async () => {
            await findElementInTable(tableCustomWidthExample, tableCellArr);
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

    describe('Check Activable Rows', () => {
        it('should check alert messages', async () => {
            await checkAlertMessages(tableActivableExample);
        });

        it('should check table item single selection', async () => {
            await findElementInTable(tableActivableExample, tableCellArr);
        });

        it('should check activable row', async () => {
            await scrollIntoView(tableActivableExample);
            await expect(await getElementClass(tableActivableExample + tableRow)).toContain('fd-table__row--activable');
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

    describe('Check Single Row Selection', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableSingleRowSelectionExample, tableCellArr);
        });

        it('should check table item single selection', async () => {
            await scrollIntoView(tableSingleRowSelectionExample);
            await click(tableSingleRowSelectionExample + tableRow + tableCell);
            await expect(await getAttributeByName(tableSingleRowSelectionExample + tableRow, 'aria-selected')).toBe(
                'true'
            );
        });

        it('should check selected row not gets unselected', async () => {
            await scrollIntoView(tableSingleRowSelectionExample);
            await setValue(tableSingleRowSelectionExample + input, 'Astro');
            await click(tableSingleRowSelectionExample + button, 1);
            await click(tableSingleRowSelectionExample + tableCell);
            await click(tableSingleRowSelectionExample + button);
            await expect(await getAttributeByName(tableSingleRowSelectionExample + tableRow, 'aria-selected', 1)).toBe(
                'true'
            );
        });
    });

    describe('Check Multi Row Selection', () => {
        it('should verify checkboxes', async () => {
            await checkAllCheckbox(tableMultipleRowSelectionExample, true);
        });
    });

    describe('Check Column Sorting', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableSortableExample, tableCellArr);
        });

        it('should check ascending sorting by name, description and price', async () => {
            await scrollIntoView(tableSortableExample);
            await chooseSortOptionBy(tableSortableExample, ellipsisButton, 2);
            await expect((await getText(tableSortableExample + tableCellDescription)).trim()).toBe(
                descriptionStartTestText
            );
            await expect((await getText(tableSortableExample + tableCellDescription, 15)).trim()).toBe(
                descriptionEndTestText
            );

            await chooseSortOptionBy(tableSortableExample, ellipsisButton, 3);
            await expect((await getText(tableSortableExample + tableCellPrice)).trim()).toBe(priceStartTestText);
            await expect((await getText(tableSortableExample + tableCellPrice, 15)).trim()).toBe(priceEndTestText);

            await chooseSortOptionBy(tableSortableExample, ellipsisButton, 1);
            await expect((await getText(tableSortableExample + tableCellName)).trim()).toBe(nameStartTestText);
            await expect((await getText(tableSortableExample + tableCellName, 15)).trim()).toBe(nameEndTestText);
        });

        it('should check descending sorting by name, description and price', async () => {
            await scrollIntoView(tableSortableExample);
            await click(tableSortableExample + ellipsisButton);
            await click(buttonSortedOrder, 1);
            await click(buttonSortedBy, 2);
            await click(barButton);
            await expect((await getText(tableSortableExample + tableCellDescription)).trim()).toBe(
                descriptionEndTestText
            );
            await expect((await getText(tableSortableExample + tableCellDescription, 15)).trim()).toBe(
                descriptionStartTestText
            );

            await chooseSortOptionBy(tableSortableExample, ellipsisButton, 3);
            await expect((await getText(tableSortableExample + tableCellPrice)).trim()).toBe(priceEndTestText);
            await expect((await getText(tableSortableExample + tableCellPrice, 15)).trim()).toBe(priceStartTestText);

            await chooseSortOptionBy(tableSortableExample, ellipsisButton, 1);
            await expect((await getText(tableSortableExample + tableCellName)).trim()).toBe(nameEndTestText);
            await expect((await getText(tableSortableExample + tableCellName, 15)).trim()).toBe(nameStartTestText);
        });

        it('should check after selecting sorting option popover closed', async () => {
            await scrollIntoView(tableSortableExample);
            await click(sortableIcon);
            await click(sortableOption);
            await expect(await doesItExist(sortablePopover)).toBe(false, 'sortable popover still displayed');
        });
    });

    describe('Check Column Filtering', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableFilterableExample, tableCellArr, 1);
        });

        it('should check filtering by status color', async () => {
            await chooseFilter(2, 1);
            const rowLength = await getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < rowLength; i++) {
                await expect((await getText(tableCellStatusColor, i)).trim()).toBe('positive');
            }

            await chooseFilter(2, 2);
            const tableRowLength = await getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < tableRowLength; i++) {
                await expect((await getText(tableCellStatusColor, i)).trim()).toBe('negative');
            }

            await chooseFilter(2, 3);
            await expect(await doesItExist(tableFilterableExample + tableRow)).toBe(false, '');
        });

        it('should check filtering by status', async () => {
            await chooseFilter(1, 0);
            const rowLength = await getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < rowLength; i++) {
                await expect((await getText(tableFilterableExample + tableCellStatus, i)).trim()).toBe('Out of stock');
            }
            await refreshPage();
            await chooseFilter(1, 1);
            const tableRowLength = await getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < tableRowLength; i++) {
                await expect((await getText(tableFilterableExample + tableCellStatus, i)).trim()).toBe(tableCellArr[3]);
            }
        });

        it('should check on filter by price reset button is clickable', async () => {
            await scrollIntoView(tableFilterableExample);
            await click(tableFilterableExample + buttonFilter);
            await click(dialogFilters);
            await setValue(filterInput, '10');
            await setValue(filterInput, '40', 1);
            await click(filterButtonOk);

            await click(tableFilterableExample + buttonFilter);
            await click(dialogFilters);
            await expect(await isElementClickable(filterResetButton)).toBe(true, 'reset button not clickable');
        });
    });

    describe('Check Column Grouping', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableGroupableExample, groupTableCellArr);
        });

        it('should verify checkboxes', async () => {
            await checkAllCheckbox(tableGroupableExample);
        });

        it('should check ascending sorting by name and status', async () => {
            await scrollIntoView(tableGroupableExample);
            await chooseSortOptionBy(tableGroupableExample, ellipsisButton, 0);
            await expect((await getText(tableGroupableExample + tableCellDescription)).trim()).toBe(tableCellArr[1]);
            await expect((await getText(tableGroupableExample + tableCellDescription, 15)).trim()).toBe(
                pharetraTestText
            );

            await chooseSortOptionBy(tableGroupableExample, ellipsisButton, 1);
            await expect((await getText(tableGroupableExample + tableCellDescription)).trim()).toBe(nuncTestText);
            await expect((await getText(tableGroupableExample + tableCellDescription, 15)).trim()).toBe(massaTestText);
        });

        it('should check descending sorting by name and status', async () => {
            await scrollIntoView(tableGroupableExample);
            await click(tableGroupableExample + ellipsisButton);
            await click(buttonSortedOrder, 1);
            await click(buttonSortedBy, 1);
            await click(barButton);
            await chooseSortOptionBy(tableGroupableExample, ellipsisButton, 0);
            await expect((await getText(tableGroupableExample + tableCellDescription)).trim()).toBe(pharetraTestText);
            await expect((await getText(tableGroupableExample + tableCellDescription, 15)).trim()).toBe(
                tableCellArr[1]
            );

            await chooseSortOptionBy(tableGroupableExample, ellipsisButton, 1);
            await expect((await getText(tableGroupableExample + tableCellDescription)).trim()).toBe(tableCellArr[1]);
            await expect((await getText(tableGroupableExample + tableCellDescription, 15)).trim()).toBe(
                'integer ac leo pellentesque'
            );
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
            await checkAllCheckbox(tableFreezableExample);
        });
    });

    describe('Check Loading/Busy State', () => {
        it('should check alert messages', async () => {
            await checkAlertMessages(tableLoadingExample);
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
            await checkAllCheckbox(tableTreeExample);
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

    describe('Check Table columns visibility and order', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableP13ColumnsExample, tableCellArr4);
        });

        it('should check searching and placeholder in dialog', async () => {
            await checkPlaceholder(tableP13ColumnsExample, 2);
            await checkSearchingInDialog();
        });

        it('should check sorting of columns', async () => {
            await checkSortingColumns(tableP13ColumnsExample, ellipsisButton);
        });
    });

    describe('Check Sorting by multiple columns', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableP13SortExample, tableCellArr4);
        });

        it('should check sorting ascending and descending by name', async () => {
            await scrollIntoView(tableP13SortExample);
            await click(tableP13SortExample + ellipsisButton);
            await click(popoverDropdownButton);
            await click(buttonSortedBy);
            await click(footerButtonOk);
            await expect((await getText(tableP13SortExample + tableCellName)).trim()).toBe(testText);
            await expect((await getText(tableP13SortExample + tableCellName, 15)).trim()).toBe(nameEndTestText);

            await click(tableP13SortExample + columnHeader);
            await click(filterByColorItem, 1);
            await expect((await getText(tableP13SortExample + tableCellName)).trim()).toBe(nameEndTestText);
            await expect((await getText(tableP13SortExample + tableCellName, 15)).trim()).toBe(testText);
        });

        it('should check sorting ascending and descending by price', async () => {
            await scrollIntoView(tableP13SortExample);
            await click(tableP13SortExample + ellipsisButton);
            await click(buttonAdd);
            await click(buttonRemove);
            await click(popoverDropdownButton);
            await click(buttonSortedBy, 1);
            await click(footerButtonOk);

            await expect((await getText(tableP13SortExample + tableCellPrice)).trim()).toBe(priceStartTestText);
            await expect((await getText(tableP13SortExample + tableCellPrice, 15)).trim()).toBe(priceEndTestText);

            await click(tableP13SortExample + columnHeader, 2);
            await click(filterByColorItem, 1);
            await expect((await getText(tableP13SortExample + tableCellPrice)).trim()).toBe(priceEndTestText);
            await expect((await getText(tableP13SortExample + tableCellPrice, 15)).trim()).toBe(priceStartTestText);
        });

        it('should check searching and placeholder in dialog', async () => {
            await checkPlaceholder(tableP13SortExample, 3);
        });

        it('should check sorting of columns', async () => {
            await checkSortingColumns(tableP13SortExample, ellipsisButton, 1);
        });

        it('should check impossible select columns multiple times', async () => {
            await scrollIntoView(tableP13SortExample);
            await click(tableP13SortExample + ellipsisButton);
            await click(popoverDropdownButton);
            await expect(await isElementDisplayed(dropdownList)).toBe(true);
            await click(dropdownOption);

            await click(dialogButton, 1);
            await click(popoverDropdownButton, 2);
            await expect(await isElementDisplayed(dropdownList)).toBe(true);
            await click(dropdownOption);

            await click(dialogButton, 3);
            await click(popoverDropdownButton, 4);
            await expect(await doesItExist(dropdownList)).toBe(false);
        });
    });

    describe('Check Filtering by multiple columns', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableP13FilterExample, tableCellArr5);
        });

        it('should check filtering with include and exclude', async () => {
            await scrollIntoView(tableP13FilterExample);
            await click(tableP13FilterExample + ellipsisButton);
            await setValue(dialogInput, astroTestText);
            await click(expandedButton, 1);
            await click(popoverDropdownButton, 2);
            await click(filterByColorItem, 1);
            await setValue(dialogInput, testText7, 1);
            await click(footerButtonOk);

            const rowLength = await getElementArrayLength(tableP13FilterExample + tableRow);
            await expect(rowLength).toEqual(1);
            await expect((await getText(tableP13FilterExample + tableRow + tableCellText)).trim()).toBe(testText4);
            await expect((await getText(tableP13FilterExample + tableRow + tableCellText, 1)).trim()).toBe(testText5);
        });

        it('should check searching and placeholder in dialog', async () => {
            await checkPlaceholder(tableP13FilterExample, 3);
            await checkSearchingInDialog();
        });

        it('should check sorting of columns', async () => {
            await checkSortingColumns(tableP13FilterExample, ellipsisButton, 1);
        });
        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7005
        xit('should check Exclude section in dialog always open', async () => {
            await scrollIntoView(tableP13FilterExample);
            await click(tableP13FilterExample + buttonFilter);
            await expect(await getAttributeByName(expandedOption, 'aria-expanded')).toBe('false');
        });
    });

    describe('Check Grouping by multiple columns', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableP13GroupExample, tableCellArr4);
        });

        it('should check searching and placeholder in dialog', async () => {
            await checkPlaceholder(tableP13GroupExample, 3);
            await checkSearchingInDialog();
        });

        it('should check sorting of columns', async () => {
            await checkSortingColumns(tableP13GroupExample, ellipsisButton, 1);
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
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain('fd-table--compact');

            await click(playgroundContentDensityDropdown);
            await click(optionCozy);
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain('fdp-table');

            await click(playgroundContentDensityDropdown);
            await click(optionCondensed);
            await expect(await getElementClass(playgroundExample + fdpTable)).toContain('fd-table--condensed');
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
            await checkAlertMessages(tableNoItemsTemplateExample);
        });
    });

    describe('Check Semantic Highlighting', () => {
        it('should check alert messages', async () => {
            await checkAlertMessages(tableSemanticExample);
        });

        it('should check table item single selection', async () => {
            await findElementInTable(tableSemanticExample, tableCellArr);
        });
    });

    describe('Check Row custom CSS class', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableRowClassExample, tableCellArr);
        });
    });

    describe('Check Wrapping text in columns', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableWrapExample, tableCellArr7);
        });

        it('should check alert messages', async () => {
            await checkAlertMessages(tableWrapExample);
        });
    });

    describe('Check No outer borders', () => {
        it('should check table item single selection', async () => {
            await findElementInTable(tableNoOuterBordersExample, tableCellArr);
        });

        it('should check alert messages', async () => {
            await checkAlertMessages(tableNoOuterBordersExample);
        });

        it('should check checkboxes', async () => {
            await checkAllCheckbox(tableNoOuterBordersExample);
        });
    });

    describe('Check input fields', () => {
        it('should check input fields does not change width', async () => {
            const inputFieldLength = await getElementArrayLength(allInputFields);
            for (let i = 0; i < inputFieldLength; i++) {
                if (i === 13) {
                    continue;
                }
                const beforeSize = await getElementSize(allInputFields, i);
                await scrollIntoView(allInputFields, i);
                await click(allInputFields, i);
                await sendKeys('test');
                const afterSize = await getElementSize(allInputFields, i);
                await expect(beforeSize).toEqual(afterSize);
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            const exampleAreaContainersArr = '.fd-doc-component';
            const rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

            const switcherLength = await getElementArrayLength(exampleAreaContainersArr);
            for (let i = 0; i < switcherLength; i++) {
                if (i === 13) {
                    continue;
                }
                await scrollIntoView(rtlSwitcherArr, i);
                await click(rtlSwitcherArr, i);
                await checkRtlOrientation(exampleAreaContainersArr, i);
                await scrollIntoView(rtlSwitcherArr, i);
                await click(rtlSwitcherArr, i);
                await waitForElDisplayed(exampleAreaContainersArr, i);
                await checkLtrOrientation(exampleAreaContainersArr, i);
            }
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await tablePage.saveExampleBaselineScreenshot();
            await expect(await tablePage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function checkAlertMessages(selector: string): Promise<void> {
        await scrollIntoView(selector + button);
        await click(selector + buttonActionOne);
        await expect(await getAlertText()).toBe(alertTestText1);
        await acceptAlert();

        await click(selector + buttonActionTwo);
        await expect(await getAlertText()).toBe(alertTestText2);
        await acceptAlert();
    }

    async function findElementInTable(selector: string, arr: string[], count: number = 0): Promise<void> {
        await scrollIntoView(selector + input);
        await setValue(selector + input, testText);
        await click(selector + buttonSearch);
        const rowLength = await getElementArrayLength(selector + tableRow);
        await expect(rowLength).toEqual(1);
        const cellLength = await getElementArrayLength(selector + tableRow + tableCellText);
        for (let i = 0; i < cellLength - count; i++) {
            await expect((await getText(selector + tableRow + tableCellText, i)).trim()).toBe(arr[i]);
        }
    }

    async function chooseSortOptionBy(selector: string, transparentButton: string, index: number): Promise<void> {
        await click(selector + transparentButton);
        await click(buttonSortedBy, index);
        await click(barButton);
    }

    async function checkAllCheckbox(selector, skipFirst = false): Promise<void> {
        await scrollIntoView(selector);
        await click(selector + 'fd-checkbox');
        const checkboxLength = await getElementArrayLength(selector + tableRow);
        for (let i = 0; i < checkboxLength; i++) {
            await expect(await getAttributeByName(selector + tableRow, 'aria-selected', i)).toBe(
                skipFirst && i === 0 ? 'false' : 'true'
            );
        }
    }

    async function chooseFilter(indexFilter: number, indexBy): Promise<void> {
        await scrollIntoView(tableFilterableExample);
        await click(tableFilterableExample + ellipsisButton);
        await click(filterItem, indexFilter);
        await click(filterByColorItem, indexBy);
        await click(barButton);
    }

    async function checkPlaceholder(selector: string, index: number = 0): Promise<void> {
        await scrollIntoView(selector);
        await click(selector + button, index);
        await expect(await getElementPlaceholder(dialogCompactInput)).toBe(testTextSearch);
    }

    async function checkSearchingInDialog(): Promise<void> {
        await setValue(dialogCompactInput, testTextName);
        const itemLength = await getElementArrayLength(dialogItemText);
        await expect(itemLength).toEqual(1);
        await expect((await getText(dialogItemText)).trim()).toBe(testTextName);
    }

    async function checkSortingColumns(selector: string, transparentButton: string, index: number = 0): Promise<void> {
        await scrollIntoView(selector);
        await click(selector + transparentButton, index);
        await click(dialogMoveToBottom);
        await click(dialogItem);
        await click(footerButtonOk);
        await expect((await getText(selector + columnHeader, 3)).trim()).toBe(testTextName);
    }
});
