import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformCarosuelHeaderComponent } from './platform-carosuel-header.component';

describe('PlatformCarosuelHeaderComponent', () => {
  let component: PlatformCarosuelHeaderComponent;
  let fixture: ComponentFixture<PlatformCarosuelHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformCarosuelHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformCarosuelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
