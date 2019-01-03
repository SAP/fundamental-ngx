import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerDocsComponent } from './loading-spinner-docs.component';

describe('LoadingSpinnerDocsComponent', () => {
  let component: LoadingSpinnerDocsComponent;
  let fixture: ComponentFixture<LoadingSpinnerDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
