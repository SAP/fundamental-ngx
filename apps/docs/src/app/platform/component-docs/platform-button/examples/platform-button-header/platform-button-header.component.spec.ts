import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformButtonHeaderComponent } from './platform-button-header.component';

describe('PlatformButtonHeaderComponent', () => {
  let component: PlatformButtonHeaderComponent;
  let fixture: ComponentFixture<PlatformButtonHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformButtonHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformButtonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
