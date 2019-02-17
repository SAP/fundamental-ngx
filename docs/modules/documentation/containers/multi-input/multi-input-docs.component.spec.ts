import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInputDocsComponent } from './multi-input-docs.component';

describe('MultiInputDocsComponent', () => {
  let component: MultiInputDocsComponent;
  let fixture: ComponentFixture<MultiInputDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiInputDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiInputDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
