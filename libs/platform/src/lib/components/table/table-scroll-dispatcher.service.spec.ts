import { TestBed } from '@angular/core/testing';

import { TableScrollDispatcherService } from './table-scroll-dispatcher.service';

describe('TableScrollDispatcherService', () => {
    let service: TableScrollDispatcherService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TableScrollDispatcherService]
        });
        service = TestBed.inject(TableScrollDispatcherService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
