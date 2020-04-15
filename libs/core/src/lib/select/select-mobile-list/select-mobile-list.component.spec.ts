import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMobileListComponent } from './select-mobile-list.component';

describe('OptionListComponent', () => {
  let component: SelectMobileListComponent;
  let fixture: ComponentFixture<SelectMobileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMobileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMobileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
