import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VhdSearchComponent } from './value-help-dialog-search.component';

describe('VhdSearchComponent', () => {
  let component: VhdSearchComponent;
  let fixture: ComponentFixture<VhdSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VhdSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VhdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
