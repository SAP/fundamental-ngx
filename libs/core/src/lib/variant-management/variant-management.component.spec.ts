import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantManagementComponent } from './variant-management.component';

describe('VariantManagementComponent', () => {
  let component: VariantManagementComponent;
  let fixture: ComponentFixture<VariantManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
