import { TestBed } from '@angular/core/testing';
import { SortDirection } from '@fundamental-ngx/platform';

import { TableService } from './table.service';
import { DEFAULT_TABLE_STATE } from './constants';

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

    it('should return value from tableState$', () => {
        const getValueSpy = spyOn(service.tableState$, 'getValue').and.callThrough();

        expect(service.getTableState()).toEqual(DEFAULT_TABLE_STATE);
        expect(getValueSpy).toHaveBeenCalled();
    });

    it('should set new state', () => {
        const newState = { ...DEFAULT_TABLE_STATE, groupBy: [{ field: 'name', direction: SortDirection.ASC }] };
        const getTableStateSpy = spyOn(service, 'getTableState').and.callThrough();
        const stateNextSpy = spyOn(service.tableState$, 'next').and.callThrough();

        service.setTableState(newState);

        expect(getTableStateSpy).toHaveBeenCalled();
        expect(service.getTableState()).toEqual(DEFAULT_TABLE_STATE);
        expect(stateNextSpy).toHaveBeenCalledWith(newState);
    });

    it('should set new sortBy state', () => {
        const getTableStateSpy = spyOn(service, 'getTableState').and.callThrough();
        const setTableStateSpy = spyOn(service, 'setTableState').and.callThrough();
        const field = 'name';
        const direction = SortDirection.ASC;
        const newSortBy = [{ field: field, direction: direction }];
        const newState = { ...DEFAULT_TABLE_STATE, sortBy: newSortBy };
        const emitValue = { current: newSortBy, previous: DEFAULT_TABLE_STATE.sortBy };
        const sortChangeSpy = spyOn(service.sortChange, 'emit').and.callThrough();

        service.sort(field, direction);

        expect(getTableStateSpy).toHaveBeenCalled();
        expect(sortChangeSpy).toHaveBeenCalledWith(emitValue);
        expect(setTableStateSpy).toHaveBeenCalledWith(newState);
    });

    // TODO: add tests for filter, group, freezeTo, search
});
