import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformActionBarDocsComponent } from './platform-action-bar-docs.component';

describe('PlatformActionBarDocsComponent', () => {
  let component: PlatformActionBarDocsComponent;
  let fixture: ComponentFixture<PlatformActionBarDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformActionBarDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformActionBarDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
