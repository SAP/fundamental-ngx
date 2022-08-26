import { TablePo } from '../pages/table.po';
import {
    acceptAlert,
    browserIsSafari,
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
} from '../../driver/wdio';
import { checkElArrIsClickable, checkLtrOrientation, checkRtlOrientation } from '../../helper/assertion-helper';
import {
    alertTestText1,
    alertTestText2,
    testText,
    tableCellArr,
    descriptionStartTestText,
    descriptionEndTestText,
    priceStartTestText,
    priceEndTestText,
    nameStartTestText,
    nameEndTestText,
    tableCellArr2,
    testText2,
    testText3,
    tableCellArr3,
    tableCellArr4,
    testTextSearch,
    testTextName,
    tableCellArr5,
    testText5,
    testText4,
    tableCellArr6,
    placeholderTestText,
    astroTestText,
    testText7,
    pharetraTestText,
    nuncTestText,
    massaTestText,
    tableCellArr7
} from '../fixtures/appData/table-contents';

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
        tableCellFixed,
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

    beforeAll(() => {
        tablePage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(tablePage.root);
        waitForElDisplayed(tablePage.title);
    }, 1);

    if (browserIsSafari()) {
        // skip due to unknown error where browser closes halfway through the test
        return;
    }

    describe('Check Simple Table example', () => {
        it('should check alert messages', () => {
            checkAlertMessages(tableDefaultExample);
        });

        it('should check table item single selection', () => {
            findElementInTable(tableDefaultExample, tableCellArr);
        });
    });

    describe('Check Custom Column Width & Column Resizing', () => {
        it('should check alert messages', () => {
            checkAlertMessages(tableCustomWidthExample);
        });

        it('should check table item single selection', () => {
            findElementInTable(tableCustomWidthExample, tableCellArr);
        });
    });

    describe('Check Activable Rows', () => {
        it('should check alert messages', () => {
            checkAlertMessages(tableActivableExample);
        });

        it('should check table item single selection', () => {
            findElementInTable(tableActivableExample, tableCellArr);
        });

        it('should check activable row', () => {
            scrollIntoView(tableActivableExample);
            expect(getElementClass(tableActivableExample + tableRow)).toContain('fd-table__row--activable');
        });
    });

    describe('Check Custom Column', () => {
        it('should check table item single selection', () => {
            scrollIntoView(tableCustomColumnExample);
            setValue(tableCustomColumnExample + input, testText);
            click(tableCustomColumnExample + button, 1);
            const rowLength = getElementArrayLength(tableCustomColumnExample + tableRow);
            expect(rowLength).toEqual(1);
            const cellLength = getElementArrayLength(tableCustomColumnExample + tableRow + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                if (i === 1) {
                    continue;
                }
                expect(getText(tableCustomColumnExample + tableRow + tableCellText, i).trim()).toBe(tableCellArr6[i]);
            }
        });

        it('should check possible to change description', () => {
            scrollIntoView(tableCustomColumnExample);
            setValue(tableCustomColumnExample + 'fdp-table-cell input', 'test');
            expect(getValue(tableCustomColumnExample + 'fdp-table-cell input')).toBe('test');
        });
    });

    describe('Check Single Row Selection', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableSingleRowSelectionExample, tableCellArr);
        });

        it('should check table item single selection', () => {
            scrollIntoView(tableSingleRowSelectionExample);
            click(tableSingleRowSelectionExample + tableRow + tableCell);
            expect(getAttributeByName(tableSingleRowSelectionExample + tableRow, 'aria-selected')).toBe('true');
        });

        it('should check selected row not gets unselected', () => {
            scrollIntoView(tableSingleRowSelectionExample);
            setValue(tableSingleRowSelectionExample + input, 'Astro');
            click(tableSingleRowSelectionExample + button, 1);
            click(tableSingleRowSelectionExample + tableCell);
            click(tableSingleRowSelectionExample + button);
            expect(getAttributeByName(tableSingleRowSelectionExample + tableRow, 'aria-selected', 1)).toBe('true');
        });
    });

    describe('Check Multi Row Selection', () => {
        it('should verify checkboxes', () => {
            checkAllCheckbox(tableMultipleRowSelectionExample);
        });
    });

    describe('Check Column Sorting', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableSortableExample, tableCellArr);
        });

        it('should check ascending sorting by name, description and price', () => {
            scrollIntoView(tableSortableExample);
            chooseSortOptionBy(tableSortableExample, ellipsisButton, 2);
            expect(getText(tableSortableExample + tableCellDescription).trim()).toBe(descriptionStartTestText);
            expect(getText(tableSortableExample + tableCellDescription, 15).trim()).toBe(descriptionEndTestText);

            chooseSortOptionBy(tableSortableExample, ellipsisButton, 3);
            expect(getText(tableSortableExample + tableCellPrice).trim()).toBe(priceStartTestText);
            expect(getText(tableSortableExample + tableCellPrice, 15).trim()).toBe(priceEndTestText);

            chooseSortOptionBy(tableSortableExample, ellipsisButton, 1);
            expect(getText(tableSortableExample + tableCellName).trim()).toBe(nameStartTestText);
            expect(getText(tableSortableExample + tableCellName, 15).trim()).toBe(nameEndTestText);
        });

        it('should check descending sorting by name, description and price', () => {
            scrollIntoView(tableSortableExample);
            click(tableSortableExample + ellipsisButton);
            click(buttonSortedOrder, 1);
            click(buttonSortedBy, 2);
            click(barButton);
            expect(getText(tableSortableExample + tableCellDescription).trim()).toBe(descriptionEndTestText);
            expect(getText(tableSortableExample + tableCellDescription, 15).trim()).toBe(descriptionStartTestText);

            chooseSortOptionBy(tableSortableExample, ellipsisButton, 3);
            expect(getText(tableSortableExample + tableCellPrice).trim()).toBe(priceEndTestText);
            expect(getText(tableSortableExample + tableCellPrice, 15).trim()).toBe(priceStartTestText);

            chooseSortOptionBy(tableSortableExample, ellipsisButton, 1);
            expect(getText(tableSortableExample + tableCellName).trim()).toBe(nameEndTestText);
            expect(getText(tableSortableExample + tableCellName, 15).trim()).toBe(nameStartTestText);
        });

        it('should check after selecting sorting option popover closed', () => {
            scrollIntoView(tableSortableExample);
            click(sortableIcon);
            click(sortableOption);
            expect(doesItExist(sortablePopover)).toBe(false, 'sortable popover still displayed');
        });
    });

    describe('Check Column Filtering', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableFilterableExample, tableCellArr, 1);
        });

        it('should check filtering by status color', () => {
            chooseFilter(2, 1);
            const rowLength = getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < rowLength; i++) {
                expect(getText(tableCellStatusColor, i).trim()).toBe('positive');
            }

            chooseFilter(2, 2);
            const tableRowLength = getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < tableRowLength; i++) {
                expect(getText(tableCellStatusColor, i).trim()).toBe('negative');
            }

            chooseFilter(2, 3);
            expect(doesItExist(tableFilterableExample + tableRow)).toBe(false, '');
        });

        it('should check filtering by status', () => {
            chooseFilter(1, 0);
            const rowLength = getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < rowLength; i++) {
                expect(getText(tableFilterableExample + tableCellStatus, i).trim()).toBe('Out of stock');
            }
            refreshPage();
            chooseFilter(1, 1);
            const tableRowLength = getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < tableRowLength; i++) {
                expect(getText(tableFilterableExample + tableCellStatus, i).trim()).toBe(tableCellArr[3]);
            }
        });

        it('should check on filter by price reset button is clickable', () => {
            scrollIntoView(tableFilterableExample);
            click(tableFilterableExample + buttonFilter);
            click(dialogFilters);
            setValue(filterInput, '10');
            setValue(filterInput, '40', 1);
            click(filterButtonOk);

            click(tableFilterableExample + buttonFilter);
            click(dialogFilters);
            expect(isElementClickable(filterResetButton)).toBe(true, 'reset button not clickable');
        });
    });

    describe('Check Column Grouping', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableGroupableExample, tableCellArr);
        });

        it('should verify checkboxes', () => {
            checkAllCheckbox(tableGroupableExample);
        });

        it('should check ascending sorting by name and status', () => {
            scrollIntoView(tableGroupableExample);
            chooseSortOptionBy(tableGroupableExample, ellipsisButton, 0);
            expect(getText(tableGroupableExample + tableCellDescription).trim()).toBe(tableCellArr[1]);
            expect(getText(tableGroupableExample + tableCellDescription, 15).trim()).toBe(pharetraTestText);

            chooseSortOptionBy(tableGroupableExample, ellipsisButton, 1);
            expect(getText(tableGroupableExample + tableCellDescription).trim()).toBe(nuncTestText);
            expect(getText(tableGroupableExample + tableCellDescription, 15).trim()).toBe(massaTestText);
        });

        it('should check descending sorting by name and status', () => {
            scrollIntoView(tableGroupableExample);
            click(tableGroupableExample + ellipsisButton);
            click(buttonSortedOrder, 1);
            click(buttonSortedBy, 1);
            click(barButton);
            chooseSortOptionBy(tableGroupableExample, ellipsisButton, 0);
            expect(getText(tableGroupableExample + tableCellDescription).trim()).toBe(pharetraTestText);
            expect(getText(tableGroupableExample + tableCellDescription, 15).trim()).toBe(tableCellArr[1]);

            chooseSortOptionBy(tableGroupableExample, ellipsisButton, 1);
            expect(getText(tableGroupableExample + tableCellDescription).trim()).toBe(tableCellArr[1]);
            expect(getText(tableGroupableExample + tableCellDescription, 15).trim()).toBe(
                'integer ac leo pellentesque'
            );
        });
    });

    describe('Check Column Freezing', () => {
        it('should check table item single selection', () => {
            scrollIntoView(tableFreezableExample + input);
            setValue(tableFreezableExample + input, tableCellArr[1]);
            click(tableFreezableExample + button, 1);
            const rowLength = getElementArrayLength(tableFreezableExample + tableRow);
            expect(rowLength).toEqual(1);
            const cellLength = getElementArrayLength(tableFreezableExample + tableRow + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                expect(getText(tableFreezableExample + tableRow + tableCellText, i).trim()).toBe(tableCellArr[i]);
            }
        });

        it('should verify checkboxes', () => {
            checkAllCheckbox(tableFreezableExample);
        });
    });

    describe('Check Loading/Busy State', () => {
        it('should check alert messages', () => {
            checkAlertMessages(tableLoadingExample);
        });

        it('should check busy indicator', () => {
            scrollIntoView(tableLoadingExample);
            pause(300);
            expect(doesItExist(busyIndicator)).toBe(false, 'busy indicator should not be displayed');

            setValue(tableLoadingExample + input, 'Astro');
            click(tableLoadingExample + buttonSearch);
            expect(doesItExist(busyIndicator)).toBe(true, 'busy indicator should be displayed');

            pause(300);
            expect(doesItExist(busyIndicator)).toBe(false, 'busy indicator should not be displayed');
        });

        it('should check table content is not interactive while table is loading', () => {
            scrollIntoView(tableLoadingExample);
            setValue(tableLoadingExample + input, 'Astro');
            click(tableLoadingExample + buttonSearch);

            expect(isEnabled(tableLoadingExample + input)).toBe(false, 'input is enable');
        });
    });

    describe('Check Page Scrolling', () => {
        it('should check table item single selection', () => {
            scrollIntoView(tablePageScrollingExample);
            setValue(tablePageScrollingExample + input, testText2);
            click(tablePageScrollingExample + buttonSearch);
            expect(doesItExist(busyIndicator)).toBe(true, "busy indicator isn't displayed");
            pause(500);
            expect(doesItExist(busyIndicator)).toBe(false, 'busy indicator is displayed');
            const rowLength = getElementArrayLength(tablePageScrollingExample + tableRow);
            expect(rowLength).toEqual(1);
            const cellLength = getElementArrayLength(tablePageScrollingExample + tableRow + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                scrollIntoView(tablePageScrollingExample + tableRow + tableCellText, i);
                expect(getText(tablePageScrollingExample + tableRow + tableCellText, i).trim()).toBe(tableCellArr2[i]);
            }
        });

        it('should check scroll', () => {
            scrollIntoView(tablePageScrollingExample);
            scrollIntoView(tablePageScrollingExample + tableRow, 40);

            expect(getText(tablePageScrollingExample + tableCellName, 40).trim()).toBe('Product name 40');
            expect(getText(tablePageScrollingExample + tableCellDescription, 40).trim()).toBe(
                'Product description goes here 40'
            );
        });
    });

    describe('Check Initial State', () => {
        it('should check table item single selection', () => {
            scrollIntoView(tableInitialStateExample);
            setValue(tableInitialStateExample + input, testText3);
            click(tableInitialStateExample + buttonSearch);
            const rowLength = getElementArrayLength(tableInitialStateExample + tableRowInitialState);
            expect(rowLength).toEqual(1);
            const cellLength = getElementArrayLength(tableInitialStateExample + tableRowInitialState + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                expect(getText(tableInitialStateExample + tableRowInitialState + tableCellText, i).trim()).toBe(
                    tableCellArr3[i]
                );
            }
        });

        it('should check cell expanded', () => {
            scrollIntoView(tableInitialStateExample + tableCellInitialState);
            click(tableInitialStateExample + tableCellInitialState);
            click(tableInitialStateExample + tableCellInitialState, 1);

            expect(getAttributeByName(tableInitialStateExample + tableCellInitialState, 'aria-expanded')).toBe('false');
            expect(getAttributeByName(tableInitialStateExample + tableCellInitialState, 'aria-expanded', 1)).toBe(
                'false'
            );
        });
    });

    describe('Check Tree Table', () => {
        it('should check table item single selection', () => {
            scrollIntoView(tableTreeExample);
            setValue(tableTreeExample + input, 'Laptops');
            click(tableTreeExample + buttonSearch);
            const rowLength = getElementArrayLength(tableTreeExample + tableRow);
            expect(rowLength).toEqual(1);
        });

        it('should check checkboxes', () => {
            checkAllCheckbox(tableTreeExample);
        });

        it('should check expanded table row', () => {
            scrollIntoView(tableTreeExample);
            const arrowButtonLength = getElementArrayLength(tableTreeExample + arrowButton);
            for (let i = 0; i < arrowButtonLength; i++) {
                click(tableTreeExample + arrowButton, i);
            }
            expect(getElementArrayLength(tableTreeExample + tableRow)).toEqual(20);
        });
    });

    describe('Check Table columns visibility and order', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableP13ColumnsExample, tableCellArr4);
        });

        it('should check searching and placeholder in dialog', () => {
            checkPlaceholder(tableP13ColumnsExample, 2);
            checkSearchingInDialog();
        });

        it('should check sorting of columns', () => {
            checkSortingColumns(tableP13ColumnsExample, ellipsisButton);
        });
    });

    describe('Check Sorting by multiple columns', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableP13SortExample, tableCellArr4);
        });

        it('should check sorting ascending and descending by name', () => {
            scrollIntoView(tableP13SortExample);
            click(tableP13SortExample + ellipsisButton);
            click(popoverDropdownButton);
            click(buttonSortedBy);
            click(footerButtonOk);
            expect(getText(tableP13SortExample + tableCellName).trim()).toBe(testText);
            expect(getText(tableP13SortExample + tableCellName, 15).trim()).toBe(nameEndTestText);

            click(tableP13SortExample + columnHeader);
            click(filterByColorItem, 1);
            expect(getText(tableP13SortExample + tableCellName).trim()).toBe(nameEndTestText);
            expect(getText(tableP13SortExample + tableCellName, 15).trim()).toBe(testText);
        });

        it('should check sorting ascending and descending by price', () => {
            scrollIntoView(tableP13SortExample);
            click(tableP13SortExample + ellipsisButton);
            click(buttonAdd);
            click(buttonRemove);
            click(popoverDropdownButton);
            click(buttonSortedBy, 1);
            click(footerButtonOk);

            expect(getText(tableP13SortExample + tableCellPrice).trim()).toBe(priceStartTestText);
            expect(getText(tableP13SortExample + tableCellPrice, 15).trim()).toBe(priceEndTestText);

            click(tableP13SortExample + columnHeader, 2);
            click(filterByColorItem, 1);
            expect(getText(tableP13SortExample + tableCellPrice).trim()).toBe(priceEndTestText);
            expect(getText(tableP13SortExample + tableCellPrice, 15).trim()).toBe(priceStartTestText);
        });

        it('should check searching and placeholder in dialog', () => {
            checkPlaceholder(tableP13SortExample, 3);
        });

        it('should check sorting of columns', () => {
            checkSortingColumns(tableP13SortExample, ellipsisButton, 1);
        });

        it('should check impossible select columns multiple times', () => {
            scrollIntoView(tableP13SortExample);
            click(tableP13SortExample + ellipsisButton);
            click(popoverDropdownButton);
            expect(isElementDisplayed(dropdownList)).toBe(true);
            click(dropdownOption);

            click(dialogButton, 1);
            click(popoverDropdownButton, 2);
            expect(isElementDisplayed(dropdownList)).toBe(true);
            click(dropdownOption);

            click(dialogButton, 3);
            click(popoverDropdownButton, 4);
            expect(doesItExist(dropdownList)).toBe(false);
        });
    });

    describe('Check Filtering by multiple columns', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableP13FilterExample, tableCellArr5);
        });

        it('should check filtering with include and exclude', () => {
            scrollIntoView(tableP13FilterExample);
            click(tableP13FilterExample + ellipsisButton);
            setValue(dialogInput, astroTestText);
            click(expandedButton, 1);
            click(popoverDropdownButton, 2);
            click(filterByColorItem, 1);
            setValue(dialogInput, testText7, 1);
            click(footerButtonOk);

            const rowLength = getElementArrayLength(tableP13FilterExample + tableRow);
            expect(rowLength).toEqual(1);
            expect(getText(tableP13FilterExample + tableRow + tableCellText).trim()).toBe(testText4);
            expect(getText(tableP13FilterExample + tableRow + tableCellText, 1).trim()).toBe(testText5);
        });

        it('should check searching and placeholder in dialog', () => {
            checkPlaceholder(tableP13FilterExample, 3);
            checkSearchingInDialog();
        });

        it('should check sorting of columns', () => {
            checkSortingColumns(tableP13FilterExample, ellipsisButton, 1);
        });
        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7005
        xit('should check Exclude section in dialog always open', () => {
            scrollIntoView(tableP13FilterExample);
            click(tableP13FilterExample + buttonFilter);
            expect(getAttributeByName(expandedOption, 'aria-expanded')).toBe('false');
        });
    });

    describe('Check Grouping by multiple columns', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableP13GroupExample, tableCellArr4);
        });

        it('should check searching and placeholder in dialog', () => {
            checkPlaceholder(tableP13GroupExample, 3);
            checkSearchingInDialog();
        });

        it('should check sorting of columns', () => {
            checkSortingColumns(tableP13GroupExample, ellipsisButton, 1);
        });
    });

    describe('Check  Navigatable rows', () => {
        it('should check example', () => {
            scrollIntoView(tableNavigatableRowIndicatorExample);
            click(tableNavigatableRowIndicatorExample + button);
            checkElArrIsClickable(tableNavigatableRowIndicatorExample + tableRow);

            click(tableNavigatableRowIndicatorExample + button, 1);
            expect(getElementClass(tableNavigatableRowIndicatorExample + tableRow, 1)).toBe(
                'fd-table__row fd-table__row--main ng-star-inserted'
            );
        });
    });

    describe('Checks for all examples', () => {
        it('should check placeholders in all input fields', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 0; i < inputLength; i++) {
                expect(getElementPlaceholder(inputFields, i)).toBe(placeholderTestText);
            }
        });

        it('should check clickability synchronize button', () => {
            const buttonLength = getElementArrayLength(synchronizeButton);
            for (let i = 0; i < buttonLength; i++) {
                expect(isElementClickable(synchronizeButton, i)).toBe(
                    true,
                    `synchronize button with index ${i} not clickable`
                );
            }
        });
    });

    describe('Check playground', () => {
        it('should check table item single selection', () => {
            scrollIntoView(playgroundExample);
            setValue(playgroundExample + inputFields, tableCellArr[1]);
            click(playgroundExample + buttonSearch);
            const rowLength = getElementArrayLength(playgroundExample + tableRow);
            expect(rowLength).toEqual(1);
            const cellLength = getElementArrayLength(playgroundExample + tableRow + tableCellText);
            for (let i = 0; i < cellLength; i++) {
                expect(getText(playgroundExample + tableRow + tableCellText, i).trim()).toBe(tableCellArr[i]);
            }
        });

        it('should check clickability action button', () => {
            scrollIntoView(playgroundExample);
            expect(isElementClickable(playgroundExample + button, 1)).toBe(true, ' action button not clickable');
        });

        it('should check table content density', () => {
            scrollIntoView(playgroundExample);
            click(playgroundContentDensityDropdown);
            click(optionCompact);
            expect(getElementClass(playgroundExample + fdpTable)).toContain('fd-table--compact');

            click(playgroundContentDensityDropdown);
            click(optionCozy);
            expect(getElementClass(playgroundExample + fdpTable)).toContain('fdp-table');

            click(playgroundContentDensityDropdown);
            click(optionCondensed);
            expect(getElementClass(playgroundExample + fdpTable)).toContain('fd-table--condensed');
        });

        it('should check table selection mode', () => {
            scrollIntoView(playgroundExample);
            click(playgroundSelectionModeDropdown);
            click(optionSingle);
            expect(getElementClass(playgroundExample + tableCellFixed)).toContain('fd-table__cell--fixed');

            click(playgroundSelectionModeDropdown);
            click(optionMultiple);
            expect(getElementClass(playgroundExample + tableCellFixed)).toContain('fd-table__cell--checkbox');
        });

        it('should check table without horizontal borders', () => {
            scrollIntoView(playgroundExample);
            click(playgroundExample + checkbox);
            expect(getElementClass(playgroundExample + fdpTable)).toContain('fd-table--no-horizontal-borders');
        });

        it('should check table without vertical borders', () => {
            scrollIntoView(playgroundExample);
            click(playgroundExample + checkbox, 1);
            expect(getElementClass(playgroundExample + fdpTable)).toContain('fd-table--no-vertical-borders');
        });

        it('should check table without all borders', () => {
            scrollIntoView(playgroundExample);
            click(playgroundExample + checkbox, 2);
            expect(getElementClass(playgroundExample + fdpTable)).toContain(
                'fd-table--no-horizontal-borders fd-table--no-vertical-borders'
            );
        });

        it('should check busy indicator appearance', () => {
            scrollIntoView(playgroundExample);
            click(playgroundExample + checkbox, 5);
            expect(isElementDisplayed(playgroundExample + busyIndicator)).toBe(true, 'busy indicator not displayed');
        });

        it('should check changing title and hide element count', () => {
            scrollIntoView(playgroundExample);
            setValue(playgroundExample + playgroundSchemaInput, 'test');

            expect(getText(playgroundExample + toolbarText).trim()).toBe('test (30)');

            click(playgroundExample + checkbox, 7);
            expect(getText(playgroundExample + toolbarText).trim()).toBe('test');
        });
    });

    it('should check correct operation x button', () => {
        scrollIntoView(tableDefaultExample);
        setValue(tableDefaultExample + input, 'Astro');
        click(tableDefaultExample + button, 1);

        const filterRowCount = getElementArrayLength(tableDefaultExample + tableRow);
        expect(filterRowCount).toEqual(2);

        click(tableDefaultExample + button);
        const nonFilterRowCount = getElementArrayLength(tableDefaultExample + tableRow);
        expect(nonFilterRowCount).toEqual(16);
    });

    describe('Check Custom component to render "No data" message', () => {
        it('should check alert messages', () => {
            checkAlertMessages(tableNoItemsTemplateExample);
        });
    });

    describe('Check Semantic Highlighting', () => {
        it('should check alert messages', () => {
            checkAlertMessages(tableSemanticExample);
        });

        it('should check table item single selection', () => {
            findElementInTable(tableSemanticExample, tableCellArr);
        });
    });

    describe('Check Row custom CSS class', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableRowClassExample, tableCellArr);
        });
    });

    describe('Check Wrapping text in columns', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableWrapExample, tableCellArr7);
        });

        it('should check alert messages', () => {
            checkAlertMessages(tableWrapExample);
        });
    });

    describe('Check No outer borders', () => {
        it('should check table item single selection', () => {
            findElementInTable(tableNoOuterBordersExample, tableCellArr);
        });

        it('should check alert messages', () => {
            checkAlertMessages(tableNoOuterBordersExample);
        });

        it('should check checkboxes', () => {
            checkAllCheckbox(tableNoOuterBordersExample);
        });
    });

    describe('Check input fields', () => {
        it('should check input fields does not change width', () => {
            const inputFieldLength = getElementArrayLength(allInputFields);
            for (let i = 0; i < inputFieldLength; i++) {
                if (i === 13) {
                    continue;
                }
                const beforeSize = getElementSize(allInputFields, i);
                scrollIntoView(allInputFields, i);
                click(allInputFields, i);
                sendKeys('test');
                const afterSize = getElementSize(allInputFields, i);
                expect(beforeSize).toEqual(afterSize);
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            const exampleAreaContainersArr = '.fd-doc-component';
            const rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

            const switcherLength = getElementArrayLength(exampleAreaContainersArr);
            for (let i = 0; i < switcherLength; i++) {
                if (i === 13) {
                    continue;
                }
                scrollIntoView(rtlSwitcherArr, i);
                click(rtlSwitcherArr, i);
                checkRtlOrientation(exampleAreaContainersArr, i);
                scrollIntoView(rtlSwitcherArr, i);
                click(rtlSwitcherArr, i);
                waitForElDisplayed(exampleAreaContainersArr, i);
                checkLtrOrientation(exampleAreaContainersArr, i);
            }
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            tablePage.saveExampleBaselineScreenshot();
            expect(tablePage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkAlertMessages(selector: string): void {
        scrollIntoView(selector + button);
        click(selector + buttonActionOne);
        expect(getAlertText()).toBe(alertTestText1);
        acceptAlert();

        click(selector + buttonActionTwo);
        expect(getAlertText()).toBe(alertTestText2);
        acceptAlert();
    }

    function findElementInTable(selector: string, arr: string[], count: number = 0): void {
        scrollIntoView(selector + input);
        setValue(selector + input, testText);
        click(selector + buttonSearch);
        const rowLength = getElementArrayLength(selector + tableRow);
        expect(rowLength).toEqual(1);
        const cellLength = getElementArrayLength(selector + tableRow + tableCellText);
        for (let i = 0; i < cellLength - count; i++) {
            expect(getText(selector + tableRow + tableCellText, i).trim()).toBe(arr[i]);
        }
    }

    function chooseSortOptionBy(selector: string, transparentButton: string, index: number): void {
        click(selector + transparentButton);
        click(buttonSortedBy, index);
        click(barButton);
    }

    function checkAllCheckbox(selector): void {
        scrollIntoView(selector);
        click(selector + 'fd-checkbox');
        const checkboxLength = getElementArrayLength(selector + tableRow);
        for (let i = 0; i < checkboxLength; i++) {
            expect(getAttributeByName(selector + tableRow, 'aria-selected', i)).toBe('true');
        }
    }

    function chooseFilter(indexFilter: number, indexBy): void {
        scrollIntoView(tableFilterableExample);
        click(tableFilterableExample + ellipsisButton);
        click(filterItem, indexFilter);
        click(filterByColorItem, indexBy);
        click(barButton);
    }

    function checkPlaceholder(selector: string, index: number = 0): void {
        scrollIntoView(selector);
        click(selector + button, index);
        expect(getElementPlaceholder(dialogCompactInput)).toBe(testTextSearch);
    }

    function checkSearchingInDialog(): void {
        setValue(dialogCompactInput, testTextName);
        const itemLength = getElementArrayLength(dialogItemText);
        expect(itemLength).toEqual(1);
        expect(getText(dialogItemText).trim()).toBe(testTextName);
    }

    function checkSortingColumns(selector: string, transparentButton: string, index: number = 0): void {
        scrollIntoView(selector);
        click(selector + transparentButton, index);
        click(dialogMoveToBottom);
        click(dialogItem);
        click(footerButtonOk);
        expect(getText(selector + columnHeader, 3).trim()).toBe(testTextName);
    }
});
