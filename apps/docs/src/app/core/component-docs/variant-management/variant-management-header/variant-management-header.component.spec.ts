import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantManagementHeaderComponent } from './variant-management-header.component';

describe('VariantManagementHeaderComponent', () => {
  let component: VariantManagementHeaderComponent;
  let fixture: ComponentFixture<VariantManagementHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantManagementHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantManagementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
