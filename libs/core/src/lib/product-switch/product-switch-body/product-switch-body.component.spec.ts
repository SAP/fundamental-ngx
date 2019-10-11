import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSwitchBodyComponent } from './product-switch-body.component';

describe('ProductSwitchBodyComponent', () => {
  let component: ProductSwitchBodyComponent;
  let fixture: ComponentFixture<ProductSwitchBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSwitchBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSwitchBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
