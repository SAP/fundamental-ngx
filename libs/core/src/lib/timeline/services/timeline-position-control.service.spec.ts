import { TestBed } from '@angular/core/testing';

import { TimelinePositionControlService } from './timeline-position-control.service';

describe('TimelinePositionControlService', () => {
  let service: TimelinePositionControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelinePositionControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
