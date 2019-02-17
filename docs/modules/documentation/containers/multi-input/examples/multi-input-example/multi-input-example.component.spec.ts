import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInputExampleComponent } from './multi-input-example.component';

describe('MultiInputExampleComponent', () => {
  let component: MultiInputExampleComponent;
  let fixture: ComponentFixture<MultiInputExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiInputExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiInputExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
