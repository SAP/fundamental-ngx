import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Table, TableDataSource, TableDataSourceDirective } from '@fundamental-ngx/platform/table-helpers';

import { TableComponent } from './table.component';
import { PlatformTableModule } from './table.module';
import { TableDataProviderMock } from './tests/helpers';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: Table, useValue: {} }],
            imports: [PlatformTableModule, NoopAnimationsModule, TableDataSourceDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        component._dataSourceDirective.dataSource = new TableDataSource(new TableDataProviderMock());

        fixture.detectChanges();
    });

    it('should create sucessfully', () => {
        expect(component).toBeTruthy();
    });

    describe('isBodyHeightValid', () => {
        it('should return true when valid body height is passed in pixels', () => {
            component.bodyHeight = '30px';
            expect(component.isBodyHeightValid).toBeTruthy();
        });

        it('should return false when invalid body height is passed in pixels', () => {
            component.bodyHeight = 'thirtypx';
            expect(component.isBodyHeightValid).toBeFalsy();
        });

        it('should return false when invalid body height is passed(without units)', () => {
            component.bodyHeight = '100';
            expect(component.isBodyHeightValid).toBeFalsy();
        });

        it('should return true when valid body height is passed in percentage', () => {
            component.bodyHeight = '75%';
            expect(component.isBodyHeightValid).toBeTruthy();
        });

        it('should return false when invalid body height is passed in pixels', () => {
            component.bodyHeight = 'seventyfive%';
            expect(component.isBodyHeightValid).toBeFalsy();
        });

        it('should return false when invalid body height(undefined)', () => {
            component.bodyHeight = 'seventyfive%';
            expect(component.isBodyHeightValid).toBeFalsy();
        });
    });

    describe('tableBodyHeight', () => {
        it('should return body height of the table when its valid', () => {
            const mockBodyHeight = '750px';
            component.bodyHeight = mockBodyHeight;

            expect(component.tableBodyHeight).toEqual(mockBodyHeight);
        });

        it('should return default body height(100%) when its in-valid case 1(seventyFivepx)', () => {
            const mockBodyHeight = 'seventyFivepx';
            component.bodyHeight = mockBodyHeight;

            expect(component.tableBodyHeight).toEqual('100%');
        });

        it('should return default body height(100%) when its in-valid case 2(thirty%)', () => {
            const mockBodyHeight = 'thirty%';
            component.bodyHeight = mockBodyHeight;

            expect(component.tableBodyHeight).toEqual('100%');
        });

        it('should return default body height(100%) when its in-valid case 3(blank string)', () => {
            const mockBodyHeight = '';
            component.bodyHeight = mockBodyHeight;

            expect(component.tableBodyHeight).toEqual('100%');
        });

        it('should return default body height(100%) when its in-valid case 3(undefined)', () => {
            expect(component.tableBodyHeight).toEqual('100%');
        });
    });

    describe('setTableState', () => {
        it('should set all table state properties when called with full TableState', () => {
            const mockState = {
                sortBy: [{ field: 'name', direction: 'asc' }],
                filterBy: [{ field: 'status', value: 'active' }],
                groupBy: [{ field: 'category', direction: 'asc' }],
                columns: ['col1', 'col2', 'col3'],
                searchInput: 'test search',
                freezeToColumn: 'col1',
                page: { currentPage: 2, pageSize: 25 }
            };

            jest.spyOn(component['_tableService'], 'getDefaultState').mockReturnValue({});
            jest.spyOn(component['_tableService'], 'setSort');
            jest.spyOn(component['_tableService'], 'setFilters');
            jest.spyOn(component['_tableService'], 'setGroups');
            jest.spyOn(component, 'setColumns');
            jest.spyOn(component['_tableService'], 'search');
            jest.spyOn(component['_tableService'], 'freezeTo');
            jest.spyOn(component['_tableService'], 'setCurrentPage');
            jest.spyOn(component['_tableService'], 'setTableState');
            jest.spyOn(component['_cdr'], 'markForCheck');

            component.setTableState(mockState);

            expect(component['_tableService'].setSort).toHaveBeenCalledWith(mockState.sortBy);
            expect(component['_tableService'].setFilters).toHaveBeenCalledWith(mockState.filterBy);
            expect(component['_tableService'].setGroups).toHaveBeenCalledWith(mockState.groupBy);
            expect(component.setColumns).toHaveBeenCalledWith(mockState.columns);
            expect(component['_tableService'].search).toHaveBeenCalledWith(mockState.searchInput);
            expect(component['_tableService'].freezeTo).toHaveBeenCalledWith(mockState.freezeToColumn);
            expect(component.pageSize).toBe(25);
            expect(component['_tableService'].setCurrentPage).toHaveBeenCalledWith(2);
            expect(component['_tableService'].setTableState).toHaveBeenCalled();
            expect(component['_cdr'].markForCheck).toHaveBeenCalled();
        });

        it('should set table state with PlatformTableManagedPreset (partial state)', () => {
            const mockPreset = {
                sortBy: [{ field: 'name', direction: 'asc' }],
                columns: ['col1', 'col2']
            };

            jest.spyOn(component['_tableService'], 'getDefaultState').mockReturnValue({
                filterBy: [],
                groupBy: [],
                searchInput: '',
                freezeToColumn: null,
                page: { currentPage: 1, pageSize: 10 }
            });
            jest.spyOn(component['_tableService'], 'setSort');
            jest.spyOn(component['_tableService'], 'setFilters');
            jest.spyOn(component['_tableService'], 'setGroups');
            jest.spyOn(component, 'setColumns');
            jest.spyOn(component['_tableService'], 'search');
            jest.spyOn(component['_tableService'], 'freezeTo');
            jest.spyOn(component['_tableService'], 'setCurrentPage');
            jest.spyOn(component['_tableService'], 'setTableState');
            jest.spyOn(component['_cdr'], 'markForCheck');

            component.setTableState(mockPreset);

            expect(component['_tableService'].setSort).toHaveBeenCalledWith(mockPreset.sortBy);
            expect(component.setColumns).toHaveBeenCalledWith(mockPreset.columns);
            expect(component['_tableService'].setTableState).toHaveBeenCalled();
            expect(component['_cdr'].markForCheck).toHaveBeenCalled();
        });

        it('should store the provided state in _currentPreset', () => {
            const mockState = {
                columns: ['col1', 'col2'],
                page: { currentPage: 1, pageSize: 10 }
            };

            jest.spyOn(component['_tableService'], 'getDefaultState').mockReturnValue({});
            jest.spyOn(component['_tableService'], 'setSort');
            jest.spyOn(component['_tableService'], 'setFilters');
            jest.spyOn(component['_tableService'], 'setGroups');
            jest.spyOn(component, 'setColumns');
            jest.spyOn(component['_tableService'], 'search');
            jest.spyOn(component['_tableService'], 'freezeTo');
            jest.spyOn(component['_tableService'], 'setCurrentPage');
            jest.spyOn(component['_tableService'], 'setTableState');

            component.setTableState(mockState);

            expect(component['_currentPreset']).toBe(mockState);
        });

        it('should merge provided state with default state', () => {
            const mockDefaultState = {
                sortBy: [],
                filterBy: [],
                groupBy: [],
                columns: [],
                searchInput: '',
                freezeToColumn: null,
                page: { currentPage: 1, pageSize: 10 }
            };

            const mockProvidedState = {
                sortBy: [{ field: 'name', direction: 'asc' }],
                columns: ['col1']
            };

            jest.spyOn(component['_tableService'], 'getDefaultState').mockReturnValue(mockDefaultState);
            jest.spyOn(component['_tableService'], 'setSort');
            jest.spyOn(component['_tableService'], 'setFilters');
            jest.spyOn(component['_tableService'], 'setGroups');
            jest.spyOn(component, 'setColumns');
            jest.spyOn(component['_tableService'], 'search');
            jest.spyOn(component['_tableService'], 'freezeTo');
            jest.spyOn(component['_tableService'], 'setCurrentPage');
            jest.spyOn(component['_tableService'], 'setTableState');

            component.setTableState(mockProvidedState);

            expect(component['_tableService'].setSort).toHaveBeenCalledWith(mockProvidedState.sortBy);
            expect(component['_tableService'].setFilters).toHaveBeenCalledWith(mockDefaultState.filterBy);
            expect(component['_tableService'].setGroups).toHaveBeenCalledWith(mockDefaultState.groupBy);
            expect(component.setColumns).toHaveBeenCalledWith(mockProvidedState.columns);
        });
    });

    describe('setPreset', () => {
        it('should call setTableState with the provided preset data', () => {
            const mockPreset = {
                sortBy: [{ field: 'name', direction: 'asc' }],
                columns: ['col1', 'col2']
            };

            jest.spyOn(component, 'setTableState');

            component.setPreset(mockPreset);

            expect(component.setTableState).toHaveBeenCalledWith(mockPreset);
        });

        it('should delegate all preset logic to setTableState', () => {
            const mockPreset = {
                filterBy: [{ field: 'status', value: 'active' }],
                page: { currentPage: 3, pageSize: 50 }
            };

            jest.spyOn(component, 'setTableState').mockImplementation(() => {});
            jest.spyOn(component['_tableService'], 'setFilters');

            component.setPreset(mockPreset);

            expect(component.setTableState).toHaveBeenCalledTimes(1);
            expect(component.setTableState).toHaveBeenCalledWith(mockPreset);
            // Verify setPreset itself doesn't call table service methods directly
            expect(component['_tableService'].setFilters).not.toHaveBeenCalled();
        });
    });
});
