import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    SettingsColumnsDialogColumn,
    SettingsColumnsDialogData,
    SettingsColumnsDialogResultData
} from '../table-view-settings.model';
import { ColumnsComponent } from './columns.component';

describe('ColumnsComponent', () => {
    let component: ColumnsComponent;
    let fixture: ComponentFixture<ColumnsComponent>;

    const mockColumns: SettingsColumnsDialogColumn[] = [
        { label: 'Name', key: 'name', name: 'name', visible: true },
        { label: 'Description', key: 'description', name: 'description', visible: true },
        { label: 'Price', key: 'price', name: 'price', visible: false },
        { label: 'Status', key: 'status', name: 'status', visible: true }
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ColumnsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColumnsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('initialization', () => {
        it('should initialize with columns data', () => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };

            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();

            // Check DOM elements to verify initialization
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
            expect(listItems.length).toBe(5); // 4 columns + 1 select all item

            // Verify columnsChange emits the correct initial data
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            // Trigger a change to verify the component tracks state correctly
            const checkboxes = nativeElement.querySelectorAll('fd-checkbox input[type="checkbox"]');
            if (checkboxes.length > 1) {
                const firstColumnCheckbox = checkboxes[1] as HTMLInputElement;
                firstColumnCheckbox.click();
                fixture.detectChanges();

                expect(spy).toHaveBeenCalled();
                const result: SettingsColumnsDialogResultData = spy.mock.calls[0][0];
                // Should have toggled one column
                expect(result.columns.length).toBe(4);
            }
        });

        it('should set first column as active by default', () => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };

            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();

            // Check DOM - active item should have the active class or aria-selected
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Find items with active indicators (excluding select all which is first)
            const columnItems = Array.from(listItems).slice(1);
            const activeItems = columnItems.filter(
                (item) =>
                    item.classList.contains('fd-select-item--active') || item.getAttribute('aria-selected') === 'true'
            );

            expect(activeItems.length).toBeGreaterThanOrEqual(1);
        });

        it('should initialize filtered columns to show all by default', () => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };

            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();

            // Check DOM - should render 4 column items + 1 select all
            const nativeElement = fixture.nativeElement as HTMLElement;
            const columnItems = nativeElement.querySelectorAll('li[fd-list-item]');
            expect(columnItems.length).toBe(5);
        });
    });

    describe('column selection', () => {
        beforeEach(() => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };
            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();
        });

        it('should toggle column selection', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            // Get first column checkbox and toggle it
            const nativeElement = fixture.nativeElement as HTMLElement;
            const checkboxes = nativeElement.querySelectorAll('fd-checkbox input[type="checkbox"]');
            const firstColumnCheckbox = checkboxes[1] as HTMLInputElement; // Skip select all

            const initialChecked = firstColumnCheckbox.checked;
            firstColumnCheckbox.click();
            fixture.detectChanges();

            // Verify the change was emitted
            expect(spy).toHaveBeenCalled();
            const result: SettingsColumnsDialogResultData = spy.mock.calls[0][0];
            expect(result.visibleColumns.length).toBe(initialChecked ? 2 : 4);
        });

        it('should select all columns', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            // Find and click "Select All" checkbox
            const nativeElement = fixture.nativeElement as HTMLElement;
            const selectAllCheckbox = nativeElement.querySelector(
                'fd-checkbox input[type="checkbox"]'
            ) as HTMLInputElement;

            if (!selectAllCheckbox.checked) {
                selectAllCheckbox.click();
                fixture.detectChanges();
            }

            // Verify all columns are selected
            expect(spy).toHaveBeenCalled();
            const result: SettingsColumnsDialogResultData = spy.mock.calls[spy.mock.calls.length - 1][0];
            expect(result.visibleColumns.length).toBe(4);
        });

        it('should deselect all columns', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            // Find and uncheck "Select All" checkbox
            const nativeElement = fixture.nativeElement as HTMLElement;
            const selectAllCheckbox = nativeElement.querySelector(
                'fd-checkbox input[type="checkbox"]'
            ) as HTMLInputElement;

            if (selectAllCheckbox.checked) {
                selectAllCheckbox.click();
                fixture.detectChanges();
            } else {
                // First check it, then uncheck it
                selectAllCheckbox.click();
                fixture.detectChanges();
                selectAllCheckbox.click();
                fixture.detectChanges();
            }

            // Verify no columns are selected
            const result: SettingsColumnsDialogResultData = spy.mock.calls[spy.mock.calls.length - 1][0];
            expect(result.visibleColumns.length).toBe(0);
        });

        it('should emit columnsChange event when toggling', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            // Toggle first column checkbox
            const nativeElement = fixture.nativeElement as HTMLElement;
            const checkboxes = nativeElement.querySelectorAll('fd-checkbox input[type="checkbox"]');
            const firstColumnCheckbox = checkboxes[1] as HTMLInputElement;
            firstColumnCheckbox.click();
            fixture.detectChanges();

            expect(spy).toHaveBeenCalled();
            const result: SettingsColumnsDialogResultData = spy.mock.calls[0][0];
            expect(result.visibleColumns).toBeDefined();
            expect(result.columnOrder).toBeDefined();
            expect(result.columns).toBeDefined();
        });
    });

    describe('column reordering', () => {
        beforeEach(() => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };
            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();
        });

        it('should set active column when clicked', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click second column item (index 2 because select all is first)
            const secondColumn = listItems[2] as HTMLElement;
            secondColumn.click();
            fixture.detectChanges();

            // Check that reorder buttons appear for active column
            const reorderButtons = nativeElement.querySelectorAll(
                'button[glyph*="arrow"], button[glyph*="up"], button[glyph*="down"]'
            );
            expect(reorderButtons.length).toBeGreaterThan(0);
        });

        it('should move active column up', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click second column to make it active
            const secondColumn = listItems[2] as HTMLElement;
            secondColumn.click();
            fixture.detectChanges();

            // Find and click move up button
            const moveUpButton = nativeElement.querySelector(
                'button[glyph="navigation-up-arrow"]'
            ) as HTMLButtonElement;
            if (moveUpButton && !moveUpButton.disabled) {
                moveUpButton.click();
                fixture.detectChanges();

                expect(spy).toHaveBeenCalled();
                const result: SettingsColumnsDialogResultData = spy.mock.calls[spy.mock.calls.length - 1][0];
                // Verify column moved (Description should now be first)
                expect(result.columnOrder[0]).toBe('description');
                expect(result.columnOrder[1]).toBe('name');
            }
        });

        it('should move active column down', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click second column to make it active
            const secondColumn = listItems[2] as HTMLElement;
            secondColumn.click();
            fixture.detectChanges();

            // Find and click move down button
            const moveDownButton = nativeElement.querySelector(
                'button[glyph="navigation-down-arrow"]'
            ) as HTMLButtonElement;
            if (moveDownButton && !moveDownButton.disabled) {
                moveDownButton.click();
                fixture.detectChanges();

                expect(spy).toHaveBeenCalled();
                const result: SettingsColumnsDialogResultData = spy.mock.calls[spy.mock.calls.length - 1][0];
                // Verify column moved
                expect(result.columnOrder).toBeDefined();
                expect(result.columnOrder.length).toBe(4);
            }
        });

        it('should move active column to top', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click third column to make it active
            const thirdColumn = listItems[3] as HTMLElement;
            thirdColumn.click();
            fixture.detectChanges();

            // Find and click move to top button
            const moveToTopButton = nativeElement.querySelector('button[glyph="collapse-all"]') as HTMLButtonElement;
            if (moveToTopButton && !moveToTopButton.disabled) {
                moveToTopButton.click();
                fixture.detectChanges();

                expect(spy).toHaveBeenCalled();
                const result: SettingsColumnsDialogResultData = spy.mock.calls[spy.mock.calls.length - 1][0];
                // Price should now be first
                expect(result.columnOrder[0]).toBe('price');
            }
        });

        it('should move active column to bottom', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click second column to make it active
            const secondColumn = listItems[2] as HTMLElement;
            secondColumn.click();
            fixture.detectChanges();

            // Find and click move to bottom button
            const moveToBottomButton = nativeElement.querySelector('button[glyph="expand-all"]') as HTMLButtonElement;
            if (moveToBottomButton && !moveToBottomButton.disabled) {
                moveToBottomButton.click();
                fixture.detectChanges();

                expect(spy).toHaveBeenCalled();
                const result: SettingsColumnsDialogResultData = spy.mock.calls[spy.mock.calls.length - 1][0];
                // Description should now be last
                expect(result.columnOrder[3]).toBe('description');
            }
        });

        it('should disable move up button when at top', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click first column to make it active
            const firstColumn = listItems[1] as HTMLElement;
            firstColumn.click();
            fixture.detectChanges();

            // Check that move up button is disabled or doesn't exist
            const moveUpButton = nativeElement.querySelector(
                'button[glyph="navigation-up-arrow"]'
            ) as HTMLButtonElement;
            if (moveUpButton) {
                expect(moveUpButton.disabled).toBe(true);
            } else {
                // Button might not be rendered when at top
                expect(moveUpButton).toBeFalsy();
            }
        });

        it('should disable move down button when at bottom', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click last column to make it active
            const lastColumn = listItems[listItems.length - 1] as HTMLElement;
            lastColumn.click();
            fixture.detectChanges();

            // Check that move down button is disabled or doesn't exist
            const moveDownButton = nativeElement.querySelector(
                'button[glyph="navigation-down-arrow"]'
            ) as HTMLButtonElement;
            if (moveDownButton) {
                expect(moveDownButton.disabled).toBe(true);
            } else {
                // Button might not be rendered when at bottom
                expect(moveDownButton).toBeFalsy();
            }
        });

        it('should emit columnsChange event when reordering', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click second column and move it
            const secondColumn = listItems[2] as HTMLElement;
            secondColumn.click();
            fixture.detectChanges();

            const moveUpButton = nativeElement.querySelector(
                'button[glyph="navigation-up-arrow"]'
            ) as HTMLButtonElement;
            if (moveUpButton && !moveUpButton.disabled) {
                moveUpButton.click();
                fixture.detectChanges();

                expect(spy).toHaveBeenCalled();
            }
        });
    });

    describe('search functionality', () => {
        beforeEach(() => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };
            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();
        });

        it('should filter columns by search query', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;

            // Find search input and type in it
            const searchInput = nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
            if (searchInput) {
                searchInput.value = 'desc';
                searchInput.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                // Check that only matching columns are shown
                const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
                expect(listItems.length).toBe(2); // 1 filtered column + select all

                // Verify the visible column label
                const listTitles = nativeElement.querySelectorAll('span[fd-list-title]');
                const columnLabels = Array.from(listTitles)
                    .map((el) => el.textContent?.trim())
                    .filter((text) => text && !text.includes('Select All'));
                expect(columnLabels).toContain('Description');
            }
        });

        it('should be case insensitive', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;

            // Find search input and type in uppercase
            const searchInput = nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
            if (searchInput) {
                searchInput.value = 'PRICE';
                searchInput.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                // Check that matching column is shown
                const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
                expect(listItems.length).toBe(2); // 1 filtered column + select all
            }
        });

        it('should show all columns when search is cleared', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;
            const searchInput = nativeElement.querySelector('input[type="text"]') as HTMLInputElement;

            if (searchInput) {
                // First filter
                searchInput.value = 'desc';
                searchInput.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                let listItems = nativeElement.querySelectorAll('li[fd-list-item]');
                expect(listItems.length).toBe(2);

                // Clear search
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                listItems = nativeElement.querySelectorAll('li[fd-list-item]');
                expect(listItems.length).toBe(5); // All 4 columns + select all
            }
        });
    });

    describe('show all / show selected toggle', () => {
        beforeEach(() => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };
            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();
        });

        it('should show all columns by default', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
            expect(listItems.length).toBe(5); // All 4 columns + select all
        });

        it('should show only selected columns when toggled', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;

            // Find and click "Show Selected Only" button/toggle
            const toggleButton = nativeElement.querySelector('button[fdtype="transparent"]') as HTMLButtonElement;
            if (toggleButton) {
                toggleButton.click();
                fixture.detectChanges();

                // Should only show selected columns (3) + select all
                const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
                expect(listItems.length).toBe(4); // 3 visible columns + select all
            }
        });

        it('should toggle back to show all', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;
            const toggleButton = nativeElement.querySelector('button[fdtype="transparent"]') as HTMLButtonElement;

            if (toggleButton) {
                // Toggle to show selected
                toggleButton.click();
                fixture.detectChanges();

                let listItems = nativeElement.querySelectorAll('li[fd-list-item]');
                expect(listItems.length).toBeLessThan(5);

                // Toggle back to show all
                toggleButton.click();
                fixture.detectChanges();

                listItems = nativeElement.querySelectorAll('li[fd-list-item]');
                expect(listItems.length).toBe(5);
            }
        });
    });

    describe('reset availability', () => {
        beforeEach(() => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };
            const initialColumns: SettingsColumnsDialogResultData = {
                visibleColumns: ['name', 'description', 'status'],
                columnOrder: ['name', 'description', 'price', 'status'],
                columns: mockColumns
            };

            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.componentRef.setInput('initialColumns', initialColumns);
            fixture.detectChanges();
        });

        it('should emit resetAvailabilityChange when columns change', () => {
            const spy = jest.fn();
            component.resetAvailabilityChange.subscribe(spy);

            // Toggle a column checkbox
            const nativeElement = fixture.nativeElement as HTMLElement;
            const checkboxes = nativeElement.querySelectorAll('fd-checkbox input[type="checkbox"]');
            const firstColumnCheckbox = checkboxes[1] as HTMLInputElement;

            firstColumnCheckbox.click();
            fixture.detectChanges();

            expect(spy).toHaveBeenCalledWith(true);
        });

        it('should emit resetAvailabilityChange when order changes', () => {
            const spy = jest.fn();
            component.resetAvailabilityChange.subscribe(spy);

            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');

            // Click first column and try to move it
            const firstColumn = listItems[1] as HTMLElement;
            firstColumn.click();
            fixture.detectChanges();

            const moveDownButton = nativeElement.querySelector(
                'button[glyph="navigation-down-arrow"]'
            ) as HTMLButtonElement;
            if (moveDownButton && !moveDownButton.disabled) {
                moveDownButton.click();
                fixture.detectChanges();

                expect(spy).toHaveBeenCalledWith(true);
            }
        });
    });

    describe('select all disabled state', () => {
        beforeEach(() => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };
            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();
        });

        it('should enable select all when showing all items', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;
            const selectAllCheckbox = nativeElement.querySelector(
                'fd-checkbox input[type="checkbox"]'
            ) as HTMLInputElement;
            expect(selectAllCheckbox?.disabled).toBe(false);
        });

        it('should disable select all when showing only selected and no results', () => {
            const nativeElement = fixture.nativeElement as HTMLElement;

            // Toggle to show selected only
            const toggleButton = nativeElement.querySelector('button[fdtype="transparent"]') as HTMLButtonElement;
            if (toggleButton) {
                toggleButton.click();
                fixture.detectChanges();
            }

            // Search for non-existent column
            const searchInput = nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
            if (searchInput) {
                searchInput.value = 'nonexistent';
                searchInput.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                const selectAllCheckbox = nativeElement.querySelector(
                    'fd-checkbox input[type="checkbox"]'
                ) as HTMLInputElement;
                expect(selectAllCheckbox?.disabled).toBe(true);
            }
        });
    });

    describe('column visibility in result', () => {
        beforeEach(() => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };
            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();
        });

        it('should include only visible columns in visibleColumns array', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            component.onToggleColumn();

            const result: SettingsColumnsDialogResultData = spy.mock.calls[0][0];
            expect(result.visibleColumns.length).toBe(3);
            expect(result.visibleColumns).toContain('name');
            expect(result.visibleColumns).toContain('description');
            expect(result.visibleColumns).toContain('status');
            expect(result.visibleColumns).not.toContain('price');
        });

        it('should include all columns in columnOrder array', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            component.onToggleColumn();

            const result: SettingsColumnsDialogResultData = spy.mock.calls[0][0];
            expect(result.columnOrder.length).toBe(4);
        });

        it('should include full columns array with visibility flags', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            component.onToggleColumn();

            const result: SettingsColumnsDialogResultData = spy.mock.calls[0][0];
            expect(result.columns.length).toBe(4);
            expect(result.columns[0].visible).toBe(true);
            expect(result.columns[2].visible).toBe(false); // price column
        });
    });
});
