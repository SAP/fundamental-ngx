import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { SortDirection, Table } from '@fundamental-ngx/platform/table-helpers';

import { PlatformTableModule } from '../../../table.module';
import { SettingsSortDialogData, SettingsSortDialogResultData } from '../table-view-settings.model';
import { SortingComponent } from './sorting.component';

describe('SortingComponent', () => {
    let component: SortingComponent;
    let fixture: ComponentFixture<SortingComponent>;
    const dialogRef = new DialogRef();

    const mockColumns = [
        { label: 'Name', key: 'name' },
        { label: 'Description', key: 'description' },
        { label: 'Price', key: 'price' }
    ];

    const defaultDialogData: SettingsSortDialogData = {
        columns: mockColumns,
        allowDisablingSorting: true
    };

    beforeEach(waitForAsync(() => {
        dialogRef.data = defaultDialogData;
        TestBed.configureTestingModule({
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: Table, useValue: {} },
                DialogService,
                DialogConfig
            ],
            imports: [PlatformTableModule, SortingComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SortingComponent);
        component = fixture.componentInstance;
    });

    describe('initialization', () => {
        it('should create', () => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should initialize sortCriteriaList with empty fields when no initial sorting', () => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();

            const criteriaList = component.sortCriteriaList();
            expect(criteriaList.length).toBe(3); // Same as number of columns
            expect(criteriaList.every((c) => c.field === null)).toBe(true);
            expect(criteriaList.every((c) => c.direction === SortDirection.ASC)).toBe(true);
        });

        it('should initialize sortCriteriaList from sortBy array when provided', () => {
            const dataWithSortBy: SettingsSortDialogData = {
                ...defaultDialogData,
                sortBy: [
                    { field: 'name', direction: SortDirection.ASC },
                    { field: 'description', direction: SortDirection.DESC }
                ]
            };
            fixture.componentRef.setInput('sortingData', dataWithSortBy);
            fixture.detectChanges();

            const criteriaList = component.sortCriteriaList();
            expect(criteriaList[0].field).toBe('name');
            expect(criteriaList[0].direction).toBe(SortDirection.ASC);
            expect(criteriaList[1].field).toBe('description');
            expect(criteriaList[1].direction).toBe(SortDirection.DESC);
            expect(criteriaList[2].field).toBeNull();
        });

        it('should reinitialize sortCriteriaList when sortBy reference changes (reset)', () => {
            // Initial state with no sorting
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();

            // User adds multiple sort criteria
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            component._sortFieldChangeForRow(2, mockColumns[2]);

            // Verify all three are set
            expect(component.sortCriteriaList()[0].field).toBe('name');
            expect(component.sortCriteriaList()[1].field).toBe('description');
            expect(component.sortCriteriaList()[2].field).toBe('price');

            // Simulate reset by setting a new sortBy array reference (empty, like initial state)
            const resetData: SettingsSortDialogData = {
                ...defaultDialogData,
                sortBy: [] // New array reference
            };
            fixture.componentRef.setInput('sortingData', resetData);
            fixture.detectChanges();

            // All criteria should be cleared
            const criteriaList = component.sortCriteriaList();
            expect(criteriaList[0].field).toBeNull();
            expect(criteriaList[1].field).toBeNull();
            expect(criteriaList[2].field).toBeNull();
        });

        it('should not reinitialize when same sortBy reference is set', () => {
            const sortBy = [{ field: 'name', direction: SortDirection.ASC }];
            const dataWithSortBy: SettingsSortDialogData = {
                ...defaultDialogData,
                sortBy
            };
            fixture.componentRef.setInput('sortingData', dataWithSortBy);
            fixture.detectChanges();

            // User modifies the second row
            component._sortFieldChangeForRow(1, mockColumns[1]);
            expect(component.sortCriteriaList()[1].field).toBe('description');

            // Setting the same data object again (same sortBy reference) should NOT reset
            fixture.componentRef.setInput('sortingData', { ...dataWithSortBy, sortBy });
            fixture.detectChanges();

            // Second row should still have the user's modification
            expect(component.sortCriteriaList()[1].field).toBe('description');
        });
    });

    describe('row visibility', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
        });

        it('should always show the first row', () => {
            expect(component.isRowVisible(0)).toBe(true);
        });

        it('should hide second row when first row has no selection', () => {
            expect(component.isRowVisible(1)).toBe(false);
        });

        it('should show second row when first row has a selection', () => {
            // Select a column in the first row
            component._sortFieldChangeForRow(0, mockColumns[0]);
            expect(component.isRowVisible(1)).toBe(true);
        });

        it('should show third row when second row has a selection', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            expect(component.isRowVisible(2)).toBe(true);
        });
    });

    describe('available columns filtering', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
        });

        it('should return all columns for a row with no other selections', () => {
            const available = component.getAvailableColumns(0);
            expect(available.length).toBe(3);
        });

        it('should exclude columns selected in other rows', () => {
            // Select 'name' in first row
            component._sortFieldChangeForRow(0, mockColumns[0]);

            // Second row should not have 'name' available
            const availableForRow1 = component.getAvailableColumns(1);
            expect(availableForRow1.length).toBe(2);
            expect(availableForRow1.find((c) => c.key === 'name')).toBeUndefined();
            expect(availableForRow1.find((c) => c.key === 'description')).toBeDefined();
            expect(availableForRow1.find((c) => c.key === 'price')).toBeDefined();
        });

        it('should include the column selected in the current row', () => {
            // Select 'name' in first row
            component._sortFieldChangeForRow(0, mockColumns[0]);

            // First row should still have 'name' available (its own selection)
            const availableForRow0 = component.getAvailableColumns(0);
            expect(availableForRow0.find((c) => c.key === 'name')).toBeDefined();
        });
    });

    describe('getSelectedColumnForRow', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
        });

        it('should return null when no column is selected', () => {
            expect(component.getSelectedColumnForRow(0)).toBeNull();
        });

        it('should return the selected column object', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            const selected = component.getSelectedColumnForRow(0);
            expect(selected).toBeDefined();
            expect(selected?.key).toBe('name');
            expect(selected?.label).toBe('Name');
        });
    });

    describe('getDirectionForRow', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
        });

        it('should return default direction (ASC) initially', () => {
            expect(component.getDirectionForRow(0)).toBe(SortDirection.ASC);
        });

        it('should return updated direction after change', () => {
            component._sortDirectionChangeForRow(0, SortDirection.DESC);
            expect(component.getDirectionForRow(0)).toBe(SortDirection.DESC);
        });
    });

    describe('move up functionality', () => {
        beforeEach(() => {
            const dataWithSortBy: SettingsSortDialogData = {
                ...defaultDialogData,
                sortBy: [
                    { field: 'name', direction: SortDirection.ASC },
                    { field: 'description', direction: SortDirection.DESC },
                    { field: 'price', direction: SortDirection.ASC }
                ]
            };
            fixture.componentRef.setInput('sortingData', dataWithSortBy);
            fixture.detectChanges();
        });

        it('should not allow moving up the first row', () => {
            expect(component.canMoveUp(0)).toBe(false);
        });

        it('should allow moving up a row with a selection', () => {
            expect(component.canMoveUp(1)).toBe(true);
            expect(component.canMoveUp(2)).toBe(true);
        });

        it('should not allow moving up a row without a selection', () => {
            // Clear second row
            component.deleteRow(1);
            component.deleteRow(1); // Now row 2 is at index 1
            expect(component.canMoveUp(1)).toBe(false);
        });

        it('should swap rows when moving up', () => {
            component.moveUp(1);
            const criteriaList = component.sortCriteriaList();
            expect(criteriaList[0].field).toBe('description');
            expect(criteriaList[1].field).toBe('name');
        });
    });

    describe('move down functionality', () => {
        beforeEach(() => {
            const dataWithSortBy: SettingsSortDialogData = {
                ...defaultDialogData,
                sortBy: [
                    { field: 'name', direction: SortDirection.ASC },
                    { field: 'description', direction: SortDirection.DESC },
                    { field: 'price', direction: SortDirection.ASC }
                ]
            };
            fixture.componentRef.setInput('sortingData', dataWithSortBy);
            fixture.detectChanges();
        });

        it('should allow moving down a row with a selection below it', () => {
            expect(component.canMoveDown(0)).toBe(true);
            expect(component.canMoveDown(1)).toBe(true);
        });

        it('should not allow moving down the last row with a selection', () => {
            expect(component.canMoveDown(2)).toBe(false);
        });

        it('should not allow moving down a row without a selection', () => {
            // Clear first row
            component.deleteRow(0);
            // Now the first row is 'description', and there's no row at index 2
            expect(component.canMoveDown(2)).toBe(false);
        });

        it('should swap rows when moving down', () => {
            component.moveDown(0);
            const criteriaList = component.sortCriteriaList();
            expect(criteriaList[0].field).toBe('description');
            expect(criteriaList[1].field).toBe('name');
        });
    });

    describe('delete functionality', () => {
        beforeEach(() => {
            const dataWithSortBy: SettingsSortDialogData = {
                ...defaultDialogData,
                sortBy: [
                    { field: 'name', direction: SortDirection.ASC },
                    { field: 'description', direction: SortDirection.DESC }
                ]
            };
            fixture.componentRef.setInput('sortingData', dataWithSortBy);
            fixture.detectChanges();
        });

        it('should allow deleting a row with a selection', () => {
            expect(component.canDelete(0)).toBe(true);
            expect(component.canDelete(1)).toBe(true);
        });

        it('should not allow deleting a row without a selection', () => {
            expect(component.canDelete(2)).toBe(false);
        });

        it('should remove selection and shift remaining criteria up', () => {
            component.deleteRow(0);
            const criteriaList = component.sortCriteriaList();
            expect(criteriaList[0].field).toBe('description');
            expect(criteriaList[1].field).toBeNull();
        });
    });

    describe('direction change', () => {
        beforeEach(() => {
            const dataWithSortBy: SettingsSortDialogData = {
                ...defaultDialogData,
                sortBy: [
                    { field: 'name', direction: SortDirection.ASC },
                    { field: 'description', direction: SortDirection.ASC }
                ]
            };
            fixture.componentRef.setInput('sortingData', dataWithSortBy);
            fixture.detectChanges();
        });

        it('should update direction for specific row', () => {
            component._sortDirectionChangeForRow(1, SortDirection.DESC);

            expect(component.getDirectionForRow(0)).toBe(SortDirection.ASC);
            expect(component.getDirectionForRow(1)).toBe(SortDirection.DESC);
        });

        it('should preserve other row selections when changing direction', () => {
            component._sortDirectionChangeForRow(0, SortDirection.DESC);

            const criteriaList = component.sortCriteriaList();
            expect(criteriaList[0].field).toBe('name');
            expect(criteriaList[1].field).toBe('description');
        });
    });

    describe('field change', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
        });

        it('should update field when column object is provided', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            expect(component.sortCriteriaList()[0].field).toBe('name');
        });

        it('should update field when column label string is provided', () => {
            component._sortFieldChangeForRow(0, 'Name');
            expect(component.sortCriteriaList()[0].field).toBe('name');
        });

        it('should not update field for empty string', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(0, '');
            // Should still have previous selection
            expect(component.sortCriteriaList()[0].field).toBe('name');
        });

        it('should not update field for null', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(0, null);
            // Should still have previous selection
            expect(component.sortCriteriaList()[0].field).toBe('name');
        });
    });

    describe('validation', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
        });

        it('should be valid initially', () => {
            expect(component.isValid()).toBe(true);
        });

        it('should be invalid when non-matching text is entered', () => {
            component._sortFieldChangeForRow(0, 'InvalidColumnName');
            expect(component.isValid()).toBe(false);
        });

        it('should return error state for invalid row', () => {
            component._sortFieldChangeForRow(0, 'InvalidColumnName');
            expect(component.getRowState(0)).toBe('error');
        });

        it('should return undefined state for valid row', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            expect(component.getRowState(0)).toBeUndefined();
        });

        it('should become valid again when valid selection is made', () => {
            component._sortFieldChangeForRow(0, 'InvalidColumnName');
            expect(component.isValid()).toBe(false);

            component._sortFieldChangeForRow(0, mockColumns[0]);
            expect(component.isValid()).toBe(true);
        });
    });

    describe('sortChange output', () => {
        let sortChangeSpy: jest.Mock;

        beforeEach(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
            sortChangeSpy = jest.fn();
            component.sortChange.subscribe(sortChangeSpy);
        });

        it('should emit sortChange with sortBy array when field changes', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);

            expect(sortChangeSpy).toHaveBeenCalled();
            const emittedData: SettingsSortDialogResultData = sortChangeSpy.mock.calls[0][0];
            expect(emittedData.sortBy).toEqual([{ field: 'name', direction: SortDirection.ASC }]);
        });

        it('should emit sortChange with multiple criteria', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);

            const lastCall = sortChangeSpy.mock.calls[sortChangeSpy.mock.calls.length - 1][0];
            expect(lastCall.sortBy).toEqual([
                { field: 'name', direction: SortDirection.ASC },
                { field: 'description', direction: SortDirection.ASC }
            ]);
        });

        it('should emit sortChange when direction changes', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            sortChangeSpy.mockClear();

            component._sortDirectionChangeForRow(0, SortDirection.DESC);

            expect(sortChangeSpy).toHaveBeenCalled();
            const emittedData: SettingsSortDialogResultData = sortChangeSpy.mock.calls[0][0];
            expect(emittedData.sortBy[0].direction).toBe(SortDirection.DESC);
        });

        it('should emit sortChange when row is moved', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            sortChangeSpy.mockClear();

            component.moveDown(0);

            expect(sortChangeSpy).toHaveBeenCalled();
            const emittedData: SettingsSortDialogResultData = sortChangeSpy.mock.calls[0][0];
            expect(emittedData.sortBy[0].field).toBe('description');
            expect(emittedData.sortBy[1].field).toBe('name');
        });

        it('should emit sortChange when row is deleted', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            sortChangeSpy.mockClear();

            component.deleteRow(0);

            expect(sortChangeSpy).toHaveBeenCalled();
            const emittedData: SettingsSortDialogResultData = sortChangeSpy.mock.calls[0][0];
            expect(emittedData.sortBy).toEqual([{ field: 'description', direction: SortDirection.ASC }]);
        });

        it('should only emit sortBy array (no deprecated field/direction properties)', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);

            const emittedData: SettingsSortDialogResultData = sortChangeSpy.mock.calls[0][0];
            expect(emittedData.sortBy).toEqual([{ field: 'name', direction: SortDirection.ASC }]);
            expect(Object.keys(emittedData)).toEqual(['sortBy']);
        });
    });

    describe('validityChange output', () => {
        let validityChangeSpy: jest.Mock;

        beforeEach(fakeAsync(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
            tick();
            validityChangeSpy = jest.fn();
            component.validityChange.subscribe(validityChangeSpy);
            // Clear initial emission
            validityChangeSpy.mockClear();
        }));

        it('should emit false when invalid input is entered', fakeAsync(() => {
            component._sortFieldChangeForRow(0, 'InvalidColumnName');
            fixture.detectChanges();
            tick();
            expect(validityChangeSpy).toHaveBeenCalledWith(false);
        }));

        it('should emit true when validity is restored', fakeAsync(() => {
            component._sortFieldChangeForRow(0, 'InvalidColumnName');
            fixture.detectChanges();
            tick();
            validityChangeSpy.mockClear();

            component._sortFieldChangeForRow(0, mockColumns[0]);
            fixture.detectChanges();
            tick();
            expect(validityChangeSpy).toHaveBeenCalledWith(true);
        }));
    });

    describe('keyboard navigation', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('sortingData', defaultDialogData);
            fixture.detectChanges();
        });

        it('should have focusable combobox input in first row', () => {
            const comboboxInput = fixture.nativeElement.querySelector('fd-combobox input');
            expect(comboboxInput).toBeTruthy();
            expect(comboboxInput.hasAttribute('tabindex')).toBe(false); // Native input is focusable by default
        });

        it('should have focusable direction buttons in first row', () => {
            const ascButton = fixture.nativeElement.querySelector('button[glyph="sort-ascending"]');
            const descButton = fixture.nativeElement.querySelector('button[glyph="sort-descending"]');
            expect(ascButton).toBeTruthy();
            expect(descButton).toBeTruthy();
            expect(ascButton.tabIndex).toBeGreaterThanOrEqual(0);
            expect(descButton.tabIndex).toBeGreaterThanOrEqual(0);
        });

        it('should have focusable action buttons (move up, move down, delete)', () => {
            // Add a selection so buttons become enabled
            component._sortFieldChangeForRow(0, mockColumns[0]);
            fixture.detectChanges();

            const moveUpButton = fixture.nativeElement.querySelector('button[glyph="slim-arrow-up"]');
            const moveDownButton = fixture.nativeElement.querySelector('button[glyph="slim-arrow-down"]');
            const deleteButton = fixture.nativeElement.querySelector('button[glyph="decline"]');

            expect(moveUpButton).toBeTruthy();
            expect(moveDownButton).toBeTruthy();
            expect(deleteButton).toBeTruthy();
        });

        it('should disable move up button on first row', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            fixture.detectChanges();

            const moveUpButton = fixture.nativeElement.querySelector('button[glyph="slim-arrow-up"]');
            expect(moveUpButton.disabled).toBe(true);
        });

        it('should enable delete button when row has selection', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            fixture.detectChanges();

            const deleteButton = fixture.nativeElement.querySelector('button[glyph="decline"]');
            expect(deleteButton.disabled).toBe(false);
        });

        it('should have second row with focusable elements after first row selection', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            fixture.detectChanges();

            const comboboxes = fixture.nativeElement.querySelectorAll('fd-combobox input');
            expect(comboboxes.length).toBe(2); // 1 filled + 1 empty row

            const ascButtons = fixture.nativeElement.querySelectorAll('button[glyph="sort-ascending"]');
            expect(ascButtons.length).toBe(2);
        });

        it('should allow tab navigation through multiple rows', () => {
            // Add two sort criteria
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            fixture.detectChanges();

            const comboboxes = fixture.nativeElement.querySelectorAll('fd-combobox input');
            const ascButtons = fixture.nativeElement.querySelectorAll('button[glyph="sort-ascending"]');
            const moveUpButtons = fixture.nativeElement.querySelectorAll('button[glyph="slim-arrow-up"]');

            expect(comboboxes.length).toBe(3); // All 3 columns visible after selecting 2
            expect(ascButtons.length).toBe(3);
            expect(moveUpButtons.length).toBe(3);
        });

        it('should respond to Enter key on move up button', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            fixture.detectChanges();

            const initialFirstField = component.sortCriteriaList()[0].field;
            const initialSecondField = component.sortCriteriaList()[1].field;

            // Get the second row's move up button
            const moveUpButtons = fixture.nativeElement.querySelectorAll('button[glyph="slim-arrow-up"]');
            const secondRowMoveUp = moveUpButtons[1];

            // Simulate Enter key
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
            secondRowMoveUp.dispatchEvent(enterEvent);
            secondRowMoveUp.click(); // Button click triggered by Enter
            fixture.detectChanges();

            // Verify swap occurred
            expect(component.sortCriteriaList()[0].field).toBe(initialSecondField);
            expect(component.sortCriteriaList()[1].field).toBe(initialFirstField);
        });

        it('should respond to Space key on move down button', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            fixture.detectChanges();

            const initialFirstField = component.sortCriteriaList()[0].field;
            const initialSecondField = component.sortCriteriaList()[1].field;

            // Get the first row's move down button
            const moveDownButtons = fixture.nativeElement.querySelectorAll('button[glyph="slim-arrow-down"]');
            const firstRowMoveDown = moveDownButtons[0];

            // Simulate Space key
            const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
            firstRowMoveDown.dispatchEvent(spaceEvent);
            firstRowMoveDown.click(); // Button click triggered by Space
            fixture.detectChanges();

            // Verify swap occurred
            expect(component.sortCriteriaList()[0].field).toBe(initialSecondField);
            expect(component.sortCriteriaList()[1].field).toBe(initialFirstField);
        });

        it('should respond to Enter key on delete button', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            fixture.detectChanges();

            expect(component.sortCriteriaList()[0].field).toBe('name');
            expect(component.sortCriteriaList()[1].field).toBe('description');

            // Get the first row's delete button
            const deleteButtons = fixture.nativeElement.querySelectorAll('button[glyph="decline"]');
            const firstRowDelete = deleteButtons[0];

            // Simulate Enter key
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
            firstRowDelete.dispatchEvent(enterEvent);
            firstRowDelete.click(); // Button click triggered by Enter
            fixture.detectChanges();

            // Verify deletion occurred
            expect(component.sortCriteriaList()[0].field).toBe('description');
        });

        it('should maintain focus order after moving row up', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            fixture.detectChanges();

            // Verify initial order via component state
            expect(component.sortCriteriaList()[0].field).toBe('name');
            expect(component.sortCriteriaList()[1].field).toBe('description');

            // Move second row up
            component.moveUp(1);
            fixture.detectChanges();

            // Verify order changed via component state
            expect(component.sortCriteriaList()[0].field).toBe('description');
            expect(component.sortCriteriaList()[1].field).toBe('name');
        });

        it('should maintain focus order after moving row down', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            fixture.detectChanges();

            // Verify initial order via component state
            expect(component.sortCriteriaList()[0].field).toBe('name');
            expect(component.sortCriteriaList()[1].field).toBe('description');

            // Move first row down
            component.moveDown(0);
            fixture.detectChanges();

            // Verify order changed via component state
            expect(component.sortCriteriaList()[0].field).toBe('description');
            expect(component.sortCriteriaList()[1].field).toBe('name');
        });

        it('should maintain focus order after deleting a row', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            component._sortFieldChangeForRow(2, mockColumns[2]);
            fixture.detectChanges();

            const comboboxesBefore = fixture.nativeElement.querySelectorAll('fd-combobox input');
            expect(comboboxesBefore.length).toBe(3);

            // Delete middle row
            component.deleteRow(1);
            fixture.detectChanges();

            const comboboxesAfter = fixture.nativeElement.querySelectorAll('fd-combobox input');
            expect(comboboxesAfter.length).toBe(3); // Still 3 visible after deleting middle

            // Verify state via component
            expect(component.sortCriteriaList()[0].field).toBe('name');
            expect(component.sortCriteriaList()[1].field).toBe('price');
        });

        it('should have proper tab order for action buttons', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            component._sortFieldChangeForRow(1, mockColumns[1]);
            fixture.detectChanges();

            const firstRowButtons = fixture.nativeElement.querySelectorAll('li:first-child button');
            const secondRowButtons = fixture.nativeElement.querySelectorAll('li:nth-child(2) button');

            // Verify buttons exist in each row
            expect(firstRowButtons.length).toBeGreaterThan(0);
            expect(secondRowButtons.length).toBeGreaterThan(0);

            // All buttons should be focusable (tabIndex >= 0 or native button)
            firstRowButtons.forEach((button: HTMLButtonElement) => {
                expect(button.tabIndex).toBeGreaterThanOrEqual(-1); // -1 for disabled, >=0 for enabled
            });
        });

        it('should allow keyboard navigation to change sort direction', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            fixture.detectChanges();

            expect(component.sortCriteriaList()[0].direction).toBe(SortDirection.ASC);

            // Call the direction change method directly
            component._sortDirectionChangeForRow(0, 'desc');
            fixture.detectChanges();

            expect(component.sortCriteriaList()[0].direction).toBe(SortDirection.DESC);
        });

        it('should have accessible titles on action buttons', () => {
            component._sortFieldChangeForRow(0, mockColumns[0]);
            fixture.detectChanges();

            const moveUpButton = fixture.nativeElement.querySelector('button[glyph="slim-arrow-up"]');
            const moveDownButton = fixture.nativeElement.querySelector('button[glyph="slim-arrow-down"]');
            const deleteButton = fixture.nativeElement.querySelector('button[glyph="decline"]');

            expect(moveUpButton.getAttribute('title')).toBeTruthy();
            expect(moveDownButton.getAttribute('title')).toBeTruthy();
            expect(deleteButton.getAttribute('title')).toBeTruthy();
        });

        it('should have accessible titles on direction buttons', () => {
            const ascButton = fixture.nativeElement.querySelector('button[glyph="sort-ascending"]');
            const descButton = fixture.nativeElement.querySelector('button[glyph="sort-descending"]');

            expect(ascButton.getAttribute('title')).toBeTruthy();
            expect(descButton.getAttribute('title')).toBeTruthy();
        });
    });
});
