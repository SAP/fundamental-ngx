import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentButtonComponent } from './component-button.component';

describe('ComponentButtonComponent', () => {
  let component: ComponentButtonComponent;
  let fixture: ComponentFixture<ComponentButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
