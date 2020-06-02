import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformListHeaderComponent } from './platform-list-header.component';

describe('PlatformListHeaderComponent', () => {
  let component: PlatformListHeaderComponent;
  let fixture: ComponentFixture<PlatformListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
