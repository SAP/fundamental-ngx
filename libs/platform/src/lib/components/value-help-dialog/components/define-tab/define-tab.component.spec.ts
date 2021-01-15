import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTabComponent } from './define-tab.component';

describe('DefineTabComponent', () => {
  let component: DefineTabComponent<any>;
  let fixture: ComponentFixture<DefineTabComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
