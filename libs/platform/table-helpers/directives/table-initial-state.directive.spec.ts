import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FILTER_STRING_STRATEGY, SortDirection } from '../enums';
import { CollectionGroup, CollectionSort, CollectionStringFilter, TableState } from '../interfaces';
import { TableService } from '../services/table.service';
import { Table } from '../table';
import { TableInitialStateDirective } from './table-initial-state.directive';

@Component({
    template: `<div [fdpTableInitialState]="initialState"></div>`,
    standalone: true,
    imports: [TableInitialStateDirective]
})
class TestComponent {
    initialState: TableState;
}

describe('TableInitialStateDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: TableInitialStateDirective;
    let directiveElement: DebugElement;
    let tableService: TableService;
    let mockTable: Partial<Table>;

    beforeEach(() => {
        mockTable = {
            getTableColumns: jest.fn().mockReturnValue([
                { name: 'name', key: 'name', visible: true },
                { name: 'description', key: 'description', visible: true },
                { name: 'price', key: 'price', visible: false }
            ]),
            pageScrolling: false,
            loadPagesBefore: false,
            pageSize: 10
        };

        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [TableService, { provide: Table, useValue: mockTable }]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        directiveElement = fixture.debugElement.query(By.directive(TableInitialStateDirective));
        directive = directiveElement.injector.get(TableInitialStateDirective);
        tableService = TestBed.inject(TableService);

        directive.setTable(mockTable as Table);
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    describe('snapshot mechanism', () => {
        it('should capture initial sort snapshot on first setInitialState call', () => {
            const initialSort: CollectionSort[] = [
                { field: 'name', direction: SortDirection.ASC },
                { field: 'price', direction: SortDirection.DESC }
            ];
            directive.initialSortBy = initialSort;

            directive.setInitialState();

            const snapshot = directive.getInitialSortBySnapshot();
            expect(snapshot).toEqual(initialSort);
            expect(snapshot).not.toBe(initialSort); // Should be a copy
        });

        it('should capture initial filter snapshot on first setInitialState call', () => {
            const initialFilter: CollectionStringFilter[] = [
                { field: 'name', value: 'test', strategy: FILTER_STRING_STRATEGY.CONTAINS },
                { field: 'status', value: 'active', strategy: FILTER_STRING_STRATEGY.CONTAINS }
            ];
            directive.initialFilterBy = initialFilter;

            directive.setInitialState();

            const snapshot = directive.getInitialFilterBySnapshot();
            expect(snapshot).toEqual(initialFilter);
            expect(snapshot).not.toBe(initialFilter); // Should be a copy
        });

        it('should capture initial group snapshot on first setInitialState call', () => {
            const initialGroup: CollectionGroup[] = [
                { field: 'category', direction: SortDirection.ASC, showAsColumn: true }
            ];
            directive.initialGroupBy = initialGroup;

            directive.setInitialState();

            const snapshot = directive.getInitialGroupBySnapshot();
            expect(snapshot).toEqual(initialGroup);
            expect(snapshot).not.toBe(initialGroup); // Should be a copy
        });

        it('should capture empty array snapshots when no initial values provided', () => {
            directive.setInitialState();

            expect(directive.getInitialSortBySnapshot()).toEqual([]);
            expect(directive.getInitialFilterBySnapshot()).toEqual([]);
            expect(directive.getInitialGroupBySnapshot()).toEqual([]);
        });

        it('should not update snapshot on subsequent setInitialState calls', () => {
            const firstSort: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
            const secondSort: CollectionSort[] = [{ field: 'price', direction: SortDirection.DESC }];

            directive.initialSortBy = firstSort;
            directive.setInitialState();

            const firstSnapshot = directive.getInitialSortBySnapshot();
            expect(firstSnapshot).toEqual(firstSort);

            // Change the input and call setInitialState again
            directive.initialSortBy = secondSort;
            directive.setInitialState();

            // Snapshot should still be the first value
            const secondSnapshot = directive.getInitialSortBySnapshot();
            expect(secondSnapshot).toEqual(firstSort);
            expect(secondSnapshot).not.toEqual(secondSort);
        });

        it('should preserve snapshot immutability when original array is modified', () => {
            const initialSort: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
            directive.initialSortBy = initialSort;

            directive.setInitialState();

            // Modify the original array
            initialSort.push({ field: 'price', direction: SortDirection.DESC });

            // Snapshot should not be affected
            const snapshot = directive.getInitialSortBySnapshot();
            expect(snapshot.length).toBe(1);
            expect(snapshot).toEqual([{ field: 'name', direction: SortDirection.ASC }]);
        });

        it('should capture snapshots independently for sort, filter, and group', () => {
            const initialSort: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
            const initialFilter: CollectionStringFilter[] = [
                { field: 'status', value: 'active', strategy: FILTER_STRING_STRATEGY.CONTAINS }
            ];
            const initialGroup: CollectionGroup[] = [
                { field: 'category', direction: SortDirection.DESC, showAsColumn: true }
            ];

            directive.initialSortBy = initialSort;
            directive.initialFilterBy = initialFilter;
            directive.initialGroupBy = initialGroup;

            directive.setInitialState();

            expect(directive.getInitialSortBySnapshot()).toEqual(initialSort);
            expect(directive.getInitialFilterBySnapshot()).toEqual(initialFilter);
            expect(directive.getInitialGroupBySnapshot()).toEqual(initialGroup);
        });

        it('should maintain snapshot across multiple table state changes', () => {
            const initialSort: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
            directive.initialSortBy = initialSort;

            directive.setInitialState();
            const firstSnapshot = directive.getInitialSortBySnapshot();

            // Change table state multiple times
            tableService.setSort([{ field: 'price', direction: SortDirection.DESC }]);
            tableService.setSort([{ field: 'status', direction: SortDirection.ASC }]);

            // Snapshot should remain unchanged
            const laterSnapshot = directive.getInitialSortBySnapshot();
            expect(laterSnapshot).toEqual(firstSnapshot);
            expect(laterSnapshot).toEqual(initialSort);
        });

        it('should allow reset to initial snapshot values', () => {
            const initialSort: CollectionSort[] = [
                { field: 'name', direction: SortDirection.ASC },
                { field: 'price', direction: SortDirection.DESC }
            ];
            directive.initialSortBy = initialSort;

            directive.setInitialState();
            const snapshot = directive.getInitialSortBySnapshot();

            // Change current state
            const newSort: CollectionSort[] = [{ field: 'status', direction: SortDirection.ASC }];
            tableService.setSort(newSort);
            expect(tableService.getTableState().sortBy).toEqual(newSort);

            // Reset to snapshot
            tableService.setSort(snapshot);
            expect(tableService.getTableState().sortBy).toEqual(initialSort);
        });
    });

    describe('multi-criteria sort snapshot', () => {
        it('should capture multi-criteria sort snapshot correctly', () => {
            const multiCriteriaSort: CollectionSort[] = [
                { field: 'name', direction: SortDirection.ASC },
                { field: 'price', direction: SortDirection.DESC },
                { field: 'status', direction: SortDirection.ASC }
            ];
            directive.initialSortBy = multiCriteriaSort;

            directive.setInitialState();

            const snapshot = directive.getInitialSortBySnapshot();
            expect(snapshot).toEqual(multiCriteriaSort);
            expect(snapshot.length).toBe(3);
        });

        it('should preserve multi-criteria sort order in snapshot', () => {
            const sortCriteria: CollectionSort[] = [
                { field: 'category', direction: SortDirection.DESC },
                { field: 'name', direction: SortDirection.ASC },
                { field: 'date', direction: SortDirection.DESC }
            ];
            directive.initialSortBy = sortCriteria;

            directive.setInitialState();

            const snapshot = directive.getInitialSortBySnapshot();
            expect(snapshot[0].field).toBe('category');
            expect(snapshot[1].field).toBe('name');
            expect(snapshot[2].field).toBe('date');
        });

        it('should not update multi-criteria snapshot when sort changes', () => {
            const initialMultiSort: CollectionSort[] = [
                { field: 'name', direction: SortDirection.ASC },
                { field: 'price', direction: SortDirection.DESC }
            ];
            directive.initialSortBy = initialMultiSort;

            directive.setInitialState();
            const snapshot = directive.getInitialSortBySnapshot();

            // User changes sort to different multi-criteria
            const newMultiSort: CollectionSort[] = [
                { field: 'status', direction: SortDirection.ASC },
                { field: 'date', direction: SortDirection.DESC },
                { field: 'category', direction: SortDirection.ASC }
            ];
            directive.initialSortBy = newMultiSort;
            directive.setInitialState(); // Second call should not update snapshot

            // Snapshot should still be the original
            const unchangedSnapshot = directive.getInitialSortBySnapshot();
            expect(unchangedSnapshot).toEqual(initialMultiSort);
            expect(unchangedSnapshot.length).toBe(2);
        });
    });

    describe('snapshot integration with table state', () => {
        it('should set table state with initial sort on first call', () => {
            const initialSort: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
            directive.initialSortBy = initialSort;

            directive.setInitialState();

            const state = tableService.getTableState();
            expect(state.sortBy).toEqual(initialSort);
        });

        it('should set table state with initial filter on first call', () => {
            const initialFilter: CollectionStringFilter[] = [
                { field: 'status', value: 'active', strategy: FILTER_STRING_STRATEGY.CONTAINS }
            ];
            directive.initialFilterBy = initialFilter;

            directive.setInitialState();

            const state = tableService.getTableState();
            expect(state.filterBy).toEqual(initialFilter);
        });

        it('should set table state with initial group on first call', () => {
            const initialGroup: CollectionGroup[] = [
                { field: 'category', direction: SortDirection.ASC, showAsColumn: true }
            ];
            directive.initialGroupBy = initialGroup;

            directive.setInitialState();

            const state = tableService.getTableState();
            expect(state.groupBy).toEqual(initialGroup);
        });

        it('should preserve snapshot when table state is updated via directive', () => {
            const initialSort: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
            directive.initialSortBy = initialSort;

            directive.setInitialState();
            const snapshot = directive.getInitialSortBySnapshot();

            // Update via directive's initialSortBy
            directive.initialSortBy = [{ field: 'price', direction: SortDirection.DESC }];
            directive.setInitialState();

            // Snapshot should not change
            const unchangedSnapshot = directive.getInitialSortBySnapshot();
            expect(unchangedSnapshot).toEqual(snapshot);
            expect(unchangedSnapshot).toEqual(initialSort);
        });
    });

    describe('snapshot getter methods', () => {
        it('should return snapshot references from getters', () => {
            const initialSort: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
            directive.initialSortBy = initialSort;

            directive.setInitialState();

            const snapshot1 = directive.getInitialSortBySnapshot();
            const snapshot2 = directive.getInitialSortBySnapshot();

            // Both should have same values and same reference
            expect(snapshot1).toEqual(snapshot2);
            expect(snapshot1).toBe(snapshot2); // Same reference
        });

        it('should return empty arrays when no snapshots captured', () => {
            // Don't call setInitialState

            expect(directive.getInitialSortBySnapshot()).toEqual([]);
            expect(directive.getInitialFilterBySnapshot()).toEqual([]);
            expect(directive.getInitialGroupBySnapshot()).toEqual([]);
        });
    });

    describe('edge cases', () => {
        it('should handle null initial values gracefully', () => {
            directive.initialSortBy = null as any;
            directive.initialFilterBy = null as any;
            directive.initialGroupBy = null as any;

            directive.setInitialState();

            expect(directive.getInitialSortBySnapshot()).toEqual([]);
            expect(directive.getInitialFilterBySnapshot()).toEqual([]);
            expect(directive.getInitialGroupBySnapshot()).toEqual([]);
        });

        it('should handle undefined initial values gracefully', () => {
            directive.initialSortBy = undefined as any;
            directive.initialFilterBy = undefined as any;
            directive.initialGroupBy = undefined as any;

            directive.setInitialState();

            expect(directive.getInitialSortBySnapshot()).toEqual([]);
            expect(directive.getInitialFilterBySnapshot()).toEqual([]);
            expect(directive.getInitialGroupBySnapshot()).toEqual([]);
        });

        it('should capture snapshot when arrays are empty', () => {
            directive.initialSortBy = [];
            directive.initialFilterBy = [];
            directive.initialGroupBy = [];

            directive.setInitialState();

            expect(directive.getInitialSortBySnapshot()).toEqual([]);
            expect(directive.getInitialFilterBySnapshot()).toEqual([]);
            expect(directive.getInitialGroupBySnapshot()).toEqual([]);
        });
    });
});
