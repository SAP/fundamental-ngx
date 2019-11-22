import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypesExampleComponent } from './select-types-example.component';

describe('SelectTypesExampleComponent', () => {
  let component: SelectTypesExampleComponent;
  let fixture: ComponentFixture<SelectTypesExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTypesExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTypesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
