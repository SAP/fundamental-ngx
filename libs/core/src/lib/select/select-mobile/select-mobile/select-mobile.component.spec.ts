import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMobileComponent } from './select-mobile.component';

describe('SelectMobileComponent', () => {
  let component: SelectMobileComponent;
  let fixture: ComponentFixture<SelectMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
