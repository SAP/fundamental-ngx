import { TestBed } from '@angular/core/testing';

import { TableService } from './table.service';

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

    it('should propagate keys', () => {
        const keys = ['test1', 'test2'];

        jest.spyOn(service.propagateKeys$, 'next');

        service.changeKeys(keys);

        expect(service.propagateKeys$.next).toHaveBeenCalledWith(keys);
    });
});
