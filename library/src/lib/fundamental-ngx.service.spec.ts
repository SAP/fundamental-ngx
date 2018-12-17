import { TestBed, inject } from '@angular/core/testing';

import { FundamentalNgxService } from './fundamental-ngx.service';

describe('FundamentalNgxService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FundamentalNgxService]
        });
    });

    it('should be created', inject([FundamentalNgxService], (service: FundamentalNgxService) => {
        expect(service).toBeTruthy();
    }));
});
