import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectMarkerComponent } from './object-marker.component';

describe('ObjectMarkerComponent', () => {
  let component: ObjectMarkerComponent;
  let fixture: ComponentFixture<ObjectMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
