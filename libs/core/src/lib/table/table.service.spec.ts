import { TestBed } from '@angular/core/testing';

import { TableService } from './table.service';

describe('TableServiceService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
