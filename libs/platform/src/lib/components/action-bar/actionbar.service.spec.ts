import { TestBed } from '@angular/core/testing';

import { ActionbarService } from './actionbar.service';

describe('ActionbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionbarService = TestBed.get(ActionbarService);
    expect(service).toBeTruthy();
  });
});
