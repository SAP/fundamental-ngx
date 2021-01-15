import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTabComponent } from './select-tab.component';

describe('SelectTabComponent', () => {
  let component: SelectTabComponent<any>;
  let fixture: ComponentFixture<SelectTabComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
