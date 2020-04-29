import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInputMobileComponent } from './multi-input-mobile.component';

describe('MultiInputMobileComponent', () => {
  let component: MultiInputMobileComponent;
  let fixture: ComponentFixture<MultiInputMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiInputMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiInputMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
