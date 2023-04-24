import { TestBed } from '@angular/core/testing';
import { Observer } from 'rxjs';

import { TableService } from './table.service';
import { DEFAULT_TABLE_STATE } from './constants';
import { CollectionGroup, CollectionStringFilter, TableState } from './interfaces';
import { GroupChange, SortChange, FilterChange, FreezeChange, SearchChange } from './models';
import { FILTER_STRING_STRATEGY, SortDirection } from './enums';
import { SearchInput } from './interfaces/search-field.interface';

describe('TableServiceService', () => {
    let service: TableService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TableService]
        });
        service = TestBed.inject(TableService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return table state by getTableState', () => {
        const getValueSpy = jest.spyOn(service, 'getTableState');

        expect(service.getTableState()).toEqual(DEFAULT_TABLE_STATE);
        expect(getValueSpy).toHaveBeenCalled();
    });

    it('should set table state', () => {
        const newState: TableState = {
            ...DEFAULT_TABLE_STATE,
            groupBy: [{ field: 'name', direction: SortDirection.ASC, showAsColumn: true }]
        };

        service.setTableState(newState);

        expect(service.getTableState()).toEqual(newState);
    });

    it('should set new sortBy state', () => {
        const setTableStateSpy = jest.spyOn(service, 'setTableState');
        const sortChangeSpy = jest.spyOn(service.sortChange, 'emit');
        const field = 'name';
        const newSortBy = [{ field, direction: SortDirection.ASC }];
        const newState: TableState = { ...DEFAULT_TABLE_STATE, sortBy: newSortBy };
        const event: SortChange = { current: newSortBy, previous: DEFAULT_TABLE_STATE.sortBy };

        service.setSort(newSortBy);

        expect(sortChangeSpy).toHaveBeenCalledWith(event);
        expect(setTableStateSpy).toHaveBeenCalledWith(newState);
    });

    it('should set new groupBy state', () => {
        const setTableStateSpy = jest.spyOn(service, 'setTableState');
        const groupChangeSpy = jest.spyOn(service.groupChange, 'emit');
        const field = 'name';
        const newGroupBy: CollectionGroup[] = [{ field, direction: SortDirection.ASC, showAsColumn: true }];
        const newState: TableState = { ...DEFAULT_TABLE_STATE, groupBy: newGroupBy };
        const event: GroupChange = { current: newGroupBy, previous: DEFAULT_TABLE_STATE.groupBy };

        service.setGroups(newGroupBy);

        expect(groupChangeSpy).toHaveBeenCalledWith(event);
        expect(setTableStateSpy).toHaveBeenCalledWith(newState);
    });

    it('should set new filterBy state', () => {
        const setTableStateSpy = jest.spyOn(service, 'setTableState');
        const filterChangeSpy = jest.spyOn(service.filterChange, 'emit');
        const newFilterBy: CollectionStringFilter[] = [
            { field: 'name', value: 'Product name', strategy: FILTER_STRING_STRATEGY.CONTAINS }
        ];
        const newState: TableState = { ...DEFAULT_TABLE_STATE, filterBy: newFilterBy };
        const event: FilterChange = { current: newFilterBy, previous: DEFAULT_TABLE_STATE.filterBy };

        service.setFilters(newFilterBy);

        expect(filterChangeSpy).toHaveBeenCalledWith(event);
        expect(setTableStateSpy).toHaveBeenCalledWith(newState);
    });

    it('should set new freezeToColumn state', () => {
        const setTableStateSpy = jest.spyOn(service, 'setTableState');
        const freezeChangeSpy = jest.spyOn(service.freezeChange, 'emit');
        const field = 'name';
        const newState: TableState = { ...DEFAULT_TABLE_STATE, freezeToColumn: field };
        const event: FreezeChange = { current: field, previous: DEFAULT_TABLE_STATE.freezeToColumn };

        service.freezeTo(field);

        expect(freezeChangeSpy).toHaveBeenCalledWith(event);
        expect(setTableStateSpy).toHaveBeenCalledWith(newState);
    });

    it('should set new search state', () => {
        const setTableStateSpy = jest.spyOn(service, 'setTableState');
        const searchChangeSpy = jest.spyOn(service.searchChange, 'emit');
        const newSearchInput: SearchInput = { text: 'Search query', category: null };
        const newState: TableState = { ...DEFAULT_TABLE_STATE, searchInput: newSearchInput };
        const event: SearchChange = { current: newSearchInput, previous: DEFAULT_TABLE_STATE.searchInput };

        service.search(newSearchInput);

        expect(searchChangeSpy).toHaveBeenCalledWith(event);
        expect(setTableStateSpy).toHaveBeenCalledWith(newState);
    });

    it('should expose table state through tableState$ observable', () => {
        const subscriber: Observer<any> = {
            next: () => {
            }, error: () => {
            }, complete: () => {
            }
        };
        const subscriberNextSpy = jest.spyOn(subscriber, 'next');

        service.tableState$.subscribe(subscriber);

        // Emit state once it's subscribed to it
        expect(subscriberNextSpy).toHaveBeenCalledTimes(1);
        expect(subscriberNextSpy).toHaveBeenCalledWith(service.getTableState());

        const newState: TableState = { ...DEFAULT_TABLE_STATE, sortBy: [] };
        service.setTableState(newState);
        expect(subscriberNextSpy).toHaveBeenCalledTimes(2);
        expect(subscriberNextSpy).toHaveBeenCalledWith(newState);
    });

    it('should emit changes by tableStateChanges$ observable', () => {
        const subscriber: Observer<any> = {
            next: () => {
            }, error: () => {
            }, complete: () => {
            }
        };
        const subscriberNextSpy = jest.spyOn(subscriber, 'next');

        service.tableStateChanges$.subscribe(subscriber);

        // Not emit state once it's subscribed to it
        expect(subscriberNextSpy).not.toHaveBeenCalled();

        const newState: TableState = { ...DEFAULT_TABLE_STATE, sortBy: [] };
        service.setTableState(newState);
        expect(subscriberNextSpy).toHaveBeenCalledTimes(1);
        expect(subscriberNextSpy).toHaveBeenCalledWith(newState);
    });
});
