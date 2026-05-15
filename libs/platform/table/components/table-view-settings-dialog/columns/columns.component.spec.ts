import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ColumnsComponent } from './columns.component';
import {
    SettingsColumnsDialogColumn,
    SettingsColumnsDialogData,
    SettingsColumnsDialogResultData
} from '../table-view-settings.model';

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

            expect(component._selectableColumns().length).toBe(4);
            expect(component._selectedColumnsCount()).toBe(3); // 3 visible columns

            // Check DOM elements
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
            expect(listItems.length).toBe(5); // 4 columns + 1 select all item
        });

        it('should set first column as active by default', () => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };

            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();

            const selectableColumns = component._selectableColumns();
            expect(selectableColumns[0].active).toBe(true);
            expect(selectableColumns[1].active).toBe(false);

            // Check DOM - active item should have the active class
            const nativeElement = fixture.nativeElement as HTMLElement;
            const activeItems = nativeElement.querySelectorAll('.fd-select-item--active');
            expect(activeItems.length).toBe(1);
        });

        it('should initialize filtered columns to show all by default', () => {
            const columnsData: SettingsColumnsDialogData = {
                columns: mockColumns
            };

            fixture.componentRef.setInput('columnsData', columnsData);
            fixture.detectChanges();

            expect(component._filteredColumns().length).toBe(4); // All columns visible initially

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
            const selectableColumns = component._selectableColumns();
            const initialSelected = selectableColumns[0].selected;

            selectableColumns[0].selected = !initialSelected;
            component._onToggleColumn();

            expect(component._selectedColumnsCount()).toBe(initialSelected ? 2 : 4);
        });

        it('should select all columns', () => {
            component._toggleSelectAll(true);

            expect(component._selectedColumnsCount()).toBe(4);
            const selectableColumns = component._selectableColumns();
            selectableColumns.forEach(col => {
                expect(col.selected).toBe(true);
            });
        });

        it('should deselect all columns', () => {
            component._toggleSelectAll(false);

            expect(component._selectedColumnsCount()).toBe(0);
            const selectableColumns = component._selectableColumns();
            selectableColumns.forEach(col => {
                expect(col.selected).toBe(false);
            });
        });

        it('should emit columnsChange event when toggling', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            component._onToggleColumn();

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

        it('should set active column', () => {
            const selectableColumns = component._selectableColumns();
            const targetColumn = selectableColumns[1];

            component._setActiveColumn(targetColumn);

            expect(selectableColumns[0].active).toBe(false);
            expect(selectableColumns[1].active).toBe(true);
            expect(selectableColumns[2].active).toBe(false);
        });

        it('should move active column up', () => {
            const selectableColumns = component._selectableColumns();
            component._setActiveColumn(selectableColumns[1]);

            const event = new Event('click');
            component._moveActiveUp(event);

            const updatedColumns = component._selectableColumns();
            expect(updatedColumns[0].column.name).toBe('description');
            expect(updatedColumns[1].column.name).toBe('name');
        });

        it('should move active column down', () => {
            const selectableColumns = component._selectableColumns();
            component._setActiveColumn(selectableColumns[1]);

            const event = new Event('click');
            component._moveActiveDown(event);

            const updatedColumns = component._selectableColumns();
            expect(updatedColumns[1].column.name).toBe('price');
            expect(updatedColumns[2].column.name).toBe('description');
        });

        it('should move active column to top', () => {
            const selectableColumns = component._selectableColumns();
            component._setActiveColumn(selectableColumns[2]);

            const event = new Event('click');
            component._moveActiveToTop(event);

            const updatedColumns = component._selectableColumns();
            expect(updatedColumns[0].column.name).toBe('price');
        });

        it('should move active column to bottom', () => {
            const selectableColumns = component._selectableColumns();
            component._setActiveColumn(selectableColumns[1]);

            const event = new Event('click');
            component._moveActiveToBottom(event);

            const updatedColumns = component._selectableColumns();
            expect(updatedColumns[3].column.name).toBe('description');
        });

        it('should disable move up button when at top', () => {
            const selectableColumns = component._selectableColumns();
            component._setActiveColumn(selectableColumns[0]);

            expect(component._moveUpDisabled()).toBe(true);
        });

        it('should disable move down button when at bottom', () => {
            const selectableColumns = component._selectableColumns();
            component._setActiveColumn(selectableColumns[3]);

            expect(component._moveDownDisabled()).toBe(true);
        });

        it('should emit columnsChange event when reordering', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            const selectableColumns = component._selectableColumns();
            component._setActiveColumn(selectableColumns[1]);
            const event = new Event('click');
            component._moveActiveUp(event);

            expect(spy).toHaveBeenCalled();
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
            component._searchInputChange({ text: 'desc' });
            fixture.detectChanges();

            expect(component._filteredColumns().length).toBe(1);
            expect(component._filteredColumns()[0].column.name).toBe('description');

            // Check DOM - should only show 1 column item + select all
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
            expect(listItems.length).toBe(2); // 1 filtered column + select all

            // Verify the visible column label
            const listTitles = nativeElement.querySelectorAll('span[fd-list-title]');
            const columnLabels = Array.from(listTitles)
                .map(el => el.textContent?.trim())
                .filter(text => text && !text.includes('Select All'));
            expect(columnLabels).toContain('Description');
        });

        it('should be case insensitive', () => {
            component._searchInputChange({ text: 'PRICE' });
            fixture.detectChanges();

            expect(component._filteredColumns().length).toBe(1);
            expect(component._filteredColumns()[0].column.name).toBe('price');

            // Check DOM
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
            expect(listItems.length).toBe(2);
        });

        it('should show all columns when search is cleared', () => {
            component._searchInputChange({ text: 'desc' });
            fixture.detectChanges();
            expect(component._filteredColumns().length).toBe(1);

            component._searchInputChange({ text: '' });
            fixture.detectChanges();

            expect(component._filteredColumns().length).toBe(4);

            // Check DOM - should show all 4 columns + select all
            const nativeElement = fixture.nativeElement as HTMLElement;
            const listItems = nativeElement.querySelectorAll('li[fd-list-item]');
            expect(listItems.length).toBe(5);
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
            expect(component._showAllItems()).toBe(true);
            expect(component._filteredColumns().length).toBe(4);
        });

        it('should show only selected columns when toggled', () => {
            component._toggleShowAll();
            fixture.detectChanges();

            expect(component._showAllItems()).toBe(false);
            expect(component._filteredColumns().length).toBe(3); // Only visible columns
        });

        it('should toggle back to show all', () => {
            component._toggleShowAll();
            expect(component._showAllItems()).toBe(false);

            component._toggleShowAll();
            expect(component._showAllItems()).toBe(true);
            expect(component._filteredColumns().length).toBe(4);
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

            component._onToggleColumn();

            expect(spy).toHaveBeenCalledWith(true);
        });

        it('should emit resetAvailabilityChange when order changes', () => {
            const spy = jest.fn();
            component.resetAvailabilityChange.subscribe(spy);

            const selectableColumns = component._selectableColumns();
            component._setActiveColumn(selectableColumns[0]);
            const event = new Event('click');
            component._moveActiveDown(event);

            expect(spy).toHaveBeenCalledWith(true);
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
            expect(component._selectAllDisabled).toBe(false);
        });

        it('should disable select all when showing only selected and no results', () => {
            component._toggleShowAll(); // Show only selected
            component._searchInputChange({ text: 'nonexistent' }); // Search that returns no results
            fixture.detectChanges();

            expect(component._selectAllDisabled).toBe(true);
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

            component._onToggleColumn();

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

            component._onToggleColumn();

            const result: SettingsColumnsDialogResultData = spy.mock.calls[0][0];
            expect(result.columnOrder.length).toBe(4);
        });

        it('should include full columns array with visibility flags', () => {
            const spy = jest.fn();
            component.columnsChange.subscribe(spy);

            component._onToggleColumn();

            const result: SettingsColumnsDialogResultData = spy.mock.calls[0][0];
            expect(result.columns.length).toBe(4);
            expect(result.columns[0].visible).toBe(true);
            expect(result.columns[2].visible).toBe(false); // price column
        });
    });
});
