import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSheetMobileComponent } from './action-sheet-mobile.component';

describe('ActionSheetMobileComponent', () => {
  let component: ActionSheetMobileComponent;
  let fixture: ComponentFixture<ActionSheetMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionSheetMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSheetMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
